import React, { useState } from "react";

function DogCard({ id, name, image, isGoodDog, changeGoodDog }) {
  const [goodDog, setGoodDog] = useState(isGoodDog);
  function handleClick(e) {
    setGoodDog((prev) => !prev);
    changeGoodDog(e.target.id, goodDog);
  }

  return (
    <div className="#dog-summary-container">
      <div className="#dog-info">
        <img src={image} alt={name}></img>
        <h2>{name}</h2>
        <button onClick={handleClick} id={id}>
          {goodDog ? "Good Dog!" : "Bad Dog!"}
        </button>
      </div>
    </div>
  );
}

export default DogCard;
