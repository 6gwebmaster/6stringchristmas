import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { Ticket } from "lucide-react";
import { motion } from "motion/react";
import { fetchShows, GroupedShow, Show } from "../services/airtable";

export function Shows() {
  const [shows, setShows] = useState<GroupedShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        const data = await fetchShows();
        setShows(data);
      } catch (err) {
        setError("Failed to load shows");
        console.error("❌ Error loading shows:", err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDay = (dayOrDate: string) => {
    if (dayOrDate && dayOrDate.length <= 3 && !/\d/.test(dayOrDate)) {
      return dayOrDate.toUpperCase();
    }
    const date = new Date(dayOrDate);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    }
    return (dayOrDate || "").toUpperCase();
  };

  const formatTime = (timeString: string) => {
    if (timeString && typeof timeString === "string") {
      return timeString.trim();
    }
    return "";
  };

  const formatLocation = (location: string) => {
    if (!location) return "";
    const trimmed = location.trim();
    // Already has a comma — just normalize casing
    if (trimmed.includes(",")) {
      return trimmed.toUpperCase().replace(/\s*,\s*/g, ", ");
    }
    // Split city from state (last word) → "WINTER HAVEN, FL"
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return trimmed.toUpperCase();
    const state = parts[parts.length - 1];
    const city = parts.slice(0, -1).join(" ");
    return `${city}, ${state}`.toUpperCase();
  };

  const normalizeStatus = (status?: string) => {
    if (!status || typeof status !== "string") return "available";
    return status.toLowerCase().trim();
  };

  const isTicketClickable = (status?: string) => {
    const normalizedStatus = normalizeStatus(status);
    return !["coming soon", "sold out", "sold out!"].includes(normalizedStatus);
  };

  const getTicketButtonColors = (status?: string): React.CSSProperties => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case "coming soon":
        return { backgroundColor: "#6b7280", color: "#ffffff", opacity: 0.9, cursor: "not-allowed" };
      case "limited avail":
        return { backgroundColor: "#f97316", color: "#ffffff", cursor: "pointer" };
      case "going fast":
        return { backgroundColor: "#eab308", color: "#ffffff", cursor: "pointer" };
      case "sold out":
      case "sold out!":
        return { backgroundColor: "#dc2626", color: "#ffffff", opacity: 0.9, cursor: "not-allowed" };
      case "notify me":
        return { backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer" };
      default:
        return { backgroundColor: "#16a34a", color: "#ffffff", cursor: "pointer" };
    }
  };

  const getTicketButtonText = (status?: string) => {
    const normalizedStatus = normalizeStatus(status);
    switch (normalizedStatus) {
      case "coming soon":
        return "Coming Soon";
      case "limited avail":
        return "Limited Avail";
      case "going fast":
        return "Going Fast!";
      case "sold out":
      case "sold out!":
        return "Sold Out!";
      case "notify me":
        return "Notify Me";
      default:
        return "Get Tickets";
    }
  };

  const renderTicketLink = (
    ticketAvail: string | undefined,
    ticketLink: string | undefined,
    className: string,
  ) => {
    const clickable = isTicketClickable(ticketAvail) && Boolean(ticketLink);

    return (
      <Button
        asChild
        className={cn(className, !clickable && "pointer-events-none")}
        style={getTicketButtonColors(ticketAvail)}
      >
        <a
          href={clickable ? ticketLink : undefined}
          target={clickable ? "_blank" : undefined}
          rel={clickable ? "noopener" : undefined}
          aria-disabled={clickable ? undefined : true}
          tabIndex={clickable ? undefined : -1}
        >
          <Ticket className="w-4 h-4" />
          {getTicketButtonText(ticketAvail)}
        </a>
      </Button>
    );
  };

  const renderMobileTicketCta = (show: Show) => {
    const clickable = isTicketClickable(show.ticketAvail) && Boolean(show.ticketLink);
    const label = getTicketButtonText(show.ticketAvail);
    const colors = getTicketButtonColors(show.ticketAvail);

    const className =
      "header-show-ticket-btn inline-flex items-center justify-center gap-1 rounded-md font-bold text-center whitespace-nowrap transition";

    const style: React.CSSProperties = {
      ...colors,
      boxSizing: "border-box",
      minWidth: "160px",
      maxWidth: "180px",
      padding: "0.75rem 1.5rem",
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
      fontWeight: 800,
      border: "none",
      borderRadius: "0.375rem",
      textDecoration: "none",
    };

    const content = (
      <>
        <span style={{ fontWeight: 800 }}>{label}</span>
        {clickable ? <span aria-hidden="true">→</span> : null}
      </>
    );

    if (clickable) {
      return (
        <a
          href={show.ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={style}
        >
          {content}
        </a>
      );
    }

    return (
      <div className={className} style={{ ...style, opacity: colors.opacity ?? 0.9 }} aria-disabled>
        {content}
      </div>
    );
  };

  const discountLine = (show: Show) => {
    if (!show.discountCode) return null;
    return (
      <div
        className="text-sm font-semibold text-red-600"
        style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
      >
        Use code {show.discountCode}
        {show.discountPercentage ? ` for ${show.discountPercentage}% off!` : ""}
      </div>
    );
  };

  return (
    <section id="shows" className="bg-white" style={{ padding: "4rem 1.5rem" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "64rem" }}>
        <motion.div
          className="text-center"
          style={{ marginBottom: "2rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-red-800 uppercase font-bold"
            style={{
              fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
              letterSpacing: "0.15em",
              textShadow:
                "2px 2px 0px rgba(255, 235, 59, 0.9), 3px 3px 0px rgba(255, 223, 0, 0.6)",
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Shows
          </motion.h2>
          <motion.p
            className="text-gray-700 max-w-5xl mx-auto"
            style={{
              fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
              fontSize: "1.25rem",
              marginBottom: "2rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Book your tickets today!
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-4 mb-16"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600">Loading shows...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-lg text-red-600">{error}</div>
            </div>
          ) : shows.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600">No shows scheduled at this time.</div>
            </div>
          ) : (
            shows.map((groupedShow, index) => {
              const hasMultipleShows = groupedShow.shows.length > 1;
              const dayLabel = formatDay(groupedShow.day || groupedShow.date);

              return (
                <Card
                  key={index}
                  className="border border-red-100 hover:border-red-300 transition-colors shadow-sm bg-white"
                  style={{
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <CardContent
                    className="p-0"
                    style={{
                      padding: hasMultipleShows ? "1rem 1.25rem" : "0.75rem 1.25rem",
                    }}
                  >
                    {hasMultipleShows ? (
                      <>
                        {/* Desktop layout for multiple shows */}
                        <div className="layout-desktop space-y-4">
                          <div className="flex items-center gap-8 pb-2 border-b border-gray-200">
                            <div className="text-xl text-gray-800 font-medium w-16">
                              {formatDate(groupedShow.date)}
                            </div>
                            <div className="text-lg text-gray-600 w-12">{groupedShow.day}</div>
                            <div className="text-lg text-red-600 uppercase font-bold w-32">
                              {formatLocation(groupedShow.location)}
                            </div>
                            <div className="text-lg text-gray-800 font-bold w-48">{groupedShow.venue}</div>
                          </div>

                          <div className="space-y-2">
                            {groupedShow.shows.map((show, showIndex) => (
                              <div key={showIndex} className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                  <div className="w-16" />
                                  <div className="w-12" />
                                  <div className="w-32" />
                                  <div className="w-48" />
                                  <div className="text-xl text-gray-800 font-bold w-20 text-right">
                                    {formatTime(show.time)}
                                  </div>
                                </div>
                                {show.discountCode && (
                                  <div className="font-medium font-bold text-md text-left mr-4 text-red-600">
                                    <span className="ml-5 font-bold">
                                      Use code {show.discountCode} for {show.discountPercentage}% off!
                                    </span>
                                  </div>
                                )}
                                {renderTicketLink(
                                  show.ticketAvail,
                                  show.ticketLink,
                                  "px-6 flex items-center gap-2 border-0 font-extrabold",
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mobile layout for multiple shows — Six Guitars stacked proportions */}
                        <div className="layout-mobile">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.25rem",
                              textAlign: "center",
                              marginBottom: "0.75rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                className="font-bold text-gray-900"
                                style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                              >
                                {formatDate(groupedShow.date)}
                              </span>
                              <span
                                className="text-gray-500 uppercase"
                                style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
                              >
                                {dayLabel}
                              </span>
                            </div>
                            <div
                              className="font-bold uppercase text-red-700"
                              style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                            >
                              {formatLocation(groupedShow.location)}
                            </div>
                            <div
                              className="text-gray-800 font-bold"
                              style={{ fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: 700 }}
                            >
                              {groupedShow.venue}
                            </div>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {groupedShow.shows.map((show, showIndex) => (
                              <div
                                key={showIndex}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  textAlign: "center",
                                  borderTop: "1px solid rgba(254, 226, 226, 0.9)",
                                  paddingTop: "0.75rem",
                                }}
                              >
                                <div
                                  className="text-gray-800 font-bold"
                                  style={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 700 }}
                                >
                                  {formatTime(show.time)}
                                </div>
                                {discountLine(show)}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  {renderMobileTicketCta(show)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Desktop layout for single show */}
                        <div className="layout-desktop layout-row items-center justify-between">
                          <div className="flex items-center gap-8">
                            <div className="text-xl text-gray-800 font-medium w-16">
                              {formatDate(groupedShow.date)}
                            </div>
                            <div className="text-lg text-gray-600 w-12">{groupedShow.day}</div>
                            <div className="text-lg text-red-600 uppercase font-bold w-32">
                              {formatLocation(groupedShow.location)}
                            </div>
                            <div className="text-lg text-gray-800 font-bold w-48">{groupedShow.venue}</div>
                            <div className="text-xl text-gray-800 font-bold w-12 text-left">
                              {formatTime(groupedShow.shows[0].time)}
                            </div>
                            {groupedShow.shows[0].discountCode && (
                              <div className="w-20 font-medium font-bold text-md text-justify text-red-600">
                                <span className="font-bold">
                                  Use code {groupedShow.shows[0].discountCode}{" "}
                                </span>
                                <br />
                                <span className="font-bold">
                                  for {groupedShow.shows[0].discountPercentage}% off!
                                </span>
                              </div>
                            )}
                          </div>

                          {renderTicketLink(
                            groupedShow.shows[0].ticketAvail,
                            groupedShow.shows[0].ticketLink,
                            "px-6 flex items-center gap-2 border-0 font-extrabold",
                          )}
                        </div>

                        {/* Mobile layout for single show — Six Guitars stacked proportions */}
                        <div className="layout-mobile">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.5rem",
                              textAlign: "center",
                            }}
                          >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <span
                              className="font-bold text-gray-900"
                              style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
                            >
                              {formatDate(groupedShow.date)}
                            </span>
                            <span
                              className="text-gray-500 uppercase"
                              style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                            >
                              {dayLabel}
                            </span>
                          </div>

                          <div
                            className="font-bold uppercase text-red-700"
                            style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                          >
                            {formatLocation(groupedShow.location)}
                          </div>

                          <div
                            className="text-gray-800 font-bold"
                            style={{ fontSize: "1rem", lineHeight: "1.5rem", fontWeight: 700 }}
                          >
                            {groupedShow.venue}
                          </div>

                          <div
                            className="text-gray-800 font-bold"
                            style={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 700 }}
                          >
                            {formatTime(groupedShow.shows[0].time)}
                          </div>

                          {discountLine(groupedShow.shows[0])}

                          <div style={{ display: "flex", justifyContent: "center" }}>
                            {renderMobileTicketCta(groupedShow.shows[0])}
                          </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl mb-4">Don't Miss Out!</h3>
          <p className="text-lg">
            Limited seating available for these intimate performances. Book early to secure your spot.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .header-show-ticket-btn {
            padding: 1rem 2.5rem !important;
            font-size: 1.375rem !important;
            line-height: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
