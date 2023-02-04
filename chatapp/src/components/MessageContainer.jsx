import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios"
import io from "socket.io-client"
const socket = io.connect("http://2530956b399a:3000")
export const MessageContainer = () => {
    const [message, setMessage] = useState()

    const getMessage = async () => {
        try {
            const getMessage = axios.get('http://2530956b399a:3000/messages')
            const result = await getMessage
            const allMessages = result.data.map((m) => { return <p key={m._id}> {m.message}  </p> })
            setMessage(allMessages)
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

    useEffect(() => {
        getMessage()
    }, [])


    useEffect(() => {
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