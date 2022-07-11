//context and state
import { createContext, useContext, useEffect, useState } from "react";

//auth
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

//typing for interface object
interface SignInInterface {
    currentUser: Object | undefined;
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
    const [currentUser, setCurrentUser] = useState<Object | undefined>();

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            //on acc creation sign the person in
            if (!user) return;
            if (Object.keys(user).length === 0) {
                //set to undefined for easy react render later
                setCurrentUser(undefined);
            } else {
                setCurrentUser(user);
            }
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

/*
Above is a very important react design pattern for context

Here is how it works:
AuthContext is first created using the context hook. It will be the provider. 
Then we render all the children under the provider as they will be able to access its context
*/
