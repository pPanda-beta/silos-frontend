const LOGGED_IN_USER_KEY = "loggedInUser";

class AuthService {

    storage = () => typeof window === "undefined" ? null : window.localStorage;

    getCurrentLoggedInUser = () => {
        const serializedUserObj = this.storage()?.getItem(LOGGED_IN_USER_KEY);

        return serializedUserObj && JSON.parse(serializedUserObj)
    };

    setLoggedInUser = (userObj) => this.storage()
        ?.setItem(LOGGED_IN_USER_KEY,
            JSON.stringify(userObj));

}


export const authService = new AuthService();