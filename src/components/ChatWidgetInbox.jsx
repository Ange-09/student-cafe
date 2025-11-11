import React, { useState, useRef, useEffect } from "react";
import "../styles/chatwidgetinbox.css";

export default function ChatWidgetInbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Sample conversations with different users
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: "Maria Santos",
      avatar: "MS",
      lastMessage: "Do you have power outlets at each table?",
      timestamp: new Date(Date.now() - 3600000),
      messages: [
        {
          text: "Hi! Are there available seats for tomorrow afternoon?",
          sender: "user",
          timestamp: new Date(Date.now() - 7200000),
        },
        {
          text: "Yes! We have plenty of seats available tomorrow. What time are you planning to come?",
          sender: "owner",
          timestamp: new Date(Date.now() - 7000000),
        },
        {
          text: "Around 2 PM. Do you have power outlets at each table?",
          sender: "user",
          timestamp: new Date(Date.now() - 3600000),
        },
      ],
    },
    {
      id: 2,
      user: "John Reyes",
      avatar: "JR",
      lastMessage: "How much is the rate per hour?",
      timestamp: new Date(Date.now() - 86400000),
      messages: [
        {
          text: "Good morning! How much is the rate per hour?",
          sender: "user",
          timestamp: new Date(Date.now() - 90000000),
        },
        {
          text: "Hello! Our rate is ₱200 per hour or ₱600 for the whole day with unlimited coffee.",
          sender: "owner",
          timestamp: new Date(Date.now() - 89000000),
        },
        {
          text: "That sounds great! Do you have high-speed WiFi?",
          sender: "user",
          timestamp: new Date(Date.now() - 88000000),
        },
        {
          text: "Yes! We have fiber internet with 100 Mbps speed.",
          sender: "owner",
          timestamp: new Date(Date.now() - 87000000),
        },
      ],
    },
    {
      id: 3,
      user: "Anna Cruz",
      avatar: "AC",
      lastMessage: "Perfect! I'll drop by later. Thank you!",
      timestamp: new Date(Date.now() - 172800000),
      messages: [
        {
          text: "Hi! What amenities do you offer?",
          sender: "user",
          timestamp: new Date(Date.now() - 180000000),
        },
        {
          text: "We offer free WiFi, unlimited coffee and water, air-conditioned rooms, power outlets, and printing services!",
          sender: "owner",
          timestamp: new Date(Date.now() - 179000000),
        },
        {
          text: "Do you have private rooms for group study?",
          sender: "user",
          timestamp: new Date(Date.now() - 178000000),
        },
        {
          text: "Yes! We have 2 private meeting rooms that can fit 6-8 people. They're ₱300/hour.",
          sender: "owner",
          timestamp: new Date(Date.now() - 177000000),
        },
        {
          text: "Perfect! I'll drop by later. Thank you!",
          sender: "user",
          timestamp: new Date(Date.now() - 172800000),
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat, conversations]);

  const handleSend = () => {
    if (inputValue.trim() && selectedChat) {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === selectedChat.id) {
          const updatedConv = {
            ...conv,
            messages: [
              ...conv.messages,
              {
                text: inputValue,
                sender: "owner",
                timestamp: new Date(),
              },
            ],
            lastMessage: inputValue,
            timestamp: new Date(),
          };
          setSelectedChat(updatedConv); // Update selectedChat with the new conversation
          return updatedConv;
        }
        return conv;
      });
      setConversations(updatedConversations);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openChat = (conversation) => {
    setSelectedChat(conversation);
  };

  const backToInbox = () => {
    setSelectedChat(null);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-button-inbox ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open messages"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="message-badge">{conversations.length}</span>
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="chat-box-inbox">
          {!selectedChat ? (
            // Inbox View
            <>
              <div className="chat-header-inbox">
                <h3>Messages</h3>
                <button
                  className="close-button-inbox"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close messages"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="inbox-list">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="inbox-item"
                    onClick={() => openChat(conv)}
                  >
                    <div className="inbox-avatar">{conv.avatar}</div>
                    <div className="inbox-details">
                      <div className="inbox-header">
                        <span className="inbox-user">{conv.user}</span>
                        <span className="inbox-time">
                          {formatTime(conv.timestamp)}
                        </span>
                      </div>
                      <p className="inbox-preview">{conv.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Chat View
            <>
              <div className="chat-header-inbox">
                <button
                  className="back-button"
                  onClick={backToInbox}
                  aria-label="Back to inbox"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <div className="chat-user-info">
                  <div className="chat-avatar-small">{selectedChat.avatar}</div>
                  <h3>{selectedChat.user}</h3>
                </div>
                <button
                  className="close-button-inbox"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="chat-messages-inbox">
                {selectedChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message-inbox ${
                      message.sender === "owner"
                        ? "message-owner"
                        : "message-user"
                    }`}
                  >
                    <div className="message-content-inbox">{message.text}</div>
                    <div className="message-time-inbox">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-container-inbox">
                <input
                  type="text"
                  className="chat-input-inbox"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="send-button-inbox"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
