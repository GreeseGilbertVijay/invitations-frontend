import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function FloralTemplate({ invite }: Props) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f8e8f0 0%, #f0e6f6 40%, #e8f0f8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Decorative corner flowers */}
      <div style={{ position: "fixed", top: 0, left: 0, fontSize: 60, lineHeight: 1, color: "#d4a5b5", opacity: 0.4, pointerEvents: "none" }}>🌸</div>
      <div style={{ position: "fixed", top: 0, right: 0, fontSize: 60, lineHeight: 1, color: "#b8a5d4", opacity: 0.4, pointerEvents: "none" }}>🌸</div>
      <div style={{ position: "fixed", bottom: 0, left: 0, fontSize: 60, lineHeight: 1, color: "#a5c4d4", opacity: 0.4, pointerEvents: "none" }}>🌺</div>
      <div style={{ position: "fixed", bottom: 0, right: 0, fontSize: 60, lineHeight: 1, color: "#d4a5b5", opacity: 0.4, pointerEvents: "none" }}>🌺</div>

      <div style={{
        maxWidth: 620,
        width: "100%",
        position: "relative",
      }}>
        {/* Flower header strip */}
        <div style={{
          textAlign: "center",
          fontSize: 28,
          letterSpacing: 8,
          marginBottom: -16,
          position: "relative",
          zIndex: 2,
        }}>
          🌸 🌿 🌸 🌿 🌸
        </div>

        <div style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          borderRadius: 16,
          border: "1px solid rgba(212,165,181,0.4)",
          boxShadow: "0 16px 60px rgba(180,140,160,0.15)",
          padding: "52px 40px 44px",
          position: "relative",
        }}>
          {/* Decorative leaves at corners of card */}
          <span style={{ position: "absolute", top: 16, left: 20, fontSize: 28, opacity: 0.5 }}>🌿</span>
          <span style={{ position: "absolute", top: 16, right: 20, fontSize: 28, opacity: 0.5, transform: "scaleX(-1)" }}>🌿</span>

          {/* Header */}
          <p style={{
            textAlign: "center",
            fontSize: 13,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#9b7aab",
            marginBottom: 20,
          }}>
            ✿  With Love & Joy  ✿
          </p>

          {/* Names */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <h1 style={{
              fontSize: 50,
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#7b4f6e",
              lineHeight: 1.1,
              margin: 0,
              textShadow: "0 2px 8px rgba(180,120,160,0.15)",
            }}>
              {invite.groomName}
            </h1>
            <div style={{ margin: "12px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <span style={{ fontSize: 20, color: "#c890b0" }}>❀</span>
              <span style={{ fontSize: 18, fontStyle: "italic", color: "#c890b0", letterSpacing: 3 }}>and</span>
              <span style={{ fontSize: 20, color: "#c890b0" }}>❀</span>
            </div>
            <h1 style={{
              fontSize: 50,
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#7b4f6e",
              lineHeight: 1.1,
              margin: 0,
              textShadow: "0 2px 8px rgba(180,120,160,0.15)",
            }}>
              {invite.brideName}
            </h1>
          </div>

          {/* Floral divider */}
          <div style={{ textAlign: "center", margin: "28px 0 24px", fontSize: 20, letterSpacing: 10, color: "#c890b0" }}>
            🌸 ❀ 🌸
          </div>

          {/* Invite text */}
          <p style={{
            textAlign: "center",
            fontSize: 15,
            color: "#7a6080",
            lineHeight: 1.9,
            marginBottom: 32,
            fontStyle: "italic",
          }}>
            Joyfully invite you to share in the celebration of their marriage
          </p>

          {/* Wedding Date Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(212,165,181,0.18) 0%, rgba(184,165,212,0.18) 100%)",
            border: "1px solid rgba(212,165,181,0.45)",
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 20,
            textAlign: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16, color: "#c890b0" }}>🌸</span>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#9b7aab", margin: 0 }}>
                Wedding Day
              </p>
              <span style={{ fontSize: 16, color: "#c890b0" }}>🌸</span>
            </div>
            <p style={{ fontSize: 20, fontWeight: "bold", color: "#5a3060", margin: "0 0 4px" }}>
              {formatDate(invite.weddingDate)}
            </p>
            {invite.weddingTime && (
              <p style={{ fontSize: 15, color: "#9b7aab", margin: 0 }}>{invite.weddingTime}</p>
            )}
          </div>

          {/* Venue Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(165,196,212,0.18) 0%, rgba(165,212,165,0.18) 100%)",
            border: "1px solid rgba(165,196,212,0.45)",
            borderRadius: 12,
            padding: "20px 28px",
            marginBottom: 20,
            textAlign: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>🌿</span>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#5a8a6e", margin: 0 }}>
                Venue
              </p>
              <span style={{ fontSize: 16 }}>🌿</span>
            </div>
            <p style={{ fontSize: 20, fontWeight: "bold", color: "#3a5a48", margin: "0 0 4px" }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 13, color: "#6a8a78", margin: 0 }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <div style={{
              border: "1px dashed rgba(200,144,176,0.5)",
              borderRadius: 10,
              padding: "16px 20px",
              marginBottom: 20,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#9b7aab", margin: "0 0 6px" }}>
                🎉 Reception
              </p>
              <p style={{ fontSize: 16, color: "#5a3060", margin: 0 }}>{formatDate(invite.receptionDate)}</p>
              {invite.receptionTime && (
                <p style={{ fontSize: 13, color: "#9b7aab", margin: "2px 0 0" }}>{invite.receptionTime}</p>
              )}
            </div>
          )}

          {/* Message */}
          {invite.message && (
            <p style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 15,
              color: "#7a6080",
              lineHeight: 1.9,
              borderTop: "1px solid rgba(212,165,181,0.3)",
              paddingTop: 22,
              marginBottom: 22,
            }}>
              ❝ {invite.message} ❞
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{
              borderTop: "1px solid rgba(212,165,181,0.3)",
              paddingTop: 18,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 12, color: "#9b7aab", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                🌸 RSVP
              </p>
              {invite.contactName && <p style={{ fontSize: 15, color: "#5a3060", margin: "0 0 2px" }}>{invite.contactName}</p>}
              {invite.contactPhone && (
                <p style={{ fontSize: 17, color: "#9b7aab", fontWeight: "bold", margin: 0 }}>{invite.contactPhone}</p>
              )}
            </div>
          )}

          {/* Bottom leaves */}
          <span style={{ position: "absolute", bottom: 16, left: 20, fontSize: 24, opacity: 0.45 }}>🌺</span>
          <span style={{ position: "absolute", bottom: 16, right: 20, fontSize: 24, opacity: 0.45, transform: "scaleX(-1)" }}>🌺</span>
        </div>

        {/* Bottom flower strip */}
        <div style={{ textAlign: "center", fontSize: 26, letterSpacing: 8, marginTop: -14, position: "relative", zIndex: 2 }}>
          🌺 🌿 🌺 🌿 🌺
        </div>
      </div>
    </div>
  );
}
