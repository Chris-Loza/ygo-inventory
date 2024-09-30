import React, { useState } from "react";
import "./homepage.css";
import UserInfo from "./user/UserInfo";
import Inventory from "./inventory/Inventory";

const Homepage = () => {
  const [inventoryMode, setInventoryMode] = useState(false);

  return (
    <div className="homepage">
      {inventoryMode ? (
        <Inventory />
      ) : (
        <>
          <div className="cardDetails">
            <div className="cardImage">
              <div className="pictureContainer">
                <img
                  src="../../../images/MathmechCircular.png"
                  alt="card image"
                />
              </div>
            </div>
            <div className="cardDetailsExpanded">
              <div className="description">
                <div className="header">
                  <h3>Mathmech Circular - Power of the Elements (POTE)</h3>
                  <p>Power of the Elements</p>
                </div>
                <div className="cardDescription">
                  <h3>Card Details</h3>
                  <p className="effect">
                    You can send 1 "Mathmech" monster, except "Mathmech
                    Circular", from your Deck to your GY; Special Summon this
                    card from your hand, also you can only attack with 1 monster
                    for the rest of this turn. If a "Mathmech" monster is Normal
                    or Special Summoned to your field while you control this
                    monster (except during the Damage Step): You can add 1
                    "Mathmech" Spell/Trap from your Deck to your hand. You can
                    only use each effect of "Mathmech Circular" once per turn.
                  </p>
                  <div className="cardAttributes">
                    <p>
                      <b>Number:</b> POTE-EN028
                    </p>
                    <p>
                      <b>Rarity:</b> Super Rare
                    </p>
                    <p>
                      <b>Attribute, Monster Type, Card Type:</b> LIGHT, Cyberse,
                      Effect Monster
                    </p>
                    <p>
                      <b>Level:</b> 4
                    </p>
                    <p>
                      <b>A/D:</b> 1500/1500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainSeparator"></div>
          <div className="details">
            <div className="utilities">
              <div className="cardSearch">
                <form>
                  <input
                    type="text"
                    name="cardname"
                    placeholder="Enter Card Name..."
                  />
                  <button>Search</button>
                </form>
                <div className="searchResults">
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                  <div className="result">
                    <img
                      src="../../../images/MathmechCircular.png"
                      alt="Card Image"
                    />
                    <div className="cardInfo">
                      <span>Mathmech Circular</span>
                      <p>Light/Cyberse Level 4</p>
                      <p>1500/1500</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="separator"></div>
              <h3>Mathmech Circular</h3>
              <div className="inventory">
                <div className="sets">
                  <div className="resultSet">
                    <div className="setInfo">
                      <p>Power of The Elements</p>
                      <div className="set">
                        <span>Quarter Century Super Rare (POTE-EN028)</span>
                      </div>
                    </div>
                    <form>
                      <input type="text" name="cardCount" placeholder="0" />
                      <button>+</button>
                      <button className="removeButton">-</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="userDetails">
              <UserInfo />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
