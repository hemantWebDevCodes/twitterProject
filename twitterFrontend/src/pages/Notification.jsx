import React, { useEffect, useState } from 'react'
// import axios from "axios";
import Echo from 'laravel-echo';
import { useSelector } from 'react-redux';

function Notification() {
  
  const [notifications, setNotifications] = useState([]);
  const {profileData} = useSelector((state) => state.profile);
  
  let userId = profileData.id;

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: '3ce92970dbabbad5be44',
      cluster: 'ap2',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    });


    echo.private(`notifications.${userId}`)
      .listen('.notification', (e) => {
        console.log('🔔 New Notification:', e.message);

        // ✅ Add notification to state
        setNotifications((prev) => [...prev, e.message]);
      });

    return () => {
      echo.leave(`notifications.${userId}`);
    };
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul>
        {notifications.map((msg, i) => (
          <li key={i} className="p-2 border-b">{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification
