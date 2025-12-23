import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 10,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 600, md: 700 },
          mx: { xs: 1, sm: "auto" },
          background: "linear-gradient(145deg, #1e293b, #0f172a)",
          border: "1px solid #475569",
          borderRadius: 3,
          p: 3,
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          mb={3}
          sx={{ color: "#e5e7eb" }}
        >
          User Dashboard
        </Typography>

        <TableContainer  sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCell}>
                  Username
                </TableCell>
                <TableCell sx={headerCell}>
                  Email
                </TableCell>
                <TableCell sx={headerCell}>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {user ? (
                <TableRow>
                  <TableCell sx={bodyCell}>
                    {user.username}
                  </TableCell>
                  <TableCell sx={bodyCell}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={bodyCell}>
                    {user.phone}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      color: "#94a3b8",
                      textAlign: "center",
                      py: 3,
                    }}
                  >
                    No user data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const headerCell = {
  color: "#cbd5f5",
  fontWeight: 600,
  borderBottom: "1px solid #475569",
};

const bodyCell = {
  color: "#e5e7eb",
  borderBottom: "1px solid #334155",
};

export default Dashboard;
