import React from "react";

export default function Loader() {
  return (
    <div className="mt-5">
      <div className="d-flex m-auto justify-content-center">
        <h1>Loading Data...</h1>
      </div>
      <div className="d-flex m-auto justify-content-center">
        <div className="loaderAdmin"></div>
      </div>
    </div>
  );
}
