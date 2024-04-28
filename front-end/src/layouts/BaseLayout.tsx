import {
  BugFilled,
  GithubFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import { FloatButton, Layout, Row, Space, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import BreakpointComp, { breakpointCheck } from "../components/BreakpointComp";
import { EBreakpoints } from "../utils/breakpoint";
import { colors } from "../utils/colors";
import { copyTextClipboard, openNewTabURL } from "../utils/functions";
import "./scss/BaseLayout.scss";

const { Content } = Layout;

interface BaseLayoutProps {
  children?: ReactNode;
}

const navBarElement = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "stats", title: "Statistics" },
  { id: "project", title: "Project" },
  { id: "footer", title: "Contact" },
];

const contactFloatBtn = [
  {
    title: "Linkedin",
    icon: <LinkedinFilled />,
    action: () => {
      openNewTabURL(
        "https://www.linkedin.com/in/pongsatorn-phetmak-9100bb261/"
      );
    },
  },
  {
    title: "Github",
    icon: <GithubFilled />,
    action: () => {
      openNewTabURL("https://github.com/b144p");
    },
  },
  {
    title: "Copy-Email",
    icon: <MailOutlined />,
    action: () => copyTextClipboard("pongsatorn144p@gmail.com"),
  },
  // { title: 'QrCode', icon: <QrcodeOutlined />, action: () => {} },
];

const BaseLayout: FC<BaseLayoutProps> = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = navbarRef.current;
      if (element) {
        element.style.transform =
          prevScrollPos > window.scrollY
            ? "unset"
            : "translateY(calc(-100% - 2px))";
        setPrevScrollPos(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <div style={{ position: "fixed", right: 10, top: 10 }}>
        {prevScrollPos}
      </div>
      <div>
        {breakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm }) ? (
          <div className="">
            <label className="burger-btn" htmlFor="burger">
              <input
                type="checkbox"
                id="burger"
                onClick={() => setSideBarOpen((prev) => !prev)}
                checked={sideBarOpen}
              />
              <span />
              <span />
              <span />
            </label>
            <div
              className={`
                side-container
                ${
                  sideBarOpen ? "nav-list-burger-open" : "nav-list-burger-close"
                }
              `}
              onClick={() => setSideBarOpen((prev) => !prev)}
            >
              <div className="side-container-list">
                <ul>
                  {navBarElement.map((list) => (
                    <li key={"#" + list.id}>
                      <a href={"#" + list.id}>
                        <span>{list.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Header ref={navbarRef} className="navbar-container-header">
            <div className="navbar-container">
              <a className="navbar-logo" href="#">
                <span>
                  <BugFilled />
                </span>
              </a>
              {navBarElement.map((list) => (
                <a
                  className="navbar-list"
                  href={"#" + list.id}
                  key={"#" + list.id}
                >
                  <span>{list.title}</span>
                </a>
              ))}
            </div>
          </Header>
        )}
      </div>

      <Content
        style={{
          minHeight: 120,
          lineHeight: "120px",
          backgroundColor: colors.background,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Content>
      <footer
        style={{
          textAlign: "center",
          color: colors.brightText,
          display: "flex",
          justifyContent: "center",
          backgroundColor: colors.navBackground,
          boxShadow: `0 0 1rem 0.5rem ${colors.brightText}10`,
        }}
        id="footer"
      >
        <Row
          justify={
            breakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm })
              ? "center"
              : "space-between"
          }
          align="middle"
          style={{
            width: "calc(100% - 10rem)",
          }}
        >
          {/* SwapDynamo Corporation © 2024 */}
          BT_144p © 2024
          <BreakpointComp mode=">" breakpoint={EBreakpoints.sm}>
            <Space split style={{ fontSize: "2rem" }}>
              {contactFloatBtn.map((contact) => (
                <Tooltip title={contact.title}>
                  <span onClick={contact.action} style={{ cursor: "pointer" }}>
                    {contact.icon}
                  </span>
                </Tooltip>
              ))}
            </Space>
          </BreakpointComp>
        </Row>
      </footer>

      <BreakpointComp mode="<=" breakpoint={EBreakpoints.sm}>
        <FloatButton.Group
          className="float-btn"
          trigger="click"
          icon={<PhoneFilled />}
        >
          {contactFloatBtn.map((contact) => (
            <FloatButton
              className="float-btn"
              icon={contact.icon}
              onClick={contact.action}
            />
          ))}
        </FloatButton.Group>
      </BreakpointComp>
    </Layout>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
