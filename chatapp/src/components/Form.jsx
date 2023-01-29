import React from "react";
import { TextField, Box } from "@mui/material"
import { SendButton } from "./SendButton";
import axios from "axios";
import io from "socket.io-client"
const socket = io()
export const MessageForm = () => {
    const sendMessage = async (event) => {
        event.preventDefault()
        const message = event.target.message.value;
        socket.emit("new-message", message)
        try {
            await axios.post("http://localhost:8080/send", { message: message })
            event.target.reset()
        } catch (error) {
            console.log("ERROR=>", error)
        }
    }

    socket.on("messages", (message) => { sendMessage(message) })

    return (
        <>
            <Box
                sx={{

                    width: "90%",
                    position: "absolute",
                    top: "90%"
                }}
            >
                <form
                    method="post"
                    onSubmit={sendMessage}
                >
                    <TextField
                        id="outlined-multiline-flexible"
                        variant="standard"
                        multiline
                        color="primary"

                        style={{
                            width: "80%",
                            marginLeft: "15px",
                        }}
                        name="message"
                        required
                    />
                    <SendButton />
                </form>
            </Box>
        </>
    )
}


