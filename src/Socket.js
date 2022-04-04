import { createContext, useContext, useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

// const baseURL = 'http://localhost:5000';
const baseURL = 'https://quesoft.herokuapp.com';

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();

  //* socket connection
  useEffect(() => {
    const newSocket = socketIo.connect(baseURL, {
      transports: ['websocket'],
    });

    if (!newSocket) return;
    newSocket.on('connect', () => {
      console.log(`Hurrah newSocket ${newSocket.id} Connected`);
      setSocket(newSocket);
    });

    newSocket.on('complete', () => {
      console.log(`Complete`);
    });
  }, []);

  return (
    <SocketContext.Provider
      displayName='Socket Context'
      value={{
        socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
