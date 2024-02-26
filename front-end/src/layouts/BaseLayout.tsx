import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { colors } from "../utils/colors";

const { Content } = Layout;

interface BaseLayoutProps {
  children?: ReactNode;
}

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
        }}
      >
        <div
          style={{
            // backgroundColor: colors.greenLighter,
            backgroundColor: "#1e272e",
            width: "min(95%, 1000px)",
            height: "100%",
            borderRadius: "1rem",
            borderBottomLeftRadius: "2rem",
            boxShadow: `0 0 2rem ${colors.background}`,
          }}
        ></div>
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
