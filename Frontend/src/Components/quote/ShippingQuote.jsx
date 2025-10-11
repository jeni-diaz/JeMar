import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Background from "../background/Background";
import CustomCard from "../card/CustomCard";
import "../style/Styles.css";

const ShippingQuote = () => {
  const [tiposEnvio, setTiposEnvio] = useState([]);
  const [tipoEnvioId, setTipoEnvioId] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  useEffect(() => {
    fetch("/tipo_envio")
      .then((res) => res.json())
      .then((data) => {
        console.log("tipos cargados:", data);
        setTiposEnvio(data);
      })
      .catch((err) => console.error("Error cargando tipos de envío:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    let usuario_id = null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        usuario_id = payload.id;
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }

    const envio = {
      usuario_id,
      tipo_envio_id: tipoEnvioId,
      origen,
      destino,
    };

    try {
      const response = await fetch("/envios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(envio),
      });

      const data = await response.json();
      console.log("Envío creado:", data);
      alert("¡Cotización generada con éxito!");

      // Limpia el formulario
      setTipoEnvioId("");
      setOrigen("");
      setDestino("");
    } catch (error) {
      console.error("Error creando envío:", error);
      alert("Ocurrió un error al generar la cotización.");
    }
  };

  return (
    <Background image="/images/ImageQuote.jpg">
      <CustomCard title="COTIZAR ENVÍO" buttonText="Cotizar" onButtonClick={handleSubmit}>
        <Form>
          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Tipo de envío:</Form.Label>
            <Form.Select
              className="custom-input"
              value={tipoEnvioId}
              onChange={(e) => setTipoEnvioId(e.target.value)}
            >
              {tiposEnvio.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}{" "}
                  {/* Mostramos la descripción para que el usuario lo entienda */}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Origen:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ej: Rosario"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="inputs-group mb-3 w-bold">
            <Form.Label>Destino:</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Ej: Buenos Aires"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </Form.Group>
        </Form>
      </CustomCard>
    </Background>
  );
};

export default ShippingQuote;
