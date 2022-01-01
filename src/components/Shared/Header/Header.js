import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Header.css";

const Header = () => {
  const { user, logOut, admin } = useAuth();
  console.log(admin);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      style={{ top: 30 }}
      sx={{ width: 1 }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/home" style={{ textDecoration: "none" }}>
          <p>Home</p>
        </NavLink>
      </MenuItem>
      {admin ? (
        <MenuItem>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <p>Dashboard</p>
          </NavLink>
        </MenuItem>
      ) : (
        ""
      )}
      {!admin ? (
        <MenuItem>
          <NavLink to="/profile" style={{ textDecoration: "none" }}>
            <p>Profile</p>
          </NavLink>
        </MenuItem>
      ) : (
        ""
      )}
      {!user?.email ? (
        <MenuItem>
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <p>Login</p>
          </NavLink>
        </MenuItem>
      ) : (
        <Box>
          <MenuItem>
            <Typography
              sx={{ color: "#453f3f", display: "block" }}
              variant="body1"
            >
              {user?.displayName}
            </Typography>
          </MenuItem>
          <MenuItem>
            <Button onClick={logOut} variant="text">
              <p>Logout</p>
            </Button>
          </MenuItem>
        </Box>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" noWrap className="logo" component="div">
            Hero Rider
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button variant="text" sx={{ color: "white" }}>
                Home
              </Button>
            </NavLink>
            {admin ? (
              <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                <Button variant="text" sx={{ color: "white" }}>
                  Dashboard
                </Button>
              </NavLink>
            ) : (
              ""
            )}
            {!admin ? (
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                <Button variant="text" sx={{ color: "white" }}>
                  Profile
                </Button>
              </NavLink>
            ) : (
              ""
            )}

            {user?.email ? (
              <Box>
                <Typography
                  sx={{ color: "#fff", display: "inline-block" }}
                  variant="body1"
                >
                  {user?.displayName}
                </Typography>
                <Button
                  onClick={logOut}
                  color="inherit"
                  sx={{ color: "white" }}
                >
                  logOut
                </Button>
              </Box>
            ) : (
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button color="inherit" sx={{ color: "white" }}>
                  Login
                </Button>
              </NavLink>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Header;
