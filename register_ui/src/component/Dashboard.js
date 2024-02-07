import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import { RxDot } from "react-icons/rx";
import {
  Avatar,
  Collapse,
  Hidden,
  InputBase,
  ListSubheader,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
  tooltipClasses,
} from "@mui/material";
import { ExpandMore, Logout, Settings } from "@mui/icons-material";
import SimpleBar from "simplebar-react/dist";

import "simplebar-react/dist/simplebar.min.css";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  // width: drawerWidth, 
  width: `calc(${theme.spacing(7)} + 70px)`,
  // width: "auto",
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(8)} + 70px)`,
    // width: "auto",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - 154px)`,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    // "&:hover": {
    //   ...openedMixin(theme),
    //   "& .MuiDrawer-paper": openedMixin(theme),
    //   "&:hover": {
    //     "& .MuiDrawer-paper": openedMixin(theme),
    //   },
    // },
  }),
}));

// serch content start

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  color: "black",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    color: "black",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// serch content end

const BootstrapTooltip = styled(({ className, ...props }) => (
  // <Tooltip {...props} arrow classes={{ popper: className }} />
  <Tooltip
    {...props}
    arrow
    classes={{ popper: className }}
    PopperProps={{
      placement: "top",
      popperOptions: {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -5], // Adjust the offset as needed
            },
          },
        ],
      },
    }}
  >
    {props.children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function MiniDrawer() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [management, setManagement] = React.useState([
    {
      listName: "user",
      subList: ["profile", "cards", "list", "create", "edit", "account"],
    },
    {
      listName: "product",
      subList: ["list", "details", "create", "edit"],
    },
    {
      listName: "order",
      subList: ["list", "details"],
    },
    {
      listName: "invoice",
      subList: ["list", "details", "create", "edit"],
    },
    {
      listName: "blog",
      subList: ["list", "details"],
    },
    {
      listName: "job",
      subList: ["list", "details", "create", "edit"],
    },
    {
      listName: "tour",
      subList: ["list", "details"],
    },
  ]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: "13px",
        paddingTop: "2px",
        width: "34px",
        height: "34px",
        color: "black",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [openState, setOpenState] = React.useState({
    user: false,
    product: false,
    order: false,
    tour: false,
    job: false,
    blog: false,
    invoice: false,
    starred: false,
  });

  const handleClickNestedList = (no) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [no]: !prevOpenState[no],
      starred: false,
    }));
  };

  const handleStarredClick = (no) => {
    setOpenState((prevOpenState) => {
      const newOpenState = {
        ...prevOpenState,
        starred: true,
      };

      // Set the specific no property to true and others to false
      for (const key in newOpenState) {
        if (key !== "starred" && key !== no.toString()) {
          newOpenState[key] = false;
        }
      }

      return newOpenState;
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className="box-shadow-b"
        open={open}
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* <Tooltip title="Account settings"> */}
            <BootstrapTooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                  ml: 2,
                  padding: "2px",
                  border: !openMenu
                    ? `2px solid ${alpha(theme.palette.common.black, 0.15)}`
                    : "2px solid pink",
                }}
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                {/* <Avatar sx={{ width: 32, height: 32 }} >M</Avatar> */}
                <Avatar {...stringAvatar("Smit Ghevariya")} />
              </IconButton>
              {/* </Tooltip> */}
            </BootstrapTooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              className="UserInfo"
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.4))",
                  mt: -0.3,
                  borderRadius: "10px !important",

                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: "-0.5",
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 15,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box
                className="fs-14"
                pt={1}
                px={2}
                pb={1.5}
                display="flex"
                flexDirection="column"
              >
                <span className="userNmae_color">Smit Ghevariya</span>
                <span className="userEmail_color">
                  smitghevariya107@gmail.com
                </span>
              </Box>

              <Divider sx={{ border: "1px dashed rgb(199, 220, 239 ,0.4)" }} />

              <div style={{ margin: "6px" }}>
                <MenuItem
                  className="border-radius-20"
                  sx={{ paddingLeft: "10px !important" }}
                  onClick={handleClose}
                >
                  <Avatar /> Profile
                </MenuItem>
              </div>

              <Divider sx={{ border: "1px dashed rgb(199, 220, 239 ,0.4)" }} />

              <div style={{ margin: "6px", marginBottom: "0px" }}>
                <MenuItem
                  className="border-radius-20"
                  sx={{ marginBottom: "4px", paddingLeft: "11px !important" }}
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  className="border-radius-20"
                  sx={{
                    paddingLeft: "11px !important",
                    fontWeight: "600 !important",
                  }}
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Logout
                      sx={{ color: "black !important" }}
                      fontSize="small"
                    />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
       onMouseEnter={handleDrawerOpen} 
       onMouseLeave={handleDrawerClose} 
        variant="permanent"
        open={open}
        sx={{ borderRight: " 1px dashed rgb(255, 0, 43) !important" ,
      }}
      >
        <div
          className="box-shadow-b z-index"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <DrawerHeader sx={{ alignItems: "center", px:open ? 4 :1.5,justifyContent:'space-between' }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ width: 50, height: 50, marginRight: 2 }}
                alt="demo"
                src="https://t4.ftcdn.net/jpg/05/11/55/91/240_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg"
              />
              <Typography
                variant="body1"
                style={{ display: open ? "flex" : "none"}}
              >
                demo
              </Typography>
            </div>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
        </div>

        <SimpleBar style={{ height: "calc(100vh - 65px)", width: "100%" }}>
          <List className={`${open ? "py-16" : "py-8"}`}>
            {[
              "Dashboard",
              "E-commerce",
              "analytics",
              "banking",
              "booking",
              "file",
            ].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  className="border-radius-20"
                  sx={{
                    textTransform: "capitalize",
                    minHeight: 44,
                    justifyContent: open ? "initial" : "center",
                    pl: open ? 1.5 : 1,
                    py: 0.75,
                    pr: 1,
                    mb: 0.5,

                    display: open ? "" : "flex",
                    flexDirection: open ? "" : "column",
                    "& .MuiTypography-root": {
                      fontSize: `${
                        open ? "14px !important" : "11px !important"
                      }`, // Set font size to 14px
                      fontWeight: `${open ? "" : "600"}`,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      display: open ? "" : "flex",
                      alignItems: "center",
                      flexDirection: open ? "" : "column",
                      justifyContent: open ? "initial" : "center",
                      minWidth: "40px !important",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>

                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              py: open ? 1 : 0.5,
            }}
            className={`${open ? "py-16" : "py-8"}`}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                sx={{
                  top: 0,
                  mb: 0.5,
                  px: open ? "" : 0,
                  lineHeight: 2.5,
                  display: "flex",
                  alignItems: "center ",
                  justifyContent: open ? "" : "center",
                  fontSize: open ? "14px" : "11px",
                  // Set the default or hover color here
                  "&:hover": {
                    color: "black",
                    cursor: "pointer", // Change the color to black on hover
                  },
                }}
                component="div"
                className="box-shadow-b-lite"
                id="nested-list-subheader"
              >
                MANAGEMENT :
              </ListSubheader>
            }
          >
            {management.map((no, ind) => (
              <div key={ind} className="capitalize" style={{ flexGrow: 1 }}>
                <ListItemButton
                  sx={{
                    pl: open ? 1.5 : 1,
                    py: 0.75,
                    pr: 1,
                    mb: 0.5,
                    textTransform: "capitalize",
                    minHeight: 44,
                    justifyContent: open ? "initial" : "center",
                    display: open ? "" : "flex",
                    flexDirection: open ? "" : "column",
                    "& .MuiTypography-root": {
                      fontSize: `${
                        open ? "14px !important" : "11px !important"
                      }`,
                      fontWeight: `${open ? "" : "600"}`,
                    },
                  }}
                  className="border-radius-20"
                  onClick={() => handleClickNestedList(no.listName)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      display: open ? "" : "flex",
                      alignItems: "center",
                      // flexDirection: open ? "" : "column",
                      justifyContent: open ? "initial" : "center",
                      minWidth: "40px !important",
                      
                    }}
                  >
                    {/* <InboxIcon sx={{ml:0.5}} /> */}
                    <InboxIcon />
                    {!open ? (
                      
                        <NavigateNextIcon
                          sx={{
                            // fill: "currentColor !important",
                            color:'000000DE', fontSize:'20px',opacity:'0.95',
                            position: "absolute",
                            right: "5px",
                          }}
                          size="small"
                        />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>

                  <ListItemText primary={` ${no.listName}`} />

                  {open ? (
                    openState[no.listName] ? (
                      <ExpandMore
                        sx={{color:'000000DE',fontSize:'20px',opacity:'0.95' }}
                        size="small"
                      />
                    ) : (
                      <NavigateNextIcon
                        sx={{color:'000000DE', fontSize:'20px',opacity:'0.95' }}
                        size="small"
                      />
                    )
                  ) : (
                    ""
                  )}
                </ListItemButton>
                { open && <Collapse
                  in={openState[no.listName]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {no.subList.map((val, ind) => (
                      <ListItemButton
                        key={ind}
                        sx={{
                          maxHeight: 38,
                          pl: 1.5,
                          py: 0.75,
                          pr: 1,
                          mb: 0.5,
                          alignItems: "center",
                          "& .MuiTypography-root": {
                            fontSize: "14px !important", // Set font size to 14px
                          },
                        }}
                        className="border-radius-20"
                        onClick={() => handleStarredClick(no.listName)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "24px !important",
                            minHeight: "24px !important",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: 2,
                          }}
                        >
                          <RxDot />
                        </ListItemIcon>
                        <ListItemText primary={val} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>}
              </div>
            ))}
          </List>
          {/* </div> */}
        </SimpleBar>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
