import { Ticket, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "shows", label: "Shows" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const MENU_ANIMATION_MS = 320;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setMenuVisible(false);
    const timeout = window.setTimeout(() => setMenuMounted(false), MENU_ANIMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!menuMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuMounted]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const ticketsBtnStyle = { backgroundColor: "#b91c1c", color: "#ffffff" };

  return (
    <header
      className="site-header fixed top-0 left-0 right-0 z-50 bg-white border-b border-red-100"
      style={{ zIndex: 50, backgroundColor: "#ffffff" }}
    >
      <div className="header-mobile site-header-row" style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          aria-label="a 6 String Christmas home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <img
            src="/images/header/6sc-tree-logo.png"
            alt="a 6 String Christmas"
            style={{
              height: "40px",
              width: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </button>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("shows")}
            className="header-tickets-btn"
            style={ticketsBtnStyle}
          >
            <Ticket className="ticket-icon" />
            Tickets
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="p-2 transition-colors"
          style={{
            color: "#b91c1c",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            marginLeft: "auto",
            flexShrink: 0,
            zIndex: 1,
          }}
          aria-label="Open menu"
        >
          <Menu style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>
      </div>

      <div className="header-desktop site-header-row" style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={() => scrollToSection("shows")}
          className="header-tickets-btn"
          style={ticketsBtnStyle}
        >
          <Ticket className="ticket-icon" />
          Tickets
        </button>

        <nav className="flex items-center justify-end space-x-6" style={{ flex: 1 }}>
          {NAV.filter((item) => item.id !== "home").map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="whitespace-nowrap text-xl text-gray-700 hover:text-red-700 transition-colors"
              style={{
                color: "#374151",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {menuMounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
            }}
          >
            <button
              type="button"
              aria-label="Close menu backdrop"
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: "absolute",
                inset: 0,
                border: "none",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                cursor: "pointer",
                opacity: menuVisible ? 1 : 0,
                transition: `opacity ${MENU_ANIMATION_MS}ms ease`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "min(85vw, 22rem)",
                backgroundColor: "#ffffff",
                boxShadow: "8px 0 32px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                transform: menuVisible ? "translateX(0)" : "translateX(-100%)",
                transition: `transform ${MENU_ANIMATION_MS}ms ease`,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 1.5rem 1rem",
                  borderBottom: "1px solid #fee2e2",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#991b1b",
                    letterSpacing: "0.02em",
                  }}
                >
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: "0.5rem",
                    color: "#374151",
                  }}
                >
                  <X style={{ width: "1.5rem", height: "1.5rem" }} />
                </button>
              </div>

              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  gap: "0.25rem",
                }}
              >
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      textAlign: "left",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#1f2937",
                      background: "transparent",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "1.1rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => scrollToSection("shows")}
                  style={{
                    marginTop: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    backgroundColor: "#b91c1c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "1.1rem 1.5rem",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <Ticket style={{ width: "1.5rem", height: "1.5rem" }} />
                  Tickets
                </button>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
