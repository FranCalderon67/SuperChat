import React, { useState } from "react";
import { Box, Button, IconButton, TextField, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState();
    const [showRepeatPassword, setShowRepeatPassword] = useState();

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleRepeatPassword = () => {
        setShowRepeatPassword((show) => !show)
    }

    const handleMouseClickPassword = (e) => {
        e.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            passwordCheck: ""
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required("Debes completar este campo"),
            lastName: Yup
                .string()
                .required("Debes completar este campo"),
            email: Yup
                .string()
                .email("Debes ingresar un mail valido")
                .required("Debes completar este campo"),
            password: Yup
                .string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$#@$!%*?&]|[^ ]){10,15}$/,
                    "La contraseña debe incluir al menos 10 caracteres, una mayuscula, un numero y un simbolo")
                .max(255)
                .required("Debes completar este campo"),
            passwordCheck: Yup
                .string()
                .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
        }),
        onSubmit: async (values) => {
            try {
                const apiCall = await axios.post("http://localhost:8080/signup", values)
                if (apiCall.status == 200) {
                    navigate("/")
                }
            } catch (error) {
                console.log("ERROR=>", error)
            }
        }
    })

    return (
        <>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                marginTop="5rem"
            >
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        height: 500,
                        displat: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        '& .MuiTextField-root': { m: 2, width: "45ch" }
                    }}
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <TextField
                        placeholder="Juan"
                        label="Nombre"
                        id="name"
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        fullWidth
                    />

                    <TextField
                        placeholder="Perez"
                        label="Apellido"
                        id="lastName"
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />

                    <TextField
                        placeholder="ejemplo@gmail.com"
                        label="Email"
                        id="email"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
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
                    />

                    <TextField
                        label="Repetir Contraseña"
                        id="passwordCheck"
                        type={showRepeatPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordCheck && Boolean(formik.errors.passwordCheck)}
                        helperText={formik.touched.passwordCheck && formik.errors.passwordCheck}
                        value={formik.values.passwordCheck}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleRepeatPassword}
                                        onMouseDown={handleMouseClickPassword}
                                    >
                                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            m: 2
                        }}
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        Aceptar
                    </Button>

                </Box>
            </Box>
        </>
    )
}