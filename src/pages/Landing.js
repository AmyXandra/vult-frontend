import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroImage from "../assets/hero-illustration.svg";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#000020] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex glass p-12 mt-20 items-center">
          <div className="text-white max-w-[600px] mb-10">
            <h1 className="text-6xl font-bold mb-8 mt-20">
              Take Control of Your Family's Future
            </h1>
            <p className="text-lg">
              We help ypu preserve your digital assets and make sure gets passed
              on from one generation to the next.
            </p>
            <button
              className="mt-16 h-14 text-lg font-medium px-12 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
              onClick={() => navigate("/get-started")}
            >
              Get Started
            </button>
          </div>
          <div>
            <img src={HeroImage} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}
