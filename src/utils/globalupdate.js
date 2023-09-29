import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("wss://example.com");
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setGlobalData(data);
        };

        
    }, []);

    return (
        <GlobalContext.Provider value={globalData}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalData = () => useContext(GlobalContext);
