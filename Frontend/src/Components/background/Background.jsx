const Background = ({ image, children }) => {
  return (
    <>
      <div
      className="min-vh-100"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Background;