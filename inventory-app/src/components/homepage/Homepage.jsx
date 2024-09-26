import React from "react";
import "./homepage.css";
import UserInfo from "./user/UserInfo";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="cardDetails">Card Information</div>
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
    </div>
  );
};

export default Homepage;
