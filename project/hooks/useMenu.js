import usePermission from "@/base/hooks/usePermission";

export default function useMenu() {
    const { checkPermission } = usePermission();

    const menuModel = [
        {
            label: "Secciones",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    url: "/",
                    visible: true,
                },
                {
                    label: "Trámites",
                    icon: "pi pi-book",
                    visible: true,
                    url: "/tramites",
                },
                {
                    label: "Guias de traslado",
                    icon: "pi pi-arrow-right-arrow-left",
                    visible: true,
                    items: [
                        {
                            label: "Solicitudes",
                            icon: "pi pi-book",
                            visible: true,
                            url: "/guias-traslado/solicitudes",
                        },
                        {
                            label: "Guias",
                            icon: "pi pi-book",
                            visible: true,
                            url: "/guias-traslado",
                        }
                    ]
                },
            ],
        },
    ];

    return {
        menuModel
    };
}