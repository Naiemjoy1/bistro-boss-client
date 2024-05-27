const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-3/12 mx-auto text-center space-y-4 my-8">
      <p className=" text-yellow-600">{subHeading}</p>
      <p className=" border-y-4 py-4">{heading}</p>
    </div>
  );
};

export default SectionTitle;
