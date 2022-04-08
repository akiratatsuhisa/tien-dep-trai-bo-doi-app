import React, { useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationContext = React.createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

const date = new Date();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      title: "Chào mừng",
      pushTime: date,
      content: (
        <div>
          Chào mừng bạn đã đến tới một cái app mà chẳng biết nó là app gì
        </div>
      ),
      delay: 5000,
      show: true,
    },
  ]);

  function closeNotifcation(id) {
    const items = [...notifications];
    const item = items.find((item) => item.id === id);
    if (!item) return;
    item.show = false;
    setNotifications(items);
    const timeout = setTimeout(() => {
      setNotifications(notifications.filter((item) => item.id !== id));
      clearTimeout(timeout);
    }, 500);
  }

  function pushNotification({
    title,
    content,
    pushTime,
    variant,
    delay = 5000,
  }) {
    pushTime = pushTime ?? new Date();
    const id = pushTime.getTime();
    setNotifications([
      { id, variant, title, pushTime, content, delay, show: true },
      ...notifications,
    ]);
  }

  const value = { pushNotification, closeNotifcation };

  const renderNotifications = notifications.map(
    ({ id, variant, title, pushTime, content, delay, show }) => (
      <Toast
        key={id}
        bg={variant}
        autohide={!!delay}
        delay={delay}
        show={show}
        onClose={() => closeNotifcation(id)}
      >
        <Toast.Header closeButton={true}>
          <strong className="me-auto">{title}</strong>
          <small>{pushTime.toLocaleString()}</small>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    )
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer className="p-3" position="bottom-end">
        {renderNotifications}
      </ToastContainer>
    </NotificationContext.Provider>
  );
}
