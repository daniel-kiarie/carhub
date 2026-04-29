import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const fleet = [
    "Toyota Prado",
    "Toyota Landcruiser",
    "Range Rover",
    "BMW X Series",
    "Mercedes GLE",
    "Lexus LX",
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{
          position: "relative",
          padding: "100px 24px 80px",
          borderBottom: "1px solid #1e1e1e",
          overflow: "hidden",
          textAlign: "center",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "1px", height: "60px",
            background: "linear-gradient(to bottom, transparent, #c9a84c)",
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#c9a84c",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              Kenya's Premier Car Mart
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 60px)",
              fontWeight: "400",
              lineHeight: "1.12",
              color: "#e8e0d0",
              margin: "0 0 24px",
            }}>
              About{" "}
              <span style={{ fontStyle: "italic", color: "#c9a84c" }}>CarHUB</span>
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              fontWeight: "300",
              color: "#777",
              lineHeight: "1.8",
              margin: "0 auto",
            }}>
              We are Kenya's premier car mart specialising in high-end SUVs.
              From Toyota Prados and Landcruisers to Range Rovers, BMWs, and
              many more — but we pride ourselves on being the{" "}
              <em style={{ color: "#c9a84c", fontStyle: "italic" }}>home of Landcruisers</em>.
            </p>
          </div>
        </section>

        {/* ── OUR FLEET ── */}
        <section style={{ padding: "72px 24px", borderBottom: "1px solid #1e1e1e" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                letterSpacing: "0.16em", color: "#555",
                textTransform: "uppercase", marginBottom: "8px",
              }}>What we carry</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: "400", color: "#e8e0d0", margin: 0,
              }}>Our Fleet</h2>
            </div>

            <div className="fleet-grid">
              {fleet.map((name, i) => (
                <div key={i} className="fleet-card">
                  <div style={{
                    width: "10px", height: "10px",
                    borderRadius: "50%",
                    background: i === 0 || i === 1 ? "#c9a84c" : "#2e2e2e",
                    marginBottom: "12px",
                  }} />
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px", fontWeight: "400",
                    color: "#e8e0d0", margin: 0,
                  }}>{name}</p>
                  {(i === 0 || i === 1) && (
                    <span style={{
                      display: "inline-block",
                      marginTop: "8px",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      border: "1px solid rgba(201,168,76,0.3)",
                      padding: "2px 8px",
                      borderRadius: "2px",
                    }}>Speciality</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAP + CONTACT ── */}
        <section style={{ padding: "72px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                letterSpacing: "0.16em", color: "#555",
                textTransform: "uppercase", marginBottom: "8px",
              }}>Come see us</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: "400", color: "#e8e0d0", margin: 0,
              }}>Find Us</h2>
            </div>

            <div className="contact-grid">
              {/* Map */}
              <div style={{
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid #1e1e1e",
                minHeight: "450px",
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.9611807041792!2d36.767578974965765!3d-1.3002474986873966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a71f5d95285%3A0x9e6ece565736cc13!2sBolpak%20Trading!5e1!3m2!1sen!2ske!4v1777370126927!5m2!1sen!2ske"
                  width="100%"
                  height="450"
                  style={{ display: "block", border: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CarHUB Location - Bolpak Trading, Ngong Road"
                />
              </div>

              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "center" }}>
                <div>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.16em", color: "#555",
                    textTransform: "uppercase", marginBottom: "12px",
                  }}>Address</p>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "36px", height: "36px", flexShrink: 0,
                      border: "1px solid rgba(201,168,76,0.25)",
                      borderRadius: "2px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#c9a84c",
                    }}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px", color: "#e8e0d0",
                        margin: "0 0 4px", fontWeight: "400",
                      }}>Bolpak Trading Centre</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px", color: "#666",
                        margin: 0, fontWeight: "300",
                      }}>Ngong Road, opposite Impala Club, Nairobi</p>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "24px" }}>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.16em", color: "#555",
                    textTransform: "uppercase", marginBottom: "12px",
                  }}>Contact</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{
                        width: "36px", height: "36px", flexShrink: 0,
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: "2px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#c9a84c",
                      }}>
                        <Phone size={16} />
                      </div>
                      <a href="tel:+254700000000" style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px", color: "#e8e0d0",
                        textDecoration: "none",
                      }}>+254 700 000 000</a>
                    </div>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{
                        width: "36px", height: "36px", flexShrink: 0,
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: "2px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#c9a84c",
                      }}>
                        <Mail size={16} />
                      </div>
                      <a href="mailto:info@carhub.co.ke" style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px", color: "#e8e0d0",
                        textDecoration: "none",
                      }}>info@carhub.co.ke</a>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "24px" }}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", fontWeight: "300",
                    color: "#666", lineHeight: "1.7", marginBottom: "20px",
                  }}>
                    Contact us today for inquiries on our current inventory,
                    pricing, and financing options.
                  </p>
                  <button
                    onClick={() => navigate("/cars")}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "12px 24px",
                      background: "#c9a84c", color: "#0d0d0d",
                      border: "none", borderRadius: "2px",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px", fontWeight: "600",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      cursor: "pointer", transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#d9b85c"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#c9a84c"}
                  >
                    Browse Inventory <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid #1e1e1e;
          border-radius: 2px;
          overflow: hidden;
        }

        .fleet-card {
          padding: 32px 24px;
          background: #0d0d0d;
          border-right: 1px solid #1e1e1e;
          transition: background 0.2s;
        }

        .fleet-card:nth-child(3n) {
          border-right: none;
        }

        .fleet-card:hover {
          background: #111;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 860px) {
          .fleet-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .fleet-card:nth-child(3n) {
            border-right: 1px solid #1e1e1e;
          }
          .fleet-card:nth-child(2n) {
            border-right: none;
          }
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .fleet-grid {
            grid-template-columns: 1fr;
          }
          .fleet-card {
            border-right: none !important;
            border-bottom: 1px solid #1e1e1e;
          }
          .fleet-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </>
  );
};

export default About;