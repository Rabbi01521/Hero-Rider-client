import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const LearnerSignup = () => {
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
  const { user, registerUser, isLoading, error } = useAuth();
  const { button } = useStyle();
  const [registerData, setRegisterData] = useState({});
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [nidImage, setNidImage] = useState(null);

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    console.log(image, nidImage);
    const newRegisterData = { ...registerData, image, nidImage };
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
    if (!registerData.image && registerData.nidImage) {
      return;
    }

    const formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("email", registerData.email);
    formData.append("age", registerData.age);
    formData.append("address", registerData.address);
    formData.append("phone", registerData.phone);
    formData.append("ride", registerData.ride);
    formData.append("type", "learner");

    formData.append("profileImage", registerData.image);
    formData.append("nidImage", registerData.nidImage);

    fetch("https://protected-dawn-81622.herokuapp.com/learner", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Learner is added");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
    registerUser(
      registerData.email,
      registerData.password,
      registerData.name,
      history
    );
  };
  return (
    <div>
      <h1>Learner Sign up</h1>
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
        <Typography variant="h5">Join as a Driving Lesson Learner</Typography>
        {!isLoading && (
          <form onSubmit={handleRegisterSubmit} style={{ textAlign: "center" }}>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Name"
              variant="standard"
              type="text"
              name="name"
              required
              onChange={handleOnChange}
            ></TextField>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Email"
              variant="standard"
              type="email"
              name="email"
              required
              onChange={handleOnChange}
            ></TextField>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Age"
              variant="standard"
              type="number"
              required
              name="age"
              onInput={(e) => {
                e.target.value = Math.max(18, parseInt(e.target.value));
                e.target.value = Math.min(50, parseInt(e.target.value));
              }}
              onChange={handleOnChange}
            ></TextField>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Address"
              variant="standard"
              type="text"
              name="address"
              required
              onChange={handleOnChange}
            ></TextField>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Phone Number"
              variant="standard"
              type="text"
              name="phone"
              required
              onChange={handleOnChange}
            ></TextField>
            <h4 style={{ textAlign: "left", marginLeft: "132px" }}>
              Enter Your Profile Image
            </h4>
            <Input
              sx={{ width: "75%", m: 1 }}
              accept="image/*"
              id="contained-button-file"
              type="file"
              name="profileImg"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <h4 style={{ textAlign: "left", marginLeft: "132px" }}>
              Enter Your Nid
            </h4>
            <Input
              sx={{ width: "75%", m: 1 }}
              accept="image/*"
              id="contained-button-file"
              type="file"
              name="nidPicture"
              onChange={(e) => setNidImage(e.target.files[0])}
            />

            <div style={{ margin: "10px" }} onChange={handleOnChange}>
              <h4 style={{ textAlign: "left", marginLeft: "132px" }}>
                Select your vehicle type
              </h4>
              <input type="radio" value="car" name="ride" /> Car
              <input type="radio" value="bike" name="ride" /> Bike
            </div>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Password"
              variant="standard"
              type="password"
              name="password"
              required
              onChange={handleOnChange}
            ></TextField>

            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Retype Your Password"
              variant="standard"
              type="password"
              name="password2"
              required
              onChange={handleOnChange}
            ></TextField>
            <br />
            <Button
              className={button}
              sx={{ width: "75%", m: 1, backgroundColor: "black" }}
              type="submit"
              variant="contained"
            >
              Join as a Driving Lesson Learner
            </Button>
            {/* <NavLink style={{ textDecoration: "none" }} to="/login">
              <Button variant="text">Already Register? Please Login...</Button>
            </NavLink> */}
          </form>
        )}
        {isLoading && <CircularProgress color="secondary" />}

        <Box>
          {user?.email && (
            <Alert severity="success">User Created Successfully</Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </div>
  );
};

export default LearnerSignup;
