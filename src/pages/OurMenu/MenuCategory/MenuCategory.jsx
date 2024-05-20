import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="container mx-auto pt-8">
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid lg:grid-cols-2 gap-8 my-10  mt-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/shop/${title}`}>
        <button className="btn btn-primary">Order Now</button>
      </Link>
    </div>
  );
};

export default MenuCategory;
