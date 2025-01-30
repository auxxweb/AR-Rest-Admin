import React from "react";

const FilterPopup = ({
  filterHeader = "Filter",
  isOpen,
  togglePopup,
  children,
}) => {
  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        className="flex bg-white text-gray-500 px-4 py-2 rounded-md"
        onClick={togglePopup}
      >
        Filter
        <img src="/icons/filter.svg" alt="filter" className="text-gray-500 ml-2 mt-1 w-5 h-5" />
      </button>

      {/* Modal */}
      {isOpen ? (
        <div className="fixed mt-2 bg-opacity-50 flex items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {filterHeader}
              </h2>
              <button
                className="text-gray-600 hover:text-gray-800 bg-gray-200 text-lg font-semibold rounded-full w-8 border-gray-600"
                onClick={togglePopup}
              >
                X
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FilterPopup;
