//context and state
import React, { createContext, useContext, useEffect, useState } from "react";

//auth
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

//typing for interface object
interface SignInInterface {
    currentUser: Object;
    signup: (e: string, p: string) => Promise<any>;
}

//this provides the values that will be globalized
//with the pattern we have up rn, this does not need to be exported
const AuthContext = createContext<SignInInterface | null>(null);

//returns the value of the provider below
export function useAuth() {
    return useContext(AuthContext);
}

//provides the context
export function AuthProvider({ children }: any) {
    //holds auth info
    const [currentUser, setCurrentUser] = useState({});

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            //on acc creation sign the person in
            if (!user) return;
            setCurrentUser(user);
        });

        //stop listening on component unmount
        return unsub;
    }, []);

    const value = {
        currentUser,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//auth functions
