# Secure Messaging App

## Setup and Running the Application

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Michal-Feder/MessagingApplication.git
   cd MessagingApplication
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and set:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the application:
   - Development mode:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm start
     ```

---

## Design Choices

### Backend Technologies
- **Node.js + Express**: Efficient and lightweight backend framework.
- **MongoDB + Mongoose**: NoSQL database chosen for its scalability.
- **Socket.IO**: Real-time messaging support using WebSockets.
- **Cluster Mode with Worker Threads**: Handles 10,000+ concurrent connections.

### Security Considerations
- **JWT Authentication**: Secure user authentication.
- **Password Hashing**: Utilizes `bcrypt` for secure password storage.
- **End-to-End Encryption (E2EE)**: AES-256 encryption for messages.
- **Helmet & CORS**: Security middleware to mitigate vulnerabilities.

---

## Trade-offs and Limitations

### Trade-offs
- **WebSockets vs REST API**: WebSockets enable real-time messaging but add complexity; REST is still used for authentication and message retrieval.
- **MongoDB vs SQL**: MongoDB allows for flexible data structures, but complex queries may be less efficient than in SQL databases.

### Limitations
- **Scaling Beyond a Single Server**: While `cluster` mode helps, load balancing (e.g., Nginx) is necessary for extreme scalability.
- **Encryption Overhead**: Encrypting and decrypting messages can introduce slight latency.
- **Token Expiry Handling**: Users may need to reauthenticate if their token expires mid-session.

---


For questions or contributions, feel free to open an issue or submit a pull request!

