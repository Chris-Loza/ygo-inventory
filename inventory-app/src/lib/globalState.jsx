import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
    // const [globalSelectedCard, setGlobalSelectedCard] = useState({
    //     name: "Global Card",
    //     set: [],
    //     rarity: [],
    //     code: [],
    //     imageURL: "",
    //     description: "",
    //     attribute: "",
    //     race: "",
    //     type: "",
    //     level: "",
    //     atk: "",
    //     def: "",
    //     linkval: "",
    //     frameType: "",
    //     count: 0,
    // });

    const [globalInventoryList, setGlobalInventoryList] = useState([]);
    const [globalWishlist, setGlobalWishlist] = useState([]);

    return (
        <GlobalStateContext.Provider value={{  globalInventoryList, setGlobalInventoryList, globalWishlist, setGlobalWishlist}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);