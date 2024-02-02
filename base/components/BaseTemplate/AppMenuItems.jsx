import AppMenuItem from "./AppMenuItem";

export default function AppMenuItems(props) {

    return (
        <ul className={`${props.classNames}`}>
            {props.menu_items.map((item) => {
                return (
                    <AppMenuItem
                        key={item.label}
                        item={item}
                    />
                )
            })}
        </ul>
    )
}