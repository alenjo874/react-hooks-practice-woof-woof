import React, { useState, useEffect } from "react";
import DogCard from "./DogCard";
import DogsContainer from "./DogsContainer";

function App() {
  const [dogsArr, setDogsArr] = useState([]);
  const [dogCardInfo, setDogCardInfo] = useState([]);
  const [render, setRender] = useState(false);
  const [filterDog, setFilterDog] = useState(false);
  const [filterDogArr, setfilterDogArr] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((res) => res.json())
      .then((data) => setDogsArr(data));
  }, []);

  const displayDogHeader = dogsArr.map((dog) => {
    return (
      <DogsContainer key={dog.id} {...dog} displayDogCard={displayDogCard} />
    );
  });

  function displayDogCard(name) {
    const dogCardArr = dogsArr.filter((dog) => dog.name === name);
    setDogCardInfo(dogCardArr);
  }

  function changeGoodDog(id, goodDog) {
    const dogObj = dogsArr.find((dog) => dog.id.toString() === id);
    fetch(`http://localhost:3001/pups/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...dogObj, isGoodDog: goodDog }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setRender(!render);
  }

  const showDogCard = dogCardInfo.map((dog) => {
    return (
      <DogCard {...dog} changeGoodDog={changeGoodDog} key={dog.id + dog.name} />
    );
  });

  const displayGoodDogs = filterDogArr.map((dog) => {
    return (
      <DogsContainer key={dog.id} {...dog} displayDogCard={displayDogCard} />
    );
  });

  function handleFilter() {
    setFilterDog(!filterDog);
    const filterGoodDogs = dogsArr.filter((dog) => dog.isGoodDog);
    setfilterDogArr(filterGoodDogs)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>
          Filter good dogs: {filterDog ? "ON" : "OFF"}
        </button>
      </div>
      <div id="dog-bar">{filterDog ? displayGoodDogs : displayDogHeader}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">{showDogCard}</div>
      </div>
    </div>
  );
}

export default App;
