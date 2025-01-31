import React from 'react';

const Modal = ({ isVisible, onClose, children, modalHeader, isScrollable }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg lg:w-[500px] md:w-[100%] ${
          isScrollable ? 'overflow-y-auto max-h-[80vh]' : ''
        }`}
      >
        {/* Header Container */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{modalHeader}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 text-md font-label border-2 rounded-full w-13 px-2 border-[#808080] hover:border-[#F8BF40] hover:text-[#F8BF40]"
          >
          close  x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
