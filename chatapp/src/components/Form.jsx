import React from "react";
import { TextField, Box, Button } from "@mui/material"
import { SendButton } from "./SendButton";
import axios from "axios";
import io from "socket.io-client"
// const socket = io.connect('https://super-chat-2w3x.onrender.com')
const socket = io.connect("http://localhost:8080")
export const MessageForm = () => {

    const sendMessage = async (event) => {
        event.preventDefault()
        const message = event.target.message.value;
        socket.emit("new-message", { message: message })
        try {
            await axios.post("http://localhost:8080/send", { message: message })
            event.target.reset()
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }


    return (
        <>
            <Box
                component="form"
                onSubmit={sendMessage}
                noValidate
                mt={5}
                marginLeft="2rem"
            >

                <TextField
                    id="outlined-multiline-flexible"
                    variant="standard"
                    color="primary"
                    style={{
                        width: "70%"

                    }}
                    name="message"
                    required
                />

                <SendButton />

            </Box>
        </>
    )
}


