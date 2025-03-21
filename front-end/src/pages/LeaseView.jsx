import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import LeaseAgreementPdf from "../../lib/LeaseAgreementPdf";

function LeaseView() {
  const leaseData = {
    tenantName: "John Doe",
    landlordName: "Jane Smith",
    propertyAddress: "123 Main St, Anytown, USA",
    rentAmount: "1500",
    leaseStartDate: "January 1, 2023",
    leaseEndDate: "December 31, 2025",
  };

  return (
    <div className="p-4 rounded-md">
      <div className="h-[600px] w-[90%] mx-auto border border-gray-300 rounded-md overflow-hidden ">
        <PDFViewer
          className="w-full h-full "
          style={{ border: "none", backgroundColor: "white" }}
        >
          <LeaseAgreementPdf {...leaseData} />
        </PDFViewer>
      </div>

      <div className="mt-4 flex justify-center">
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 200,
            height: 80,
            className: "border-2 border-green-500 bg-green-100 rounded-md",
          }}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="bg-blue-600 text-white"
        >
          Email Lease
        </Button>
      </div>
    </div>
  );
}

export default LeaseView;
