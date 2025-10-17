import Backdrop from "./Backdrop";

const Modal = ({ children, onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 pointer-events-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>


          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
