import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Spinner from "../Spinner";

const paginationModel = { page: 0, pageSize: 5 };

const AccessControlTable = ({
  isLoading,
  accessControlInfo,
  handleGenerateCode,
  handleDeleteTempCode,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  const copyToClipboard = (code, label) => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success(`${label} copied!`);
    } else {
      toast.error("No code to copy!");
    }
  };

  const columns = [
    {
      field: "apartmentNumber",
      headerName: "Apt #",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Link
          to={`/apartment-details/${params.row.apartmentId}`}
          className="underline"
        >
          {params.row.apartmentNumber}
        </Link>
      ),
    },
    {
      field: "tenantName",
      headerName: "Tenant Name",
      flex: 2,
      minWidth: 200,
      renderCell: (params) =>
        params.row.tenantName === "Apartment Vacant" ? (
          <span>{params.row.tenantName}</span>
        ) : (
          <Link
            to={`/tenant-details/${params.row.tenantId}`}
            className="underline"
          >
            {params.row.tenantName}
          </Link>
        ),
    },
    {
      field: "primaryLockCode",
      headerName: "Primary Lock Code",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const code = params.row.primaryLockCode;
        return (
          <span
            style={{ cursor: "copy" }}
            onClick={() => copyToClipboard(code, "Primary lock code")}
          >
            {code}
          </span>
        );
      },
    },
    {
      field: "tempCode",
      headerName: "Temp Code",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const code = params.row.tempCode;
        return (
          <span
            style={{ cursor: "copy" }}
            onClick={() => copyToClipboard(code, "Temporary code")}
          >
            {code}
          </span>
        );
      },
    },
    {
      field: "tempCodeExpirationDate",
      headerName: "Temp Code Expiration Date",
      description: "Temporary guest code will not work past this date/time",
      flex: 2,
      minWidth: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.tempCodeExpiration ? (
          <span>
            {new Date(params.row.tempCodeExpiration).toLocaleString()}
          </span>
        ) : (
          ""
        ),
    },
    {
      headerName: "Action",
      type: "action",
      description:
        "Generate or delete a 24-hour temporary code for guest access",
      sortable: false,
      flex: 1,
      minWidth: 250,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Button
              type="button"
              sx={{
                textTransform: "none",
                padding: "6px 12px",
                maxWidth: "175px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              onClick={() => handleGenerateCode(params.row.id)}
              color="primary"
              variant="contained"
            >
              Generate Temp Code
            </Button>
            <IconButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (params.row.tempCode) {
                  handleDeleteTempCode(params.row.id);
                }
              }}
              color="error"
              title="Delete Temp Code"
              disabled={!params.row.tempCode}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Paper>
      <DataGrid
        rows={accessControlInfo}
        columns={columns.map((col) => ({
          ...col,
          align: "center",
          headerAlign: "center",
          headerClassName: "bg-[#e3e7d3]",
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0.5 }}
        align={"center"}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        localeText={{ noRowsLabel: "No access control information" }}
      />
    </Paper>
  );
};

export default AccessControlTable;
