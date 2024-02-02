import React, { useEffect, useState, useContext } from "react";
import { removeToken } from "@/base/helpers/api";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES } from "@/project/helpers/publicRoutes";
import api from "@/base/helpers/api";
import { useToastContext } from "./ToastContext";
import { useGeneralContext } from "./GeneralContext";

const userContext = React.createContext();

export function UserProvider(props) {
    const router = useRouter();
    const { showErrorMsg } = useToastContext();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();

    const [user, setUser] = useState(null);

    const setSessionData = (data) => {
        // Datos de usuario
        let userData = {
            ...data,
            root: true, // ya que no habra permisos por el momento
            permissions: [] // dejamos vacios los permisos
        };

        // Guardamos datos de usuario
        setUser(userData);
    }

    const getSessionData = async () => {
        try {
            const { data } = await api.get("/auth-externo/get-session-data");
            // Almacenamos nuevamente datos de la session
            setSessionData(data);
        } catch (error) {

        }
    }

    const logout = async () => {
        try {
            showBackdropLoader();
            await api.post("/auth-externo/logout");
            // Limpiamos datos de usuario y redirigimos
            setUser(null);
            removeToken();
            router.push('/auth/login');
        } catch (error) {
            showErrorMsg('Ocurrió un error al cerrar sesión. Intente nuevamente')
        } finally {
            hideBackdropLoader();
        }
    }

    /** Obtenemos nuevamente los datos de usuario al hacer un refresh de la aplicacion */
    useEffect(() => {
        if (!PUBLIC_ROUTES.some((route) => route.url === router.pathname)) {
            getSessionData();
        }
    }, [])

    const data = {
        user,
        setSessionData,
        logout,
        getSessionData
    };

    return (
        <userContext.Provider value={data}>
            {props.children}
        </userContext.Provider>
    );
}
export const useUserContext = () => useContext(userContext);