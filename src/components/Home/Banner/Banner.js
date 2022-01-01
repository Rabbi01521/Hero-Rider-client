import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const bannerBg = {
  backgroundColor: "gray",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundRepeat: " no-repeat",
  width: "100%",
  height: "100vh",
};

const Banner = () => {
  const { user } = useAuth();

  return (
    <div style={bannerBg}>
      <Container>
        <Grid
          container
          rowSpacing={1}
          style={{ height: "90vh" }}
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} md={12} style={{ color: "white" }}>
            {!user.email ? (
              <Box>
                <Button
                  variant="outlined"
                  sx={{ my: 2, borderColor: "white", color: "white", mr: 2 }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/riderSignup"
                  >
                    Join as a Rider
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ my: 2, borderColor: "white", color: "white" }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/learnerSignup"
                  >
                    Join as a Driving lesson Learner
                  </Link>
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3">
                  Hello, {user.displayName} welcome to Hero Ride...
                </Typography>
                <br />
                <Typography variant="h3">
                  Thank You for your info ...
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
