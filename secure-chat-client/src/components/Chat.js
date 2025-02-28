import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chat.css";
import { encryptMessage, decryptMessage } from '../utils/encryption';

const Chat = React.memo(() => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        transports: ["websocket"],
        query: { token },
      });
    }

    socketRef.current.on("receiveMessage", ({ message, sender }) => {
      setMessages((prev) => [...prev, { text: decryptMessage(message), sender }]);
    });
    return () => {
      socketRef.current?.off("receiveMessage");
    };
  }, [token]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/messages", {
        headers: { Authorization: `${token}` },
      });

      setMessages(response.data.map((msg) => ({
        text: decryptMessage(msg.content),
        sender: msg?.sender?.username
      })));
    } catch (error) {
      handleApiError(error);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!message) return;

    const encrypted = encryptMessage(message);
    socketRef.current.emit("sendMessage", encrypted);

    try {
      await axios.post("http://localhost:5000/api/messages/send",
        { content: encrypted },
        { headers: { Authorization: `${token}` } }
      );
    } catch (error) {
      handleApiError(error);
    }

    setMessage("");
  }, [message, token]);

  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    } else {
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again later.");
    }
  };

  const messageList = useMemo(() => {
    return messages.map((msg, index) => (
      <Message key={index} sender={msg.sender} text={msg.text} />
    ));
  }, [messages]);

  return (
    <div className="chat-container">
      {error && <div className="error-message alert alert-danger">{error}</div>}
      <div className="messages-list">
        {messageList}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
});

const Message = React.memo(({ sender, text }) => (
  <div className={`message ${sender === localStorage.getItem("username") ? "sent" : "received"}`}>
    <strong>{sender}</strong>: {text}
  </div>
));

export default Chat;
