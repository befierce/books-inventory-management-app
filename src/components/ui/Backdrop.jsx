const Backdrop = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={onClick}
    />
  );
};


export default Backdrop;