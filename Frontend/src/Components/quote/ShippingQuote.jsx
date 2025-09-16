import { Form } from 'react-bootstrap';

import Background from "../background/Background";
import CustomCard from '../card/CustomCard';

import '../style/Styles.css';

function ShippingQuote() {
    return (
        <>
            <Background image="/images/ImageQuote.jpg">
                <CustomCard
                    title="COTIZAR ENVÍO"
                    buttonText="Cotizar"
                >
                    <Form.Group className="imput-group mb-3 w-bold">
                        <Form.Label>Tipo de envío:</Form.Label>
                        <Form.Select className="custom-input">
                            <option value="">-</option>
                            <option value="standard">Envío estándar</option>
                            <option value="express">Envío exprés</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="imput-group mb-3 w-bold">
                        <Form.Label>Origen:</Form.Label>
                        <Form.Control className="custom-input" type="text" placeholder="Ej: Rosario" />
                    </Form.Group>

                    <Form.Group className="imput-group mb-3 w-bold">
                        <Form.Label>Destino:</Form.Label>
                        <Form.Control className="custom-input" type="text" placeholder="Ej: Buenos Aires" />
                    </Form.Group>
                </CustomCard>

            </Background>
        </>
    );
}

export default ShippingQuote;