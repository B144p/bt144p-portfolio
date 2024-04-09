import { BugFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { breakpointCheck } from "../components/BreakpointComp";
import { EBreakpoints } from "../utils/breakpoint";
import { colors } from "../utils/colors";
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
  { id: "contact", title: "Contact" },
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
          color: "red",
        }}
      >
        SwapDynamo Corporation © 2024
      </footer>
    </Layout>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
