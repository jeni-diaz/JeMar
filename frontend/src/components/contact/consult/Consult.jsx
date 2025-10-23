import { Form } from "react-bootstrap";
import { useRef, useState } from "react";

import { initialErrors } from "./Consult.data";

import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";

const Consult = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState(initialErrors);
    const [alertData, setAlertData] = useState({
        show: false,
        message: "",
        type: "info",
    });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateMessage = (msg) => msg.trim() !== "";

    const handleNameChange = (event) => {
        setName(event.target.value);
        setErrors((prev) => ({ ...prev, name: false }));
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors((prev) => ({ ...prev, email: false }));
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        setErrors((prev) => ({ ...prev, message: false }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setErrors((prev) => ({ ...prev, name: true }));
            nameRef.current.focus();
            return;
        }

        if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: true }));
            emailRef.current.focus();
            return;
        }

        if (!validateMessage(message)) {
            setErrors((prev) => ({ ...prev, message: true }));
            messageRef.current.focus();
            return;
        }

        setAlertData({
            show: true,
            message: "Consulta enviada",
            type: "success",
        });

        setName("");
        setEmail("");
        setMessage("");
        setErrors(initialErrors);
    };

    return (
        <>
            <div className="color-bacground d-flex justify-content-center align-items-center flex-column">
                <CustomAlert
                    show={alertData.show}
                    message={alertData.message}
                    type={alertData.type}
                    onClose={() => setAlertData({ ...alertData, show: false })}
                />
                <Form onSubmit={handleSubmit}>
                    <CustomCard
                        title="HACE TU CONSULTA"
                        buttonText="Enviar"
                        buttonType="submit">
                        <Form.Group className="inputs-group mb-3 w-bold">
                            <Form.Label>Nombre y Apellido:</Form.Label>
                            <Form.Control
                                ref={nameRef}
                                className={`custom-input ${errors.name}`}
                                type="text"
                                placeholder="Ingrese su nombre completo"
                                value={name}
                                onChange={handleNameChange}
                            />
                            {errors.name && (
                                <p className="text-danger mt-1">
                                    Debe ingresar un nombre y apellido
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="inputs-group mb-3 w-bold">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <Form.Control
                                ref={emailRef}
                                className={`custom-input ${errors.email}`}
                                type="email"
                                placeholder="abc@ejemplo.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && (
                                <p className="text-danger mt-1">
                                    Debe ingresar un correo electrónico válido
                                </p>
                            )}
                        </Form.Group>

                        <Form.Group className="inputs-group mb-3 w-bold">
                            <Form.Label>Consulta:</Form.Label>
                            <Form.Control
                                ref={messageRef}
                                className={`custom-input ${errors.message}`}
                                as="textarea"
                                rows={5}
                                placeholder="Escribe tu consulta aquí..."
                                value={message}
                                onChange={handleMessageChange}
                            />
                            {errors.message && (
                                <p className="text-danger mt-1">Debe ingresar un mensaje</p>
                            )}
                        </Form.Group>
                    </CustomCard>
                </Form>
            </div>
        </>
    );
};

export default Consult;

