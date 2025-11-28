import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SupportButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola, ¿en qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");

  // Ocultar en la ruta de estudiantes
  const hidden = location.pathname.startsWith("/estudiantes");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openSupport", handler);
    return () => window.removeEventListener("openSupport", handler);
  }, []);

  if (hidden) return null;

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    // Respuesta simulada
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Gracias por tu consulta. Un agente se contactará pronto o usa WhatsApp: +56 9 1234 5678",
        },
      ]);
    }, 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {/* Panel de chat */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat de soporte AulaPlus"
          style={{
            position: "fixed",
            right: 16,
            bottom: 72,
            width: 360,
            maxWidth: "calc(100vw - 24px)",
            height: 520,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              background: "linear-gradient(135deg, #004aad 0%, #0066cc 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🤖</span>
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontWeight: 700 }}>Asistente AulaPlus</div>
                <small style={{ opacity: 0.9 }}>En línea</small>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                aria-label="Minimizar"
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                ▾
              </button>
            </div>
          </div>

          {/* Body: solo mensajes */}
          <div style={{ padding: 16, height: 520 - 56 - 76, overflowY: "auto" }}>
            <div style={{ display: "grid", rowGap: 8 }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    maxWidth: "85%",
                    justifySelf: m.from === "user" ? "end" : "start",
                    background: m.from === "user" ? "#e8f0fe" : "#f4f6fa",
                    color: "#2c3e50",
                    border: "1px solid #e0e0e0",
                    padding: "8px 12px",
                    borderRadius: 12,
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid #eef0f4",
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe tu pregunta"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid #dfe3eb",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <button
                aria-label="Enviar"
                onClick={sendMessage}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  background: "#004aad",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ▶
              </button>
            </div>
            {/* Texto aclaratorio eliminado para simplificar la interfaz */}
          </div>
        </div>
      )}

      {/* Botón pill flotante para abrir el chat (centro inferior) */}
      <button
        aria-label="Preguntarle a AulaPlus"
        onClick={() => setOpen(!open)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 999,
          border: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          background: "#6d28d9",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          minWidth: 240,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 18 }}>💬</span>
        Preguntarle a AulaPlus
      </button>
    </div>
  );
}
