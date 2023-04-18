import React from "react";
import { AppBar, Box, Toolbar, Typography, Stack, Avatar } from "@mui/material"


export const UserNavbar = () => {
    return (
        <>
            <Box
                width="30%"
            >
                <AppBar
                    position="static"
                >
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', sm: 'block' },
                                marginLeft: "1rem"
                            }}
                        >
                            Francisco Calderon
                        </Typography>
                        <Stack>
                            <Avatar>

                            </Avatar>


                        </Stack>


                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}