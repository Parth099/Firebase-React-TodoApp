//context and state
import { createContext, useContext, useEffect, useState } from "react";

//auth
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

//typing for interface object
interface SignInInterface {
    currentUser: Object | undefined;
    signup: (e: string, p: string) => Promise<any>;
    login: (e: string, p: string) => Promise<any>;
    logout: () => Promise<void>;
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
    const [firebaseLoading, setFirebaseLoading] = useState(true);

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user || Object.keys(user).length === 0) {
                setCurrentUser(undefined);
            } else {
                setCurrentUser(user);
            }

            //allow children to render after initial mount
            setFirebaseLoading(false);
        });

        //stop listening on component unmount
        return unsub;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    //render only if loading of the auth state has finished
    return <>{!firebaseLoading && <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}</>;
    //the <> fragment is the satisfy the typescript
}

//auth functions

/*
Above is a very important react design pattern for context

Here is how it works:
AuthContext is first created using the context hook. It will be the provider. 
Then we render all the children under the provider as they will be able to access its context
*/
