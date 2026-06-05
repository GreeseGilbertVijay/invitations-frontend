import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import type { WeddingInvite } from "../types/WeddingInvite";
import { templateRegistry } from "../templates/registry";

type PageState = "loading" | "ok" | "expired" | "draft" | "notfound";

interface ExpiredInfo {
  groomName: string;
  brideName: string;
  expiresAt: string;
}

const PublicInvite = () => {
  const { slug } = useParams<{ slug: string }>();
  const [invite, setInvite] = useState<WeddingInvite | null>(null);
  const [state, setState] = useState<PageState>("loading");
  const [expiredInfo, setExpiredInfo] = useState<ExpiredInfo | null>(null);

  useEffect(() => {
    axiosClient
      .get(`/invites/public/${slug}`)
      .then((res) => {
        setInvite(res.data);
        setState("ok");
      })
      .catch((err) => {
        const status = err.response?.status;
        const data = err.response?.data;
        if (status === 410) {
          setExpiredInfo({
            groomName: data?.groomName ?? "",
            brideName: data?.brideName ?? "",
            expiresAt: data?.expiresAt ?? "",
          });
          setState("expired");
        } else if (status === 403) {
          setState("draft");
        } else {
          setState("notfound");
        }
      });
  }, [slug]);

  if (state === "loading") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0eb",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48,
            height: 48,
            border: "4px solid #e0d6cc",
            borderTop: "4px solid #C9A96E",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }} />
          <p style={{ color: "#888", fontFamily: "Georgia, serif", fontSize: 15 }}>Loading invitation...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (state === "expired") {
    const expDate = expiredInfo?.expiresAt
      ? new Date(expiredInfo.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      : "";
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f0eb 0%, #ede8e0 100%)",
        padding: "32px 16px",
        fontFamily: "Georgia, serif",
      }}>
        <div style={{
          maxWidth: 480,
          width: "100%",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          padding: "48px 40px",
          textAlign: "center",
          border: "1px solid #e8e0d8",
        }}>
          {/* Hourglass / expired icon */}
          <div style={{
            width: 72,
            height: 72,
            background: "linear-gradient(135deg, #f5e6d3, #eddcc8)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            margin: "0 auto 24px",
            border: "2px solid #dbc9b0",
          }}>
            ⏳
          </div>

          <h1 style={{ fontSize: 26, color: "#4a3000", margin: "0 0 8px", fontWeight: "normal" }}>
            Invitation Expired
          </h1>

          {expiredInfo?.groomName && (
            <p style={{ fontSize: 18, color: "#7a5c20", margin: "0 0 16px", fontStyle: "italic" }}>
              {expiredInfo.groomName} &amp; {expiredInfo.brideName}
            </p>
          )}

          <div style={{
            background: "#fdf6ee",
            border: "1px solid #e8d5b5",
            borderRadius: 10,
            padding: "14px 20px",
            marginBottom: 24,
          }}>
            <p style={{ fontSize: 13, color: "#8B6914", margin: "0 0 4px", letterSpacing: 2, textTransform: "uppercase" }}>
              Link expired on
            </p>
            <p style={{ fontSize: 16, color: "#4a3000", margin: 0, fontWeight: "bold" }}>
              {expDate}
            </p>
          </div>

          <p style={{ fontSize: 14, color: "#999", lineHeight: 1.7, margin: 0 }}>
            Wedding invitations are active for 30 days after creation.<br />
            This link is no longer accessible to guests.
          </p>

          <div style={{
            marginTop: 28,
            borderTop: "1px solid #f0e8dc",
            paddingTop: 20,
          }}>
            <p style={{ fontSize: 12, color: "#bbb", letterSpacing: 2, textTransform: "uppercase" }}>
              Powered by Wedding Invite 💍
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "draft") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0eb",
        fontFamily: "Georgia, serif",
      }}>
        <div style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontSize: 24, color: "#4a3000", marginBottom: 8 }}>Not Published Yet</h1>
          <p style={{ color: "#888", fontSize: 14 }}>
            This invitation is saved as a draft and is not available publicly.
          </p>
        </div>
      </div>
    );
  }

  if (state === "notfound" || !invite) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0eb",
        fontFamily: "Georgia, serif",
      }}>
        <div style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💔</div>
          <h1 style={{ fontSize: 24, color: "#4a3000", marginBottom: 8 }}>Invitation Not Found</h1>
          <p style={{ color: "#888", fontSize: 14 }}>
            This invitation link may be invalid or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const entry = templateRegistry.find((t) => t.id === invite.template) ?? templateRegistry[0];
  return <entry.Component invite={invite} />;
};

export default PublicInvite;
