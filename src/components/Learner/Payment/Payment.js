import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Header from "../../Shared/Header/Header";
import CheckoutFrom from "./CheckoutFrom";

const stripePromise = loadStripe(
  "pk_test_51KCpDBGu8zySmWEH8KhGKf7C3rXMehW2rKPuQ9v6x4upaEu7GIehrQGe8Lvbfs7QmkMe9QZnxcfFkE2vMNdsZGiA00FHCxNXCg"
);

const Payment = () => {
  const { user } = useAuth();
  const [display, setDisplay] = useState([]);
  const { userId } = useParams();
  const [singleData, setSingleData] = useState({});
  console.log(userId);

  useEffect(() => {
    fetch("https://protected-dawn-81622.herokuapp.com/learner")
      .then((res) => res.json())
      .then((data) => setDisplay(data));
  }, []);

  useEffect(() => {
    const find = display.find((single) => single._id === userId);
    setSingleData(find);
  }, [display, userId]);

  console.log(singleData);

  return (
    <>
      <Header></Header>
      <Container>
        <h1>Please Pay Before You Start</h1>
        <Box>
          <h3>Name: {singleData?.name}</h3>
          <h3>Email: {singleData?.email}</h3>
          <h3>${singleData?.ride === "bike" ? 100 : 200}</h3>
          <br />
          <Elements stripe={stripePromise}>
            <CheckoutFrom singleData={singleData}></CheckoutFrom>
          </Elements>
        </Box>
      </Container>
    </>
  );
};

export default Payment;
