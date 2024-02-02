import AppMenuItems from "./AppMenuItems";
import useMenu from "@/project/hooks/useMenu";

export default function Sidebar() {
  const { menuModel } = useMenu();

  return (
    <ul className={"layout_menu"}>
      {menuModel.map((item) => {
        return (
          <li key={item.label} className={["layout_root_menuitem"].join(" ")}>
            <div className={"layout_menuitem_root_text"}>{item.label}</div>
            <AppMenuItems
              menu_items={item.items}
              add_submenu_class={false}
              classNames={""}
            />
          </li>
        );
      })}
    </ul>
  );
}
