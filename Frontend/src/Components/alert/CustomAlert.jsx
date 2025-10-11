import { useEffect } from "react";
import RobotImage from "/Users/Pc/JeMar/Frontend/public/images/ImageRobot.png";
import "../style/Styles.css";

const CustomAlert = ({ show, onClose, message, type = "info", duration = 2000 }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor =
    type === "success"
      ? "#4CAF50"
      : type === "error"
      ? "#F44336"
      : type === "warning"
      ? "#FF9800"
      : "#2196F3";

  return (
    <div
      className="custom-alert-overlay position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
      onClick={onClose}
    >
      <div
        className="custom-alert-container d-flex align-items-center position-fixed top-0 end-0 m-2 p-3 rounded"
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()} 
      >
        <img src={RobotImage} alt="Robot" className="custom-alert-image p-1" />
        <div>
          <p className="custom-alert-message fs-5 mb-0 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
