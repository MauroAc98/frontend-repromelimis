import { useUserContext } from "@/base/context/userContext";

export default function usePermission() {
    const { user } = useUserContext();
    const permissions = user.permissions;

    /** Verifica si el usuario posee el permiso, de ser root, tendra acceso a todo */
    const checkPermission = (permission) => {
        return user.root ? true : permissions.includes(permission);
    }

    return {
        checkPermission
    }

}