import PageTemplate from "@/base/components/BaseTemplate/PageTemplate";
import MyAccount from "@/base/components/Account/MyAccount";

export default function MiCuenta() {
    return (
        <PageTemplate
            title={'Mi Cuenta'}
            iconTitle={'pi pi-user'}
        >
            <MyAccount />
        </PageTemplate>
    )
}