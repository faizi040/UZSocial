import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material';     //importing some components from material ui

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material';    //importing some icons from material icons
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state';    //importing reducers functions
import { useNavigate } from 'react-router-dom';
import FlexBetween from "../../components/FlexBetween"

const Navbar = () => {

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);   //setting upa state for mobile menu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.user);    //getting up user data
  // console.log(User);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");   //setting up minimum width for non-mobile screens
  const theme = useTheme();   //allow us to use iur custome themes easily
  //getting colors from our theme file
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${User.firstName} ${User.lastName}`;   //getting user full name
  // const fullName = "Muhammad Faiz Rsool";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} >
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color={primary}
          onClick={() => navigate('/home')}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer"
            },
          }}
        >
          {/* clamp is function in css to find minimum,oreffered nad mzximum value of font according to cange in screen size */}
          UZSocial
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" p="0.1rem 1.5rem"  >
            <InputBase placeholder='Search...'  />
            <IconButton>
              <Search  />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>


      {/* Now for mobile screen */}
      {isNonMobileScreens ? (<FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>

          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant='standard' value={fullName}>
          <Select value={fullName}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem"
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight
              }

            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>) :
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>}


      {/* Mobile Nav */}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}


        >
          <Box display='flex' justifyContent='flex-end' p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          {/* Menu Items */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center"  gap="=3rem">
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>

              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant='standard' value={fullName}>
              <Select value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem"
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight
                  }

                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}

    </FlexBetween>    //using that styled component
    //we are using styling as like this ini it as we have used BOX component of material ui in thta styled component   
  )
}

export default Navbar