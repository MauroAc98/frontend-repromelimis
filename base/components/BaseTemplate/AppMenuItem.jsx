import { useRouter } from "next/router";
import { useState } from "react";
import AppMenuItems from "./AppMenuItems";

export default function AppMenuItem(props) {
    const router = useRouter();

    // Verificamos si tenemos un submenu, para poder generar los items
    const isSubmenu = props.item?.items?.length;
    const [activeClass, setActiveClass] = useState('');
    const [liElementClass, setLiElementClass] = useState('')


    const handleClick = (event) => {
        event.preventDefault();
        // Si es un submenu, abrimos el menu
        if (isSubmenu) {
            if (activeClass === '' || activeClass === 'layout_submenu_exit') {
                setActiveClass('layout_submenu_enter_active');
                setLiElementClass('active_menuitem');
                setTimeout(() => {
                    setActiveClass('layout_submenu_enter_done');
                }, 500);
            } else if (activeClass === 'layout_submenu_enter_done') {
                setActiveClass('layout_submenu_exit_active');
                setLiElementClass('');
                setTimeout(() => {
                    setActiveClass('layout_submenu_exit');
                }, 500);
            }
        } else {
            // De lo contrario redirigimos a la pagina            
            router.push(props.item.url);
        }
    }

    return (
        <li className={liElementClass}>
            {props.item.visible && (
                <>
                    <a onClick={handleClick} className="p-ripple">
                        <i className={['layout_menuitem_icon', props.item.icon].join(' ')}></i>
                        <span className={'layout_menuitem_text'}>{props.item?.label}</span>
                        {isSubmenu && <i className="pi pi-fw pi-angle-down layout_submenu_toggler"></i>}
                    </a>
                    {isSubmenu && (
                        <AppMenuItems
                            menu_items={props.item.items}
                            classNames={['submenu', activeClass].join(" ")}
                        />
                    )}
                </>
            )}
        </li>
    )
}