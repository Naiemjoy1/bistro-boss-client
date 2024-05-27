import { Helmet, HelmetProvider } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import PopularMenu from "../Home/PopularMenu";
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";

const OurMenu = () => {
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const drinks = menu.filter((item) => item.category === "drinks");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Cover img={menuImg} title={"Our Menu"}></Cover>
      {/* main cover  */}
      <SectionTitle
        subHeading={"------Don't miss------"}
        heading={"TODAY'S OFFER"}
      ></SectionTitle>
      {/* offerd menu items  */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu  */}
      <MenuCategory
        items={dessert}
        title="dessert"
        img={dessertImg}
      ></MenuCategory>
      <MenuCategory items={pizza} title="pizza" img={pizzaImg}></MenuCategory>
      <MenuCategory items={salad} title="salad" img={saladImg}></MenuCategory>
      <MenuCategory items={soup} title="soup" img={soupImg}></MenuCategory>
      <MenuCategory items={drinks} title="drinks" img={soupImg}></MenuCategory>
    </div>
  );
};

export default OurMenu;
