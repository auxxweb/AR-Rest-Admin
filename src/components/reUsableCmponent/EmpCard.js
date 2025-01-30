import React from "react";
import GridView from "./GridView";
import TableView from "./TableView";

function EmpCard({ cardArray, isGrid, selectedDesignation, selectedRole }) {
  return (
    <>
      {isGrid ? (
        <GridView
          cardArray={cardArray}
          selectedRole={selectedRole}
          selectedDesignation={selectedDesignation}
          className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
        />
      ) : (
        <TableView
          selectedRole={selectedRole}
          selectedDesignation={selectedDesignation}
        />
      )}
    </>
  );
}

export default EmpCard;
