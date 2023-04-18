import React from "react";
import { Box } from "@mui/material";

import { MessageContainer } from "./MessageContainer.jsx";
import { UserNavbar } from "./UserNavbar.jsx";
import { FriendData } from "./FriendData.jsx";
export const ChatBox = () => {

    return (
        <>
            <Box
                mt={2}
                display="flex"
                width="100%"
                height="100%"
            >
                <UserNavbar />


                <MessageContainer />

            </Box>
        </>
    )
}