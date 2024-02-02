// Rutas publicas que no necesitan de token
// redirectLogin, redirije al login en caso de que tenga un token, de lo contrario me muestra la ruta por mas que ya este logueado
export const PUBLIC_ROUTES = [
    { url: '/auth/login', redirectLogin: true },
    { url: '/auth/olvide-mi-clave', redirectLogin: true },
    { url: '/auth/registrarme', redirectLogin: true },
    { url: '/auth/resetear-clave', redirectLogin: true },
    { url: '/auth/verificar-email', redirectLogin: false },
    { url: '/test-subida-archivos', redirectLogin: false },
];