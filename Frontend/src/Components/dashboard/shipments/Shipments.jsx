import { Container } from "react-bootstrap";

const Shipments = () => {

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
                        title="BUSCAR ENVIOS"
                        buttonText="Buscar"
                        buttonType="submit">
                        <Form.Group className="inputs-group mb-3 fw-bold">
                            <Form.Label>Número envío:</Form.Label>
                            <Form.Control
                                className="custom-input"
                                type="text"
                                value={shipmentId}
                                onChange={(e) => setShipmentId(e.target.value)}
                                placeholder="Ej: 3"
                            />
                        </Form.Group>
                    </CustomCard>
                </Form>
            </div>
        </>
    );
};

export default Shipments;