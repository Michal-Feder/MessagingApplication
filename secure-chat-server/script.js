

db.users.insertMany([
  {
    username: 'john_doe',
    password: '$2b$10$mI/MzW1mWq7MESAxRqDy/./Ir8TsUOkyhH/tL.7WanqTDtWPPzlqC'
  },
  {
    username: 'jane_doe',
    password: '$2b$10$.MuXZS8sj3w58MSaoEKJQ..xrScGyw32zz5D3m5HQM1lxgWCYF64y'
  },
  {
    username: 'admin',
    password: '$2b$10$fxgOQuseLXSvkO81u4/Je.TExoX46TqiLz4FiP/ToVKir9MKz08Wi'
  }
]);

db.messages.insertMany([
  {
    sender: null,
    content: 'U2FsdGVkX18O9M8m0zX9l8GWZ7PHp86mXkKhOkEFC8v+43meYGczuuVJ757hiu/+',
    timestamp: new Date('2025-02-28T00:18:57.379Z')
  },
  {
    sender: db.users.findOne({ username: 'jane_doe' }),
    content: 'U2FsdGVkX194I1mTLDWKb7FIf1/FfPLX8VzC6BR/XiiB+Vfp72CzeB+keu3dy6c/',
    timestamp: new Date('2025-02-28T00:19:36.898Z')
  },
  {
    sender: db.users.findOne({ username: 'jane_doe' }),
    content: 'U2FsdGVkX1/uQVWGacRcKC6uPbIvnynPzd5jllsQLEnhUAm3k9k8CKZPmH+d+XrL',
    timestamp: new Date('2025-02-28T00:19:57.587Z')
  },
  {
    sender: db.users.findOne({ username: 'jane_doe' }),
    content: 'U2FsdGVkX1/EYvDwKuTZlTQ5cv6mxZ0Rl0K6lQBM/n3jkfiFzSZpY6iC5VQPSezDjUCVEZmjOsgI7RF7lhD3pQ==',
    timestamp: new Date('2025-02-28T00:20:07.266Z')
  }
]);
