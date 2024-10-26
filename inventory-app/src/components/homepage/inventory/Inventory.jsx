import React, { useEffect, useState } from "react";
import "./inventory.css";
import { useGlobalState } from "../../../lib/globalState";

const Inventory = () => {
  const {
    globalInventoryList,
    setGlobalInventoryList,
    globalWishlist,
    setGlobalWishlist,
  } = useGlobalState();
  const [filteredInvCards, setFilteredInvCards] = useState([]);
  const [filteredWishCards, setFilteredWishCards] = useState([]);
  const [listsSearchInput, setListsSearchInput] = useState("");
  const [invListCounts, setInvListCounts] = useState(
    globalInventoryList.map(() => "")
  );

  const [wishistCounts, setWishlistCounts] = useState(
    globalWishlist.map(() => "")
  );

  const handleInvListInputChange = (e, index) => {
    const newCounts = [...invListCounts];
    newCounts[index] = e.target.value;
    setInvListCounts(newCounts);
  };

  const handleInvListCardAdd = (card, inputCount) => {
    const globalIndex = globalInventoryList.findIndex((globalCard) => {
      return globalCard.name === card.name && globalCard.set === card.set;
    });

    if (globalIndex !== -1) {
      const updatedList = [...globalInventoryList];
      updatedList[globalIndex] = {
        ...globalInventoryList[globalIndex],
        count:
          Number(globalInventoryList[globalIndex].count) + Number(inputCount),
      };

      setGlobalInventoryList(updatedList);

      if (listsSearchInput.length > 2) {
        setFilteredInvCards(
          updatedList.filter((c) =>
            c.name.toLowerCase().includes(listsSearchInput.toLowerCase())
          )
        );
      }
    }
  };

  const handleInvListCardSubtract = (card, inputCount) => {
    const globalIndex = globalInventoryList.findIndex(
      (globalCard) =>
        globalCard.name === card.name && globalCard.set === card.set
    );

    if (globalIndex !== -1) {
      const updatedList = [...globalInventoryList];
      updatedList[globalIndex] = {
        ...globalInventoryList[globalIndex],
        count:
          Number(globalInventoryList[globalIndex].count) - Number(inputCount),
      };

      if (updatedList[globalIndex].count < 1) {
        updatedList.splice(globalIndex, 1);
      }

      setGlobalInventoryList(updatedList);

      if (listsSearchInput.length > 2) {
        setFilteredInvCards(
          updatedList.filter((c) =>
            c.name.toLowerCase().includes(listsSearchInput.toLowerCase())
          )
        );
      }
    }
  };

  const handleWishlistInputChange = (e, index) => {
    const newCounts = [...wishistCounts];
    newCounts[index] = e.target.value;
    setWishlistCounts(newCounts);
  };

  const handleWishlistCardAdd = (card, inputCount) => {
    const globalIndex = globalWishlist.findIndex((globalCard) => {
      return globalCard.name === card.name && globalCard.set === card.set;
    });

    if (globalIndex !== -1) {
      const updatedList = [...globalWishlist];
      updatedList[globalIndex] = {
        ...globalWishlist[globalIndex],
        count: Number(globalWishlist[globalIndex].count) + Number(inputCount),
      };

      setGlobalWishlist(updatedList);

      if (listsSearchInput.length > 2) {
        setFilteredWishCards(
          updatedList.filter((c) =>
            c.name.toLowerCase().includes(listsSearchInput.toLowerCase())
          )
        );
      }
    }
  };

  const handleWishlistCardSubtract = (card, inputCount) => {
    const globalIndex = globalWishlist.findIndex(
      (globalCard) =>
        globalCard.name === card.name && globalCard.set === card.set
    );

    if (globalIndex !== -1) {
      const updatedList = [...globalWishlist];
      updatedList[globalIndex] = {
        ...globalWishlist[globalIndex],
        count: Number(globalWishlist[globalIndex].count) - Number(inputCount),
      };

      if (updatedList[globalIndex].count < 1) {
        updatedList.splice(globalIndex, 1);
      }

      setGlobalWishlist(updatedList);

      if (listsSearchInput.length > 2) {
        setFilteredWishCards(
          updatedList.filter((c) =>
            c.name.toLowerCase().includes(listsSearchInput.toLowerCase())
          )
        );
      }
    }
  };

  return (
    <div className="inventoryModeComp">
      <div className="inventorySearch">
        <div className="formSearch">
          <input
            type="text"
            name="cardname"
            placeholder="Enter Card Name..."
            onChange={(e) => {
              const newSearchInput = e.target.value;
              setListsSearchInput(newSearchInput);

              if (newSearchInput === "") {
                setFilteredInvCards([]);
                setFilteredWishCards([]);
                console.log(filteredInvCards, filteredWishCards);
              } else if (newSearchInput.length > 2) {
                setFilteredInvCards(
                  globalInventoryList.filter((c) =>
                    c.name.toLowerCase().includes(newSearchInput.toLowerCase())
                  )
                );
                setFilteredWishCards(
                  globalWishlist.filter((c) =>
                    c.name.toLowerCase().includes(newSearchInput.toLowerCase())
                  )
                );
              }
            }}
          />
        </div>
      </div>
      <div className="searchListsSeparator"></div>
      <div className="lists">
        <div className="inventoryList">
          <h3>Inventory</h3>
          <div className="items">
            {filteredInvCards.length > 0
              ? filteredInvCards.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <p className="cardName">{card.name}</p>
                      {card.atk ? (
                        <>
                          <p>
                            {card.attribute ? `${card.attribute}/` : ""}
                            {card.race}{" "}
                            {card.level
                              ? card.frameType !== "xyz"
                                ? `Level ${card.level}`
                                : `Rank ${card.level}`
                              : ""}
                          </p>
                          <p>
                            {card.atk &&
                            card.def !== null &&
                            card.def !== undefined
                              ? `${card.atk}/${card.def}`
                              : `${card.atk}/Link-${card.linkval}`}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>{card.type}</p>
                        </>
                      )}
                    </div>
                    <div className="modifyCount">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          name="invCardCount"
                          placeholder="0"
                          value={
                            invListCounts[index] !== undefined
                              ? invListCounts[index]
                              : ""
                          }
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              handleInvListInputChange(e, index);
                            }
                          }}
                        />
                        <button
                          className="countAdd"
                          onClick={() =>
                            handleInvListCardAdd(
                              card,
                              invListCounts[index],
                              index
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="countSubtract"
                          onClick={() =>
                            handleInvListCardSubtract(
                              card,
                              invListCounts[index],
                              index
                            )
                          }
                        >
                          -
                        </button>
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">{card.code !== "" ? `(${card.code})` : ""}</span>
                    </div>
                  </div>
                ))
              : globalInventoryList.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <p className="cardName">{card.name}</p>
                      {card.atk ? (
                        <>
                          <p>
                            {card.attribute ? `${card.attribute}/` : ""}
                            {card.race}{" "}
                            {card.level
                              ? card.frameType !== "xyz"
                                ? `Level ${card.level}`
                                : `Rank ${card.level}`
                              : ""}
                          </p>
                          <p>
                            {card.atk &&
                            card.def !== null &&
                            card.def !== undefined
                              ? `${card.atk}/${card.def}`
                              : `${card.atk}/Link-${card.linkval}`}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>{card.type}</p>
                        </>
                      )}
                    </div>
                    <div className="modifyCount">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          name="invCardCount"
                          placeholder="0"
                          value={
                            invListCounts[index] !== undefined
                              ? invListCounts[index]
                              : ""
                          }
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              handleInvListInputChange(e, index);
                            }
                          }}
                        />
                        <button
                          className="countAdd"
                          onClick={() =>
                            handleInvListCardAdd(
                              card,
                              invListCounts[index],
                              index
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="countSubtract"
                          onClick={() =>
                            handleInvListCardSubtract(
                              card,
                              invListCounts[index],
                              index
                            )
                          }
                        >
                          -
                        </button>
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">{card.code !== "" ? `(${card.code})` : ""}</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="listsSeparator"></div>
        <div className="wishList">
          <h3>Wishlist</h3>
          <div className="items">
            {filteredWishCards.length > 0
              ? filteredWishCards.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <p className="cardName">{card.name}</p>
                      {card.atk ? (
                        <>
                          <p>
                            {card.attribute ? `${card.attribute}/` : ""}
                            {card.race}{" "}
                            {card.level
                              ? card.frameType !== "xyz"
                                ? `Level ${card.level}`
                                : `Rank ${card.level}`
                              : ""}
                          </p>
                          <p>
                            {card.atk &&
                            card.def !== null &&
                            card.def !== undefined
                              ? `${card.atk}/${card.def}`
                              : `${card.atk}/Link-${card.linkval}`}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>{card.type}</p>
                        </>
                      )}
                    </div>
                    <div className="modifyCount">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          placeholder="0"
                          value={
                            wishistCounts[index] !== undefined
                              ? wishistCounts[index]
                              : ""
                          }
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              handleWishlistInputChange(e, index);
                            }
                          }}
                        />
                        <button
                          className="countAdd"
                          onClick={() =>
                            handleWishlistCardAdd(
                              card,
                              wishistCounts[index],
                              index
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="countSubtract"
                          onClick={() =>
                            handleWishlistCardSubtract(
                              card,
                              wishistCounts[index],
                              index
                            )
                          }
                        >
                          -
                        </button>
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">{card.code !== "" ? `(${card.code})` : ""}</span>
                    </div>
                  </div>
                ))
              : globalWishlist.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <p className="cardName">{card.name}</p>
                      {card.atk ? (
                        <>
                          <p>
                            {card.attribute ? `${card.attribute}/` : ""}
                            {card.race}{" "}
                            {card.level
                              ? card.frameType !== "xyz"
                                ? `Level ${card.level}`
                                : `Rank ${card.level}`
                              : ""}
                          </p>
                          <p>
                            {card.atk &&
                            card.def !== null &&
                            card.def !== undefined
                              ? `${card.atk}/${card.def}`
                              : `${card.atk}/Link-${card.linkval}`}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>{card.type}</p>
                        </>
                      )}
                    </div>
                    <div className="modifyCount">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          placeholder="0"
                          value={
                            wishistCounts[index] !== undefined
                              ? wishistCounts[index]
                              : ""
                          }
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              handleWishlistInputChange(e, index);
                            }
                          }}
                        />
                        <button
                          className="countAdd"
                          onClick={() =>
                            handleWishlistCardAdd(
                              card,
                              wishistCounts[index],
                              index
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="countSubtract"
                          onClick={() =>
                            handleWishlistCardSubtract(
                              card,
                              wishistCounts[index],
                              index
                            )
                          }
                        >
                          -
                        </button>
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">{card.code !== "" ? `(${card.code})` : ""}</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
