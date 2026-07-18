const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1050,
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="spinner-border text-primary"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
