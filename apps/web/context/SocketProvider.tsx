'use client';

import { createContext, useCallback, useContext, useEffect } from 'react';

import { io } from "socket.io-client";



interface ISocketContext{
    sendMessage: (message: string) => void;
}


const SocketContext = createContext<ISocketContext|null>(null);

interface SocketProviderProps {
    children?: React.ReactNode;
}

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return state;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    
    const sendMessage:ISocketContext['sendMessage'] = useCallback((message)=>{
        console.log('Sending message', message);
    },[]);

    useEffect(() => {
        console.log('Socket provider mounted');
        const _socket = io('http://localhost:8000');
        _socket.on('event:message', (data) => {
            console.log('Message received', data);
        });

        return () => {
            console.log('Socket provider unmounted');
            _socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
};


