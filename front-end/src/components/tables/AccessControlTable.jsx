import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import Spinner from "../Spinner";

const paginationModel = { page: 0, pageSize: 5 };

const AccessControlTable = ({ isLoading, accessControlInfo, handleGenerateCode }) => {
  if (isLoading) {
    return <Spinner />;
  }

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
      renderCell: (params) => <span>{params.row.primaryLockCode}</span>,
    },
    {
      field: "tempCode",
      headerName: "Temp Code",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <span>{params.row.tempCode}</span>,
    },
    {
      field: "tempCodeExpirationDate",
      headerName: "Temp Code Expiration Date",
      description: "Temporary guest code will not work past this date/time",
      flex: 2,
      minWidth: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => params.row.tempCodeExpiration ? 
      <span>{new Date(params.row.tempCodeExpiration).toLocaleString()}</span> : "",
    },
    {
      headerName: "Action",
      type: "action",
      description: "Generate a 24-hour temporary code for guest access",
      sortable: false,
      flex: 1,
      minWidth: 200,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-2 h-full">
            <Button
              onClick={() => handleGenerateCode(params.row.id)}
              color="primary"
              variant="contained"
            >
              Generate Temp Code
            </Button>
          </div>
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
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
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
