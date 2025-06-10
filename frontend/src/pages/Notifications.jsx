import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note, idx) => (
            <li key={idx} className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="text-blue-800">{note.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;