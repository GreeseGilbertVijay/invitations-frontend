import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function BirthdayTemplate1({ invite }: Props) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Corner decorations */}
      <div style={{ position: "fixed", top: 0, left: 0, fontSize: 60, opacity: 0.3, lineHeight: 1, pointerEvents: "none" }}>🎈</div>
      <div style={{ position: "fixed", top: 0, right: 0, fontSize: 60, opacity: 0.3, lineHeight: 1, pointerEvents: "none" }}>🎉</div>
      <div style={{ position: "fixed", bottom: 0, left: 0, fontSize: 60, opacity: 0.3, lineHeight: 1, pointerEvents: "none" }}>🎊</div>
      <div style={{ position: "fixed", bottom: 0, right: 0, fontSize: 60, opacity: 0.3, lineHeight: 1, pointerEvents: "none" }}>🎂</div>

      <div style={{ maxWidth: 600, width: "100%" }}>
        {/* Top banner */}
        <div style={{
          background: "#d97706",
          color: "#fff",
          textAlign: "center",
          padding: "10px 24px",
          fontSize: 11,
          letterSpacing: 6,
          textTransform: "uppercase",
          fontWeight: 700,
        }}>
          You're Invited!
        </div>

        <div style={{
          background: "#ffffff",
          boxShadow: "0 20px 60px rgba(217,119,6,0.2)",
          border: "2px solid #f59e0b",
          padding: "48px 40px 40px",
          textAlign: "center",
        }}>
          {/* Emoji header */}
          <div style={{ fontSize: 36, letterSpacing: 8, marginBottom: 24 }}>🎂 🎉 🎈</div>

          {/* Name */}
          <h1 style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#92400e",
            lineHeight: 1.1,
            margin: "0 0 8px",
            letterSpacing: -1,
          }}>
            {invite.groomName}
          </h1>

          {invite.brideName && (
            <p style={{ fontSize: 16, color: "#b45309", margin: "0 0 12px" }}>&amp; {invite.brideName}</p>
          )}

          {/* Age / milestone from message */}
          {invite.message?.startsWith("Age:") && (
            <p style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#d97706",
              margin: "0 0 4px",
            }}>
              is Turning {invite.message.split("\n")[0].replace("Age:", "").trim()}!
            </p>
          )}

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, transparent, #f59e0b)" }} />
            <span style={{ fontSize: 18 }}>🎊</span>
            <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, #f59e0b, transparent)" }} />
          </div>

          {/* Date & Time */}
          <div style={{
            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
            border: "1px solid #f59e0b",
            borderRadius: 8,
            padding: "20px 24px",
            marginBottom: 20,
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#92400e", margin: "0 0 8px" }}>
              Celebration Date
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#78350f", margin: 0 }}>{formatDate(invite.weddingDate)}</p>
            {invite.weddingTime && (
              <p style={{ fontSize: 15, color: "#b45309", margin: "4px 0 0" }}>at {invite.weddingTime}</p>
            )}
          </div>

          {/* Venue */}
          <div style={{
            background: "#fffbeb",
            border: "1px solid #fcd34d",
            borderRadius: 8,
            padding: "16px 24px",
            marginBottom: 24,
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#92400e", margin: "0 0 6px" }}>Venue</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#78350f", margin: 0 }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 13, color: "#b45309", margin: "4px 0 0" }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Message */}
          {invite.message && !invite.message.startsWith("Age:") && (
            <p style={{
              fontStyle: "italic",
              fontSize: 15,
              color: "#78350f",
              lineHeight: 1.8,
              borderTop: "1px solid #fcd34d",
              paddingTop: 20,
              marginBottom: 20,
            }}>
              "{invite.message}"
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{ borderTop: "1px solid #fcd34d", paddingTop: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#92400e", margin: "0 0 6px" }}>RSVP</p>
              {invite.contactName && <p style={{ fontSize: 15, color: "#78350f", margin: 0 }}>{invite.contactName}</p>}
              {invite.contactPhone && <p style={{ fontSize: 17, color: "#d97706", fontWeight: 700, margin: "2px 0 0" }}>{invite.contactPhone}</p>}
            </div>
          )}
        </div>

        {/* Bottom banner */}
        <div style={{
          background: "#d97706",
          color: "#fff",
          textAlign: "center",
          padding: "10px 24px",
          fontSize: 20,
          letterSpacing: 8,
        }}>
          🎉 🎂 🎉
        </div>
      </div>
    </div>
  );
}
