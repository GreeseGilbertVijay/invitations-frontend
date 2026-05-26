import type { WeddingInvite } from "../../types/WeddingInvite";

interface Props { invite: WeddingInvite; }

const formatDate = (d: string) => {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const formatDateShort = (d: string) => {
  if (!d) return "";
  const date = new Date(d);
  return {
    day: date.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase(),
    year: date.toLocaleDateString("en-IN", { year: "numeric" }),
    weekday: date.toLocaleDateString("en-IN", { weekday: "long" }),
  };
};

export default function ModernTemplate({ invite }: Props) {
  const wDate = formatDateShort(invite.weddingDate);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F0EB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
    }}>
      <div style={{
        maxWidth: 580,
        width: "100%",
        background: "#ffffff",
        boxShadow: "0 20px 80px rgba(0,0,0,0.10)",
      }}>
        {/* Gold top bar */}
        <div style={{ height: 5, background: "linear-gradient(90deg, #C9A96E 0%, #e8c97a 50%, #C9A96E 100%)" }} />

        <div style={{ padding: "52px 48px 44px" }}>
          {/* We Are Getting Married */}
          <p style={{
            fontSize: 11,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C9A96E",
            margin: "0 0 32px",
          }}>
            We Are Getting Married
          </p>

          {/* Names */}
          <h1 style={{
            fontSize: 52,
            fontWeight: 300,
            letterSpacing: -1,
            color: "#1a1a1a",
            lineHeight: 1.0,
            margin: "0 0 6px",
          }}>
            {invite.groomName}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "12px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e0d6cc" }} />
            <span style={{ fontSize: 13, color: "#C9A96E", letterSpacing: 4 }}>AND</span>
            <div style={{ flex: 1, height: 1, background: "#e0d6cc" }} />
          </div>
          <h1 style={{
            fontSize: 52,
            fontWeight: 300,
            letterSpacing: -1,
            color: "#1a1a1a",
            lineHeight: 1.0,
            margin: "0 0 40px",
          }}>
            {invite.brideName}
          </h1>

          {/* Date block */}
          <div style={{
            display: "flex",
            gap: 0,
            marginBottom: 36,
            border: "1px solid #e0d6cc",
          }}>
            <div style={{
              background: "#1a1a1a",
              color: "#fff",
              padding: "20px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 90,
            }}>
              <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{wDate.day}</span>
              <span style={{ fontSize: 12, letterSpacing: 2, marginTop: 4 }}>{wDate.month}</span>
              <span style={{ fontSize: 11, color: "#C9A96E", marginTop: 2 }}>{wDate.year}</span>
            </div>
            <div style={{ flex: 1, padding: "20px 24px", borderLeft: "1px solid #e0d6cc" }}>
              <p style={{ fontSize: 12, color: "#C9A96E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 6px" }}>
                Ceremony
              </p>
              <p style={{ fontSize: 16, color: "#1a1a1a", fontWeight: 500, margin: "0 0 4px" }}>{wDate.weekday}</p>
              {invite.weddingTime && (
                <p style={{ fontSize: 14, color: "#666", margin: 0 }}>{invite.weddingTime}</p>
              )}
            </div>
          </div>

          {/* Venue */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "#C9A96E", letterSpacing: 4, textTransform: "uppercase", margin: "0 0 10px" }}>
              Venue
            </p>
            <p style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>{invite.venue}</p>
            {invite.venueAddress && (
              <p style={{ fontSize: 14, color: "#888", margin: 0 }}>{invite.venueAddress}</p>
            )}
          </div>

          {/* Reception */}
          {invite.receptionDate && (
            <div style={{
              background: "#faf8f5",
              border: "1px solid #e0d6cc",
              padding: "16px 20px",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              <div style={{ width: 3, alignSelf: "stretch", background: "#C9A96E", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: "#C9A96E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 4px" }}>
                  Reception
                </p>
                <p style={{ fontSize: 15, color: "#1a1a1a", margin: 0 }}>{formatDate(invite.receptionDate)}</p>
                {invite.receptionTime && (
                  <p style={{ fontSize: 13, color: "#666", margin: "2px 0 0" }}>{invite.receptionTime}</p>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {invite.message && (
            <p style={{
              fontSize: 14,
              color: "#666",
              lineHeight: 1.8,
              fontStyle: "italic",
              borderTop: "1px solid #e0d6cc",
              paddingTop: 24,
              marginBottom: 24,
            }}>
              {invite.message}
            </p>
          )}

          {/* Contact */}
          {(invite.contactName || invite.contactPhone) && (
            <div style={{
              borderTop: "1px solid #e0d6cc",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <p style={{ fontSize: 11, color: "#C9A96E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 4px" }}>
                  Contact
                </p>
                {invite.contactName && <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0 }}>{invite.contactName}</p>}
                {invite.contactPhone && <p style={{ fontSize: 16, color: "#C9A96E", fontWeight: 600, margin: "2px 0 0" }}>{invite.contactPhone}</p>}
              </div>
              <div style={{
                width: 48,
                height: 48,
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}>
                💍
              </div>
            </div>
          )}
        </div>

        {/* Bottom gold bar */}
        <div style={{ height: 5, background: "linear-gradient(90deg, #C9A96E 0%, #e8c97a 50%, #C9A96E 100%)" }} />
      </div>
    </div>
  );
}
