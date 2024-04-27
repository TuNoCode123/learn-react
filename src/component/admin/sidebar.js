import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <>
      <Sidebar>
        <Menu>
          <MenuItem> Dashboard </MenuItem>
          <SubMenu label="Features">
            <li className="ps-menuitem-root css-1tqrhto">
              <Link to="/admin/manage" className="ps-menu-button">
                quản lí bài user
              </Link>
            </li>
            <MenuItem> quản lí bài quizz </MenuItem>
            <MenuItem> quản lí câu hỏi </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      ;
    </>
  );
};
export default SideBar;
