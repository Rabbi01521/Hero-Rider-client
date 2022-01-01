import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, ListItemIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ManageLearners from "./ManageLearners/ManageLearners";
import ManageRiders from "./ManageUsers/ManageRiders";
const drawerWidth = 200;

function AdminDashboard(props) {
  const { user, logOut, admin } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ color: "white" }}>
        <Typography variant="h6" noWrap className="logo" component="div">
          Hero Rider
        </Typography>
      </Toolbar>
      <Divider />
      <Box>
        <List>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          {admin && (
            <Box>
              <Link
                to={`${url}/manageRiders`}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <ListItem button>
                  <ListItemText primary="Manage Riders" />
                </ListItem>
              </Link>
            </Box>
          )}
          {admin && (
            <Box>
              <Link
                to={`${url}/manageLearners`}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <ListItem button>
                  <ListItemText primary="Manage Learners" />
                </ListItem>
              </Link>
            </Box>
          )}
          <Divider />
          {!admin && (
            <Box
              sx={{
                height: "350px",
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ my: 3, color: "white" }}
                onClick={logOut}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "white", mx: 1 }} />
                  <ListItemText sx={{ color: "white" }} primary="Logout" />
                </ListItemIcon>
              </Button>
            </Box>
          )}
          {admin && (
            <Box
              sx={{
                height: "300px",
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ my: 3, color: "white" }}
                onClick={logOut}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "white", mx: 1 }} />
                  <ListItemText sx={{ color: "white" }} primary="Logout" />
                </ListItemIcon>
              </Button>
            </Box>
          )}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
            <Typography variant="body1" noWrap component="div">
              {user?.displayName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "black",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route path={`${path}/manageRiders`}>
            <ManageRiders></ManageRiders>
          </Route>
          <Route path={`${path}/manageLearners`}>
            <ManageLearners></ManageLearners>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

AdminDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDashboard;
