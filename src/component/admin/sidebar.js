import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <>
      <Sidebar>
        <Menu>
          <span className="ps-menuitem-root ps-submenu-root css-16jesut">
            <Link to="/admin/dashboard" className="ps-menu-button">
              Dashboard
            </Link>
          </span>
          <SubMenu label="Features">
            <li className="ps-menuitem-root ps-submenu-root css-16jesut">
              <Link to="/admin/manage" className="ps-menu-button">
                quản lí bài user
              </Link>
            </li>
            <li className="ps-menuitem-root ps-submenu-root css-16jesut">
              <Link to="/admin/quizz" className="ps-menu-button">
                quản lí bài quizz
              </Link>
            </li>
            <li className="ps-menuitem-root ps-submenu-root css-16jesut">
              <Link to="/admin/question" className="ps-menu-button">
                quản lí bài question
              </Link>
            </li>
          </SubMenu>
        </Menu>
      </Sidebar>
      ;
    </>
  );
};
export default SideBar;
