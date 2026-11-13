import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AudienceReview, fetchAudienceReviews } from "../services/airtable";

/**
 * Audience review cards — same structure as six-guitars-site/app/AudienceReviews.jsx:
 * white card, circular FB-style photo, name, quote. Data from Airtable Reviews table
 * filtered to Select containing "6SC".
 */
export function Reviews() {
  const [reviews, setReviews] = useState<AudienceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsToShow, setReviewsToShow] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 1024 || window.innerHeight < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchAudienceReviews();
        // Swap Allen Pitch and Jennifer Field for better bottom-row spacing in the 3-col layout
        const allenIdx = data.findIndex((r) => /allen pitch/i.test(r.name));
        const jenniferIdx = data.findIndex((r) => /jennifer field/i.test(r.name));
        if (allenIdx !== -1 && jenniferIdx !== -1) {
          const swapped = [...data];
          [swapped[allenIdx], swapped[jenniferIdx]] = [swapped[jenniferIdx], swapped[allenIdx]];
          setReviews(swapped);
          setReviewsToShow(window.innerWidth < 1024 || window.innerHeight < 640 ? 6 : swapped.length);
        } else {
          setReviews(data);
          setReviewsToShow(window.innerWidth < 1024 || window.innerHeight < 640 ? 6 : data.length);
        }
      } catch (error) {
        console.error("Failed to load audience reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    setReviewsToShow(isMobile ? Math.min(6, reviews.length) : reviews.length);
  }, [isMobile, reviews.length]);

  const displayedReviews = isMobile ? reviews.slice(0, reviewsToShow) : reviews;
  const hasMoreReviews = isMobile && reviewsToShow < reviews.length;

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50">
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%" }}>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold"
              style={{
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: "0.15em",
                textShadow: "2px 2px 0px rgba(255, 235, 59, 0.9), 3px 3px 0px rgba(255, 223, 0, 0.6)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reviews
            </motion.h2>
            <motion.p
              className="text-2xl text-gray-700 max-w-5xl mx-auto"
              style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hear what audiences have to say about the show.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-lg text-gray-600">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 text-lg text-gray-600">
              Audience reviews will appear here soon.
            </div>
          ) : (
            <>
              <div
                style={{
                  columnCount: isMobile ? 1 : 3,
                  columnGap: "1.5rem",
                  width: "100%",
                }}
              >
                {displayedReviews.map((review, index) => (
                  <motion.article
                    key={review.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                      padding: "1rem",
                      width: "100%",
                      marginBottom: "1.5rem",
                      display: "inline-block",
                      breakInside: "avoid",
                      WebkitColumnBreakInside: "avoid",
                      pageBreakInside: "avoid",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Header with photo and name (Facebook style) — matches 6G */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        {review.photo ? (
                          <img
                            src={review.photo}
                            alt={review.name}
                            loading="lazy"
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "9999px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "9999px",
                              background: "linear-gradient(to bottom right, #f87171, #16a34a)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "1.125rem",
                            }}
                          >
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            color: "#111827",
                            fontSize: "1rem",
                          }}
                        >
                          {review.name}
                        </h3>
                      </div>
                    </div>

                    {/* Quote/Comment */}
                    <div
                      style={{
                        color: "#374151",
                        fontSize: "1rem",
                        lineHeight: 1.625,
                      }}
                    >
                      {review.quote}
                    </div>
                  </motion.article>
                ))}
              </div>

              {hasMoreReviews && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                  <button
                    type="button"
                    onClick={() => setReviewsToShow((prev) => Math.min(prev + 6, reviews.length))}
                    style={{
                      backgroundColor: "#b91c1c",
                      color: "#fff",
                      fontWeight: 700,
                      padding: "0.75rem 2rem",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
