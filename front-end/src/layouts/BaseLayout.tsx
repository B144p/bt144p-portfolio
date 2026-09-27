"use client";

import {
  EnvelopeSimple,
  Eye,
  GithubLogo,
  LinkSimple,
  LinkedinLogo,
  List,
} from "@phosphor-icons/react";
import { FC, ReactNode, useState } from "react";
import { useBreakpoint } from "../components/BreakpointComp";
import { BugIcon } from "../components/icons/BugIcon";
import { HexBadge } from "@/components/HexBadge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { cn } from "@/lib/utils";
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
const navIds = navBarElement.map((item) => item.id);

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
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const isMobile = useBreakpoint("<=", EBreakpoints.sm);
  const navHidden = useHideOnScroll();
  const activeSection = useActiveSection(navIds);

  const { data: contacts = [] } = useContacts();
  const contactButtons = contacts.map((c) => ({
    title: c.title,
    ...getContactConfig(c),
  }));

  const { data: frontendVersions } = useFrontendVersion();
  const siteViews = frontendVersions?.versions.find(
    (v) => v.key === FRONTEND_VERSION_KEY,
  )?.views;

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
                    className={cn(
                      "fixed top-6 right-6 z-20 size-11 rounded-full border border-green-dark/40 bg-nav-background/80 backdrop-blur-md transition-transform duration-300 ease-out",
                      navHidden && "-translate-y-24",
                    )}
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
              className={cn(
                "fixed inset-x-0 top-4 z-10 flex justify-center transition-transform duration-300 ease-out",
                navHidden && "-translate-y-[calc(100%+1rem)]",
              )}
            >
              <nav className="flex h-12 w-[min(90%,800px)] skew-x-[20deg] overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-[2rem] border border-green-dark/40 bg-nav-background/80 shadow-[0_0_2rem_var(--background)] backdrop-blur-md">
                <a
                  className="grid place-items-center bg-green-light px-6 text-bright-text transition-colors hover:bg-green-lighter"
                  href="#home"
                  aria-label="Back to top"
                >
                  <BugIcon className="-skew-x-[20deg] text-xl" />
                </a>
                {navBarElement.map((item) => (
                  <a
                    className={cn(
                      "grid grow place-items-center px-2 text-primary-text italic transition-colors duration-200 hover:bg-green-light/30 hover:text-bright-text",
                      activeSection === item.id && "bg-green-light/20 text-bright-text",
                    )}
                    href={"#" + item.id}
                    key={item.id}
                    aria-current={activeSection === item.id ? "true" : undefined}
                  >
                    <span className="-skew-x-[20deg]">{item.title}</span>
                  </a>
                ))}
              </nav>
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
          <HexBadge className="absolute top-0 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2" />
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
              {/* Clock read at render: server and browser can disagree around New
                Year, which is harmless here, so don't flag it as a mismatch. */}
              <span className="text-bright-text" suppressHydrationWarning>
                BT_144p © {new Date().getFullYear()}
              </span>
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
