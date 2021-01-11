import React from "react";
import Card from "./Card";

function CardList({ cards = [], apply = () => null }) {
  return cards.length ? (
    <div className="CardList">
      {cards.map((cardData, idx) => (
        <Card
          item={cardData}
          key={idx}
          idx={idx}
          apply={apply}
        />
      ))}
    </div>
  ) : (
    <p className="lead">Sorry, no results were found!</p>
  );
}

export default CardList;