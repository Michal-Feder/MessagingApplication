const request = require('supertest');
const server = require('../server'); // ביבוא השרת, לא app
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// הגדרת זמן נוסף לבדיקה
jest.setTimeout(10000); // זמן ריצה של 10 שניות

describe('User Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany(); // מחיקת משתמשים לפני כל בדיקה
  });

  it('should register a new user successfully', async () => {
    const response = await request(server) // שימוש ב- server ולא ב-app
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it('should not register a user with an existing username', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username: 'testuser', password: hashedPassword });
    await user.save();

    const response = await request(server)  // שימוש ב- server ולא ב-app
      .post('/api/auth/register')
      .send({ username: 'testuser', password });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it('should fail login for invalid credentials', async () => {
    const response = await request(server) // שימוש ב- server ולא ב-app
      .post('/api/auth/login')
      .send({ username: 'nonexistentuser', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
