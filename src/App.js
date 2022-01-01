import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Home from "./components/Home/Home/Home";
import Learner from "./components/Learner/Learner/Learner";
import Payment from "./components/Learner/Payment/Payment";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import LearnerSignup from "./components/Login/Register/LearnerSignup/LearnerSignup";
import Register from "./components/Login/Register/Register";
import RiderSignup from "./components/Login/Register/RiderSignup/RiderSignup";
import Profile from "./components/Profile/Profile";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/riderSignup">
              <RiderSignup></RiderSignup>
            </Route>
            <Route path="/learnerSignup">
              <LearnerSignup></LearnerSignup>
            </Route>
            <PrivateRoute path="/profile">
              <Profile></Profile>
            </PrivateRoute>
            <Route path="/learner">
              <Learner />
            </Route>
            <PrivateRoute path="/dashboard">
              <AdminDashboard></AdminDashboard>
            </PrivateRoute>
            <PrivateRoute path="/payment/:userId">
              <Payment></Payment>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
