import '../style/Styles.css';

const CustomAlert = ({ show, onClose, message, imgUrl }) => {
  if (!show) return null;

  return (
    <div className="custom-alert-overlay d-flex justify-content-center align-items-center" onClick={onClose}>
      <div className="custom-alert-container d-flex align-items-center position-relative p-4 rounded" onClick={e => e.stopPropagation()}>
        <img src={imgUrl} alt="icon" className="custom-alert-image me-3" />
        <div>
          <p className="custom-alert-message mb-0">{message}</p>
        </div>
        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-2" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default CustomAlert;
