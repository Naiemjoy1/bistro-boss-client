import React, { useEffect, useState } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const populerItems = data.filter((item) => item.category === "popular");
        setMenu(populerItems);
      });
  }, []);

  return (
    <div>
      <section>
        <SectionTitle
          subHeading={"---Check it out---"}
          heading={"FROM OUR MENU"}
        ></SectionTitle>
        <div className="grid lg:grid-cols-2 gap-4 my-10 container mx-auto">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularMenu;
