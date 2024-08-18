import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center mb-4">About Us</h1>
        <p className="text-justify mt-2">
             At ShopEase, we are passionate about providing you with the perfect blend of style, precision, and craftsmanship through our carefully curated collection of watches. Each timepiece in our collection is a testament to quality and elegance, designed to complement your unique personality and lifestyle.
            </p>
            <p className="text-justify mt-2">
            Our journey began with a simple belief: that a watch is more than just a timekeeping device; it’s a statement of individuality. Inspired by this philosophy, we offer a diverse range of watches that cater to every occasion, whether you're looking for a timeless classic, a modern masterpiece, or a sporty companion. With a commitment to excellence, we ensure that every watch you purchase from ShopEase is a symbol of reliability and sophistication.
            </p>
        </div>
      </div>
    </Layout>
  );
};


Layout.defaultProps ={
  title :"ShopEase",
  description:"Ayurvedic Products Website",
  keyword:"MERN Stack",
  author:"Sanit"
}

export default About;