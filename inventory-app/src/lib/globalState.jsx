import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
    const [globalSelectedCard, setGlobalSelectedCard] = useState({
        name: "Global Card",
        set: [],
        rarity: [],
        code: [],
        imageURL: "",
        description: "",
        attribute: "",
        race: "",
        type: "",
        level: "",
        atk: "",
        def: "",
        linkval: "",
        frameType: "",
        count: 0,
    });

    return (
        <GlobalStateContext.Provider value={{ globalSelectedCard, setGlobalSelectedCard}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);