import { useEffect, useState } from "react";

type Article = {
  id: number;
  title: string;
  original_content: string;
  updated_content: string | null;
  source_url: string;
};

const API = import.meta.env.VITE_API_BASE;

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "processed" | "pending">("all");

  const fetchArticles = () => {
    setLoading(true);
    fetch(`${API}/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <p style={{ padding: 24, fontSize: 18 }}>Loading articles…</p>;
  }

  const filtered = articles
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => {
      if (status === "processed") return !!a.updated_content;
      if (status === "pending") return !a.updated_content;
      return true;
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>BeyondChats — Article Dashboard</h1>

      <button onClick={fetchArticles} style={styles.refreshBtn}>
        🔄 Refresh Articles
      </button>

      <input
        type="text"
        placeholder="Search articles by title…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.filterRow}>
        {["all", "processed", "pending"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s as any)}
            style={{
              ...styles.filterBtn,
              backgroundColor: status === s ? "#059669" : "#fff",
              color: status === s ? "#fff" : "#065f46",
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={styles.empty}>No articles match your filters.</p>
      )}

      {filtered.map((a) => {
        const processed = Boolean(a.updated_content);

        return (
          <div key={a.id} style={styles.card}>
            <div style={styles.headerRow}>
              <h2 style={{ margin: 0 }}>{a.title}</h2>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: processed ? "#d1fae5" : "#fef3c7",
                  color: processed ? "#065f46" : "#92400e",
                }}
              >
                {processed ? "Processed" : "Pending"}
              </span>
            </div>

            <p style={styles.meta}>
              <strong>Source:</strong>{" "}
              <a href={a.source_url} target="_blank">
                {a.source_url}
              </a>
            </p>

            <h4>Original Content</h4>
            <p style={styles.text}>{a.original_content}</p>

            {processed && (
              <>
                <button
                  style={styles.toggleBtn}
                  onClick={() => setOpenId(openId === a.id ? null : a.id)}
                >
                  {openId === a.id
                    ? "Hide Updated Content"
                    : "Show Updated Content"}
                </button>

                {openId === a.id && (
                  <div style={styles.updatedBox}>
                    <h4>Updated Content</h4>
                    <p style={styles.text}>{a.updated_content}</p>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 16,
    maxWidth: 900,
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
    background: "#f0fdf4",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: 20,
    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
    color: "#064e3b",
  },
  refreshBtn: {
    marginBottom: 20,
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "#059669",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  search: {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    border: "1px solid #a7f3d0",
    fontSize: 14,
  },
  filterRow: {
    display: "flex",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "6px 14px",
    borderRadius: 999,
    border: "1px solid #059669",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  },
  empty: {
    color: "#065f46",
    padding: 20,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #d1fae5",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
  },
  headerRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  meta: {
    fontSize: 13,
    marginTop: 6,
    wordBreak: "break-word",
  },
  text: {
    lineHeight: 1.6,
    color: "#374151",
    fontSize: 14,
  },
  toggleBtn: {
    marginTop: 14,
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: 10,
    cursor: "pointer",
    width: "100%",
    fontWeight: 600,
  },
  updatedBox: {
    marginTop: 16,
    padding: 16,
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 10,
  },
};
