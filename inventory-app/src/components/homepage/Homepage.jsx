import React, { useState } from "react";
import "./homepage.css";
import UserInfo from "./user/UserInfo";
import Inventory from "./inventory/Inventory";
import { cardList } from "../../lib/cardList";

const Homepage = () => {
  const [inventoryMode, setInventoryMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    set: [],
    rarity: [],
    code: [],
    imageURL: "",
    description: "",
    attribute: "",
    type: "",
    level: "",
    atk: "",
    def: "",
  });

  const handleSwitch = () => {
    setInventoryMode(!inventoryMode);
  };

  const basicForm = (e) => {
    e.preventDefault();
  };

  const handleSets = (card) => {
    const newCard = {
      name: card.name,
      set: card.card_sets.map((set) => set.set_name),
      rarity: card.card_sets.map((set) => set.set_rarity),
      code: card.card_sets.map((set) => set.set_code),
      imageURL: card.card_images[0].image_url,
      description: card.desc,
      attribute: card.attribute,
      race: card.race,
      type: card.humanReadableCardType,
      level: card.level,
      atk: card.atk,
      def: card.def,
    };
    setSelectedCard(newCard);
    console.log(newCard);
  };
  console.log(selectedCard);

  return (
    <div className="homepage">
      <div className="toggleSwitch">
        <input type="checkbox" name="inventory" onClick={handleSwitch} />
      </div>
      {inventoryMode ? (
        <div className="inventoryMode">
          <Inventory />
        </div>
      ) : (
        <div className="cardDetails">
          <div className="cardImage">
            <div className="pictureContainer">
              <img
                src={
                  selectedCard.imageURL ||
                  "../../../images/MathmechCircular.png"
                }
                alt="card image"
              />
            </div>
          </div>
          <div className="cardDetailsExpanded">
            {selectedCard.name && (
              <div className="description">
                <div className="header">
                  <h3>
                    {selectedCard.name} - {selectedCard.set} (
                    {selectedCard.code})
                  </h3>
                  <p>{selectedCard.set}</p>
                </div>
                <div className="cardDescription">
                  <h3>Card Details</h3>
                  <p className="effect">{selectedCard.description}</p>
                  <div className="cardAttributes">
                    <p>
                      <b>Number:</b> {selectedCard.code}
                    </p>
                    <p>
                      <b>Rarity:</b> {selectedCard.rarity}
                    </p>
                    <p>
                      <b>Attribute, Monster Type, Card Type:</b>{" "}
                      {selectedCard.attribute}, {selectedCard.race},{" "}
                      {selectedCard.type}
                    </p>
                    <p>
                      <b>Level:</b> {selectedCard.level}
                    </p>
                    <p>
                      <b>A/D:</b> {selectedCard.atk}/{selectedCard.def}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mainSeparator"></div>
      <div className="details">
        <div className="utilities">
          <div className="cardSearch">
            <input
              type="text"
              name="cardname"
              placeholder="Enter Card Name..."
              onChange={(e) => {
                const newSearchInput = e.target.value;
                setSearchInput(newSearchInput);

                if (newSearchInput === "") {
                  setFilteredCards([]);
                } else if (newSearchInput.length > 1) {
                  setFilteredCards(
                    cardList.data.filter((c) =>
                      c.name
                        .toLowerCase()
                        .includes(newSearchInput.toLowerCase())
                    )
                  );
                }
              }}
            />
            <div className="searchResults">
              {filteredCards.map((card) => (
                <div
                  className="result"
                  key={card.id}
                  onClick={() => handleSets(card)}
                >
                  <img
                    src={card.card_images[0].image_url_small}
                    alt="result image"
                  />
                  <div className="cardInfo">
                    <span>{card.name}</span>
                    <p>
                      {card.attribute}/{card.race} Level {card.level}
                    </p>
                    <p>
                      {card.atk}/{card.def}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="separator"></div>
          <h3>{selectedCard.name}</h3>
          <div className="inventory">
            <div className="sets">
              {selectedCard.set.map((setName, index) => (
                <div className="resultSet" key={index}>
                  <div className="setInfo">
                    <p>{setName}</p>
                    <div className="set">
                      <span>
                        {selectedCard.rarity[index]} ({selectedCard.code[index]}
                        )
                      </span>
                    </div>
                  </div>
                  <form onSubmit={basicForm}>
                    <input type="text" name="cardCount" placeholder="0" />
                    <button>+</button>
                    <button className="removeButton">-</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="userDetails">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
