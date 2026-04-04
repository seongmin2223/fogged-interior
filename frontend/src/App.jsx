import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://fogged-interior.onrender.com";

// const API = "http://localhost:8080";

const moods = [
  { id: "all", label: "ALL", kr: "전체" },
  { id: "fog", label: "FOG", kr: "안개" },
  { id: "dusk", label: "DUSK", kr: "황혼" },
  { id: "void", label: "VOID", kr: "정적" },
  { id: "dawn", label: "DAWN", kr: "새벽" },
  { id: "ash", label: "ASH", kr: "재" },
];

function GrainOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`, opacity: 0.4 }} />;
}

function AuthModal({ mode, setMode, onClose, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "", nickname: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await axios.post("https://fogged-interior.onrender.com/api/auth/signup", {
          email: form.email,
          password: form.password,
          nickname: form.nickname,
        });
        setError("");
        setMode("login");
        setForm({ email: "", password: "", nickname: "" });
      } else {
        const res = await axios.post("https://fogged-interior.onrender.com/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("nickname", res.data.nickname); // 추가
        onSuccess({ nickname: res.data.nickname });
        onClose();
      }
    } catch (e) {
      const msg = e.response?.data || "";
      if (mode === "login" && msg.includes("존재하지 않는")) {
        setError("가입되지 않은 이메일이에요. 회원가입을 먼저 해주세요 🌫️");
      } else if (mode === "login" && msg.includes("비밀번호")) {
        setError("비밀번호가 일치하지 않아요.");
      } else if (mode === "signup" && msg.includes("이미")) {
        setError("이미 사용 중인 이메일이에요.");
      } else {
        setError("잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }} />
      <div style={{ position: "relative", zIndex: 1, width: "90%", maxWidth: 420, backgroundColor: "#141412", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "44px 40px", animation: "fadeUp 0.35s ease" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", cursor: "pointer", width: 28, height: 28, borderRadius: "50%", fontSize: 10 }}>✕</button>

        <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", marginBottom: 16 }}>— FOGGED</div>
        <h2 style={{ fontSize: 22, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 400, marginBottom: 28 }}>
          {mode === "login" ? "로그인" : "회원가입"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="이메일"
            style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, color: "#fff", fontSize: 12, fontFamily: "'Courier New', monospace", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
          />
          <input value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            placeholder="비밀번호" type="password"
            style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, color: "#fff", fontSize: 12, fontFamily: "'Courier New', monospace", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          {mode === "signup" && (
            <input value={form.nickname} onChange={e => setForm(p => ({ ...p, nickname: e.target.value }))}
              placeholder="닉네임"
              style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, color: "#fff", fontSize: 12, fontFamily: "'Courier New', monospace", outline: "none" }}
              onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          )}
        </div>

        {error && (
          <div style={{ fontSize: 11, color: "rgba(255,180,180,0.9)", fontFamily: "'Courier New', monospace", marginBottom: 14, lineHeight: 1.6 }}>{error}</div>
        )}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", padding: "12px", fontSize: 10, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer", borderRadius: 2, transition: "all 0.2s", marginBottom: 16 }}>
          {loading ? "..." : mode === "login" ? "LOGIN" : "SIGN UP"}
        </button>

        <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>
          {mode === "login" ? (
            <>아직 계정이 없으신가요?{" "}
              <span onClick={() => { setMode("signup"); setError(""); }} style={{ color: "rgba(255,255,255,0.75)", cursor: "pointer", textDecoration: "underline" }}>회원가입</span>
            </>
          ) : (
            <>이미 계정이 있으신가요?{" "}
              <span onClick={() => { setMode("login"); setError(""); }} style={{ color: "rgba(255,255,255,0.75)", cursor: "pointer", textDecoration: "underline" }}>로그인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MoodCanvas({ item }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 25% 25%, ${item.palette[0]}DD 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, ${item.palette[1]}BB 0%, transparent 50%), linear-gradient(145deg, ${item.palette[3] || item.palette[2]}44, ${item.palette[0]}22)`, backgroundColor: item.palette[2] }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.018) 2px,rgba(255,255,255,0.018) 4px)` }} />
    </div>
  );
}

function Card({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const sizeMap = { small: 250, medium: 320, large: 400 };
  return (
    <div onClick={() => onClick(item)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", height: sizeMap[item.size], borderRadius: 2, overflow: "hidden", cursor: "pointer", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease", transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? `0 28px 64px rgba(0,0,0,0.32), 0 0 0 1px ${item.accent}55` : "0 4px 20px rgba(0,0,0,0.14)", animation: "fadeUp 0.65s ease both", animationDelay: `${index * 0.06}s` }}>
      <MoodCanvas item={item} />
      <div style={{ position: "absolute", top: 14, left: 14, fontSize: 9, letterSpacing: "0.22em", color: "#fff", fontFamily: "'Courier New', monospace", background: "rgba(0,0,0,0.38)", padding: "4px 9px", backdropFilter: "blur(8px)", borderRadius: 1 }}>{item.mood.toUpperCase()}</div>
      <div style={{ position: "absolute", top: 14, right: 14, fontSize: 9, color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", background: "rgba(0,0,0,0.3)", padding: "4px 8px", borderRadius: 1, opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>VIEW →</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 18px 18px", background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)", transform: hovered ? "translateY(0)" : "translateY(7px)", transition: "transform 0.4s ease" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'Georgia', serif", marginBottom: 5, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{item.title}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", marginBottom: 10, opacity: hovered ? 1 : 0, transition: "opacity 0.3s 0.08s" }}>{item.desc}</div>
        <div style={{ display: "flex", gap: 4 }}>{item.palette.slice(0, 4).map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", backgroundColor: c, border: "1px solid rgba(255,255,255,0.4)" }} />)}</div>
      </div>
    </div>
  );
}

function Modal({ item, onClose, allItems, onNavigate, bookmarks, setBookmarks, toggleBookmark }) {
  const [tab, setTab] = useState("info");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [copiedHex, setCopiedHex] = useState(null);
  const isBookmarked = bookmarks.includes(item.id);
  const similarItems = allItems.filter(i => item.similar.includes(i.id));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    if (item?.id) {
      axios.get(`${API}/api/user-items/${item.id}/comments`)
        .then(res => setComments(res.data))
        .catch(err => console.error(err));
    }
  }, [item.id]);

  const addComment = async () => {
    if (!comment.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/api/user-items/${item.id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(p => [...p, res.data]);
      setComment("");
    } catch (err) {
      alert("메모 저장에 실패했습니다.");
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("메모를 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("token");
      // 위에서 수정한 Controller 경로에 맞춰 호출 (/api/user-items/comments/{id})
      await axios.delete(`${API}/api/user-items/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 삭제 성공 시 현재 상태(UI)에서 해당 댓글만 필터링해서 제거
      setComments(p => p.filter(c => c.id !== commentId));
    } catch (err) {
      console.error(err);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const copyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  const tabs = [
    { id: "info", label: "정보" },
    { id: "palette", label: "팔레트" },
    { id: "products", label: "제품" },
    { id: "memo", label: "메모" }
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "flex-end", animation: "fadeIn 0.2s ease" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)" }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxHeight: "90vh", backgroundColor: "#141412", borderTop: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px 14px 0 0", display: "flex", flexDirection: "column", animation: "slideUp 0.42s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
          <div style={{ width: 38, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
          <div style={{ width: "40%", flexShrink: 0, position: "relative" }}>
            <MoodCanvas item={item} />
            <button onClick={() => toggleBookmark(item.id)}
              style={{ position: "absolute", top: 18, right: 18, width: 34, height: 34, borderRadius: "50%", border: `1px solid ${isBookmarked ? item.accent : "rgba(255,255,255,0.3)"}`, background: isBookmarked ? `${item.accent}28` : "rgba(0,0,0,0.3)", color: isBookmarked ? item.accent : "#fff", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", backdropFilter: "blur(8px)" }}>
              {isBookmarked ? "✦" : "✧"}
            </button>
            <div style={{ position: "absolute", top: 20, left: 20, fontSize: 9, letterSpacing: "0.22em", color: "#fff", fontFamily: "'Courier New', monospace", background: "rgba(0,0,0,0.38)", padding: "4px 9px", backdropFilter: "blur(8px)", borderRadius: 1 }}>{item.mood.toUpperCase()}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "50px 22px 22px", background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
              <h2 style={{ fontSize: 24, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 500, marginBottom: 6, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{item.title}</h2>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em", marginBottom: 14 }}>{item.desc}</p>
              <div style={{ display: "flex", gap: 5 }}>{item.palette.map((c, i) => <div key={i} title={item.paletteNames[i]} style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: c, border: "1px solid rgba(255,255,255,0.35)" }} />)}</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "0 20px", flexShrink: 0 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "13px 14px", fontSize: 10, letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", background: "transparent", border: "none", borderBottom: tab === t.id ? "1px solid rgba(255,255,255,0.7)" : "1px solid transparent", color: tab === t.id ? "#fff" : "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s", marginBottom: -1 }}>{t.label.toUpperCase()}</button>
              ))}
              <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 11, fontFamily: "'Courier New', monospace", padding: "13px 0", transition: "color 0.2s" }}>✕ ESC</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "22px" }}>
              {tab === "info" && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)", marginBottom: 14, fontFamily: "'Courier New', monospace" }}>— SPACE DESCRIPTION</div>
                  <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(255,255,255,0.82)", fontFamily: "'Georgia', serif", marginBottom: 22 }}>{item.longDesc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
                    {item.tags.map(t => <span key={t} style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 1, fontFamily: "'Courier New', monospace" }}>{t}</span>)}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)", marginBottom: 12, fontFamily: "'Courier New', monospace" }}>— SIMILAR SPACES</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {similarItems.map(s => (
                      <div key={s.id} onClick={() => onNavigate(s)} style={{ flex: 1, height: 78, borderRadius: 2, cursor: "pointer", position: "relative", overflow: "hidden", transition: "transform 0.3s" }}>
                        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 30%, ${s.palette[0]}CC, transparent 55%), linear-gradient(135deg, ${s.palette[1]}, ${s.palette[2]})` }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", display: "flex", alignItems: "flex-end", padding: "8px 10px" }}>
                          <span style={{ fontSize: 10, color: "#fff", fontFamily: "'Georgia', serif", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{s.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "palette" && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)", marginBottom: 18, fontFamily: "'Courier New', monospace" }}>— MOOD PALETTE</div>
                  <div style={{ display: "flex", height: 90, borderRadius: 2, overflow: "hidden", marginBottom: 22 }}>
                    {item.palette.map((c, i) => <div key={i} style={{ flex: 1, backgroundColor: c, transition: "flex 0.35s ease" }} onMouseEnter={e => e.currentTarget.style.flex = "2.2"} onMouseLeave={e => e.currentTarget.style.flex = "1"} />)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {item.palette.map((c, i) => (
                      <div key={i} onClick={() => copyHex(c)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "background 0.2s", background: copiedHex === c ? "rgba(255,255,255,0.08)" : "transparent" }}>
                        <div style={{ width: 34, height: 34, borderRadius: 2, backgroundColor: c, border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        <div><div style={{ fontSize: 12, color: "#fff", fontFamily: "'Georgia', serif", marginBottom: 2 }}>{item.paletteNames[i]}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>{c.toUpperCase()}</div></div>
                        <div style={{ marginLeft: "auto", fontSize: 9, color: copiedHex === c ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>{copiedHex === c ? "COPIED ✓" : "COPY"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "products" && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)", marginBottom: 18, fontFamily: "'Courier New', monospace" }}>— CURATED PRODUCTS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.products.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 14px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.22s" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 2, flexShrink: 0, backgroundColor: item.palette[i % item.palette.length], border: "1px solid rgba(255,255,255,0.15)" }} />
                        <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: "#fff", fontFamily: "'Georgia', serif", marginBottom: 3 }}>{p.name}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New', monospace", letterSpacing: "0.12em" }}>{p.brand}</div></div>
                        <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "'Courier New', monospace", marginBottom: 3 }}>{p.price}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>LINK →</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "memo" && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)", marginBottom: 16, fontFamily: "'Courier New', monospace" }}>— MY NOTES</div>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addComment(); }} placeholder="이 공간에 대한 메모를 남겨보세요..." style={{ width: "100%", minHeight: 88, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, padding: "12px 13px", color: "#fff", fontSize: 12, fontFamily: "'Georgia', serif", lineHeight: 1.8, resize: "none", outline: "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 20 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>⌘ + ENTER</span>
                    <button onClick={addComment} style={{ padding: "6px 15px", fontSize: 9, letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.7)", cursor: "pointer", borderRadius: 1 }}>SAVE</button>
                  </div>
                  {comments.length === 0
                    ? <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", textAlign: "center", padding: "24px 0" }}>— 아직 메모가 없습니다 —</div>
                    : <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {comments.map((c, i) => (
                        <div key={i} style={{ padding: "11px 13px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", borderLeft: `2px solid ${item.accent}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", fontFamily: "'Georgia', serif", lineHeight: 1.75, marginBottom: 5, flex: 1 }}>
                              {c.content}
                            </p>
                            {/* 삭제 버튼 추가 */}
                            <button
                              onClick={() => deleteComment(c.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#fff",
                                fontSize: 9,
                                cursor: "pointer",
                                padding: "0 0 0 10px",
                                fontFamily: "'Courier New', monospace",
                                transition: "color 0.2s"
                              }}
                              onMouseEnter={e => e.target.style.color = "#ff4d4d"}
                              onMouseLeave={e => e.target.style.color = "#fff"}
                            >
                              DELETE
                            </button>
                          </div>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>
                            {c.nickname || "익명"}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "", desc: "", mood: "fog", size: "medium",
    longDesc: "", tags: "",
    palette: ["#E8E4DF", "#C9C0B5", "#A89F94", "#D4CFC9", "#F0EDE8"],
    paletteNames: ["", "", "", "", ""],
    accent: "#E8E4DF"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.title || !form.desc) { setError("제목과 설명은 필수예요."); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title: form.title,
        desc: form.desc,
        mood: form.mood,
        size: form.size,
        longDesc: form.longDesc,
        tags: JSON.stringify(form.tags.split(",").map(t => t.trim()).filter(Boolean)),
        palette: JSON.stringify(form.palette),
        paletteNames: JSON.stringify(form.paletteNames),
        accent: form.accent,
      };
      const res = await axios.post(`${API}/api/user-items`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSuccess(res.data);
      onClose();
    } catch (e) {
      setError("저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { padding: "10px 13px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, color: "#fff", fontSize: 12, fontFamily: "'Courier New', monospace", outline: "none", width: "100%" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }} />
      <div style={{ position: "relative", zIndex: 1, width: "90%", maxWidth: 520, backgroundColor: "#141412", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "44px 40px", animation: "fadeUp 0.35s ease", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", cursor: "pointer", width: 28, height: 28, borderRadius: "50%", fontSize: 10 }}>✕</button>
        <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", marginBottom: 16 }}>— CREATE CURATION</div>
        <h2 style={{ fontSize: 22, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 400, marginBottom: 28 }}>나만의 공간 만들기</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="공간 이름" style={inputStyle} />
          <input value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="한 줄 설명" style={inputStyle} />
          <textarea value={form.longDesc} onChange={e => setForm(p => ({ ...p, longDesc: e.target.value }))} placeholder="공간 설명 (선택)" style={{ ...inputStyle, minHeight: 80, resize: "none" }} />
          <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="태그 (쉼표로 구분, 예: #린넨, #화이트)" style={inputStyle} />

          <div style={{ display: "flex", gap: 8 }}>
            {["fog", "dusk", "void", "dawn", "ash"].map(m => (
              <button key={m} onClick={() => setForm(p => ({ ...p, mood: m }))}
                style={{ flex: 1, padding: "7px 0", fontSize: 9, letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", border: form.mood === m ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.12)", background: form.mood === m ? "rgba(255,255,255,0.1)" : "transparent", color: form.mood === m ? "#fff" : "rgba(255,255,255,0.45)", cursor: "pointer", borderRadius: 1 }}>
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {["small", "medium", "large"].map(s => (
              <button key={s} onClick={() => setForm(p => ({ ...p, size: s }))}
                style={{ flex: 1, padding: "7px 0", fontSize: 9, letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", border: form.size === s ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.12)", background: form.size === s ? "rgba(255,255,255,0.1)" : "transparent", color: form.size === s ? "#fff" : "rgba(255,255,255,0.45)", cursor: "pointer", borderRadius: 1 }}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", fontFamily: "'Courier New', monospace", marginTop: 4 }}>— PALETTE</div>
          <div style={{ display: "flex", gap: 8 }}>
            {form.palette.map((c, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <input type="color" value={c} onChange={e => { const p = [...form.palette]; p[i] = e.target.value; setForm(prev => ({ ...prev, palette: p, accent: p[0] })); }}
                  style={{ width: "100%", height: 40, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, cursor: "pointer", background: "transparent", padding: 2 }} />
                <input value={form.paletteNames[i]} onChange={e => { const n = [...form.paletteNames]; n[i] = e.target.value; setForm(prev => ({ ...prev, paletteNames: n })); }}
                  placeholder={`색상 ${i + 1}`} style={{ ...inputStyle, fontSize: 9, padding: "5px 8px" }} />
              </div>
            ))}
          </div>
        </div>

        {error && <div style={{ fontSize: 11, color: "rgba(255,180,180,0.9)", fontFamily: "'Courier New', monospace", marginTop: 14 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", padding: "12px", fontSize: 10, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer", borderRadius: 2, transition: "all 0.2s", marginTop: 20 }}>
          {loading ? "..." : "CREATE SPACE"}
        </button>
      </div>
    </div>
  );
}

function SavedDrawer({ bookmarks, setBookmarks, allItems, onOpen, onClose, toggleBookmark }) {
  const saved = allItems.filter(i => bookmarks.includes(i.id));
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const fn = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", justifyContent: "flex-end", animation: "fadeIn 0.2s ease" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", zIndex: 1, width: 380, height: "100%", backgroundColor: "#141412", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", animation: "slideRight 0.38s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden" }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", marginBottom: 8 }}>— MY COLLECTION</div>
            <h2 style={{ fontSize: 22, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 400 }}>저장된 공간</h2>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier New', monospace", marginTop: 5, letterSpacing: "0.1em" }}>{saved.length} SPACES SAVED</p>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, transition: "all 0.2s", marginTop: 4 }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {saved.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 14 }}>
              <div style={{ fontSize: 28, opacity: 0.2 }}>✧</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", textAlign: "center", lineHeight: 1.8 }}>아직 저장된 공간이 없습니다<br /><span style={{ fontSize: 10, opacity: 0.7 }}>카드의 ✧ 버튼을 눌러 저장하세요</span></div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {saved.map((item, i) => (
                <div key={item.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, transition: "all 0.22s", animation: "fadeUp 0.35s ease both", animationDelay: `${i * 0.05}s`, cursor: "pointer" }} onClick={() => { onOpen(item); onClose(); }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  <div style={{ width: 52, height: 52, borderRadius: 2, flexShrink: 0, position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 30% 30%, ${item.palette[0]}CC, transparent 55%), linear-gradient(135deg, ${item.palette[1]}, ${item.palette[2]})` }}>
                    <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 3 }}>{item.palette.slice(0, 3).map((c, ci) => <div key={ci} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: c, border: "1px solid rgba(255,255,255,0.3)" }} />)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#fff", fontFamily: "'Georgia', serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", flexShrink: 0 }}>{item.mood.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "'Courier New', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); toggleBookmark(item.id); }} style={{ background: "transparent", border: "none", color: item.accent, fontSize: 14, cursor: "pointer", padding: "4px", transition: "opacity 0.2s", flexShrink: 0, opacity: 0.8 }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>✦</button>
                </div>
              ))}
            </div>
          )}
        </div>
        {saved.length > 0 && (
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: "#fff", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>총 {saved.length}개 저장됨</span>
            <button onClick={() => setBookmarks([])} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 9, cursor: "pointer", padding: "5px 12px", borderRadius: 1, fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>전체 삭제</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FoggedApp() {
  const [activeMood, setActiveMood] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const fn = (e) => setCursor({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn); }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (!token || !nickname) return;
    setUser({ nickname });
  }, []);

  // 아이템 불러오기
  useEffect(() => {
    axios.get(`${API}/api/user-items`)
      .then(res => {
        setAllItems(res.data.map(item => ({
          ...item,
          palette: JSON.parse(item.palette),
          paletteNames: JSON.parse(item.paletteNames),
          tags: JSON.parse(item.tags),
          products: [],
          similar: [],
        })));
      })
      .catch(() => { });
  }, []);

  // 북마크 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${API}/api/bookmarks`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // 실제 존재하는 아이템 id만 필터링
      setBookmarks(res.data.filter(id => allItems.some(item => item.id === id)));
    }).catch(() => { });
  }, [user, allItems]);

  // 북마크 토글
  const toggleBookmark = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAuth(true);
      setAuthMode("login");
      return;
    }
    if (bookmarks.includes(itemId)) {
      await axios.delete(`${API}/api/bookmarks/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(p => p.filter(id => id !== itemId));
    } else {
      await axios.post(`${API}/api/bookmarks/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(p => [...p, itemId]);
    }
  };

  const filtered = activeMood === "all" ? allItems : allItems.filter(i => i.mood === activeMood);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0F0F0D", color: "#E8E4DF", fontFamily: "'Courier New', monospace", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fogIn { from { opacity:0; filter:blur(14px); } to { opacity:1; filter:blur(0); } }
        @keyframes slideUp { from { transform:translateY(55px); opacity:0; } to { transform:translateY(0); opacity:1; } }
        @keyframes slideRight { from { transform:translateX(60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-track { background:#0F0F0D; } ::-webkit-scrollbar-thumb { background:#2e2e2e; border-radius:2px; }
        textarea::placeholder { color:rgba(255,255,255,0.3); }
      `}</style>
      <GrainOverlay />
      <div style={{ position: "fixed", left: cursor.x - 160, top: cursor.y - 160, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,205,198,0.045) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1, transition: "left 0.08s, top 0.08s" }} />

      {/* NAV */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "0 40px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", backdropFilter: scrolled ? "blur(22px)" : "none", backgroundColor: scrolled ? "rgba(15,15,13,0.88)" : "transparent", transition: "all 0.4s ease" }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.18em", color: "#E8E4DF", fontFamily: "'Georgia', serif", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>FOGGED</span>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {bookmarks.length > 0 && (
            <span onClick={() => setShowSaved(true)} style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", fontFamily: "'Courier New', monospace", cursor: "pointer", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 1, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}>✦ {bookmarks.length} SAVED</span>
          )}
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>DISCOVER</span>
          <span onClick={() => setShowAbout(true)} style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>ABOUT</span>
          {user && (
            <span onClick={() => setShowCreate(true)}
              style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>+ CREATE</span>
          )}
          {user ? (
            <span onClick={() => { setUser(null); localStorage.removeItem("token"); localStorage.removeItem("nickname"); }}
              style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", fontFamily: "'Courier New', monospace", cursor: "pointer", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 1, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}>
              {user.nickname} · 로그아웃
            </span>
          ) : (
            <span onClick={() => { setShowAuth(true); setAuthMode("login"); }}
              style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>LOGIN</span>
          )}
        </div>
      </header>

      {/* HERO */}
      <section style={{ paddingTop: 138, paddingBottom: 56, paddingLeft: 40, paddingRight: 40, animation: "fogIn 1.2s ease both" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.38em", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>— INTERIOR CURATION STUDIO</div>
        <h1 style={{ fontSize: "clamp(40px, 6.5vw, 84px)", fontFamily: "'Georgia', serif", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#E8E4DF", maxWidth: 680, marginBottom: 22 }}>
          당신의 무드로<br /><em style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>공간을 읽다</em>
        </h1>
        <p style={{ fontSize: 12, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, maxWidth: 360 }}>안개처럼 스며드는 인테리어.<br />감각으로 고르고, 무드로 기억하세요.</p>
        <div style={{ marginTop: 36, width: 70, height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.35), transparent)" }} />
      </section>

      {/* MOOD FILTER */}
      <div style={{ padding: "0 40px 36px", display: "flex", alignItems: "center", gap: 4, overflowX: "auto" }}>
        {moods.map(m => (
          <button key={m.id} onClick={() => setActiveMood(m.id)} style={{ padding: "6px 16px", fontSize: 9, letterSpacing: "0.2em", fontFamily: "'Courier New', monospace", border: activeMood === m.id ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.12)", background: activeMood === m.id ? "rgba(255,255,255,0.1)" : "transparent", color: activeMood === m.id ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", borderRadius: 1, transition: "all 0.22s", whiteSpace: "nowrap" }}>
            {m.label} <span style={{ marginLeft: 4, fontSize: 8, opacity: 0.6 }}>{m.kr}</span>
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>{filtered.length} SPACES</div>
      </div>

      {/* GRID */}
      <main style={{ padding: "0 40px 80px", columns: "3 270px", columnGap: 13 }}>
        {filtered.map((item, i) => <div key={item.id} style={{ breakInside: "avoid", marginBottom: 13 }}><Card item={item} index={i} onClick={setSelected} /></div>)}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "22px 40px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>© 2025 FOGGED STUDIO</span>
        <span style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>무드가 공간이 될 때</span>
      </footer>

      {/* ABOUT */}
      {showAbout && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
          <div onClick={() => setShowAbout(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "90%", maxWidth: 520, backgroundColor: "#141412", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "48px 44px", animation: "fadeUp 0.35s ease" }}>
            <button onClick={() => setShowAbout(false)} style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", cursor: "pointer", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✕</button>
            <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", fontFamily: "'Courier New', monospace", marginBottom: 20 }}>— ABOUT FOGGED</div>
            <h2 style={{ fontSize: 28, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 20, lineHeight: 1.2 }}>안개처럼,<br /><em style={{ color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>스며드는 공간</em></h2>
            <div style={{ width: 40, height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.3), transparent)", marginBottom: 24 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontFamily: "'Georgia', serif", lineHeight: 2, marginBottom: 20 }}>FOGGED는 무드 기반 인테리어 큐레이션 스튜디오입니다. 우리는 공간을 단순한 인테리어가 아닌, 감각과 감정의 언어로 바라봅니다.</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontFamily: "'Georgia', serif", lineHeight: 2, marginBottom: 32 }}>FOG, DUSK, VOID, DAWN, ASH — 다섯 가지 무드로 분류된 공간들을 통해 당신만의 공간 언어를 찾아드립니다.</p>
            <div style={{ display: "flex", gap: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[["9+", "무드 공간"], ["5", "큐레이션 테마"], ["2025", "설립"]].map(([num, label]) => (
                <div key={label}><div style={{ fontSize: 22, fontFamily: "'Georgia', serif", color: "#fff", marginBottom: 4 }}>{num}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", letterSpacing: "0.15em" }}>{label}</div></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSaved && <SavedDrawer bookmarks={bookmarks} setBookmarks={setBookmarks} allItems={allItems} onOpen={setSelected} onClose={() => setShowSaved(false)} toggleBookmark={toggleBookmark} />}
      {selected && <Modal item={selected} onClose={() => setSelected(null)} allItems={allItems} onNavigate={setSelected} bookmarks={bookmarks} setBookmarks={setBookmarks} toggleBookmark={toggleBookmark} />}
      {showAuth && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuth(false)}
          onSuccess={(userData) => setUser(userData)}
        />
      )}
      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onSuccess={(newItem) => {
            const parsed = {
              ...newItem,
              palette: JSON.parse(newItem.palette),
              paletteNames: JSON.parse(newItem.paletteNames),
              tags: JSON.parse(newItem.tags),
              products: [],
              similar: [],
            };
            setAllItems(p => [parsed, ...p]);
          }}
        />
      )}
    </div>
  );
}
