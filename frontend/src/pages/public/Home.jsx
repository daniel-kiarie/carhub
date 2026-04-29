import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../../components/cars/CarCard";
import { ShieldCheck, BadgeCheck, Headphones, ArrowRight } from "lucide-react";
import Footer from "../../components/layouts/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/cars")
      .then((r) => {
        const cars = r.data;
        // Prioritize cars marked as featured, fallback to first 3 if none found
        const picks = cars.filter((c) => c.featured).slice(0, 3);
        setFeatured(picks.length > 0 ? picks : cars.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const WHY = [
    {
      icon: <ShieldCheck size={22} />,
      title: "Verified Sellers",
      body: "Every dealer is vetted and reviewed before listing.",
    },
    {
      icon: <BadgeCheck size={22} />,
      title: "Transparent Pricing",
      body: "No hidden fees. What you see is exactly what you pay.",
    },
    {
      icon: <Headphones size={22} />,
      title: "Dedicated Support",
      body: "Our team is on hand to guide you from browse to handover.",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div
        style={{ background: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}
      >
        {/* ── HERO SECTION ── */}
        <section
          className="hero-section"
          style={{
            position: "relative",
            padding: "100px 24px 80px",
            borderBottom: "1px solid #1e1e1e",
            overflow: "hidden",
          }}
        >
          {/* Decorative accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, transparent, #c9a84c)",
            }}
          />
          {/* Subtle grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage:
                "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#c9a84c",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Nairobi's Premium Auto Marketplace
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 6vw, 68px)",
                fontWeight: "400",
                lineHeight: "1.12",
                color: "#e8e0d0",
                margin: "0 0 24px",
                letterSpacing: "-0.01em",
              }}
            >
              Find Your{" "}
              <span style={{ fontStyle: "italic", color: "#c9a84c" }}>
                Dream Car
              </span>
              <br />
              in Nairobi
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 2vw, 16px)",
                fontWeight: "300",
                color: "#777",
                lineHeight: "1.7",
                maxWidth: "520px",
                margin: "0 auto 40px",
              }}
            >
              The most trusted marketplace for quality pre-owned vehicles.
              Transparent pricing, verified sellers, and white-glove service.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/cars")}
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "#c9a84c",
                  color: "#0d0d0d",
                  border: "none",
                  borderRadius: "2px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Browse Inventory <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div
          className="stats-bar"
          style={{
            borderBottom: "1px solid #1e1e1e",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {[
            { stat: "500+", label: "Verified Listings" },
            { stat: "12+", label: "Trusted Dealers" },
            { stat: "98%", label: "Buyer Satisfaction" },
          ].map(({ stat, label }, i) => (
            <div
              key={i}
              style={{
                padding: "24px 16px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid #1e1e1e" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 4vw, 30px)",
                  fontWeight: "500",
                  color: "#c9a84c",
                  margin: "0 0 4px",
                }}
              >
                {stat}
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(9px, 1.5vw, 10px)",
                  letterSpacing: "0.1em",
                  color: "#555",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── FEATURED LISTINGS ── */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "36px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    color: "#555",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Hand-picked
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(22px, 3vw, 28px)",
                    fontWeight: "400",
                    color: "#e8e0d0",
                    margin: 0,
                  }}
                >
                  Featured Listings
                </h2>
              </div>
              <button
                onClick={() => navigate("/cars")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "#c9a84c",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                View all <ArrowRight size={13} />
              </button>
            </div>

            {loading ? (
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  color: "#444",
                }}
              >
                Loading inventory...
              </p>
            ) : (
              <div className="featured-grid ">
                {featured.map((car, i) => (
                  <div 
                    key={car._id}
                    style={{
                      animation: "fadeUp 0.45s ease both",
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <CarCard car={car} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section
          style={{
            borderTop: "1px solid #1e1e1e",
            padding: "80px 24px",
            background: "#0a0a0a",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Our Promise
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: "400",
                  color: "#e8e0d0",
                  margin: 0,
                }}
              >
                Why Choose Us
              </h2>
            </div>

            <div className="why-grid">
              {WHY.map(({ icon, title, body }, i) => (
                <div key={i} className="why-card">
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      marginBottom: "20px",
                    }}
                  >
                    {icon}
                  </div>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "17px",
                      fontWeight: "500",
                      color: "#e8e0d0",
                      margin: "0 0 10px",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#666",
                      lineHeight: "1.65",
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          style={{
            borderTop: "1px solid #1e1e1e",
            padding: "100px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.025,
              backgroundImage:
                "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: "#555",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Ready to start?
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              fontWeight: "400",
              color: "#e8e0d0",
              margin: "0 0 32px",
              lineHeight: "1.2",
            }}
          >
            Your next vehicle is waiting.
          </h2>
          <button
            onClick={() => navigate("/cars")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "#c9a84c",
              color: "#0d0d0d",
              border: "none",
              borderRadius: "2px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Browse Inventory <ArrowRight size={14} />
          </button>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        * { box-sizing: border-box; }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid #1e1e1e;
          background: #1e1e1e;
          border-radius: 2px;
          overflow: hidden;
        }

        .why-card {
          padding: 36px 28px;
          background: #0d0d0d;
          transition: background 0.3s ease;
        }

        .why-card:hover {
          background: #111;
        }

        .btn-primary:hover {
          background: #d9b85c !important;
          transform: translateY(-1px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .why-card:nth-child(3) { grid-column: 1 / -1; }
        }

        @media (max-width: 600px) {
          .featured-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .stats-bar { grid-template-columns: 1fr; }
          .stats-bar div { border-right: none !important; border-bottom: 1px solid #1e1e1e; }
          .stats-bar div:last-child { border-bottom: none; }
        }
      `}</style>
    </>
  );
};

export default Home;
