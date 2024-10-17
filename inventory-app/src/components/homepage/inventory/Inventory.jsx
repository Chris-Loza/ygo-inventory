import React, { useEffect, useRef, useState } from "react";
import "./inventory.css";

const Inventory = (invCards) => {
  const [modal, setModal] = useState(false);
  const modalRef = useRef();
  const [cardImage, setCardImage] = useState({
    file: null,
    url: "",
  });
  const [inventoryList, setInventoryList] = useState(
    invCards.inventoryList || []
  );

  useEffect(() => {
    setInventoryList(invCards.inventoryList);
  }, [invCards.inventoryList]);

  const handleModal = () => {
    setModal(!modal);
  };

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setModal(false);
    }
  };

  const handleCardImage = (e) => {
    if (e.target.files[0]) {
      setCardImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleCardEntry = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { cardName, attributes, stats, setNumber } =
      Object.fromEntries(formData);

    console.log(cardName, attributes, stats, setNumber);
  };

  return (
    <div className="inventoryModeComp">
      <div className="inventorySearch">
        <div className="formSearch">
          <input type="text" name="cardname" placeholder="Enter Card Name..." />
        </div>
        <div className="manualEntry">
          <button onClick={handleModal}>Card Entry</button>
          {modal && (
            <div className="modalContainer" onClick={closeModal} ref={modalRef}>
              <div className="modal">
                <img
                  onClick={handleModal}
                  className="closeIcon"
                  src="../../../../images/CloseIcon.svg"
                  alt="close button"
                />
                <form onSubmit={handleCardEntry}>
                  <label htmlFor="file">
                    <img
                      src={
                        cardImage.url || "/images/AddPhotoAlternateNoFill.svg"
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
                  />
                  <input type="text" placeholder="Card Name" name="cardName" />
                  <input
                    type="text"
                    placeholder="Attribute Monster Type/Card Type"
                    name="attributes"
                  />
                  <input type="text" placeholder="A/D" name="stats" />
                  <input
                    type="text"
                    placeholder="Set-Number"
                    name="setNumber"
                  />
                  <div className="buttons">
                    <button>Enter</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="searchListsSeparator"></div>
      <div className="lists">
        <div className="inventoryList">
          <h3>Inventory</h3>
          <div className="items">
            {inventoryList.map((card, index) => (
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
                        {card.atk && card.def !== null && card.def !== undefined
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
              </div>
            ))}
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
          </div>
        </div>
        <div className="listsSeparator"></div>
        <div className="wishList">
          <h3>Wishlist</h3>
          <div className="items">
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
            <div className="item">
              <img
                src="../../../../images/MathmechCircular.png"
                alt="Card Image"
              />
              <div className="itemInfo">
                <span>Mathmech Circular</span>
                <p>Light/Cyberse Level 4</p>
                <p>1500/1500</p>
              </div>
              <div className="owned">
                <span>Amount: 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
