import React from "react";
import { MDBDataTable } from "mdbreact";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const printDocument = () => {
  const input = document.getElementById("divToPrint");
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
};
export default function BTable(props) {
  return (
    <>
      {/* <div class="row justify-content-between">
        <div class="col-4">
          <button
            onClick={printDocument}
            className="btn btn-sm btn-outline-success"
          >
            Download
          </button>
        </div>
      </div> */}
      <MDBDataTable
        id="divToPrint"
        className="text-dark black-text p-2 strong"
        scorllable
        responsive
        hover
        data={props.data}
      />
    </>
  );
}
