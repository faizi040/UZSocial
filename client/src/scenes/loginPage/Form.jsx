import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    useTheme,
    useMediaQuery
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";    //libraries for forms
import * as yup from "yup";        //libraries for form-vaidation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";



//validation for form input of registartion and login forms
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid E-mail").required("required"),
    password: yup.string().required("required"),
    occupation: yup.string().required("required"),
    location: yup.string().required("required"),
    picture: yup.string().required("required")
})

const loginSchema = yup.object().shape({

    email: yup.string().email("invalid E-mail").required("required"),
    password: yup.string().required("required"),

})

//initial values of fomrs of Register and login as we awill use useState hook to get form values setting initial state is compusary
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    occupation: "",
    location: "",
    picture: ""

}

const initialValuesLogin = {
    email: "",
    password: ""
}

import React from 'react'

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(    //fecth api
            `${import.meta.env.VITE_HOST}/auth/login`,   //url
            {
                method: "POST",    //method
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),  //sending all register information into body as vlues
            }

        );
        const loggedUser = await loggedInResponse.json();
        // onSubmitProps.resetForm();    //to reset form
        if (loggedUser) {
            dispatch(
                setLogin({    //reduc action/reducer
                    user: loggedUser.user,
                    token: loggedUser.token
                })
            )

            navigate("/home");

        }
    }

    const register = async (values, onSubmitProps) => {

        const formData = new FormData();    //this will allow us to send form information with picture
        for (let value in values) {
            formData.append(value, values[value]);   //appending all values to formdata object
        }
        formData.append("picturePath", values.picture.name);   //appending picture name against picturePath in formdata object

        const savedUserResponse = await fetch(    //fecth api
            `${import.meta.env.VITE_HOST}/auth/register`,   //url
            {
                method: "POST",    //method
                body: formData,  //sending all register information into body as formdata
            }

        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();    //to reset form
        if (savedUser) {
            setPageType("login");

        }




    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);

    }    //function
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            //if page type is login set login initial values othetwise set register initial values
            validationSchema={isLogin ? loginSchema : registerSchema}   //same for validation Schema
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue,
                resetForm
            }) => (

                <form onSubmit={handleSubmit}>
                    {/* this handleSubmit is coming from formik which is grabbing it from upper */}

                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            //upper line means styling to any child div in this box
                            //on small screen it will span 4 sections
                        }}>

                        {isRegister && (   //register form
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    //upper two lines mans if it has been touched and there is an error we have been showing that error otherwise we are showing that ih has not een touched
                                    //Simply all values related to form element
                                    sx={{ gridColumn: "span 2" }}  //on large screen it will span 2 sections
                                />

                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}  //on large screen it will span 2 sections
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}  //on large screen it will span 4 sections
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}  //on large screen it will span 4 sections
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={` 1 px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setFieldValue("picture", acceptedFiles[0])
                                        }}

                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {/* Below is an condition statemenet ternary operator if picture is selected we will show picture name otherwise we will show text"Add picture Here" */}
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) :
                                                    (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )
                                                }
                                            </Box>
                                        )}


                                    </Dropzone>


                                </Box>


                            </>
                        )}
                        {/* These Fields will appera both for login and sign up pages */}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                    {/* Button for register or login */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }

                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login")  //changing page type 
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.main
                                }
                            }}
                        >
                            {isLogin ? "Don't have an account ? Sign up Here." : "Already have an account ? Login Here"}
                        </Typography>
                    </Box>

                </form>

            )}

        </Formik>
    )
}

export default Form