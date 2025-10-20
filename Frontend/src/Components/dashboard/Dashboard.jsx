import { useState, useContext } from "react";
import { Container } from "react-bootstrap";

import { AuthContext } from "../authContext/AuthContext";

import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import Shipments from "./shipments/Shipments";


const Dashboard = () => {
  
  return (
    <>
      <Background image="/images/ImageDashboard.png">
        <BackArrow />
        <Container className="d-flex align-items-center min-vh-100 flex-column">
          <Shipments/>
        </Container >
      </Background>
    </>
  );
};

export default Dashboard;