import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";

export default function TerminalMap() {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box>
            <Typography variant="h5" color="initial">CGK Terminal Map</Typography>
            <Image src="/images/terminal.jpg" width={1200} height={700} />
        </Box>
    </Container>
  );
}
