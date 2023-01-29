import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios"
export const MessageContainer = () => {
    const [message, setMessage] = useState()

    useEffect(() => {
        const getMessage = async () => {
            try {
                const getMessage = axios.get('http://localhost:8080/messages')
                const result = await getMessage
                const allMessages = result.data.map((m) => { return <p key={m._id}> {m.message}  </p> })
                setMessage(allMessages)
            } catch (error) {
                console.log("ERROR=>", error)
            }
        }
        getMessage()
    }, [])

    return (
        <>
            <Box
                mt={2}
            >
                <Typography>
                    {message}
                </Typography>
            </Box>
        </>
    )
}