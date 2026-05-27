import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function BabyShowerTemplate1({ invite }: Props) {
  const babyLine = invite.message?.startsWith("Baby Name:") ? invite.message.split("\n")[0].replace("Baby Name:", "").trim() : null;
  const restMessage = invite.message?.startsWith("Baby Name:")
    ? invite.message.split("\n").slice(1).join("\n").trim()
    : invite.message;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Corner decorations */}
      <div style={{ position: "fixed", top: 0, left: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>👶</div>
      <div style={{ position: "fixed", top: 0, right: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🍼</div>
      <div style={{ position: "fixed", bottom: 0, left: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>⭐</div>
      <div style={{ position: "fixed", bottom: 0, right: 0, fontSize: 56, opacity: 0.25, lineHeight: 1, pointerEvents: "none" }}>🌙</div>

      <div style={{ maxWidth: 580, width: "100%" }}>
        {/* Top ribbon */}
        <div style={{
          background: "#2563eb",
          color: "#fff",
          textAlign: "center",
          padding: "10px 24px",
          fontSize: 11,
          letterSpacing: 6,
          textTransform: "uppercase",
          fontWeight: 700,
        }}>
          Baby Shower
        </div>

        <div style={{
          background: "#ffffff",
          boxShadow: "0 20px 60px rgba(37,99,235,0.15)",
          border: "2px solid #bfdbfe",
          padding: "48px 40px 40px",
          textAlign: "center",
        }}>
          {/* Emoji header */}
          <div style={{ fontSize: 32, letterSpacing: 8, marginBottom: 20 }}>👶 🍼 ⭐</div>

          {/* Parents */}
          <p style={{ fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#3b82f6", margin: "0 0 10px" }}>
            Hosted by
          </p>
          <h1 style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#1e3a8a",
            lineHeight: 1.1,
            margin: "0 0 6px",
          }}>
            {invite.groomName}
            {invite.brideName && ` & ${invite.brideName}`}
          </h1>

          <p style={{ fontSize: 16, fontStyle: "italic", color: "#3b82f6", margin: "0 0 24px" }}>are expecting!</p>

          {/* Baby name if provided */}
          {babyLine && (
            <div style={{
              background: "#dbeafe",
              border: "1px solid #93c5fd",
              borderRadius: 50,
              display: "inline-block",
              padding: "6px 20px",
              marginBottom: 24,
            }}>
              <p style={{ fontSize: 15, color: "#1d4ed8", fontWeight: 600, margin: 0 }}>
                Baby {babyLine}
              </p>
            </div>
          )}

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #93c5fd)" }} />
            <span style={{ fontSize: 18 }}>🌟</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #93c5fd, transparent)" }} />
          </div>

          {/* Date */}
          <div style={{
            background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            border: "1px solid #93c5fd",
            borderRadius: 8,
            padding: "20px 24px",
            marginBottom: 16,
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8", margin: "0 0 8px" }}>
              Shower Date
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1e3a8a", margin: 0 }}>{formatDate(invite.weddingDate)}</p>
            {invite.weddingTime && (
              <p style={{ fontSize: 15, color: "#3b82f6", margin: "4px 0 0" }}>at {invite.weddingTime}</p>
            )}
          </div>

          {/* Venue */}
          <div style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 8,
            padding: "16px 24px",
            marginBottom: 24,
          }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8", margin: "0 0 6px" }}>Venue</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#1e3a8a", margin: 0 }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 13, color: "#3b82f6", margin: "4px 0 0" }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Message */}
          {restMessage && (
            <p style={{
              fontStyle: "italic",
              fontSize: 14,
              color: "#1e3a8a",
              lineHeight: 1.8,
              borderTop: "1px solid #bfdbfe",
              paddingTop: 20,
              marginBottom: 20,
            }}>
              "{restMessage}"
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{ borderTop: "1px solid #bfdbfe", paddingTop: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#1d4ed8", margin: "0 0 6px" }}>RSVP</p>
              {invite.contactName && <p style={{ fontSize: 15, color: "#1e3a8a", margin: 0 }}>{invite.contactName}</p>}
              {invite.contactPhone && <p style={{ fontSize: 17, color: "#2563eb", fontWeight: 700, margin: "2px 0 0" }}>{invite.contactPhone}</p>}
            </div>
          )}

          {/* Bottom emoji */}
          <div style={{ fontSize: 24, letterSpacing: 10, marginTop: 24, color: "#93c5fd" }}>🌙 ⭐ 🌙</div>
        </div>

        {/* Bottom ribbon */}
        <div style={{
          background: "#2563eb",
          color: "#fff",
          textAlign: "center",
          padding: "10px 24px",
          fontSize: 20,
          letterSpacing: 6,
        }}>
          👶 🍼 👶
        </div>
      </div>
    </div>
  );
}
