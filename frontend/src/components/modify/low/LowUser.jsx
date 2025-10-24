import { Form } from "react-bootstrap";
import CustomCard from "../../card/CustomCard";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";


const LowUser = () => {





    return (
        <>
        <div className="d-flex justify-content-center align-items-center flex-column"> 
        
        <form>
            <CustomCard
            title="DESHABILITAR USUARIO"
            buttonText="Deshabilitar"
            buttonType="submit">
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Email del usuario:</Form.Label>
              <Form.Control
                className="custom-input"
                type="email"
                
                placeholder="usuario@ejemplo.com"
              />
            </Form.Group>
            
            <Form.Group className="inputs-group mb-3 fw-bold">
              <Form.Label>Estado de usuario:</Form.Label>
              <Form.Select
                className="custom-input"
                >
                <option value="">Seleccione un estado</option>
                <option value="activar">Activar</option>
                <option value="desactivar">Desactivar</option>
              </Form.Select>
            </Form.Group>
            </CustomCard>
        </form>

   
   
   
   </div>    
            
            

        
        
          </>  
    );
};


export default LowUser;