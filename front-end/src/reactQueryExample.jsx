import React from "react";
import { useDummyData } from "./exampleQuery";
import { Box, Typography } from "@mui/material";
const ReactQueryExample = () => {
  const { isLoading, error, data } = useDummyData();

  if (isLoading) return "Loading...";
  if (error) console.log("An error occurred while fetching the user data ", error);

  return (
    <Box>
      <Typography> hello from example</Typography>
      <h1>{data?.userId}</h1>
      <p>{data?.id}</p>
      <p>{data?.title}</p>
    </Box>
  );
};

export default ReactQueryExample;
