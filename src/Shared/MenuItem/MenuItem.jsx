import React from "react";

const MenuItem = ({ item }) => {
  const { image, price, recipe, name, category } = item;
  return (
    <div className=" flex space-x-4">
      <img className="w-[120px]" src={image} alt="" />
      <div>
        <h3>{name}</h3>
        <p>{recipe}</p>
      </div>
      <p>{price}</p>
    </div>
  );
};

export default MenuItem;
