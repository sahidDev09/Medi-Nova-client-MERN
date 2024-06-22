import Lottie from "lottie-react";

import lottieMedical from "../../assets/medical.json";

const About = () => {
  return (
    <div className="lg:m-10 grid md:grid-cols-1 lg:grid-cols-2 items-center gap-4 m-2 md:m-0">
      <div className=" flex flex-col gap-4">
        <h1 className="lg:text-4xl md:2xl text-xl font-bold">About Medinova</h1>

        <h3 className="md:text-xl font-semibold">Why choose Us ? </h3>
        <div>
          <ul className="list-disc ml-8">
            <li>Advanced Technolog</li>
            <li>Experienced Team</li>
            <li>Comprehensive Services</li>
            <li>Patient-Centered Care</li>
            <li>Timely Results</li>
          </ul>
        </div>

        <h1 className="text-xl font-semibold text-red-400">Our Story : </h1>
        <p className=" text-sm md:text-xl text-gray-500">
          <b>About Medinova</b> Welcome to Medinova Diagnostic Center, where
          your health and well-being are our top priorities. At Medinova, we are
          dedicated to providing high-quality diagnostic services with a
          patient-centered approach. Our state-of-the-art facility, combined
          with a team of highly skilled professionals, ensures that you receive
          accurate and timely results. Our Mission At Medinova, our mission is
          to offer reliable, efficient, and comprehensive diagnostic services to
          <b>our community</b>. We strive to be at the forefront of medical
          technology and innovation, providing our patients with the most
          advanced diagnostic solutions available. Our Vision We envision a
          future where healthcare is accessible, accurate, and compassionate.
          Medinova aims to set the standard in diagnostic excellence, fostering
          a healthier community through our commitment to quality and care.
        </p>
      </div>

      <div>
        <Lottie animationData={lottieMedical}></Lottie>
      </div>
    </div>
  );
};

export default About;
