import style from "./Topbar.module.css";
import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserContext } from "@/base/context/userContext";

export default function Topbar(props) {
  const { logout, user } = useUserContext();

  const menu = useRef(null);
  const router = useRouter();

  const items_menu = [
    {
      template: (item, options) => {
        return (
          <div className="p-2 font-bold	text-center">{user.nombre_apellido}</div>
        );
      },
    },
    { separator: true },
    {
      label: "Mi Cuenta",
      icon: "pi pi-user",
      command: () => {
        router.push("/mi-cuenta");
      },
    },
    {
      label: "Cerrar Sesión",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        logout();
      },
    },
  ];

  const handleClickMenuBars = () => {
    props.setMenuState((prevMenuState) => {
      if (prevMenuState === "open") {
        return "hide";
      } else {
        return "open";
      }
    });
  };

  return (
    <div className={style.layout_topbar}>
      <div className={style.layout_topbar_logo}>
        <Link href="/" className="flex align-items-center">
          <img
            className="topbar_logo_img"
            src={process.env.topbar_logo}
            alt="logo"
          />
        </Link>
        <span className="proyect_title">
          {process.env.project_title_topbar}
        </span>
      </div>
      <button
        type="button"
        className={[
          "p-link",
          style.layout_menu_button,
          style.layout_topbar_button,
        ].join(" ")}
        onClick={handleClickMenuBars}
      >
        <i className={["pi pi-bars", style.layout_topbar_icon].join(" ")} />
      </button>

      <div className={style.layout_topbar_menu}>
        <Menu model={items_menu} popup ref={menu} />
        <div
          className="cursor-pointer flex"
          onClick={(event) => menu.current.toggle(event)}
        >
          <button
            type="button"
            className={[
              "p-link",
              style.layout_topbar_button,
              style.layout_topbar_user_button,
            ].join(" ")}
          >
            <i
              className={["pi pi-user", style.layout_topbar_icon].join(" ")}
            ></i>
          </button>
          <div className={[style["user_name"], "topbar_username"].join(" ")}>
            {props.user.name}
          </div>
        </div>
      </div>
    </div>
  );
}
