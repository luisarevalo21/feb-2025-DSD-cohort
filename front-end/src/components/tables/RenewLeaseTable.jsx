import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import Spinner from "../Spinner";

//Defining the columns
const columns = [
  {
    field: "apartmentNumber",
    headerName: "Apt. #",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <a href={`/apartment-details/${params.row.id}`} className="underline">
        {params.row.apartmentNumber}
      </a>
    ),
  },
  {
    field: "tenantName",
    headerName: "Tenant Name",
    flex: 2,
    minWidth: 150,
    renderCell: (params) => (
      <a href={`/tenant-details/${params.row.tenantId}`} className="underline">
        {params.row.tenantName}
      </a>
    ),
  },
  { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150 },
  {
    field: "leaseStatus",
    headerName: "Status",
    flex: 2,
    width: 150,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/renew-lease/${params.row.leaseId}`}
        color="warning"
        variant="contained"
      >
        Renew
      </Button>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function RenewLeaseTable({ isLoading, renewableLeases }) {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Paper sx={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={renewableLeases}
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
        localeText={{ noRowsLabel: "No renewals currently" }}
      />
    </Paper>
  );
}
