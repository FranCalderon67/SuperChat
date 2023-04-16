import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography, IconButton, InputAdornment, Alert } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    };

    const handleMouseClickPassword = (e) => {
        e.preventDefault()
    };

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .required("Debes completar este campo"),

        password: Yup
            .string()
            .max(255)
            .required("Contraseña es requerido")

    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { setStatus, setErrors }) => {
            try {
                await axios.post("http://localhost:8080/login", values);
                setStatus({ succes: true });
                navigate("/chat");
            } catch (error) {
                console.log("ERROR=>", error);
                setStatus({ error: error.response.data.error });
                setErrors({ form: error.response.data.error })
            }
        }
    });

    return (
        <>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                marginTop="10rem"
            >
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        height: 500,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", '& .MuiTextField-root': { m: 2, width: "45ch" }
                    }}
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <TextField
                        required
                        label="Email"
                        id="email"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />

                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>

                    <TextField
                        required
                        label="Contraseña"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        value={formik.values.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseClickPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}

                                    </IconButton>

                                </InputAdornment>
                            )
                        }}
                    >
                    </TextField>

                    <Box>

                        {formik.errors.form && (
                            <Box>
                                <Alert
                                    severity="error"
                                    variant="outlined"
                                >
                                    {formik.errors.form}

                                </Alert>


                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            m: 2
                        }}
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        Ingresar
                    </Button>

                    <Typography>
                        No tienes usuario, <Link href="/signup">registrate</Link>
                    </Typography>
                </Box>
            </Box>
        </>
    )
};