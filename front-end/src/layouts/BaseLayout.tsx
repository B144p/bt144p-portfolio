"use client";

import {
  EnvelopeSimple,
  Eye,
  GithubLogo,
  LinkSimple,
  LinkedinLogo,
  List,
} from "@phosphor-icons/react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../components/BreakpointComp";
import { BugIcon } from "../components/icons/BugIcon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    return {
      icon: <EnvelopeSimple />,
      action: () => copyTextClipboard(contact.url),
      copies: true,
    };
  return { icon: <LinkSimple />, action: () => openNewTabURL(contact.url) };
};

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const isMobile = useBreakpoint("<=", EBreakpoints.sm);

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
          {isMobile ? (
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

        <div className="flex min-h-[120px] items-center justify-center leading-[120px]">
          {children}
        </div>
        <footer
          id="footer"
          className="relative mt-16 border-t border-green-dark/50 bg-nav-background/60 pt-14 pb-6 backdrop-blur-md"
        >
          {/* Hexagon badge (same shape as the tab icon) straddling the top border */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center"
          >
            <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
              <path
                d="M32 3 57 17.5v29L32 61 7 46.5v-29Z"
                className="fill-nav-background stroke-green-light"
                strokeWidth={3}
                strokeLinejoin="round"
              />
            </svg>
            <BugIcon className="relative text-2xl text-bright-text" />
          </div>
          <div className="mx-auto flex w-[min(100%_-_2rem,1000px)] flex-col items-center gap-5 text-center">
            <p className="text-sm text-primary-text">
              Thanks for stopping by, let&apos;s build something.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {contactButtons.map((contact) => (
                <Button
                  key={contact.title}
                  variant="ghost"
                  className="h-auto gap-2 rounded-full border-green-dark/50 px-4 py-2 text-sm font-normal text-primary-text hover:bg-green-light/20 hover:text-bright-text [&_svg:not([class*='size-'])]:size-5"
                  onClick={async () => {
                    await contact.action();
                    if (contact.copies) {
                      setEmailCopied(true);
                      setTimeout(() => setEmailCopied(false), 2000);
                    }
                  }}
                >
                  {contact.icon}
                  {contact.copies && emailCopied ? "Copied!" : contact.title}
                </Button>
              ))}
            </div>
            <p className="flex items-center gap-2 text-xs text-primary-text">
              <span className="text-bright-text">BT_144p © {new Date().getFullYear()}</span>
              {siteViews !== undefined && (
                <>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {siteViews.toLocaleString("en-US")} views
                  </span>
                </>
              )}
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default BaseLayout;
