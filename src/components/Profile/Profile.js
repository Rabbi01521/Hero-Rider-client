import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../Shared/Header/Header";

const Profile = () => {
  const { user } = useAuth();
  const [learner, setLearner] = useState([]);
  //   const [riders, setRiders] = useState([]);
  const [display, setDisplay] = useState(false);
  const [singleLearner, setSingleLearner] = useState({});
  //   const [singleRider, setSingleRider] = useState({});

  useEffect(() => {
    fetch("https://protected-dawn-81622.herokuapp.com/learner")
      .then((res) => res.json())
      .then((data) => setLearner(data));
  }, []);

  //   useEffect(() => {
  //     fetch("https://protected-dawn-81622.herokuapp.com/rider")
  //       .then((res) => res.json())
  //       .then((data) => setRiders(data));
  //   }, []);

  useEffect(() => {
    const findLearner = () => {
      const found = learner.find((learn) => learn.email === user.email);
      // const riderFound = riders.find(rider => rider.type === "rider");
      if (found) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    };
    findLearner();
  }, [user.email, learner]);

  console.log(display);

  useEffect(() => {
    const singleUser = learner.find((learn) => learn.email === user.email);
    setSingleLearner(singleUser);
  }, [learner, user.email]);
  return (
    <div>
      <Header></Header>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <img src={`data:image/jpeg;base64,${data}`} alt="" /> */}
        {!display ? (
          <Box>
            <Typography variant="h3">
              Hello, {user.displayName} we will talk with you very soon...
            </Typography>
            <br />
            <Typography variant="h3">Thank You for your info ...</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h3">Please Pay Before You Start</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper sx={{ width: "200px", m: 2, textDecoration: "none" }}>
                <Typography variant="h5">Car</Typography>
                <Typography variant="body">Price: $200</Typography>
              </Paper>

              <Paper sx={{ width: "200px", m: 2, textDecoration: "none" }}>
                <Typography variant="h5">Bike</Typography>
                <Typography variant="body">Price: $100</Typography>
              </Paper>
            </Box>{" "}
            <Button variant="contained">
              {!singleLearner?.payment ? (
                <NavLink
                  to={`/payment/${singleLearner?._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Payment
                </NavLink>
              ) : (
                "Paid"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Profile;
