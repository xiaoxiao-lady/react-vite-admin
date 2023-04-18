import { useGetCurrentMenus } from "@/api";
import { MenuChild, MenuList } from "@/models/menu.interface";
import { userState } from "@/stores/user";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useGuide } from "../guide/useGuide";

import { ReactComponent as LogoSvg } from "@/assets/logo/react.svg";
import { useLocale } from "@/locales";
import { FrownOutlined, HeartOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuDataItem } from "@ant-design/pro-layout";
import ProLayout from "@ant-design/pro-layout";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import RightContent from "./components/RightContent";
import styles from "./index.module.less";
import { addMenus } from "./menu";

const history = createBrowserHistory();

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  const { data: menuList, error } = useGetCurrentMenus();
  
  const [user, setUser] = useRecoilState(userState);
  const [pathname, setPathname] = useState("/welcome");
  const { device, collapsed, newUser, settings } = user;
  const isMobile = device === "MOBILE";
  const { driverStart } = useGuide();
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  useEffect(() => {
    newUser && driverStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      onCollapse={toggle}
      formatMessage={formatMessage}
      onMenuHeaderClick={() => history.push("https://reactjs.org/")}
      headerTitleRender={(logo, title, props) => (
        <a
          className={styles.layoutPageHeader}
        >
          <LogoSvg  />
          {title}
        </a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: formatMessage({ id: "menu.home" }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menuList?.concat(addMenus))}
      // menuDataRender={() => m}
      rightContentRender={() => <RightContent />}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
