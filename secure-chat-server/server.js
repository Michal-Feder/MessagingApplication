require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died, starting a new one...`);
        cluster.fork();
    });
} else {
    const app = express();
    const server = http.createServer(app);

    // WebSocket Connection Handling
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);

    // Database Connection
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`MongoDB connected by Worker ${process.pid}`))
        .catch(err => console.log(`MongoDB connection error by Worker ${process.pid}:`, err));

    // WebSocket Events
    io.on('connection', (socket) => {
        console.log(`New client connected to Worker ${process.pid}:`, socket.id);

        const getUserName = async () => {
            const token = socket.handshake.query.token;
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const user = await User.findById(decoded.id).exec();
                    socket.username = user.username;
                } catch (err) {
                    console.error('Token verification failed:', err);
                    socket.disconnect();
                }
            }
        };
        getUserName();

        socket.on('sendMessage', (message) => {
            const sender = socket.username || "Anonymous";
            io.emit('receiveMessage', { message, sender });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected from Worker ${process.pid}:`, socket.id);
        });
    });

    // Start Server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Worker ${process.pid} running on port ${PORT}`));
}
