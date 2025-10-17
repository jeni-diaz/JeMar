import { useEffect, useState } from "react";
import {Row, Col } from "react-bootstrap";

import Background from "../background/Background";

import BackArrow from "../back/BackArrow";
import ShippingQuote from "./quote/ShippingQuote";
import DeleteShipping from "./delete/DeleteShipping";
import ShippingTrack from "./track/ShippingTrack"

import "../style/Styles.css";


const Shipments = () => {
  return (
    <Background image="/images/ImageQuote.png">
      <BackArrow />
      <div className="color-bacground d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Row>
          <Col>
            <ShippingQuote/>
          </Col>

          <Col>
           <DeleteShipping/>
          </Col>

          <Col>
          < ShippingTrack/>
          </Col>
        </Row>
      </div>
    </Background>
  );
};

export default Shipments;
