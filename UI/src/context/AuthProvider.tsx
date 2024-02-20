"use client";
import api from "@/lib/api";
import React, {
    Dispatch,
    useContext,
    useEffect,
    useState,
    useTransition,
} from "react";
import Cookies from "js-cookie";

type AuthProviderProps = {
    children: React.ReactNode;
};

type User = {
    email: string;
    id: number;
    name: string;
    profile: {
        avatar: string | null;
        background: string | null;
        description: string | null;
        gender: "FEMALE" | "MALE" | "ORTHER";
    };
};

interface IAuthContext {
    user: User | null;
    loading: boolean;
    setUser: Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, startFetchUser] = useTransition();

    useEffect(() => {
        startFetchUser(() => {
            auth().then((data) => setUser(data));
        });
    }, []);

    const values = { user, setUser, loading };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

const auth = async (): Promise<User | null> => {
    const userStorage = localStorage.getItem("user");

    const token = Cookies.get("access_token");

    if (!token) {
        localStorage.clear();
        return null;
    }

    try {
        if (userStorage) {
            return JSON.parse(userStorage);
        }
    } catch (error) {
        console.log({ error });
    }

    try {
        const reponse = await api("/users/info");
        const data = reponse.data;
        console.log({ data });

        const mockData: User = {
            email: "test@gmail.com",
            id: 1,
            name: "test user",
            profile: {
                avatar: null,
                background: null,
                description: null,
                gender: "FEMALE",
            },
        };

        localStorage.setItem("user", JSON.stringify(mockData));

        return mockData;
    } catch (error: any) {
        console.log({ error });
        return null;
    }
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };
