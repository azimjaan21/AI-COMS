import React from "react";
import CardGrid from "../components/CardGrid";
import "../assets/components/_home.scss"; 

const Home = () => {
  return (
    <div className="layout">
      <div className="main-content">
        <CardGrid />
      </div>
    </div>
  );
};

export default Home;
