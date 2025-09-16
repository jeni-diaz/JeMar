import { Form } from 'react-bootstrap';

import Background from '../background/Background';
import CustomCard from '../card/CustomCard';

import '../style/Styles.css';

const ContactForm = () => {
  return (
    <>
      <Background image="/images/ImageContact.jpg">
       
              <CustomCard
                title="HACE TU CONSULTA"
                buttonText="Enviar"
              >
                <Form.Group className="input-group mb-3 w-bold">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control className="custom-input" type="text" placeholder="Ingrese su Nombre" />
                </Form.Group>


                <Form.Group className="input-group mb-3 w-bold">
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control className="custom-input" type="text" placeholder="Ingrese su Apellido" />
                </Form.Group>

                <Form.Group className="input-group mb-3 w-bold">
                  <Form.Label>Correo Electrónico:</Form.Label>
                  <Form.Control className="custom-input" type="email" placeholder="abc@ejemplo.com" />
                </Form.Group>

                <Form.Group className="input-group mb-3 w-bold">
                  <Form.Label>Consulta:</Form.Label>
                  <Form.Control className="custom-input" as="textarea" placeholder="Escribe tu consulta aquí..." />
                </Form.Group>
              </CustomCard>

      </Background>
    </>
  );
}

export default ContactForm;
