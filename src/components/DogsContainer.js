import React from "react";

function DogsContainer({ id, name, displayDogCard }) {
  function handleClick(e) {
    displayDogCard(e.target.id);
  }

  return (
    <span className="#dog-bar" onClick={handleClick} id={name}>
      {name}
    </span>
  );
}

export default DogsContainer;
