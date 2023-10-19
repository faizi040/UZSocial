import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx";
import LoginPage from "./scenes/loginPage/index.jsx";
import ProfilePage from "./scenes/profilePage/index.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Navbar from "./scenes/navbar/index.jsx";
function App() {
  const mode = useSelector((state) => state.mode);  //grabbing mode state from redux-toolkit state

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);    //setting up theme settings

  const isAuth = Boolean(useSelector((state)=>state.token))   //if we are logged in grab the token

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>    {/* //related to theme */}
        {/* <Navbar/> */}
          <CssBaseline />      {/*use to reset our css */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/"/>} />
            {/* if user is logged in take him to home page ptherwise take him to login page */}
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/>} />

          </Routes>
        </ThemeProvider>


      </BrowserRouter>

    </>
  )
}

export default App
