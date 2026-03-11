import { useState, useEffect } from "react";

const moods = [
  { id: "all", label: "ALL", kr: "전체" },
  { id: "fog", label: "FOG", kr: "안개" },
  { id: "dusk", label: "DUSK", kr: "황혼" },
  { id: "void", label: "VOID", kr: "정적" },
  { id: "dawn", label: "DAWN", kr: "새벽" },
  { id: "ash", label: "ASH", kr: "재" },
];

const items = [
  {
    id: 1, mood: "fog",
    title: "Mist Corridor",
    desc: "반투명 린넨 커튼, 바닥부터 천장까지",
    longDesc: "안개가 스며들듯, 빛이 천천히 공간을 채우는 복도. 바닥부터 천장까지 이어진 반투명 린넨 커튼이 외부의 소음과 시선을 부드럽게 차단하며 내밀한 분위기를 만들어냅니다. 아침 햇살이 커튼을 통과할 때 나타나는 확산광이 이 공간의 핵심입니다.",
    tags: ["#린넨", "#화이트", "#자연광"],
    palette: ["#E8E4DF", "#C9C0B5", "#A89F94", "#D4CFC9", "#F0EDE8"],
    paletteNames: ["Mist White", "Linen Gray", "Warm Stone", "Pearl", "Soft Ivory"],
    size: "large", accent: "#B5AFA8",
    products: [
      { name: "HAY 린넨 커튼 240cm", price: "₩189,000", brand: "HAY" },
      { name: "무인양품 오크 플로어램프", price: "₩94,000", brand: "MUJI" },
      { name: "카시나 화이트 사이드테이블", price: "₩320,000", brand: "Cassina" },
    ],
    similar: [6, 5, 9],
  },
  {
    id: 2, mood: "dusk",
    title: "Ember Corner",
    desc: "웜 톤 테라코타와 번아웃 벨벳의 만남",
    longDesc: "황혼 무렵, 창문을 통해 들어오는 주황빛 빛이 테라코타 벽면과 만나는 순간. 번아웃 벨벳 소파의 질감이 빛의 방향에 따라 미묘하게 변하며 공간에 깊이를 더합니다. 간접조명 하나만으로도 충분한, 저녁을 위한 공간입니다.",
    tags: ["#테라코타", "#벨벳", "#간접조명"],
    palette: ["#C4714A", "#8B4E35", "#E8C4A0", "#A0522D", "#F2D4B8"],
    paletteNames: ["Terracotta", "Burnt Sienna", "Warm Sand", "Rust", "Peach Dust"],
    size: "small", accent: "#C4714A",
    products: [
      { name: "B&B 이탈리아 벨벳 소파", price: "₩2,450,000", brand: "B&B Italia" },
      { name: "Flos 아르코 플로어램프", price: "₩890,000", brand: "Flos" },
      { name: "HAY 테라코타 사이드테이블", price: "₩145,000", brand: "HAY" },
    ],
    similar: [7, 5, 1],
  },
  {
    id: 3, mood: "void",
    title: "Silent Volume",
    desc: "소리 없는 공간 — 올 블랙 매트 텍스처",
    longDesc: "모든 것이 흡수되는 공간. 빛도, 소리도, 시간도. 올 블랙 매트 마감은 반사 없이 공간의 경계를 모호하게 만들며 오브제 하나하나가 허공에 떠 있는 듯한 착시를 만들어냅니다. 미니멀의 극단에서 찾아낸 고요함입니다.",
    tags: ["#블랙", "#매트", "#미니멀"],
    palette: ["#1A1A1A", "#2D2D2D", "#404040", "#111111", "#555555"],
    paletteNames: ["Void Black", "Carbon", "Ash Dark", "Deep Space", "Graphite"],
    size: "medium", accent: "#888",
    products: [
      { name: "Menu 블랙 쉘프 시스템", price: "₩560,000", brand: "Menu" },
      { name: "Gubi 블랙 매트 펜던트", price: "₩340,000", brand: "Gubi" },
      { name: "Vipp 블랙 스틸 트레이", price: "₩89,000", brand: "Vipp" },
    ],
    similar: [8, 4, 5],
  },
  {
    id: 4, mood: "dawn",
    title: "Blue Hour Study",
    desc: "새벽 5시의 서재, 냉기와 고요함",
    longDesc: "세상이 아직 잠든 새벽 5시. 창밖은 블루아워의 차가운 빛으로 가득하고, 서재에는 독서등 하나만이 켜져 있습니다. 블루그레이 페인트와 월넛 우드의 조합이 차갑고도 따뜻한 긴장감을 만들어냅니다.",
    tags: ["#블루그레이", "#우드", "#서재"],
    palette: ["#7B8FA1", "#4A6274", "#D4DDE4", "#9AAAB8", "#C0CDD6"],
    paletteNames: ["Steel Blue", "Deep Teal", "Morning Mist", "Slate", "Ice Gray"],
    size: "small", accent: "#7B8FA1",
    products: [
      { name: "Louis Poulsen 독서등", price: "₩420,000", brand: "Louis Poulsen" },
      { name: "Muuto 월넛 책장 120cm", price: "₩780,000", brand: "Muuto" },
      { name: "Fritz Hansen 체어", price: "₩1,200,000", brand: "Fritz Hansen" },
    ],
    similar: [9, 3, 6],
  },
  {
    id: 5, mood: "ash",
    title: "Pale Archive",
    desc: "탈색된 콘크리트, 오래된 종이의 냄새",
    longDesc: "시간이 천천히 모든 색을 빼앗아 간 공간. 탈색된 콘크리트 벽, 빛바랜 오크 마루, 오래된 책들이 만들어내는 레이어. 이 공간에는 새것이 없습니다. 모든 것이 시간의 흔적을 품고 있습니다.",
    tags: ["#콘크리트", "#베이지", "#인더스트리얼"],
    palette: ["#C8C2BB", "#A09890", "#E2DDD8", "#B8B0A8", "#D4CEC8"],
    paletteNames: ["Pale Ash", "Worn Gray", "Chalk", "Cement", "Paper White"],
    size: "large", accent: "#A09890",
    products: [
      { name: "Frama 콘크리트 선반", price: "₩230,000", brand: "Frama" },
      { name: "Toast 빈티지 오크 스툴", price: "₩195,000", brand: "Toast" },
      { name: "Serax 콘크리트 화분", price: "₩68,000", brand: "Serax" },
    ],
    similar: [1, 6, 3],
  },
  {
    id: 6, mood: "fog",
    title: "Float Room",
    desc: "바닥에 닿지 않는 가구들, 부유하는 공간",
    longDesc: "중력을 거스르는 공간. 모든 가구가 바닥으로부터 살짝 떠 있어 공기가 자유롭게 흐릅니다. 화이트 오크의 따뜻한 결과 벽에 반사되는 간접광이 만들어내는 부유감이 이 공간의 핵심 무드입니다.",
    tags: ["#화이트오크", "#플로팅", "#스칸디"],
    palette: ["#F0EDE8", "#D8D0C5", "#B8AFA4", "#E4E0DA", "#C8C0B5"],
    paletteNames: ["Cloud White", "Warm Cream", "Driftwood", "Linen", "Sand"],
    size: "medium", accent: "#C5BDB4",
    products: [
      { name: "HAY 플로팅 사이드보드", price: "₩890,000", brand: "HAY" },
      { name: "Normann 오크 커피테이블", price: "₩540,000", brand: "Normann" },
      { name: "HAY 우드 펜던트 조명", price: "₩210,000", brand: "HAY" },
    ],
    similar: [1, 5, 9],
  },
  {
    id: 7, mood: "dusk",
    title: "Rust Linen Bed",
    desc: "황혼빛 침실, 구겨진 린넨의 온도",
    longDesc: "아무것도 정돈하지 않아도 되는 침실. 구겨진 린넨 시트, 무심하게 쌓인 쿠션들, 창문을 통해 들어오는 러스트빛 황혼. 완벽하지 않아서 오히려 완벽한, 저녁의 침실입니다.",
    tags: ["#러스트", "#린넨", "#침실"],
    palette: ["#9B5E3C", "#C4855A", "#E8C8A8", "#7A4A2E", "#D4A882"],
    paletteNames: ["Rust", "Copper", "Warm Linen", "Mahogany", "Blush Sand"],
    size: "medium", accent: "#9B5E3C",
    products: [
      { name: "Tekla 린넨 침구 세트", price: "₩320,000", brand: "Tekla" },
      { name: "IKEA 러스트 헤드보드", price: "₩145,000", brand: "IKEA" },
      { name: "Ferm Living 황동 벽조명", price: "₩185,000", brand: "Ferm Living" },
    ],
    similar: [2, 5, 1],
  },
  {
    id: 8, mood: "void",
    title: "Monolith Shelf",
    desc: "검정 철제 선반, 오브제만이 말한다",
    longDesc: "선반 그 자체는 존재를 지웁니다. 오직 그 위에 올려진 오브제들만이 공간에서 발언권을 가집니다. 블랙 파우더코팅 철제 선반 시스템은 배경이 되기 위해 태어났습니다.",
    tags: ["#아이언", "#블랙", "#오브제"],
    palette: ["#222222", "#333333", "#888888", "#1A1A1A", "#4A4A4A"],
    paletteNames: ["Iron Black", "Carbon Dark", "Steel", "Midnight", "Gunmetal"],
    size: "small", accent: "#888",
    products: [
      { name: "String 블랙 선반 시스템", price: "₩680,000", brand: "String" },
      { name: "Aesop 도서관 오브제 세트", price: "₩95,000", brand: "Aesop" },
      { name: "HAY 블랙 아이언 트레이", price: "₩52,000", brand: "HAY" },
    ],
    similar: [3, 4, 5],
  },
  {
    id: 9, mood: "dawn",
    title: "Grey Milk Light",
    desc: "흐린 아침, 유리창 너머 확산된 빛",
    longDesc: "비가 오려는 흐린 아침. 유리창 너머로 균일하게 확산된 회백색 빛이 공간 전체를 같은 온도로 채웁니다. 그림자가 없는 공간, 방향이 없는 빛. 이 공간에서는 모든 것이 동등하게 존재합니다.",
    tags: ["#그레이", "#유리", "#확산광"],
    palette: ["#A8B5BF", "#C8D4DC", "#E8EDF0", "#8FA0AC", "#B8C8D4"],
    paletteNames: ["Morning Steel", "Milk Blue", "Cloud Glass", "Slate Blue", "Mist"],
    size: "large", accent: "#A8B5BF",
    products: [
      { name: "Muuto 그레이 소파 모듈", price: "₩1,850,000", brand: "Muuto" },
      { name: "Menu 스모크 유리 커피테이블", price: "₩620,000", brand: "Menu" },
      { name: "Vipp 그레이 울 러그 200×300", price: "₩480,000", brand: "Vipp" },
    ],
    similar: [4, 6, 1],
  },
];

function GrainOverlay() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`, opacity: 0.4 }} />;
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

function Modal({ item, onClose, allItems, onNavigate, bookmarks, setBookmarks }) {
  const [tab, setTab] = useState("info");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [copiedHex, setCopiedHex] = useState(null);
  const isBookmarked = bookmarks.includes(item.id);
  const similarItems = allItems.filter(i => item.similar.includes(i.id));

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const fn = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  const addComment = () => { if (!comment.trim()) return; setComments(p => [...p, { text: comment, time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) }]); setComment(""); };
  const copyHex = (hex) => { navigator.clipboard?.writeText(hex); setCopiedHex(hex); setTimeout(() => setCopiedHex(null), 1600); };
  const tabs = [{ id: "info", label: "정보" }, { id: "palette", label: "팔레트" }, { id: "products", label: "제품" }, { id: "memo", label: "메모" }];

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
            <button onClick={() => setBookmarks(p => isBookmarked ? p.filter(id => id !== item.id) : [...p, item.id])}
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
              <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 11, fontFamily: "'Courier New', monospace", padding: "13px 0", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>✕ ESC</button>
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
                      <div key={s.id} onClick={() => onNavigate(s)} style={{ flex: 1, height: 78, borderRadius: 2, cursor: "pointer", position: "relative", overflow: "hidden", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"} onMouseLeave={e => e.currentTarget.style.transform = ""}>
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
                      <div key={i} onClick={() => copyHex(c)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "background 0.2s", background: copiedHex === c ? "rgba(255,255,255,0.08)" : "transparent" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"} onMouseLeave={e => e.currentTarget.style.background = copiedHex === c ? "rgba(255,255,255,0.08)" : "transparent"}>
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
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 14px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
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
                  <textarea value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addComment(); }} placeholder="이 공간에 대한 메모를 남겨보세요..." style={{ width: "100%", minHeight: 88, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, padding: "12px 13px", color: "#fff", fontSize: 12, fontFamily: "'Georgia', serif", lineHeight: 1.8, resize: "none", outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 20 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>⌘ + ENTER</span>
                    <button onClick={addComment} style={{ padding: "6px 15px", fontSize: 9, letterSpacing: "0.15em", fontFamily: "'Courier New', monospace", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.7)", cursor: "pointer", borderRadius: 1, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.7)"; }}>SAVE</button>
                  </div>
                  {comments.length === 0
                    ? <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace", textAlign: "center", padding: "24px 0" }}>— 아직 메모가 없습니다 —</div>
                    : <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {comments.map((c, i) => (
                        <div key={i} style={{ padding: "11px 13px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", borderLeft: `2px solid ${item.accent}` }}>
                          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", fontFamily: "'Georgia', serif", lineHeight: 1.75, marginBottom: 5 }}>{c.text}</p>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace" }}>{c.time}</span>
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

function SavedDrawer({ bookmarks, setBookmarks, allItems, onOpen, onClose }) {
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
                  <button onClick={e => { e.stopPropagation(); setBookmarks(p => p.filter(id => id !== item.id)); }} style={{ background: "transparent", border: "none", color: item.accent, fontSize: 14, cursor: "pointer", padding: "4px", transition: "opacity 0.2s", flexShrink: 0, opacity: 0.8 }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>✦</button>
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

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const fn = (e) => setCursor({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", fn); return () => window.removeEventListener("mousemove", fn); }, []);

  const filtered = activeMood === "all" ? items : items.filter(i => i.mood === activeMood);

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

      {showSaved && <SavedDrawer bookmarks={bookmarks} setBookmarks={setBookmarks} allItems={items} onOpen={setSelected} onClose={() => setShowSaved(false)} />}
      {selected && <Modal item={selected} onClose={() => setSelected(null)} allItems={items} onNavigate={setSelected} bookmarks={bookmarks} setBookmarks={setBookmarks} />}
    </div>
  );
}
