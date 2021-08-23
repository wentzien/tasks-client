import {createContext, useEffect, useReducer} from "react";
import PropTypes from "prop-types";
import authService from "../services/authService";
import userService from "../services/userService";
import httpService from "../services/httpService";

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};


const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
})

export const AuthProvider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const token = authService.getToken();

                if (token) {
                    const user = await authService.me(token);

                    dispatch({
                        type: "INITIALIZE",
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: "INITIALIZED",
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: "INITIALIZED",
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (attemptingUser) => {
        const token = await authService.login(attemptingUser);
        const user = authService.me(token);

        authService.setToken(token);

        dispatch({
            type: "LOGIN",
            payload: {
                user
            }
        });
    };

    const logout = () => {
        authService.removeToken();
        httpService.removeTokenHeader();
        dispatch({type: "LOGOUT"});
    };

    const register = async (newUser) => {
        const token = await userService.register(newUser);
        const user = authService.me(token);

        authService.setToken(token);

        dispatch({
            type: "REGISTER",
            payload: {
                user
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthContext;
