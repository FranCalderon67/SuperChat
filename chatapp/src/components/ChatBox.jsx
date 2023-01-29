import { Box } from "@mui/material";
import React from "react";
import { MessageForm } from "./Form.jsx"
import { MessageContainer } from "./MessageContainer.jsx";

export const ChatBox = () => {

    return (
        <>
            <Box
                mt={2}
                sx={{
                    marginLeft: "32px",
                    border: 5,
                    width: "90%",
                    height: "100%",
                }}
            >
                <MessageContainer />
                <MessageForm />
            </Box>
        </>
    )
}