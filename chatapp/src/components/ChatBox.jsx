import React from "react";
import { Box } from "@mui/material";

import { MessageContainer } from "./MessageContainer.jsx";
import { UserNavbar } from "./UserNavbar.jsx";
import { MainNavbar } from "./MainNavbar.jsx";
export const ChatBox = () => {

    return (
        <>
            <MainNavbar />
            <Box
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