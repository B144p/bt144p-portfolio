"use client";

import {
  BugFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  MailOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import { FloatButton, Layout, Row, Space, Tooltip } from "antd";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import BreakpointComp, { useBreakpointCheck } from "../components/BreakpointComp";
import { EBreakpoints } from "../utils/breakpoint";
import { colors } from "../utils/colors";
import { copyTextClipboard, openNewTabURL } from "../utils/functions";
import "./scss/BaseLayout.scss";
import { useContacts, type IContact } from "@/features/contact/client";
import {
  FRONTEND_VERSION_KEY,
  useFrontendVersion,
} from "@/features/frontend-version/client";

const { Content, Header } = Layout;

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

const getContactConfig = (contact: IContact) => {
  const t = contact.title.toLowerCase();
  if (t.includes("linkedin"))
    return { icon: <LinkedinFilled />, action: () => openNewTabURL(contact.url) };
  if (t.includes("github"))
    return { icon: <GithubFilled />, action: () => openNewTabURL(contact.url) };
  if (t.includes("email") || t.includes("mail"))
    return { icon: <MailOutlined />, action: () => copyTextClipboard(contact.url) };
  return { icon: <LinkOutlined />, action: () => openNewTabURL(contact.url) };
};

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const breakpointCheck = useBreakpointCheck();

  const { data: contacts = [] } = useContacts();
  const contactButtons = contacts.map((c) => ({
    title: c.title,
    ...getContactConfig(c),
  }));

  const { data: frontendVersions } = useFrontendVersion();
  const siteViews = frontendVersions?.versions.find(
    (v) => v.key === FRONTEND_VERSION_KEY,
  )?.views;

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
      <div>
        {breakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm }) ? (
          <div className="">
            <label className="burger-btn" htmlFor="burger">
              <input
                type="checkbox"
                id="burger"
                onChange={() => setSideBarOpen((prev) => !prev)}
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
        {children}
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
          BT_144p © 2024{siteViews !== undefined && ` · ${siteViews.toLocaleString("en-US")} views`}
          <BreakpointComp mode=">" breakpoint={EBreakpoints.sm}>
            <Space split style={{ fontSize: "2rem" }}>
              {contactButtons.map((contact) => (
                <Tooltip key={contact.title} title={contact.title}>
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
          {contactButtons.map((contact) => (
            <FloatButton
              key={contact.title}
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

export default BaseLayout;
