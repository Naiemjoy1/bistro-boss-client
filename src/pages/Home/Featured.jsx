import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div>
      <div className="featured-item bg-fixed  p-16">
        <SectionTitle
          subHeading={"---Check it out---"}
          heading={"FROM OUR MENU"}
        ></SectionTitle>
        <section className="flex justify-center items-center bg-slate-500 bg-opacity-40 py-8 px-16 gap-4">
          <div>
            <img src={featuredImg} alt="" />
          </div>
          <div className=" text-white space-y-5">
            <p>Aug 20, 2029</p>
            <p>where can i get some?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              rem exercitationem eius magni dolore ea, corrupti recusandae
              voluptates officiis magnam corporis modi numquam, quas pariatur
              blanditiis ratione repudiandae, velit asperiores! Et inventore
              nobis, nemo ut perferendis expedita laborum fuga nulla, ex eius
              qui, ab quam deleniti blanditiis nisi ipsa cumque!
            </p>
            <button className="btn btn-secondary">order not</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Featured;
