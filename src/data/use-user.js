import {authService} from "../services/AuthService";
import {useRouter} from 'next/router'
import {useCallback, useEffect, useState} from "react";
import {jsonFetcher} from "../intg/client";


export const createUser = ({userId, userName}) => jsonFetcher('/api/user', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user_id: userId,
        name: userName
    })
});


export const addRating = ({userId, domainId, rating}) => jsonFetcher('/api/user/rating', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user_id: userId,
        domain_id: domainId,
        rating
    })
});


export const useUser = ({
                            redirectToWhenLoggedOut = '/login',
                            afterLogin = null
                        } = {}) => {
    const router = useRouter();

    const [inProgress, setInProgress] = useState(false);

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(async () => {
        const user = authService.getCurrentLoggedInUser();

        if (!user) {
            await router.push(redirectToWhenLoggedOut);
        } else {
            setLoggedInUser(user);
        }
    }, []);

    const login = useCallback(async (userId) => {
        setInProgress(true);

        const userObj = await jsonFetcher(`/api/user/${userId}`);
        authService.setLoggedInUser(userObj);
        if (!afterLogin) {
            router.back();
        } else {
            await router.replace(afterLogin);
        }
    }, []);


    const logout = useCallback(async () => {
        setInProgress(true);
        authService.setLoggedInUser(null);
        await router.push(redirectToWhenLoggedOut);
    }, []);


    return {
        inProgress,
        login,
        loggedInUser,
        logout,
        createUser
    };
};

export default useUser
