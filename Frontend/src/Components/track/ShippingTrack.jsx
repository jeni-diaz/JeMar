import { useState, useRef } from "react";
import { Form } from 'react-bootstrap';

import { initialErrors } from "./ShippingTrack.data";

import CustomAlert from "../alert/CustomAlert";
import Background from "../background/Background";
import BackArrow from "../back/BackArrow";
import CustomCard from '../card/CustomCard';

import '../style/Styles.css';

function ShippingTrack() {

    const [trackingNumber, setTrackingNumber] = useState("");
    const [errors, setErrors] = useState(initialErrors);
    const [alertData, setAlertData] = useState({
        show: false,
        message: "",
        type: "info",
    });

    const trackingNumberRef = useRef(null);

    const handleTrackingNumberChange = (event) => {
        setTrackingNumber(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, trackingNumber: false }));
    }

    const validateTrackingNumber = (num) => /^\d{20}$/.test(num);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateTrackingNumber(trackingNumber)) {
            setErrors((prevErrors) => ({ ...prevErrors, trackingNumber: true }));
            trackingNumberRef.current.focus();
            return;
        }
    };

    setErrors(initialErrors);
    return (
        <>
            <Background image="/images/ImageTrack.png">
                <BackArrow />
                <CustomAlert
                    show={alertData.show}
                    message={alertData.message}
                    type={alertData.type}
                    onClose={() => setAlertData({ ...alertData, show: false })}
                />
                <CustomCard
                    title="RASTREAR ENVÍO"
                    buttonText="Rastrear"
                >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="inputs-group mb-3 w-bold ">
                            <Form.Label>Número de seguimiento:</Form.Label>
                            <Form.Control
                                ref={trackingNumberRef}
                                className={`custom-input ${errors.trackingNumber}`}
                                type="number"
                                placeholder="Ej: 123456"
                                value={trackingNumber}
                                onChange={handleTrackingNumberChange}
                                autoComplete="trackingNumber"
                            />
                            {errors.trackingNumber && (
                                <p className="text-danger mt-1">Debe ser un número de 20 dígitos</p>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit" className="custom-button w-50">
                                Continuar
                            </Button>
                        </div>
                    </Form>
                </CustomCard>
            </Background>
        </>
    );
}

export default ShippingTrack;