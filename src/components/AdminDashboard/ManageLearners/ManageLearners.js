import { Button, Checkbox, TableRow, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./ManageLearners.css";

const ManageLearners = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [learners, setLearners] = useState([]);
  const [checked, setChecked] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [displayRiders, setDisplayRiders] = useState([]);

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);
  const [toRender, setToRender] = useState([...displayRiders]);
  useEffect(() => {
    fetch("https://protected-dawn-81622.herokuapp.com/learner")
      .then((res) => res.json())
      .then((data) => setLearners(data));
  }, []);
  console.log(learners);

  const handleDelete = (id) => {
    if (checked === false) {
      console.log(id);
      const url = `https://protected-dawn-81622.herokuapp.com/learner/${id}`;
      const proceed = window.confirm("Are You Sure, You Want To Delete ?");
      if (proceed) {
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              alert("deleted Successfully");
              const remainingOrders = learners.filter(
                (rider) => rider._id !== id
              );
              setToRender(remainingOrders);
            }
          });
      }
    }
  };

  const size = 10;
  useEffect(() => {
    fetch(
      `https://protected-dawn-81622.herokuapp.com/learners?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDisplayRiders(data.learners);
        setToRender(data.learners);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  // age filter
  const handleRiders = () => {
    setToRender(
      displayRiders.filter(
        (rider) => rider.age >= minAge && rider.age <= maxAge
      )
    );
  };

  // search
  const handleOnChange = (e) => {
    const temp = [];
    const searchText = e.target.value;
    for (let i = 0; i < displayRiders.length; i++) {
      if (
        [displayRiders[i].email, displayRiders[i].name, displayRiders[i].phone]
          .join(", ")
          .includes(searchText)
      ) {
        temp.push(displayRiders[i]);
      }
    }
    setToRender(temp);
  };

  return (
    <div>
      <h3>Manage All Learners</h3>
      <Box sx={{ my: 3 }}>
        <Box>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "50%",
                margin: "auto",
              }}
            >
              <h5>Filter by Age:</h5>
              <div>
                <TextField
                  type="number"
                  aria-label="Min"
                  aria-describedby="basic-addon1"
                  min="18"
                  max={maxAge - 1}
                  defaultValue="18"
                  onChange={(event) => {
                    setMinAge(parseInt(event.target.value));
                    if (event.target.value === "") {
                      setMinAge(18);
                    }
                  }}
                  onBlur={(event) => {
                    if (!event.target.value) {
                      event.target.value = 18;
                    }
                  }}
                />
              </div>
              <h6 style={{ margin: "0 10px" }}>to</h6>
              <div>
                <TextField
                  type="number"
                  aria-label="Max"
                  aria-describedby="basic-addon1"
                  min="0"
                  defaultValue="30"
                  onChange={(event) => {
                    setMaxAge(parseInt(event.target.value) || 30);
                  }}
                  onBlur={(event) => {
                    if (!event.target.value) {
                      event.target.value = 30;
                    }
                  }}
                />
              </div>
              <Button
                sx={{ margin: "0 10px" }}
                variant="contained"
                onClick={handleRiders}
              >
                Apply
              </Button>
            </div>
            <Box>
              <TextField
                id="standard-basic"
                label="Search"
                type="text"
                variant="standard"
                sx={{ width: "50%", m: 2 }}
                name="search"
                onChange={(e) => handleOnChange(e)}
              />
            </Box>
          </div>
        </Box>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell>nidImage</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Paid/UnPaid</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toRender.map((learner) => (
                <TableRow
                  key={learner._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={`data:image/jpeg;base64,${learner?.profileImage}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {learner.name}
                  </TableCell>
                  <TableCell align="center">{learner.email}</TableCell>
                  <TableCell align="center">
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={`data:image/jpeg;base64,${learner?.nidImage}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{learner.phone}</TableCell>
                  <TableCell align="center">{learner.age}</TableCell>
                  <TableCell align="center">
                    {learner.payment ? "Paid" : "Unpaid"}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      onClick={(e) => {
                        setChecked(e.target.checked);
                        handleDelete(learner._id);
                      }}
                      {...label}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={number === page ? "selected" : ""}
              key={number}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default ManageLearners;
