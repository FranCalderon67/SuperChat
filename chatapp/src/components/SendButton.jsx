import React from "react";
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";

export const SendButton = () => {

    return (
        <>
            <Button
                type="submit"
            >
                <SendIcon fontSize="medium" />
            </Button>
        </>
    )
}