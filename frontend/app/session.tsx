import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState('');

    return (
        <SessionContext.Provider value={{ sessionId, setSessionId }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    console.log(context); // Add this line to see the context value
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
}
