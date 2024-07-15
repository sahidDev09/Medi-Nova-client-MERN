import Lottie from "lottie-react";
import lottieDash from '../assets/dashanim.json'

const WelcomeDash = () => {
  return <div>

    
    <div className=" md:w-[70%] w-full mx-auto md:-mt-28 mt-24">
        <Lottie animationData={lottieDash}></Lottie>
      </div>
      <h1 className=" text-5xl font-bold uppercase text-center text-blue-400">DASHBOARD</h1>

  </div>;
};

export default WelcomeDash;
