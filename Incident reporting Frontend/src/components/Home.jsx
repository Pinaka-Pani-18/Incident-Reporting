import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

  return (
    <div className=" h-[33rem] flex items-center justify-center">
      <div className=" w-full p-8">
        <header className="text-center">
          <p className="text-[4rem] font-bold ">Welcome To,</p>
          <h1 className="text-[5rem] font-bold text-blue-700">
            Aravind Eye Care Incident Reporting Application
          </h1>
        </header>
      </div>
    </div>
  );
};

export default Home;
