import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";

import { useLocation } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import LeaseAgreementPdf from "../../lib/LeaseAgreementPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DrawIcon from "@mui/icons-material/Draw";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

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


      <div className="signature-panel flex justify-between items-center ">
        <div className="mt-4 flex flex-col gap-4 ml-[5%]">
          <div>
            <p className=" ">Please sign the lease agreement below:</p>
          </div>

          <div>
            <Tooltip
              title={
                <Stack direction="row" alignItems="center">
                  <DrawIcon fontSize="x-small" />
                  <Typography variant="body5">Draw signature</Typography>
                </Stack>
              }
              placement="bottom-start"
              arrow
            >
              <div>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 400,
                    height: 80,
                    className: "border border-black bg-white rounded-md",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="px-[5%] pt-2">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className="!bg-black text-white"
          >
            Email Lease
          </Button>
        </div>

      </div>
    </div>
  );
}

export default LeaseView;
