import { BugFilled } from "@ant-design/icons";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../utils/colors";

const { Content } = Layout;

interface BaseLayoutProps {
  children?: ReactNode;
}

const NavBarStyle = styled.div`
  background-color: ${colors.navBackground};
  width: min(90%, 800px);
  height: 100%;
  border-radius: 1rem 1rem 1rem 2rem;
  box-shadow: 0 0 2rem ${colors.background};
  transform: skew(20deg);

  .navbar-container {
    display: flex;
    cursor: pointer;

    .navbar-logo {
      flex-grow: 1;
      text-align: center;
      border-radius: 1rem 0 0 2rem;
      background-color: ${colors.greenLight};
      color: ${colors.brightText};
      span {
        transform: skew(-20deg);
      }
    }

    .navbar-list {
      flex-grow: 2;
      text-align: center;
      font-style: italic;
      color: ${colors.primaryText};
      transition: all 0.3s ease-in-out;
      span {
        transform: skew(-20deg);
      }
    }

    .navbar-list:hover {
      background-color: ${colors.greenLight};
      color: ${colors.brightText};
      border-left: 0.25rem double ${colors.brightText};
    }

    .navbar-list:last-child:hover {
      border-radius: 0 1rem 1rem 0;
    }
  }
`;

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
      <Header
        ref={navbarRef}
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: 2,
          width: "100vw",
          backgroundColor: "transparent",
          zIndex: 10,
          transition: "all 0.5s ease-in-out",
          padding: 0,
        }}
      >
        <NavBarStyle>
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
        </NavBarStyle>
      </Header>
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
