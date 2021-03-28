import React, {useState} from "react";


import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useUser from "../../data/use-user";
import {QuadStateView} from "../QuadStateView";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export const LoginForm = ({onLogin}) => {
    const [userId, setUserId] = useState("");
    return (
        <>
            <TextField id="outlined-basic"
                       label="User id"
                       variant="outlined"
                       onChange={(ev) => setUserId(ev.target.value)}
            />

            <br/>
            <Button variant="contained"
                    color="primary"
                    onClick={() => onLogin(userId)}
            >
                Login
            </Button>
        </>
    );
}


const RegisterButton = ({user, onRegister}) => (
    <QuadStateView
        sideEffectFn={onRegister}
        initComponentFn={
            (_, trigger) =>
                <Button variant="contained"
                        color="primary"
                        onClick={() => trigger(user)}
                >
                    Register
                </Button>
        }
        inProgressComponentFn={
            () =>
                <Button variant="contained"
                        color="primary"
                        disabled
                >
                    <pre>Creating new user ...  </pre>
                    <CircularProgress/>
                </Button>
        }
        successComponentFn={
            (_, __, reset) =>
                <Snackbar open autoHideDuration={2000} onClose={reset}>
                    <Alert onClose={reset} severity="success">
                        Registration Successful, Please login!
                    </Alert>
                </Snackbar>
        }
        errorComponentFn={
            ({error}, _, reset) =>
                <Snackbar open autoHideDuration={5000} onClose={reset}>
                    <Alert onClose={reset} severity="error">
                        Failed to create user!
                        Error : {error?.toString()}
                    </Alert>
                </Snackbar>
        }
    />
)

export const RegisterForm = ({onRegister}) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const userObj = {userId, userName};

    return (
        <>
            <TextField id="outlined-basic"
                       label="User id"
                       variant="outlined"
                       onChange={(ev) => setUserId(ev.target.value)}
            />
            <br/>

            <TextField id="outlined-basic"
                       label="User Name"
                       variant="outlined"
                       onChange={(ev) => setUserName(ev.target.value)}
            />

            <br/>
            <RegisterButton onRegister={onRegister} user={userObj}/>
        </>
    );
}

export const LoginPage = () => {
    const {login, createUser} = useUser();

    const [selectedTabIndex, setTabIndex] = useState(0);
    const handleTabChange = (ev, id) => setTabIndex(id);

    return (
        <TabContext value={selectedTabIndex}>
            <AppBar position="static">
                <TabList
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="on"
                >
                    <Tab label="Login" value={0}/>
                    <Tab label="Register" value={1}/>
                </TabList>
            </AppBar>
            <TabPanel value={0}>
                <LoginForm onLogin={login}/>
            </TabPanel>
            <TabPanel value={1}>
                <RegisterForm onRegister={createUser}/>
            </TabPanel>
        </TabContext>
    );
};
