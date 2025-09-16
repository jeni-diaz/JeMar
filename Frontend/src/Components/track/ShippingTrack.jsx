import { Form } from 'react-bootstrap';

import Background from "../background/Background";
import CustomCard from '../card/CustomCard';

import '../style/Styles.css';

function ShippingTrack() {
    return (
        <>
            <Background image="/images/ImageTrack.jpg">
                <CustomCard
                    title="RASTREAR ENVÍO"
                    buttonText="Rastrear"
                >
                    <Form.Group className="imput-group mb-3 w-bold ">
                        <Form.Label>Número de seguimiento:</Form.Label>
                        <Form.Control className="custom-input" type="number" placeholder="Ej: 123456" />
                    </Form.Group>
                </CustomCard>
            </Background>
        </>
    );
}

export default ShippingTrack;