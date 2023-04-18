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
<<<<<<< HEAD
                sx={{

                    width: "90%",
                    position: "absolute",
                    top: "90%"
                }}
                component="form"
                onSubmit={sendMessage}
                noValidate

=======
                component="form"
                onSubmit={sendMessage}
                noValidate
                mt={5}
                marginLeft="2rem"
>>>>>>> 446ee95bdb525a44faffaaf2747b4be00db9335f
            >

                <TextField
                    id="outlined-multiline-flexible"
                    variant="standard"
<<<<<<< HEAD
                    multiline
                    color="primary"

                    style={{
                        width: "80%",
                        marginLeft: "15px",
=======
                    color="primary"
                    style={{
                        width: "70%"

>>>>>>> 446ee95bdb525a44faffaaf2747b4be00db9335f
                    }}
                    name="message"
                    required
                />

                <SendButton />

            </Box>
        </>
    )
}


