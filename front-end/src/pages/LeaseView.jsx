import React, { useState } from "react";
import { Button, Box, Checkbox, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";

import SignatureCanvas from "react-signature-canvas";
import LeaseAgreementPdf from "../../lib/LeaseAgreementPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DrawIcon from "@mui/icons-material/Draw";
import { signLease } from "../api/leaseApi";

function LeaseView({ leaseData }) {
  const handleSubmitForm = async e => {
    e.preventDefault();
    if (leaseData.leaseStatus !== "Active") {
      await signLease(leaseData.leaseId, true);
    }
  };
  console.log(leaseData);
  return (
    <Box className="p-4 rounded-md">
      <Box className="h-[600px] w-[90%] mx-auto border border-gray-300 rounded-md overflow-hidden ">
        <PDFViewer className="w-full h-full " style={{ border: "none", backgroundColor: "white" }}>
          <LeaseAgreementPdf {...leaseData} />
        </PDFViewer>
      </Box>

      {leaseData.leaseStatus !== "Active" ? (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}>
          <Box className="mt-4 flex flex-col gap-4 ml-[5%]">
            <Box>
              <p>Please sign the lease agreement below:</p>
            </Box>

            <Box>
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
                <Box>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 80,
                      className: "border border-black bg-white rounded-md",
                    }}
                  />
                </Box>
              </Tooltip>
            </Box>

            <form onSubmit={e => handleSubmitForm(e)}>
              <Checkbox value={leaseData.leaseStatus === "Active" ? true : false} />
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Sign Lease
              </Button>
            </form>
          </Box>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
          <Typography color="green" fontWeight={"bold"} variant="h3">
            Lease is already signed
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default LeaseView;

{
  /* <Box className="px-[5%] pt-2"></Box> */
}
{
  /* <Button variant="contained" endIcon={<SendIcon />} className="!bg-black text-white">
    Email Lease
  </Button> */
}
