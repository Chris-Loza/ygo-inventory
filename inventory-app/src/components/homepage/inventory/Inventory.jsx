import React, { useEffect, useRef, useState } from "react";
import "./inventory.css";
import { useGlobalState } from "../../../lib/globalState";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { toast } from "react-toastify";

const Inventory = () => {
  const {
    globalInventoryList,
    setGlobalInventoryList,
    globalWishlist,
    setGlobalWishlist,
    globalManualEntryCard,
    setGlobalManualEntryCard,
    wishlistToggle,
    setWishlistToggle,
    globalManualEntryCardImage,
    setGlobalManualEntryCardImage,
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

    if (inputCount !== "" && !isNaN(inputCount)) {
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
    }
  };

  const handleInvListCardSubtract = (card, inputCount) => {
    const globalIndex = globalInventoryList.findIndex(
      (globalCard) =>
        globalCard.name === card.name && globalCard.set === card.set
    );

    if (inputCount !== "" && !isNaN(inputCount)) {
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

    if (inputCount !== "" && !isNaN(inputCount)) {
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
    }
  };

  const handleWishlistCardSubtract = (card, inputCount) => {
    const globalIndex = globalWishlist.findIndex(
      (globalCard) =>
        globalCard.name === card.name && globalCard.set === card.set
    );
    if (inputCount !== "" && !isNaN(inputCount)) {
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
    }
  };

  const [tabNumber, setTabNumber] = useState(1);
  const handleTabNumber = (num) => {
    setTabNumber(num);
  };

  const [prevWishlistToggle, setPrevWishlistToggle] = useState(null);
  const [modal, setModal] = useState(false);
  const modalRef = useRef();
  const handleModal = () => {
    setPrevWishlistToggle(wishlistToggle);
    setModal(true);
    if (wishlistToggle) {
      setWishlistToggle(false);
    }
  };

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setModal(false);
      console.log(wishlistToggle);
    } else {
      setModal(false);
    }
    setWishlistToggle(prevWishlistToggle);
  };

  const handleCardImage = (e) => {
    if (e.target.files[0]) {
      setGlobalManualEntryCardImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleManualCardEntry = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const {
      cardName,
      setName,
      cardRarity,
      setCode,
      cardDesc,
      attribute,
      race,
      cardType,
      monsterLevel,
      monsterAtk,
      monsterDef,
      linkVal,
      cardCount,
    } = Object.fromEntries(formData);

    const newCard = {
      name: cardName,
      set: setName,
      rarity: cardRarity,
      code: setCode,
      imageURL:
        globalManualEntryCardImage.url !== ""
          ? globalManualEntryCardImage.url
          : "../../../../images/backOfYGOCard.jpg",
      description: cardDesc,
      attribute: attribute,
      race: race,
      type: cardType,
      level: monsterLevel,
      atk: monsterAtk,
      def: monsterDef,
      linkval: linkVal,
      count: cardCount !== "" ? cardCount : 0,
    };

    setGlobalManualEntryCard(newCard);
  };

  useEffect(() => {
    if (globalManualEntryCard.name !== "") {
      const existingInvCardIndex = globalInventoryList.findIndex(
        (card) =>
          card.name === globalManualEntryCard.name &&
          card.set === globalManualEntryCard.set
      );

      const existingWishCardIndex = globalWishlist.findIndex(
        (card) =>
          card.name === globalManualEntryCard.name &&
          card.set === globalManualEntryCard.set
      );

      if (!wishlistToggle) {
        if (existingInvCardIndex !== -1) {
          const updatedInvCards = [...globalInventoryList];
          updatedInvCards[existingInvCardIndex].count += Number(
            globalManualEntryCard.count
          );
          setGlobalInventoryList(updatedInvCards);
        } else {
          setGlobalInventoryList((prev) => [...prev, globalManualEntryCard]);
        }
      } else {
        if (existingWishCardIndex !== -1) {
          const updatedWishCards = [...globalWishlist];
          updatedWishCards[existingWishCardIndex].count += Number(
            globalManualEntryCard.count
          );
          setGlobalWishlist(updatedWishCards);
        } else {
          setGlobalWishlist((prev) => [...prev, globalManualEntryCard]);
        }
      }
    }
    console.log(globalManualEntryCard);
  }, [globalManualEntryCard]);

  const handleModalWishlistSwitch = () => {
    setWishlistToggle(!wishlistToggle);
  };

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const unSub = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const inventoryData = docSnap.data().inventory || [];
          const wishlistData = docSnap.data().wishlist || [];
          setGlobalInventoryList(inventoryData);
          setGlobalWishlist(wishlistData);
        } else {
          toast.error("No Document found!");
        }
      },
      (error) => {
        toast.error(error.message);
      }
    );
    return () => unSub();
  }, []);

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
          <div className="globalManualEntry">
            <button className="modalButton" onClick={handleModal}>
              Card Entry
            </button>
            {modal && (
              <div
                className="modalContainer"
                onClick={closeModal}
                ref={modalRef}
              >
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modalWishlistSwitch">
                    <input
                      type="checkbox"
                      name="modalWishListToggle"
                      onClick={handleModalWishlistSwitch}
                    />
                  </div>
                  <img
                    onClick={closeModal}
                    className="closeIcon"
                    src="../../../../images/CloseIcon.svg"
                    alt="close button"
                  />
                  <form onSubmit={handleManualCardEntry}>
                    <label htmlFor="file">
                      <img
                        src={
                          globalManualEntryCardImage.url ||
                          "/images/AddPhotoAlternateNoFill.svg"
                        }
                        alt="card image"
                      />
                      Upload an Image
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleCardImage}
                      name="cardImage"
                    />
                    <div className="manualCardInfo">
                      <div className="div1">
                        <input
                          type="text"
                          placeholder="Card Name"
                          name="cardName"
                        />
                        <input
                          type="text"
                          placeholder="Set Name"
                          name="setName"
                        />
                        <input
                          type="text"
                          placeholder="Rarity"
                          name="cardRarity"
                        />
                        <input
                          type="text"
                          placeholder="Set Code"
                          name="setCode"
                        />
                      </div>
                      <div className="div2">
                        <input
                          type="text"
                          placeholder="Card Type"
                          name="cardType"
                        />
                        <input
                          type="text"
                          placeholder="Card Effect (Optional)"
                          name="cardDesc"
                        />
                        <input
                          type="text"
                          placeholder="Attribute"
                          name="attribute"
                        />
                        <input
                          type="text"
                          placeholder="Monster Type"
                          name="race"
                        />
                        <input
                          type="text"
                          placeholder="Count"
                          name="cardCount"
                        />
                      </div>
                      <div className="div3">
                        <input
                          type="text"
                          placeholder="Monster Level"
                          name="monsterLevel"
                        />
                        <input
                          type="text"
                          placeholder="Atk"
                          name="monsterAtk"
                        />
                        <input
                          type="text"
                          placeholder="Def"
                          name="monsterDef"
                        />
                        <input
                          type="text"
                          placeholder="Link Rating"
                          name="linkVal"
                        />
                      </div>
                    </div>
                    <div className="buttons">
                      <button>Enter</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="searchListsSeparator"></div>
      <div className="lists">
        {/* Before Tabs */}
        <div className="tabHeaders">
          <div
            className={tabNumber === 1 ? "invTab" : "invTab nonActive"}
            onClick={() => handleTabNumber(1)}
          >
            Inventory
          </div>
          <div
            className={tabNumber === 2 ? "wishTab currentTab" : "wishTab"}
            onClick={() => handleTabNumber(2)}
          >
            Wishlist
          </div>
        </div>
        <div
          className={
            tabNumber === 1 ? "inventoryList tabs active" : "inventoryList tabs"
          }
        >
          <h3 className="respHide">Inventory</h3>
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
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">
                        {card.code !== "" ? `(${card.code})` : ""}
                      </span>
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
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Count: {card.count}
                        <br />
                      </span>
                      <span className="ownedSetCode">
                        {card.code !== "" ? `(${card.code})` : ""}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="listsSeparator"></div>
        <div
          className={tabNumber === 2 ? "wishList tabs active" : "wishList tabs"}
        >
          <h3 className="respHide">Wishlist</h3>
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
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">
                        {card.code !== "" ? `(${card.code})` : ""}
                      </span>
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
                      </form>
                    </div>
                    <div className="owned">
                      <span>
                        Want: {card.count} <br />
                      </span>
                      <span className="ownedSetCode">
                        {card.code !== "" ? `(${card.code})` : ""}
                      </span>
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
