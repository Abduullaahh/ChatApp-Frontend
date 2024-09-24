import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE } from '../GraphQL/mutations/chat';
import { GET_MESSAGES } from '../GraphQL/queries/chat';
import { GET_USERS } from '../GraphQL/queries/users';
import { jwtDecode } from 'jwt-decode';
import '../styles/chat.css';

const Chat = () => {
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);

  // Fetch messages for the current user
  const { data: messagesData, loading: messagesLoading, error: messagesError } = useQuery(GET_MESSAGES, {
    variables: { username: sender },
    skip: !sender,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setSender(decodedToken.username);
    } else {
      console.error('No token found, user might not be authenticated');
    }
  }, []);

  useEffect(() => {
    if (usersData && usersData.getUsers.length > 0) {
      const firstUser = usersData.getUsers.find(user => user.username !== sender);
      if (firstUser) {
        setReceiver(firstUser.phoneNumber);
        setReceiverName(firstUser.name);
        setReceiverPhone(firstUser.phoneNumber);
      }
    }
  }, [usersData, sender]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !receiver || !sender) {
      console.error('Content, receiver, or sender is not set');
      return;
    }

    try {
      const { data } = await sendMessage({ variables: { content, receiver, sender } });
      if (data.saveSentMessage) {
        console.log('Message sent successfully');
        setContent('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const filteredUsers = usersData?.getUsers.filter(user => user.username !== sender) || [];

  const handleUserClick = (user) => {
    setReceiver(user.phoneNumber);
    setReceiverName(user.name);
    setReceiverPhone(user.phoneNumber);
  };
console.log(messagesData)
  // Filter messages to show all between the current user (sender) and the selected receiver
  const filteredMessages = messagesData?.getMessages.filter(
    (msg) =>
      (msg.receiver === receiverPhone && msg.sender === sender) ||  // Sent by current user to receiver
      (msg.sender === receiverPhone && msg.receiver === sender)    // Received by current user from receiver
  );

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h2>Chats</h2>
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-box">
        <h3 style={{marginLeft:'3%'}}>{receiverName}</h3>
        <div className="messages">
          {messagesLoading ? (
            <p>Loading messages...</p>
          ) : messagesError ? (
            <p>Error loading messages: {messagesError.message}</p>
          ) : (
            messagesData?.getMessages && messagesData?.getMessages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === sender ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="input-area">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
