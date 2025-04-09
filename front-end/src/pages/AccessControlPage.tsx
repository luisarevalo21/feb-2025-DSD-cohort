import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AccessControlTable from "../components/tables/AccessControlTable";

import {
  deleteAccessControlTempCode,
  fetchAccessControlInformation,
  generateAccessControlTempCode,
} from "../api/accessControlApi";

interface AccessControlObject {
  id: string;
  apartmentId: string;
  apartmentNumber: string;
  tenantId: string | null;
  tenantName: string | null;
  primaryLockCode: number;
  tempCode: number | null;
  tempCodeExpiration: Date | null;
}

const AccessControl = () => {
  const [accessControlInfo, setAccessControlInfo] = useState<AccessControlObject[]>([]);
  const [loadingAccessControlData, setLoadingAccessControlData] =
    useState<boolean>(true);

  useEffect(() => {
    async function InitialFetch() {
      const accessControlInformation = await fetchAccessControlInformation();
      setAccessControlInfo(accessControlInformation);
    }
    setLoadingAccessControlData(true);
    InitialFetch();
    setLoadingAccessControlData(false);
  }, []);

  const handleDeleteTempCode = async (accessControlId: string) => {
    try {
      await deleteAccessControlTempCode(accessControlId);
      setAccessControlInfo((prev) =>
        prev.map((item) =>
          item.id === accessControlId
            ? {
                ...item,
                tempCode: null,
                tempCodeExpiration: null,
              }
            : item
        )
      );
      toast.success("Temporary Code Deleted Successfully");
    } catch (err) {
      toast.error("Failed to delete temporary code. Please try again.");
    }
  };

  const handleGenerateCode = async (accessControlId: string) => {
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
          <Box bgcolor={"#f5f5f5"}>
            <AccessControlTable
              isLoading={loadingAccessControlData}
              accessControlInfo={accessControlInfo}
              handleGenerateCode={handleGenerateCode}
              handleDeleteTempCode={handleDeleteTempCode}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AccessControl;
