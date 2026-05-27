import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function BirthdayTemplate2({ invite }: Props) {
  const ageLine = invite.message?.startsWith("Age:") ? invite.message.split("\n")[0].replace("Age:", "").trim() : null;
  const restMessage = invite.message?.startsWith("Age:")
    ? invite.message.split("\n").slice(1).join("\n").trim()
    : invite.message;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1e0533 0%, #2d1b5c 50%, #1e0533 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Corner stars */}
      <div style={{ position: "fixed", top: 12, left: 12, fontSize: 48, opacity: 0.2, lineHeight: 1, pointerEvents: "none" }}>✨</div>
      <div style={{ position: "fixed", top: 12, right: 12, fontSize: 48, opacity: 0.2, lineHeight: 1, pointerEvents: "none" }}>✨</div>
      <div style={{ position: "fixed", bottom: 12, left: 12, fontSize: 48, opacity: 0.2, lineHeight: 1, pointerEvents: "none" }}>🎊</div>
      <div style={{ position: "fixed", bottom: 12, right: 12, fontSize: 48, opacity: 0.2, lineHeight: 1, pointerEvents: "none" }}>🎊</div>

      <div style={{ maxWidth: 580, width: "100%" }}>
        {/* Gold top line */}
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #c4b5fd, #a78bfa, #c4b5fd, transparent)" }} />

        <div style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(196,181,253,0.3)",
          padding: "52px 44px 44px",
          backdropFilter: "blur(10px)",
        }}>
          {/* Header */}
          <p style={{
            textAlign: "center",
            fontSize: 11,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: 32,
          }}>
            ✨ Join Us To Celebrate ✨
          </p>

          {/* Name */}
          <h1 style={{
            textAlign: "center",
            fontSize: 52,
            fontWeight: "normal",
            color: "#f5f3ff",
            lineHeight: 1.1,
            margin: "0 0 8px",
            letterSpacing: 1,
          }}>
            {invite.groomName}
          </h1>

          {invite.brideName && (
            <p style={{ textAlign: "center", fontSize: 16, color: "#c4b5fd", margin: "0 0 8px" }}>&amp; {invite.brideName}</p>
          )}

          {/* Milestone */}
          {ageLine && (
            <p style={{
              textAlign: "center",
              fontSize: 22,
              color: "#c4b5fd",
              fontStyle: "italic",
              margin: "8px 0 0",
            }}>
              {ageLine}th Birthday
            </p>
          )}

          {/* Decorative divider */}
          <div style={{ textAlign: "center", margin: "32px 0", color: "#7c3aed" }}>
            <span style={{ fontSize: 20, letterSpacing: 12 }}>🥂 ✦ 🥂</span>
          </div>

          {/* Date block */}
          <div style={{
            border: "1px solid rgba(167,139,250,0.4)",
            padding: "24px 28px",
            marginBottom: 20,
            textAlign: "center",
            background: "rgba(109,40,217,0.15)",
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa", margin: "0 0 8px" }}>
              Celebration
            </p>
            <p style={{ fontSize: 19, fontWeight: 600, color: "#ede9fe", margin: 0 }}>{formatDate(invite.weddingDate)}</p>
            {invite.weddingTime && (
              <p style={{ fontSize: 14, color: "#c4b5fd", margin: "4px 0 0" }}>at {invite.weddingTime}</p>
            )}
          </div>

          {/* Venue */}
          <div style={{
            border: "1px solid rgba(167,139,250,0.3)",
            padding: "18px 28px",
            marginBottom: 28,
            textAlign: "center",
            background: "rgba(109,40,217,0.08)",
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa", margin: "0 0 6px" }}>Venue</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#ede9fe", margin: 0 }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 13, color: "#c4b5fd", margin: "4px 0 0" }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Message */}
          {restMessage && (
            <p style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 14,
              color: "#ddd6fe",
              lineHeight: 1.9,
              borderTop: "1px solid rgba(196,181,253,0.2)",
              paddingTop: 22,
              marginBottom: 22,
            }}>
              "{restMessage}"
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{ textAlign: "center", borderTop: "1px solid rgba(196,181,253,0.2)", paddingTop: 18 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#a78bfa", margin: "0 0 6px" }}>RSVP</p>
              {invite.contactName && <p style={{ fontSize: 15, color: "#ede9fe", margin: 0 }}>{invite.contactName}</p>}
              {invite.contactPhone && <p style={{ fontSize: 17, color: "#c4b5fd", fontWeight: 600, margin: "4px 0 0" }}>{invite.contactPhone}</p>}
            </div>
          )}
        </div>

        {/* Gold bottom line */}
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #c4b5fd, #a78bfa, #c4b5fd, transparent)" }} />
      </div>
    </div>
  );
}
