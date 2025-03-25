import React, { useState, useEffect } from "react";
import { Button, Box, Checkbox, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router";
import SignatureCanvas from "react-signature-canvas";
import LeaseAgreementPdf from "../../lib/LeaseAgreementPdf";
import Tooltip from "@mui/material/Tooltip";
import DrawIcon from "@mui/icons-material/Draw";
import { signLease, fetchLeaseDetails } from "../api/leaseApi";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function LeaseView() {
  const { id } = useParams();
  const [lease, setLease] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchLeaseInfo() {
      try {
        const lease = await fetchLeaseDetails(id);
        setLease(lease);
        setIsLoading(false);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaseInfo(id);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }
  const handleSubmitForm = async e => {
    e.preventDefault();
    if (lease.leaseStatus !== "Active") {
      const response = await signLease(lease.leaseId, true);

      console.log(response);
      if (response) {
        navigate(`/lease-details/${lease.leaseId}`, {
          state: { message: "Lease signed successfully" },
        });
      } else toast.error("Error signing lease");
    }
  };
  return (
    <Box className="p-4 rounded-md">
      <Box className="h-[600px] w-[90%] mx-auto border border-gray-300 rounded-md overflow-hidden ">
        <PDFViewer className="w-full h-full " style={{ border: "none", backgroundColor: "white" }}>
          <LeaseAgreementPdf {...lease} />
        </PDFViewer>
      </Box>

      {lease.leaseStatus !== "Active" ? (
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
              <Checkbox value={lease.leaseStatus === "Active" ? true : false} />
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
