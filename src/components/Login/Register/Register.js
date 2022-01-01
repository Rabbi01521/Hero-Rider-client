import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const useStyle = makeStyles({
  button: {
    color: "#19D3AE !important",
    border: "1px solid #19D3AE !important",
    margin: "20px 10px 30px 0 !important",
    "&:hover": {
      background: "#3D3D3D !important",
      color: "#fff !important",
    },
  },
});
const Register = () => {
  const { user, registerUser, isLoading, error } = useAuth();
  const { button } = useStyle();
  const [registerData, setRegisterData] = useState({});
  const history = useHistory();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newRegisterData = { ...registerData };
    newRegisterData[field] = value;
    console.log(newRegisterData);
    setRegisterData(newRegisterData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password2) {
      alert("Your password did not matched");
      return;
    }
    registerUser(
      registerData.email,
      registerData.password,
      registerData.name,
      history
    );
  };

  const bannerBg = {
    backgroundColor: "gray",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: " no-repeat",
    width: "100%",
  };

  return (
    <Container style={{ height: "100vh", mt: 3 }}>
      <Grid
        container
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "30px 0",
            }}
          >
            <Typography variant="h5">Please Register</Typography>
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
                    <Button
                      variant="outlined"
                      sx={{
                        my: 2,
                        borderColor: "white",
                        color: "white",
                        mr: 2,
                      }}
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
                  </Grid>
                </Grid>
              </Container>
            </div>
            {/* <Box>
              {user?.email && (
                <Alert severity="success">User Created Successfully</Alert>
              )}
              {error && <Alert severity="error">{error}</Alert>}
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
