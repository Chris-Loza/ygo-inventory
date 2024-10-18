import React, { useEffect, useRef, useState } from "react";
import "./inventory.css";

const Inventory = (invCards) => {
  const [inventoryList, setInventoryList] = useState(
    invCards.inventoryList || []
  );
  const [wishList, setWishList] = useState(invCards.wishlist || []);
  const [filteredInvCards, setFilteredInvCards] = useState([]);
  const [filteredWishCards, setFilteredWishCards] = useState([]);
  const [listsSearchInput, setListsSearchInput] = useState("");

  useEffect(() => {
    setInventoryList(invCards.inventoryList);
    setWishList(invCards.wishlist);
  }, [invCards.inventoryList, invCards.wishlist]);

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
              } else if (newSearchInput.length > 2) {
                setFilteredInvCards(
                  invCards.inventoryList.filter((c) =>
                    c.name.toLowerCase().includes(newSearchInput.toLowerCase())
                  )
                );
                setFilteredWishCards(
                  invCards.wishlist.filter((c) =>
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
                      <span>{card.name}</span>
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
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">{`(${card.code})`}</span>
                    </div>
                  </div>
                ))
              : inventoryList.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <span>{card.name}</span>
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
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">{`(${card.code})`}</span>
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
                      <span>{card.name}</span>
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
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">{`(${card.code})`}</span>
                    </div>
                  </div>
                ))
              : wishList.map((card, index) => (
                  <div className="item" key={index}>
                    <img src={card.imageURL} alt="Card Image" />
                    <div className="itemInfo">
                      <span>{card.name}</span>
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
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">{`(${card.code})`}</span>
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
