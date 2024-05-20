import { Helmet, HelmetProvider } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import PopularMenu from "../Home/PopularMenu";

const OurMenu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Cover img={menuImg} title={"Our Menu"}></Cover>
      <PopularMenu></PopularMenu>
    </div>
  );
};

export default OurMenu;
