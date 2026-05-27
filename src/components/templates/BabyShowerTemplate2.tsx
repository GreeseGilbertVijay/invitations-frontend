import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function BabyShowerTemplate2({ invite }: Props) {
  const babyLine = invite.message?.startsWith("Baby Name:") ? invite.message.split("\n")[0].replace("Baby Name:", "").trim() : null;
  const restMessage = invite.message?.startsWith("Baby Name:")
    ? invite.message.split("\n").slice(1).join("\n").trim()
    : invite.message;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Corner decorations */}
      <div style={{ position: "fixed", top: 0, left: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🌷</div>
      <div style={{ position: "fixed", top: 0, right: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🌿</div>
      <div style={{ position: "fixed", bottom: 0, left: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🌱</div>
      <div style={{ position: "fixed", bottom: 0, right: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🐣</div>

      <div style={{ maxWidth: 600, width: "100%" }}>
        {/* Flower header */}
        <div style={{ textAlign: "center", fontSize: 26, letterSpacing: 8, marginBottom: -14, position: "relative", zIndex: 2 }}>
          🌷 🌿 🌷 🌿 🌷
        </div>

        <div style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(52,211,153,0.4)",
          borderRadius: 16,
          boxShadow: "0 16px 60px rgba(16,185,129,0.15)",
          padding: "52px 44px 44px",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Leaf corners */}
          <span style={{ position: "absolute", top: 16, left: 20, fontSize: 26, opacity: 0.45 }}>🌿</span>
          <span style={{ position: "absolute", top: 16, right: 20, fontSize: 26, opacity: 0.45, transform: "scaleX(-1)" }}>🌿</span>

          {/* Header */}
          <p style={{
            fontSize: 13,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#059669",
            marginBottom: 20,
          }}>
            ✿  Welcome Little One  ✿
          </p>

          {/* Baby Shower title */}
          <div style={{
            display: "inline-block",
            border: "1.5px solid #6ee7b7",
            borderRadius: 40,
            padding: "6px 24px",
            marginBottom: 24,
          }}>
            <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#059669", margin: 0, fontFamily: "sans-serif" }}>
              Baby Shower
            </p>
          </div>

          {/* Parents names */}
          <h1 style={{
            fontSize: 44,
            fontStyle: "italic",
            fontWeight: "normal",
            color: "#065f46",
            lineHeight: 1.1,
            margin: "0 0 8px",
          }}>
            {invite.groomName}
          </h1>
          {invite.brideName && (
            <>
              <p style={{ fontSize: 18, color: "#34d399", margin: "4px 0", letterSpacing: 3 }}>&amp;</p>
              <h1 style={{
                fontSize: 44,
                fontStyle: "italic",
                fontWeight: "normal",
                color: "#065f46",
                lineHeight: 1.1,
                margin: "0 0 12px",
              }}>
                {invite.brideName}
              </h1>
            </>
          )}

          {/* Baby name pill */}
          {babyLine && (
            <div style={{
              display: "inline-block",
              background: "#d1fae5",
              border: "1px solid #6ee7b7",
              borderRadius: 50,
              padding: "6px 20px",
              margin: "8px 0 20px",
            }}>
              <p style={{ fontSize: 15, color: "#065f46", fontWeight: 600, margin: 0 }}>
                🐣 Baby {babyLine}
              </p>
            </div>
          )}

          {/* Floral divider */}
          <div style={{ textAlign: "center", margin: "24px 0", fontSize: 18, letterSpacing: 10, color: "#34d399" }}>
            🌷 ❀ 🌷
          </div>

          {/* Date */}
          <div style={{
            background: "linear-gradient(135deg, rgba(209,250,229,0.6), rgba(167,243,208,0.6))",
            border: "1px solid rgba(110,231,183,0.6)",
            borderRadius: 12,
            padding: "22px 28px",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>🌸</span>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#059669", margin: 0, fontFamily: "sans-serif" }}>
                Shower Day
              </p>
              <span style={{ fontSize: 16 }}>🌸</span>
            </div>
            <p style={{ fontSize: 18, fontWeight: "bold", color: "#064e3b", margin: 0 }}>{formatDate(invite.weddingDate)}</p>
            {invite.weddingTime && (
              <p style={{ fontSize: 15, color: "#059669", margin: "4px 0 0" }}>{invite.weddingTime}</p>
            )}
          </div>

          {/* Venue */}
          <div style={{
            background: "linear-gradient(135deg, rgba(167,243,208,0.4), rgba(110,231,183,0.4))",
            border: "1px solid rgba(52,211,153,0.4)",
            borderRadius: 12,
            padding: "16px 28px",
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>🌿</span>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#059669", margin: 0, fontFamily: "sans-serif" }}>Venue</p>
              <span style={{ fontSize: 14 }}>🌿</span>
            </div>
            <p style={{ fontSize: 20, fontWeight: "bold", color: "#064e3b", margin: 0 }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 13, color: "#059669", margin: "4px 0 0" }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Message */}
          {restMessage && (
            <p style={{
              fontStyle: "italic",
              fontSize: 15,
              color: "#065f46",
              lineHeight: 1.9,
              borderTop: "1px solid rgba(52,211,153,0.3)",
              paddingTop: 22,
              marginBottom: 22,
            }}>
              ❝ {restMessage} ❞
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{ borderTop: "1px solid rgba(52,211,153,0.3)", paddingTop: 18, fontFamily: "sans-serif" }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#059669", margin: "0 0 6px" }}>🌸 RSVP</p>
              {invite.contactName && <p style={{ fontSize: 15, color: "#065f46", margin: 0 }}>{invite.contactName}</p>}
              {invite.contactPhone && <p style={{ fontSize: 17, color: "#059669", fontWeight: 700, margin: "4px 0 0" }}>{invite.contactPhone}</p>}
            </div>
          )}

          {/* Leaf corners bottom */}
          <span style={{ position: "absolute", bottom: 16, left: 20, fontSize: 22, opacity: 0.4 }}>🌱</span>
          <span style={{ position: "absolute", bottom: 16, right: 20, fontSize: 22, opacity: 0.4, transform: "scaleX(-1)" }}>🌱</span>
        </div>

        {/* Flower footer */}
        <div style={{ textAlign: "center", fontSize: 24, letterSpacing: 8, marginTop: -12, position: "relative", zIndex: 2 }}>
          🌺 🌿 🌺 🌿 🌺
        </div>
      </div>
    </div>
  );
}
