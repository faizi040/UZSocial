import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from "./Form.jsx";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:100px)");
  //getting colors from our theme file
  const primary = theme.palette.primary.main;
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box width="100%" backgroundColor={alt} p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color={primary}>
          UZSocial
        </Typography>
      </Box>
      <Box width={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={alt}>
        <Typography fontWeight="800" variant='h4' sx={{ mb: "1.5rem" }}>
          Welcome to UZSocial , the social media for the SocialPaths!
        </Typography>
        <Form/>
      </Box>
    </Box>
  )
}

export default LoginPage