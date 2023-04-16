import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios"
import io from "socket.io-client"
// const socket = io.connect("https://super-chat-2w3x.onrender.com")
const socket = io.connect("http://localhost:8080")
export const MessageContainer = () => {
    const [message, setMessage] = useState()

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

    useEffect(() => {
        getMessage()
        socket.on("messages", (data) => {
            getMessage(data)
        })
    }, [socket])

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