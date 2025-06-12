'use client';

import { createContext, useCallback, useEffect } from 'react';

import { io } from "socket.io-client";



interface ISocketContext{
    sendMessage: (message: string) => void;
}


const SocketContext = createContext<ISocketContext|null>(null);

interface SocketProviderProps {
    children?: React.ReactNode;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    
    const sendMessage:ISocketContext['sendMessage'] = useCallback((message)=>{
        console.log('Sending message', message);
    },[]);

    useEffect(() => {
        console.log('Socket provider mounted');
    }, []);

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
};


