import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Messages() {
  const { user } = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Mock data - replace with actual API calls
  const chats = [
    { id: 1, name: 'Happy Tails Shelter', lastMessage: 'Your application for Bella has been approved!', time: '2h ago' },
    { id: 2, name: 'John Doe', lastMessage: 'Thanks for your interest in Max!', time: '1d ago' },
    { id: 3, name: 'City Animal Shelter', lastMessage: 'Please come pick up Luna tomorrow.', time: '3d ago' },
  ];

  const messages = [
    { id: 1, sender: 'Happy Tails Shelter', text: 'Hello! Your application for Bella has been approved!', time: '2h ago', isMine: false },
    { id: 2, sender: 'You', text: 'Thank you so much! When can I pick her up?', time: '2h ago', isMine: true },
    { id: 3, sender: 'Happy Tails Shelter', text: 'You can pick her up tomorrow between 10am-4pm.', time: '1h ago', isMine: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message to chat
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', height: '80vh' }}>
      {/* Chat List */}
      <div style={{
        width: '30%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginRight: '20px',
        overflowY: 'auto'
      }}>
        <h3 style={{ padding: '15px', margin: 0, borderBottom: '1px solid #ddd' }}>Messages</h3>
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: selectedChat?.id === chat.id ? '#f0f8ff' : 'white'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{chat.name}</div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>{chat.lastMessage}</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{
        flex: 1,
        border: '1px solid #ddd',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedChat ? (
          <>
            <div style={{
              padding: '15px',
              borderBottom: '1px solid #ddd',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px 8px 0 0'
            }}>
              <h4 style={{ margin: 0 }}>{selectedChat.name}</h4>
            </div>

            <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  marginBottom: '15px',
                  textAlign: msg.isMine ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: msg.isMine ? '#007bff' : '#f1f1f1',
                    color: msg.isMine ? 'white' : 'black'
                  }}>
                    <div style={{ fontSize: '14px' }}>{msg.text}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '15px',
              borderTop: '1px solid #ddd',
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#666'
          }}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}