const Background = ({ image, children }) => {
  return (
    <div className="bg-image in-vh-100" style={{ backgroundImage: `url(${image})` }}>
      {children}
    </div>
  );
};

export default Background;
