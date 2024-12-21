import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            Our team of dedicated doctors are committed to providing exceptional medical care to our patients. With years of experience and a passion for healing, they strive to deliver personalized attention and compassionate service to every individual who walks through our doors. From routine check-ups to complex medical procedures, our doctors are equipped with the latest knowledge and technology to ensure the best possible outcomes. Their unwavering commitment to excellence has earned us a reputation as a trusted and respected healthcare provider in the community
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
