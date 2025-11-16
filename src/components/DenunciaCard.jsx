// src/components/DenunciaCard.jsx
export default function DenunciaCard({ denuncia }) {
  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px",
        margin: "12px auto",
        maxWidth: "420px",
        boxShadow: "0 0 10px rgba(255, 85, 0, 0.4)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <h3 style={{ margin: "0 0 8px", color: "#ff7300" }}>🔥 {denuncia.tipo}</h3>
      <p style={{ margin: "4px 0" }}>
        📍 <strong>Local:</strong> {denuncia.local}
      </p>
      <p style={{ margin: "4px 0" }}>
        📅 <strong>Data:</strong> {denuncia.data}
      </p>
    </div>
  );
}
