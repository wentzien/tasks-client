import React from "react";
import RegisterForm from "../../components/authentication/RegisterForm";
import {Helmet} from "react-helmet-async";
import {Link as RouterLink} from "react-router-dom";
import { Box, Card, CardContent, Container, Divider, Link, Typography } from "@mui/material";
import AuthBanner from "../../components/authentication/AuthBanner";
import Logo from "../../components/general/Logo";

const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register | Tasks App</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}
            >
                <AuthBanner />
                <Container
                    maxWidth="sm"
                    sx={{ py: "80px" }}
                >
                    <Box
                        sx={{
                            mb: 8,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <RouterLink to="/">
                            <Logo
                                sx={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                        </RouterLink>
                    </Box>
                    <Card>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                p: 4
                            }}
                        >
                            <Box
                                sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 3
                                }}
                            >
                                <div>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        Register
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Register on the internal platform
                                    </Typography>
                                </div>
                                <Box
                                    sx={{
                                        height: 32,
                                        "& > img": {
                                            maxHeight: "100%",
                                            width: "auto"
                                        }
                                    }}
                                >
                                    <img
                                        alt="Auth platform"
                                        src="/static/icons/rocket2.svg"
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3
                                }}
                            >
                                <RegisterForm/>
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Link
                                color="textSecondary"
                                component={RouterLink}
                                to="/authentication/login"
                                variant="body2"
                            >
                                Having an account
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default Register;
