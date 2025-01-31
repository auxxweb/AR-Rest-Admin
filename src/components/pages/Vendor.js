import React from "react";
const img = "../assets/images/startup.webp";

const Vendor = () => {
  return (
    <>
      <div className="bg-white shadow-md rounded-md h-auto w-60 mb-4 p-4 flex flex-col items-center justify-center">
        <img
          src={img}
          className="rounded-lg w-50 h-26 object-cover"
          alt="vendor image"
        />
        <div className="text-center text-sm">
          VEN002
          <br />
          <p>
            TastyBites Caterers specializes in providing gourmet catering
            services for weddings, corporate events, and private parties. Their
            menu includes a diverse range of cuisines, offering exceptional
            taste and presentation for every occasion.
          </p>
        </div>
      </div>
    </>
  );
};

export default Vendor;
