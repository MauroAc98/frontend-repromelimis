/**
 * ARCHIVO PARA COLOCAR RUTAS Y PERMISOS
 */

/** Si tengo un asterisco en mi pathname
 * quiere decir que solo tengo que evaluar el principio del string, sin importar lo que venga despues
 * ------
 * Ej: Si quiero que /pagina1 /pagina1/add /pagina1/edit sean validas sin estar colocando cada una de estas rutas
 * coloco en el pathname /pagina1*
 * por lo que evaluara todo el contenido del principio /pagina1, sin importar lo que venga despues
 * ------
 * Puedo incluir desde otro archivo para que sea mas comodo, como es el caso de userPerms
 * */

export const routesPermissions = [
    {
        pathname: "/mi-cuenta",
        permission: "USER_CHANGE_PROFILE",
    },
];