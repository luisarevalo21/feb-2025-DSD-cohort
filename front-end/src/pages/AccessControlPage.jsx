import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccessControlTable from "../components/tables/AccessControlTable";
import toast from "react-hot-toast";

import {
  fetchAccessControlInformation,
  generateAccessControlTempCode,
} from "../api/accessControlApi";

const AccessControl = () => {
  const [accessControlInfo, setAccessControlInfo] = useState([]);
  const [loadingAccessControlData, setLoadingAccessControlData] =
    useState(true);

  useEffect(() => {
    async function InitialFetch() {
      const accessControlInformation = await fetchAccessControlInformation();
      setAccessControlInfo(accessControlInformation);
    }
    setLoadingAccessControlData(true);
    InitialFetch();
    setLoadingAccessControlData(false);
  }, []);

  const handleGenerateCode = async (accessControlId) => {
    try {
      const updatedData = await generateAccessControlTempCode(accessControlId);
      setAccessControlInfo((prev) =>
        prev.map((item) =>
          item.id === updatedData.id
            ? {
                ...item,
                tempCode: updatedData.temp_code,
                tempCodeExpiration: updatedData.expires_at,
              }
            : item
        )
      );
      toast.success("Temporary Code Generated Successfully");
    } catch (err) {
      toast.error("Failed to generate temporary code. Please try again.");
    }
  };
  return (
    <>
      <Typography
        component="h1"
        align="left"
        fontWeight={"bold"}
        fontSize={"2rem"}
        marginBottom={"2rem"}
      >
        Access Control
      </Typography>

      <Grid container spacing={10}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Access Control Information
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <AccessControlTable
              isLoading={loadingAccessControlData}
              accessControlInfo={accessControlInfo}
              handleGenerateCode={handleGenerateCode}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AccessControl;
