"use client";

import {
  EnvelopeSimple,
  GithubLogo,
  LinkSimple,
  LinkedinLogo,
  List,
  Phone,
} from "@phosphor-icons/react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useBreakpointCheck } from "../components/BreakpointComp";
import { BugIcon } from "../components/icons/BugIcon";
import { Button } from "@/components/ui/button";
import { FloatButtonGroup } from "@/components/ui/float-button-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EBreakpoints } from "../utils/breakpoint";
import { copyTextClipboard, openNewTabURL } from "../utils/functions";
import { useContacts, type IContact } from "@/features/contact/client";
import {
  FRONTEND_VERSION_KEY,
  useFrontendVersion,
} from "@/features/frontend-version/client";

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
    return { icon: <LinkedinLogo />, action: () => openNewTabURL(contact.url) };
  if (t.includes("github"))
    return { icon: <GithubLogo />, action: () => openNewTabURL(contact.url) };
  if (t.includes("email") || t.includes("mail"))
    return { icon: <EnvelopeSimple />, action: () => copyTextClipboard(contact.url) };
  return { icon: <LinkSimple />, action: () => openNewTabURL(contact.url) };
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
    <TooltipProvider>
      <div className="min-h-screen overflow-hidden rounded-lg">
        <div>
          {breakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm }) ? (
            <Sheet open={sideBarOpen} onOpenChange={setSideBarOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="fixed top-8 right-8 z-20 rounded-full"
                  />
                }
              >
                <List className="size-6" />
                <span className="sr-only">Open navigation</span>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col">
                  {navBarElement.map((list) => (
                    <a
                      key={"#" + list.id}
                      href={"#" + list.id}
                      className="px-8 py-3 text-2xl text-primary-text hover:bg-green-light hover:text-bright-text"
                      onClick={() => setSideBarOpen(false)}
                    >
                      {list.title}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <header
              ref={navbarRef}
              className="fixed z-10 flex w-screen justify-center bg-transparent transition-all duration-500 ease-in-out"
            >
              <div className="flex w-[min(90%,800px)] skew-x-[20deg] cursor-pointer rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-[2rem] bg-nav-background shadow-[0_0_2rem_var(--background)]">
                <a
                  className="grow rounded-tl-2xl rounded-bl-[2rem] bg-green-light text-center text-bright-text"
                  href="#"
                >
                  <span className="inline-block -skew-x-[20deg]">
                    <BugIcon />
                  </span>
                </a>
                {navBarElement.map((list) => (
                  <a
                    className="grow-[2] text-center text-primary-text italic transition-all duration-300 ease-in-out last:hover:rounded-tr-2xl last:hover:rounded-br-2xl hover:border-l-4 hover:border-double hover:border-bright-text hover:bg-green-light hover:text-bright-text"
                    href={"#" + list.id}
                    key={"#" + list.id}
                  >
                    <span className="inline-block -skew-x-[20deg]">{list.title}</span>
                  </a>
                ))}
              </div>
            </header>
          )}
        </div>

        <div className="flex min-h-[120px] items-center justify-center bg-background leading-[120px]">
          {children}
        </div>
        <footer
          className="flex justify-center bg-nav-background text-center text-bright-text shadow-[0_0_1rem_0.5rem_rgba(212,219,180,0.0627)]"
          id="footer"
        >
          <div className="flex w-[calc(100%-10rem)] items-center justify-center sm:justify-between">
            BT_144p © 2024{siteViews !== undefined && ` · ${siteViews.toLocaleString("en-US")} views`}
            <div className="hidden gap-4 text-[2rem] sm:flex">
              {contactButtons.map((contact) => (
                <Tooltip key={contact.title}>
                  <TooltipTrigger
                    render={<span className="cursor-pointer" onClick={contact.action} />}
                  >
                    {contact.icon}
                  </TooltipTrigger>
                  <TooltipContent>{contact.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </footer>

        <div className="sm:hidden">
          <FloatButtonGroup
            trigger={<Phone />}
            items={contactButtons.map((contact) => ({
              key: contact.title,
              icon: contact.icon,
              onClick: contact.action,
            }))}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BaseLayout;
