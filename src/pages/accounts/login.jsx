import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet-async";
import {Box, Card, CardContent, Container, Divider, Link, Typography} from "@material-ui/core";
import Logo from "../../components/general/Logo";
import LoginForm from "../../components/accounts/LoginForm";
import {Link as RouterLink} from "react-router-dom";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login | Tasks App</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}
            >
                {/* <AuthBanner /> */}
                <Container
                    maxWidth="sm"
                    sx={{py: "80px"}}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 8
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
                                        Log in
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Log in on the internal platform
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
                                        src="/static/icons/jwt.svg"
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3
                                }}
                            >
                                {<LoginForm/>}
                            </Box>
                            <Divider sx={{my: 3}}/>
                            <Link
                                color="textSecondary"
                                component={RouterLink}
                                to="/authentication/register"
                                variant="body2"
                            >
                                Create new account
                            </Link>
                            <Link
                                color="textSecondary"
                                component={RouterLink}
                                sx={{mt: 1}}
                                to="/authentication/password-recovery"
                                variant="body2"
                            >
                                Forgot password
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default Login;
