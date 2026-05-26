import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

export default function ClassicTemplate({ invite }: Props) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf6e3 0%, #faebd7 50%, #f5deb3 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <div style={{
        maxWidth: 640,
        width: "100%",
        background: "#fffdf5",
        border: "2px solid #c9a84c",
        borderRadius: 4,
        boxShadow: "0 8px 40px rgba(180,140,60,0.18), inset 0 0 0 6px #fffdf5, inset 0 0 0 8px #c9a84c",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Inner border effect */}
        <div style={{
          margin: 12,
          border: "1px solid #c9a84c",
          borderRadius: 2,
          padding: "40px 32px 36px",
        }}>
          {/* Top ornament */}
          <div style={{ textAlign: "center", color: "#b8860b", fontSize: 28, letterSpacing: 12, marginBottom: 12 }}>
            ✦ ❧ ✦
          </div>

          {/* Together forever */}
          <p style={{ textAlign: "center", fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            Together Forever
          </p>

          {/* Names */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <h1 style={{
              fontSize: 48,
              fontStyle: "italic",
              color: "#5a3e1b",
              lineHeight: 1.1,
              fontWeight: "normal",
              margin: 0,
            }}>
              {invite.groomName}
            </h1>
            <p style={{ fontSize: 20, color: "#b8860b", margin: "8px 0", letterSpacing: 6 }}>& </p>
            <h1 style={{
              fontSize: 48,
              fontStyle: "italic",
              color: "#5a3e1b",
              lineHeight: 1.1,
              fontWeight: "normal",
              margin: 0,
            }}>
              {invite.brideName}
            </h1>
          </div>

          {/* Divider */}
          <div style={{ textAlign: "center", margin: "24px 0", color: "#c9a84c" }}>
            <span style={{ fontSize: 22, letterSpacing: 8 }}>— ✦ —</span>
          </div>

          {/* Invitation text */}
          <p style={{ textAlign: "center", fontSize: 14, color: "#6b5028", lineHeight: 1.8, marginBottom: 28 }}>
            Together with their families, joyfully invite you to celebrate the auspicious occasion of their wedding
          </p>

          {/* Wedding details box */}
          <div style={{
            background: "linear-gradient(135deg, #fdf0d5 0%, #f5e6c3 100%)",
            border: "1px solid #dab96a",
            borderRadius: 2,
            padding: "24px 28px",
            marginBottom: 24,
          }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8B6914", marginBottom: 8 }}>
                Wedding Ceremony
              </p>
              <p style={{ fontSize: 20, fontWeight: "bold", color: "#4a3000", margin: 0 }}>
                {formatDate(invite.weddingDate)}
              </p>
              {invite.weddingTime && (
                <p style={{ fontSize: 15, color: "#7a5c20", marginTop: 4 }}>at {invite.weddingTime}</p>
              )}
            </div>

            <div style={{ borderTop: "1px solid #dab96a", paddingTop: 16, textAlign: "center" }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8B6914", marginBottom: 8 }}>
                Venue
              </p>
              <p style={{ fontSize: 18, fontWeight: "bold", color: "#4a3000", margin: 0 }}>{invite.venue}</p>
              {invite.venueAddress && (
                <p style={{ fontSize: 13, color: "#7a5c20", marginTop: 4 }}>{invite.venueAddress}</p>
              )}
            </div>
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <div style={{
              border: "1px dashed #c9a84c",
              borderRadius: 2,
              padding: "16px 20px",
              marginBottom: 24,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8B6914", marginBottom: 6 }}>
                Reception
              </p>
              <p style={{ fontSize: 16, color: "#4a3000", margin: 0 }}>{formatDate(invite.receptionDate)}</p>
              {invite.receptionTime && (
                <p style={{ fontSize: 13, color: "#7a5c20", marginTop: 2 }}>at {invite.receptionTime}</p>
              )}
            </div>
          )}

          {/* Message */}
          {invite.message && (
            <p style={{
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 14,
              color: "#6b5028",
              lineHeight: 1.8,
              borderTop: "1px solid #e8d5a3",
              paddingTop: 20,
              marginBottom: 20,
            }}>
              "{invite.message}"
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{ textAlign: "center", borderTop: "1px solid #e8d5a3", paddingTop: 16 }}>
              <p style={{ fontSize: 12, color: "#8B6914", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                For Enquiries
              </p>
              {invite.contactName && <p style={{ fontSize: 14, color: "#5a3e1b" }}>{invite.contactName}</p>}
              {invite.contactPhone && <p style={{ fontSize: 14, color: "#b8860b", fontWeight: "bold" }}>{invite.contactPhone}</p>}
            </div>
          )}

          {/* Bottom ornament */}
          <div style={{ textAlign: "center", color: "#b8860b", fontSize: 24, letterSpacing: 12, marginTop: 24 }}>
            ✦ ❦ ✦
          </div>
        </div>
      </div>
    </div>
  );
}
