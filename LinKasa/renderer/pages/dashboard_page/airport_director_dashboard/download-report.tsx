import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AirportReport from "./report";

export default function DownloadReport() {
  const DownloadPDFButton = () => (
    <PDFDownloadLink
      document={<AirportReport />}
      fileName="report.pdf"
      style={{ textDecoration: "none" }}
    >
      {({ loading }) =>
        loading ? (
          <Button
            sx={{
              padding: "0.8rem",  
            }}
            variant="outlined"
            disableElevation
            disabled
          >
            Loading document...
          </Button>
        ) : (
          <Button
            sx={{
              padding: "0.8rem",
            }}
            variant="outlined"
            disableElevation
          >
            Download (PDF)
          </Button>
        )
      }
    </PDFDownloadLink>
  );
  const handleDownloadCSV = () => {

    const csvContent = `This is a report`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          // width: "",
        }}
      >
        <Typography variant="h5" color="initial">
          Download Report
        </Typography>
        <DownloadPDFButton />
        <Button
          sx={{
            padding: "0.8rem",
            width: "14%"
          }}
          variant="outlined"
          disableElevation
          onClick={handleDownloadCSV}
        >
          Download (CSV)
        </Button>
      </Box>
    </Container>
  );
}
