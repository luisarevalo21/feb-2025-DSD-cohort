import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";

//Defining the columns
const columns = [
  { field: "apartmentNumber", headerName: "Apt. #", flex: 1, minWidth: 150 },
  { field: "tenantName", headerName: "Tenant Name", flex: 2, minWidth: 150 },
  { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150 },
  {
    field: "leaseStatus",
    headerName: "Status",
    flex: 2,
    width: 150,
    renderCell: () => (
      <Button variant="contained" color="warning">
        Renew
      </Button>
    ),
  },
];

//Temp dummy data
const rows = [
  {
    id: 3,
    apartmentNumber: 333,
    tenantName: "Joke Sonyou",
    leaseEnd: "04/01/2025",
  },
  {
    id: 4,
    apartmentNumber: 23,
    tenantName: "Lando Norris",
    leaseEnd: "04/12/2025",
  },
  {
    id: 5,
    apartmentNumber: 324,
    tenantName: "Michael Schumacher",
    leaseEnd: "03/24/2025",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function RenewLeaseTable() {
  return (
    <Paper sx={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={rows}
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
      />
    </Paper>
  );
}
