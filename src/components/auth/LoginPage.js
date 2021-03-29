import React, {useState} from "react";

import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useUser from "../../data/use-user";
import {QuadStateView} from "../QuadStateView";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: '10em',
    width: '70%',
    margin: '0 auto',
    height: '50rem',
    maxWidth: '35rem',

  },
  center: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    'justify-content': 'center',
    'padding-bottom': '2em',
  },
  'center-button': {
    'justify-content': 'center',
    margin: '0 auto',
    width: '90%',
    display: 'flex',
    textAlign: "right",
    marginBottom: '1em'

  }
}))

export const LoginForm = ({onLogin, switchToRegisterForm}) => {
  const [userId, setUserId] = useState("");
  const classes = useStyles();
  const {login, createUser} = useUser();
  return (
      <div>
        <div className="App">
          <form className={classes.form}>
            <TextField id="outlined-basic"
                       label="User id"
                       variant="outlined"
                       onChange={(ev) => setUserId(ev.target.value)}
                       className={classes.center}
            />
            <Button variant="contained"
                    color="primary" className={classes["center-button"]}
                    onClick={() => onLogin(userId)}>
              Log in
            </Button>
            <Button variant="contained"
                    color="primary" className={classes["center-button"]}
                    onClick={switchToRegisterForm}>
              Register
            </Button>
          </form>
        </div>
      </div>
  );
}

const RegisterButton = ({user, onRegister, classes, switchToLoginForm}) => (
    <QuadStateView
        sideEffectFn={onRegister}
        initComponentFn={
          (_, trigger) =>
              <Button variant="contained"
                      color="primary"
                      onClick={() => trigger(user)}
                      className={classes["center-button"]}
              >
                Register
                </Button>
        }
        inProgressComponentFn={
            () =>
                <Button variant="contained"
                        color="primary"
                        disabled
                        className={classes["center-button"]}
                >
                    <pre>Creating new user ...  </pre>
                    <CircularProgress/>
                </Button>
        }
        successComponentFn={
          (_, __, reset) =>
              <Snackbar open autoHideDuration={2000} onClose={() => {
                reset();
                switchToLoginForm();
              }}>
                <Alert onClose={() => {
                  reset();
                  switchToLoginForm();
                }} severity="success">
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

export const RegisterForm = ({onRegister, switchToLoginForm}) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const userObj = {userId, userName};
  const classes = useStyles();
  return (
      <>

        <div className={classes.form}>
          <TextField id="outlined-basic"
                     label="User id"
                     variant="outlined"
                     onChange={(ev) => setUserId(ev.target.value)}
                     className={classes.center}
          />
          <TextField id="outlined-basic"
                     label="User Name"
                     variant="outlined"
                     onChange={(ev) => setUserName(ev.target.value)}
                     className={classes.center}
          />
          <RegisterButton onRegister={onRegister}
                          switchToLoginForm={switchToLoginForm} user={userObj}
                          classes={classes}/>
        </div>
        </>
    );
}

export const LoginPage = () => {
    const {login, createUser} = useUser();

    const [selectedTabIndex, setTabIndex] = useState(0);
    const handleTabChange = (ev, id) => setTabIndex(id);

    return (
        <TabContext value={selectedTabIndex}>
          {/*<AppBar position="static">*/}
          {/*    <TabList*/}
          {/*        onChange={handleTabChange}*/}
          {/*        variant="scrollable"*/}
          {/*        scrollButtons="on"*/}
          {/*    >*/}
          {/*        <Tab label="Login" value={0}/>*/}
          {/*        <Tab label="Register" value={1}/>*/}
          {/*    </TabList>*/}
          {/*</AppBar>*/}
          <TabPanel value={0}>
            <LoginForm onLogin={login}
                       switchToRegisterForm={() => setTabIndex(1)}/>
          </TabPanel>
          <TabPanel value={1}>
            <RegisterForm onRegister={createUser}
                          switchToLoginForm={() => setTabIndex(0)}/>
          </TabPanel>
        </TabContext>
    );
};
