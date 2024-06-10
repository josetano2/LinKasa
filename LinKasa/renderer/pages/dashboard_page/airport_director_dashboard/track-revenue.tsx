import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function TrackRevenue() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const revenues = [
    1313207, 1999683, 350834, 454515, 237561, 959741, 1234361, 902675, 492725,
    888585, 182364, 1854297,
  ];

  const expenses = [
    187375, 157292, 437476, 942668, 734528, 263255, 788899, 213914, 668514,
    1464748, 293963, 1312633,
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,

        }}
      >
        <Typography variant="h5" color="initial">
          Airport Revenue
        </Typography>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
          series={[
            {
              data: revenues,
              area: true,
            },
          ]}
          width={800}
          height={300}
        />
        <Typography variant="h5" color="initial">
          Airport Expenses
        </Typography>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
          series={[
            {
              data: expenses,
              area: true,
            },
          ]}
          width={800}
          height={300}
        />
      </Box>
    </Container>
  );
}
