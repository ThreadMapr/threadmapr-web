import React, { useState, useEffect, useRef } from "react";
let NativePurchases = null, PURCHASE_TYPE = { SUBS: "subs" };
try { const _iap = require("@capgo/native-purchases"); NativePurchases = _iap.NativePurchases; PURCHASE_TYPE = _iap.PURCHASE_TYPE; } catch {}
import { createClient } from "@supabase/supabase-js";

const API_BASE = "https://partiqule-production.up.railway.app";

// Team emails — these accounts get automatic admin nav access
const ADMIN_EMAILS = ["paul@partiqule.com", "sara@partiqule.com"];
const isAdminUser = (user) => user && ADMIN_EMAILS.includes(user.email?.toLowerCase());

// Detect if running inside Capacitor iOS wrapper vs browser
// When StoreKit is implemented, use this to branch between Apple IAP and Stripe
const IS_NATIVE = typeof window !== "undefined" &&
  (window?.Capacitor?.isNativePlatform?.() || window?.Capacitor?.platform === "ios");


// ── Brand direct website lookup ────────────────────────────
const BRAND_URLS = {
  "hu":               "https://hukitchen.com",
  "hu chocolate":     "https://hukitchen.com",
  "blueland":         "https://blueland.com",
  "branch basics":    "https://branchbasics.com",
  "grove collaborative": "https://grove.co",
  "seventh generation": "https://seventhgeneration.com",
  "dr. bronner":      "https://drbronner.com",
  "dr bronner":       "https://drbronner.com",
  "schmidt's":        "https://schmidtsnaturals.com",
  "schmidts":         "https://schmidtsnaturals.com",
  "native":           "https://nativecos.com",
  "wellnesse":        "https://wellnesse.com",
  "larabar":          "https://larabar.com",
  "rxbar":            "https://rxbar.com",
  "rx bar":           "https://rxbar.com",
  "yumearth":         "https://yumearth.com",
  "unreal":           "https://getunreal.com",
  "pact":             "https://wearpact.com",
  "girlfriend collective": "https://girlfriend.com",
  "patagonia":        "https://patagonia.com",
  "allbirds":         "https://allbirds.com",
  "eileen fisher":    "https://eileenfisher.com",
  "prAna":            "https://prana.com",
  "prana":            "https://prana.com",
  "olipop":           "https://drinkolipop.com",
  "poppi":            "https://drinkpoppi.com",
  "spindrift":        "https://spindriftfresh.com",
  "liquid death":     "https://liquiddeath.com",
  "harmless harvest": "https://harmlessharvest.com",
  "guayaki":          "https://guayaki.com",
  "alter eco":        "https://alterecofoods.com",
  "theo":             "https://theochocolate.com",
  "badger":           "https://badgerbalm.com",
  "bite":             "https://bitetoothpastebits.com",
  "risewell":         "https://risewell.com",
  "primally pure":    "https://primallypure.com",
  "ursa major":       "https://ursamajorbeauty.com",
  "ilia":             "https://iliabeauty.com",
  "thinksport":       "https://gothinksport.com",
  "raw elements":     "https://rawelementssunscreen.com",
  "beautycounter":    "https://beautycounter.com",
  "honest company":   "https://honest.com",
  "dyper":            "https://dyper.com",
  "coterie":          "https://coterie.com",
  "andy pandy":       "https://andypandydiapers.com",
  "healthybaby":      "https://healthybaby.com",
  "kudos":            "https://kudosdiapers.com",
  "klean kanteen":    "https://kleankanteen.com",
  "stasher":          "https://stasherbag.com",
  "vuori":            "https://vuoriclothing.com",
};

// Big box search URLs
const BIGBOX_URLS = {
  target: (name) => `https://www.target.com/s?searchTerm=${encodeURIComponent(name)}`,
  walmart: (name) => `https://www.walmart.com/search?q=${encodeURIComponent(name)}`,
};

function getBrandUrl(brandName, productName) {
  const key = (brandName || "").toLowerCase().trim();
  if (BRAND_URLS[key]) return BRAND_URLS[key];
  // Try partial match
  for (const [k, v] of Object.entries(BRAND_URLS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  // Fallback to Google search for brand website
  return `https://www.google.com/search?q=${encodeURIComponent((brandName || productName) + " official site")}`;
}

// Returns true if we have a known direct brand URL for this product
function hasBrandUrl(brandName, productName) {
  const key = (brandName || "").toLowerCase().trim();
  if (key && BRAND_URLS[key]) return true;
  for (const k of Object.keys(BRAND_URLS)) {
    if (key && (key.includes(k) || k.includes(key))) return true;
  }
  const pkey = (productName || "").toLowerCase().trim();
  if (pkey && BRAND_URLS[pkey]) return true;
  for (const k of Object.keys(BRAND_URLS)) {
    if (pkey && (pkey.includes(k) || k.includes(pkey))) return true;
  }
  return false;
}

// Filter alternatives list based on selected shopping source
// Amazon: everything | Brand: DTC brands only | Target: non-DTC / mass-market
function filterAltsBySource(alts, source) {
  if (!alts?.length) return [];
  if (source === "amazon") return alts;
  if (source === "brand")  return alts.filter(a => hasBrandUrl(a.brand, a.name));
  if (source === "bigbox") return alts.filter(a => !hasBrandUrl(a.brand, a.name));
  return alts;
}

// Detect if running inside Capacitor iOS app
const isCapacitor = typeof window !== "undefined" && !!(window.Capacitor?.isNativePlatform?.());
const isIOS = isCapacitor || /iPad|iPhone|iPod/.test(navigator.userAgent);

// Get safe area inset top — works in Capacitor and Safari
function getSafeAreaTop() {
  if (typeof document === "undefined") return 0;
  const el = document.createElement("div");
  el.style.cssText = "position:fixed;top:env(safe-area-inset-top,0px);left:0;width:0;height:0;pointer-events:none;";
  document.body.appendChild(el);
  const top = el.getBoundingClientRect().top;
  document.body.removeChild(el);
  return top > 0 ? top : (isIOS ? 47 : 0);
}

const SAFE_TOP = getSafeAreaTop();

// ── SUPABASE ──────────────────────────────────────────────────
const SUPA_URL = "https://hciyibnoipqvspmrflzh.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjaXlpYm5vaXBxdnNwbXJmbHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzk5NzcsImV4cCI6MjA5MDY1NTk3N30.ue_WmeiLbiCxMojsaXHzaOtRtSDoaP_0Ajlilx-0gjU";
const supabase = createClient(SUPA_URL, SUPA_KEY);

// ── BARCODE SCANNER ──────────────────────────────────────────
// Full-screen camera viewfinder with live barcode detection.
// Uses ML Kit on iOS (via Capacitor) and ZXing on mobile web.
const BarcodeScannerView = ({ onBarcode, onPhoto, onClose }) => {
  const videoRef    = useRef(null);
  const canvasRef   = useRef(null);
  const [status,     setStatus]     = useState("starting");
  const [flash,      setFlash]      = useState(false);
  const [scanMsg,    setScanMsg]    = useState("Starting camera...");
  const [hint,       setHint]       = useState(false); // show "try photo" hint after timeout
  const streamRef   = useRef(null);
  const controlsRef = useRef(null);
  const stopRef     = useRef(false);
  const rafRef      = useRef(null); // store requestAnimationFrame ID for clean cancellation
  const hintTimer   = useRef(null);

  const cleanup = async () => {
    stopRef.current = true;
    // Cancel animation frame immediately — prevents continued scanning after stop
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (hintTimer.current) { clearTimeout(hintTimer.current); hintTimer.current = null; }
    try { controlsRef.current?.stop?.(); } catch(e) {}
    try { streamRef.current?.getTracks().forEach(t => t.stop()); } catch(e) {}
    if (IS_NATIVE) {
      try {
        const { BarcodeScanner } = await import("@capacitor-mlkit/barcode-scanning");
        await BarcodeScanner.stopScan();
        await BarcodeScanner.removeAllListeners();
      } catch(e) {}
    }
  };

  const onFound = (value) => {
    if (stopRef.current) return;
    stopRef.current = true;
    // Cancel the scan loop immediately so it cannot fire again
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setFlash(true);
    try { window.navigator?.vibrate?.(50); } catch(e) {}
    setTimeout(() => { cleanup(); onBarcode(value); }, 350);
  };

  useEffect(() => {
    const start = async () => {
      if (IS_NATIVE) {
        try {
          const { BarcodeScanner } = await import("@capacitor-mlkit/barcode-scanning");
          const { camera } = await BarcodeScanner.requestPermissions();
          if (camera !== "granted" && camera !== "limited") {
            setStatus("error"); setScanMsg("Camera permission denied"); return;
          }
          await BarcodeScanner.addListener("barcodeScanned", ({ barcode }) => onFound(barcode.rawValue));
          await BarcodeScanner.startScan();
          setStatus("scanning"); setScanMsg("Point at a barcode");
        } catch(e) {
          setStatus("error"); setScanMsg("Scanner unavailable");
        }
      } else {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }
          });
          streamRef.current = stream;
          if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
          setStatus("scanning"); setScanMsg("Point at a barcode");

          // Show "try photo" hint after 12 seconds if no barcode found yet
          hintTimer.current = setTimeout(() => {
            if (!stopRef.current) setHint(true);
          }, 12000);

          if ("BarcodeDetector" in window) {
            const detector = new window.BarcodeDetector({
              formats: ["ean_13","ean_8","upc_a","upc_e","code_128","code_39","code_93","qr_code","data_matrix","itf","codabar"]
            });
            const scan = async () => {
              if (stopRef.current || !videoRef.current) return;
              try {
                const barcodes = await detector.detect(videoRef.current);
                if (barcodes.length > 0) { onFound(barcodes[0].rawValue); return; }
              } catch(e) {}
              if (!stopRef.current) rafRef.current = requestAnimationFrame(scan);
            };
            rafRef.current = requestAnimationFrame(scan);
          } else {
            // ZXing fallback
            const { BrowserMultiFormatReader } = await import("@zxing/browser");
            const reader = new BrowserMultiFormatReader();
            const controls = await reader.decodeFromVideoDevice(undefined, videoRef.current,
              (result) => { if (result && !stopRef.current) onFound(result.getText()); }
            );
            controlsRef.current = controls;
          }
        } catch(e) {
          setStatus("error"); setScanMsg("Camera unavailable — try typing instead");
        }
      }
    };
    start();
    return () => { cleanup(); };
  }, []);

  const takePhoto = async () => {
    await cleanup();
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.capture = "environment";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) onPhoto(file);
    };
    input.click();
  };

  // Corner bracket helper
  const Bracket = ({ top, left, right, bottom }) => (
    <div style={{
      position:"absolute",
      ...(top    != null ? { top }    : {}),
      ...(left   != null ? { left }   : {}),
      ...(right  != null ? { right }  : {}),
      ...(bottom != null ? { bottom } : {}),
      width:28, height:28,
      borderTop:    top    != null ? "3px solid #4ade80" : "none",
      borderBottom: bottom != null ? "3px solid #4ade80" : "none",
      borderLeft:   left   != null ? "3px solid #4ade80" : "none",
      borderRight:  right  != null ? "3px solid #4ade80" : "none",
      borderRadius: top != null && left != null ? "4px 0 0 0"
                  : top != null && right != null ? "0 4px 0 0"
                  : bottom != null && left != null ? "0 0 0 4px" : "0 0 4px 0",
    }}/>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column"}}>
      <style>{`
        @keyframes scanLine {
          0%   { top:8px;  opacity:0 }
          8%   { opacity:1 }
          92%  { opacity:1 }
          100% { top:calc(100% - 10px); opacity:0 }
        }
        @keyframes barcodeFlash { 0%,100%{opacity:0} 50%{opacity:1} }
      `}</style>

      {/* Live camera feed — web only (iOS uses native layer) */}
      {!IS_NATIVE && (
        <video ref={videoRef} playsInline muted autoPlay
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      )}
      <canvas ref={canvasRef} style={{display:"none"}}/>

      {/* Green flash on barcode detect */}
      {flash && (
        <div style={{position:"absolute",inset:0,zIndex:10,background:"rgba(74,222,128,0.3)",
          animation:"barcodeFlash 0.35s ease",pointerEvents:"none"}}/>
      )}

      {/* Dark overlay + scanning frame */}
      <div style={{position:"absolute",inset:0,zIndex:5,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

        {/* Frame — box-shadow creates the dark surround / cutout effect */}
        <div style={{position:"relative",width:270,height:270,
          boxShadow:"0 0 0 9999px rgba(0,0,0,0.68)",borderRadius:20}}>
          <Bracket top={-3}   left={-3}  />
          <Bracket top={-3}   right={-3} />
          <Bracket bottom={-3} left={-3} />
          <Bracket bottom={-3} right={-3}/>

          {/* Animated scan line */}
          {status === "scanning" && (
            <div style={{position:"absolute",left:10,right:10,height:2,
              background:"linear-gradient(90deg,transparent,#4ade80,transparent)",
              borderRadius:2,animation:"scanLine 2.2s ease-in-out infinite"}}/>
          )}
        </div>

        {/* Status message */}
        <div style={{marginTop:32,textAlign:"center",padding:"0 40px"}}>
          <div style={{color:"#fff",fontSize:15,fontWeight:600,letterSpacing:"-0.2px",marginBottom:6}}>
            {status === "starting" ? "Starting camera…"
           : status === "error"   ? scanMsg
           : "Point at a barcode to scan instantly"}
          </div>
          {status === "scanning" && !hint && (
            <div style={{color:"rgba(255,255,255,0.45)",fontSize:13}}>
              or tap below to photograph the label
            </div>
          )}
          {/* Hint shown after 12s — nudges user to photo mode if barcode isn't scanning */}
          {hint && (
            <div style={{marginTop:8}}>
              <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,marginBottom:10}}>
                Having trouble? Tap the button below to photograph the label instead.
              </div>
              <button onClick={takePhoto}
                style={{background:"rgba(34,197,94,0.2)",border:"1.5px solid rgba(34,197,94,0.5)",borderRadius:20,padding:"8px 20px",color:"#4ade80",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Scan label photo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top bar — logo + close */}
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:20,
        padding:`${SAFE_TOP+16}px 20px 16px`,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <svg width="28" height="28" viewBox="0 0 44 44">
            <rect x="0" y="0" width="44" height="44" rx="11" fill="#052e16"/>
            <rect x="20" y="29" width="4" height="11" rx="1.5" fill="#4ade80"/>
            <ellipse cx="22" cy="21" rx="11" ry="10" fill="#4ade80"/>
            <ellipse cx="22" cy="14" rx="8" ry="7" fill="#86efac"/>
            <circle cx="37" cy="8" r="2.5" fill="#4ade80" opacity="0.8"/>
            <circle cx="5" cy="14" r="2" fill="#86efac" opacity="0.6"/>
          </svg>
          <span style={{color:"#fff",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:18,letterSpacing:"-0.3px"}}>
            Partiqule
          </span>
        </div>
        <button onClick={() => { cleanup(); onClose(); }}
          style={{width:38,height:38,borderRadius:"50%",
            background:"rgba(255,255,255,0.15)",
            border:"1.5px solid rgba(255,255,255,0.2)",
            backdropFilter:"blur(8px)",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Bottom bar — two clear options from the start */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:20,
        padding:"20px 32px 48px",
        display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        {status === "scanning" && (
          <div style={{display:"flex",gap:14,width:"100%",maxWidth:320}}>
            {/* Barcode — already scanning automatically, this is the active mode indicator */}
            <div style={{flex:1,background:"rgba(34,197,94,0.2)",border:"2px solid rgba(34,197,94,0.6)",borderRadius:18,padding:"16px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"default"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                <rect x="2" y="4" width="3" height="16"/><rect x="7" y="4" width="1.5" height="16"/>
                <rect x="10.5" y="4" width="3" height="16"/><rect x="16" y="4" width="1.5" height="16"/>
                <rect x="19" y="4" width="3" height="16"/>
              </svg>
              <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:800,color:"#4ade80",letterSpacing:"0.04em"}}>Barcode</span>
              <span style={{fontSize:10,color:"rgba(74,222,128,0.6)",textAlign:"center",lineHeight:1.3}}>Auto-scanning</span>
            </div>
            {/* Photo — tap to photograph the label */}
            <button onClick={takePhoto}
              style={{flex:1,background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.25)",borderRadius:18,padding:"16px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",transition:"all 0.15s"}}
              onMouseDown={e=>{e.currentTarget.style.background="rgba(255,255,255,0.2)";}}
              onMouseUp={e=>{e.currentTarget.style.background="rgba(255,255,255,0.1)";}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:800,color:"white",letterSpacing:"0.04em"}}>Photo</span>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.5)",textAlign:"center",lineHeight:1.3}}>Scan the label</span>
            </button>
          </div>
        )}
        {hint && (
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:12,textAlign:"center"}}>
            Barcode not scanning? Tap Photo to capture the label
          </div>
        )}
        {status !== "scanning" && (
          <div style={{color:"rgba(255,255,255,0.35)",fontSize:11,textAlign:"center",letterSpacing:"0.02em"}}>
            {status === "starting" ? "OPENING CAMERA…" : "CAMERA UNAVAILABLE"}
          </div>
        )}
      </div>
    </div>
  );
};

const _ShareCardRemoved = ({result, displayScore, isMobile, isDark}) => {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const score    = displayScore || result.overall_score || result.score;
  const label    = scoreLabel(score);
  const color    = scoreColor(score);
  const name     = result.product_name || "";
  const category = (result.category || "").toUpperCase().replace(/_/g, " ");
  const childScore = result.child_score;
  const hasKids  = childScore && childScore !== score;
  const isClean  = score <= 3;
  const flags = [
    ...(result.flagged_substances||[]),
    ...(result.dimensions?.materials?.concerns||[]),
  ].filter(Boolean).filter((c,i,a)=>a.indexOf(c)===i).slice(0,3);
  const alt = result.alternatives?.[0] || result.ai_alternatives?.[0];

  useEffect(()=>{
    const canvas = canvasRef.current; if(!canvas) return;
    const dpr = Math.min(window.devicePixelRatio||1,2);
    const W = 1080, H = 1080;
    canvas.width = W*dpr; canvas.height = H*dpr;
    canvas.style.width = "100%"; canvas.style.height = "auto";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr,dpr);

    // Deep green background
    const bgGrad = ctx.createLinearGradient(0,0,W,H);
    bgGrad.addColorStop(0, "#031a09");
    bgGrad.addColorStop(0.5, "#052e16");
    bgGrad.addColorStop(1, "#071f0c");
    ctx.fillStyle = bgGrad; ctx.fillRect(0,0,W,H);

    // Glow radial
    const glow = ctx.createRadialGradient(W*0.75,H*0.2,0,W*0.75,H*0.2,W*0.6);
    glow.addColorStop(0, `${color}18`); glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow; ctx.fillRect(0,0,W,H);

    // Logo row
    ctx.fillStyle = "rgba(34,197,94,0.4)";
    ctx.font = "800 32px 'Outfit',system-ui,sans-serif";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText("PARTIQULE", 60, 60);
    ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.font = "500 22px 'DM Sans',system-ui,sans-serif";
    ctx.textAlign = "right"; ctx.fillText("partiqule.com", W-60, 60);

    // Horizontal rule
    ctx.fillStyle = "rgba(34,197,94,0.12)"; ctx.fillRect(60,88,W-120,1);

    // Product name
    ctx.fillStyle = "#f0fdf4"; ctx.font = "800 58px 'Outfit',system-ui,sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    const words = name.split(" "); let line = "", nameLines = [];
    for(const w of words){ const test = line ? line+" "+w : w; if(ctx.measureText(test).width > 900 && line){ nameLines.push(line); line=w; } else line=test; }
    if(line) nameLines.push(line);
    nameLines = nameLines.slice(0,2);
    const nameY = nameLines.length === 2 ? 178 : 196;
    nameLines.forEach((l,i) => ctx.fillText(l, W/2, nameY + i*70));

    // BIG SCORE NUMBER
    const scoreY = 600;
    ctx.save();
    ctx.font = "900 480px 'Outfit',system-ui,sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 80;
    ctx.fillStyle = color; ctx.globalAlpha = 0.1;
    ctx.fillText(String(score), W/2, scoreY);
    ctx.globalAlpha = 1; ctx.shadowBlur = 40;
    ctx.fillStyle = color;
    ctx.fillText(String(score), W/2, scoreY);
    ctx.restore();

    // /10 label
    ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.font = "600 28px 'Outfit',system-ui,sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("OUT OF 10", W/2, scoreY + 260);

    // Verdict pill
    const pillW = 260, pillH = 60, pillX = W/2-pillW/2, pillY = scoreY+300;
    ctx.beginPath(); ctx.roundRect(pillX,pillY,pillW,pillH,30);
    ctx.fillStyle = `${color}22`; ctx.fill();
    ctx.strokeStyle = `${color}55`; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = color; ctx.font = "800 26px 'Outfit',system-ui,sans-serif";
    ctx.textBaseline = "middle"; ctx.fillText(label.toUpperCase(), W/2, pillY+pillH/2);

    // Bottom section
    ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(0,H-192,W,192);
    ctx.fillStyle = "rgba(34,197,94,0.15)"; ctx.fillRect(0,H-192,W,1);

    if(isClean){
      ctx.fillStyle = "#22c55e"; ctx.font = "700 28px 'Outfit',system-ui,sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("No harmful substances detected — clean all the way through", W/2, H-140);
      ctx.fillStyle = "rgba(34,197,94,0.5)"; ctx.font = "700 22px 'Outfit',system-ui,sans-serif";
      ctx.fillText("VERIFIED CLEAN", W/2, H-88);
    } else if(flags.length > 0){
      ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "700 20px 'Outfit',system-ui,sans-serif";
      ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText("FLAGGED", 60, H-148);
      let px = 200;
      flags.forEach(flag => {
        const ft = flag.length > 20 ? flag.slice(0,18)+"…" : flag;
        ctx.font = "600 22px 'DM Sans',system-ui,sans-serif";
        const fw = ctx.measureText(ft).width + 36, fh = 44, fy = H-170;
        ctx.beginPath(); ctx.roundRect(px,fy,fw,fh,22);
        ctx.fillStyle = `${color}20`; ctx.fill();
        ctx.strokeStyle = `${color}44`; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = color; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(ft, px+fw/2, fy+fh/2);
        px += fw+10; if(px>W-200) return;
      });
      if(alt && score > 3){
        ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "600 20px 'DM Sans',system-ui,sans-serif";
        ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText("TRY INSTEAD", 60, H-92);
        ctx.fillStyle = "#f0fdf4"; ctx.font = "700 22px 'Outfit',system-ui,sans-serif";
        const altName = (alt.name||"").slice(0,40);
        const altScore = alt.score || alt.estimated_score || "";
        ctx.fillText(altName + (altScore ? `  —  ${altScore}/10` : ""), 220, H-92);
      }
    }
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "500 20px 'DM Sans',system-ui,sans-serif";
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    ctx.fillText("Know what is in your products", W-60, H-44);
  },[score, result]);

  const share = async () => {
    const canvas = canvasRef.current; if(!canvas) return;
    setStatus("copying");
    try {
      const blob = await new Promise(r=>canvas.toBlob(r,"image/png"));
      if(navigator.share && navigator.canShare?.({files:[new File([blob],"partiqule.png",{type:"image/png"})]})){
        await navigator.share({ title:`${name} scored ${score}/10 on Partiqule`, text:`I scanned ${name} and it scored ${score}/10. Check what is in your products at partiqule.com`, files:[new File([blob],"partiqule.png",{type:"image/png"})] });
      } else { await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]); }
      setStatus("copied");
    } catch {
      const url = URL.createObjectURL(await new Promise(r=>canvas.toBlob(r,"image/png")));
      const a = document.createElement("a"); a.href=url;
      a.download=`partiqule-${(name||"score").replace(/\s+/g,"-").toLowerCase()}.png`;
      a.click(); URL.revokeObjectURL(url); setStatus("copied");
    }
    setTimeout(()=>setStatus("idle"),3000);
  };

  return (
    <div style={{marginTop:24}}>
      {/* Card preview */}
      <div style={{position:"relative", borderRadius:16, overflow:"hidden", border:"1.5px solid rgba(34,197,94,0.2)", cursor:"pointer"}} onClick={share}>
        <canvas ref={canvasRef} style={{display:"block", width:"100%"}}/>
        <div style={{position:"absolute", inset:0, background:"rgba(0,0,0,0)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,0,0,0.35)"; e.currentTarget.style.opacity=1;}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,0)"; e.currentTarget.style.opacity=0;}}>
          <span style={{fontFamily:"'Outfit',sans-serif", fontSize:16, fontWeight:800, color:"white"}}>Tap to share</span>
        </div>
      </div>
      {/* Button row */}
      <div style={{display:"flex", gap:8, marginTop:10}}>
        <button onClick={share} disabled={status==="copying"} style={{
          flex:1, padding:"13px 16px", borderRadius:12,
          background: status==="copied" ? "#16a34a" : "linear-gradient(135deg,#22c55e,#16a34a)",
          border:"none", color:"#fff",
          fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:800,
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          boxShadow:"0 4px 16px rgba(34,197,94,0.3)", transition:"all 0.2s",
        }}>
          <IconShare size={16} color="#fff"/>
          {status==="copying" ? "Preparing…" : status==="copied" ? "Shared!" : "Share this result"}
        </button>
        <button onClick={async()=>{
          try {
            const url = `${window.location.origin}?q=${encodeURIComponent(name)}`;
            await navigator.clipboard.writeText(url);
            setStatus("copied"); setTimeout(()=>setStatus("idle"),2000);
          } catch {}
        }} style={{
          width:46, height:46, borderRadius:12, flexShrink:0,
          background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
      </div>
    </div>
  );
};

// ── GLOBE LOADING ─────────────────────────────────────────────


// 200 points evenly distributed on a sphere (Fibonacci lattice)
const SPHERE_POINTS = (() => {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 200; i++) {
    const y = 1 - (i / 199) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
})();

const HEALTH_FACTS = [
  { stat: "100%",   text: "of human blood samples tested contain microplastics",
    url: "https://www.sciencedirect.com/science/article/pii/S0160412022001258" },
  { stat: "58%",    text: "of arterial plaques studied contained polypropylene — NEJM 2024",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822" },
  { stat: "11B",    text: "microplastic particles per cup from nylon tea bags",
    url: "https://pubs.acs.org/doi/10.1021/acs.est.9b02540" },
  { stat: "2025",   text: "FDA banned Red 3 and began phasing out petroleum-based dyes",
    url: "https://www.fda.gov/food/food-additives-petitions/color-additive-petitions" },
  { stat: "700K",   text: "microfibers shed per wash from a single synthetic fleece jacket",
    url: "https://www.sciencedirect.com/science/article/pii/S0160412019300503" },
  { stat: "8M",     text: "tonnes of plastic enter the world\'s oceans every year",
    url: "https://www.science.org/doi/10.1126/science.1260352" },
  { stat: "PFAS",   text: "in non-stick cookware linked to thyroid disruption and infertility",
    url: "https://ehp.niehs.nih.gov/doi/10.1289/ehp.0800084" },
  { stat: "1,000+", text: "everyday chemicals are known or suspected endocrine disruptors",
    url: "https://www.endocrine.org/advocacy/position-statements/endocrine-disrupting-chemicals" },
  { stat: "10x",    text: "higher microplastic levels found in infants compared to adults",
    url: "https://pubs.acs.org/doi/10.1021/acs.estlett.0c00193" },
  { stat: "PVA",    text: "pod film dissolves but enters waterways as microplastic pollution",
    url: "https://pubs.acs.org/doi/10.1021/acs.est.1c01498" },
  { stat: "97%",    text: "of Americans tested have PFAS forever chemicals in their blood",
    url: "https://www.cdc.gov/biomonitoring/PFAS_BiomonitoringSummary.html" },
  { stat: "260C",   text: "the temperature at which PTFE non-stick coatings begin to break down",
    url: "https://www.ewg.org/research/canaries-kitchen" },
  { stat: "2024",   text: "Nature Medicine confirmed microplastics accumulating in human brain tissue",
    url: "https://www.nature.com/articles/s41591-024-03453-1" },
  { stat: "3,000",  text: "undisclosed chemicals can hide under the single word fragrance on a label",
    url: "https://link.springer.com/article/10.1007/s11869-016-0442-z" },
  { stat: "1M",     text: "plastic bottles are purchased around the world every single minute",
    url: "https://www.theguardian.com/environment/2017/jun/28/a-million-a-minute-worlds-plastic-bottle-binge-as-dangerous-as-climate-change" },
  { stat: "500yr",  text: "the time it takes a standard plastic bag to break down in landfill",
    url: "https://www.scienceadvances.org/content/3/7/e1700782" },
  { stat: "1B",     text: "plastic toothbrushes are discarded globally every year",
    url: "https://www.ewg.org/research/over-1-billion-plastic-toothbrushes-trashed-annually" },
  { stat: "BPA",    text: "replacements BPS and BPF show similar hormonal disruption to BPA",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4114051/" },
  { stat: "74K",    text: "microplastic particles the average person consumes or inhales every year",
    url: "https://pubs.acs.org/doi/10.1021/acs.est.9b01517" },
  { stat: "2021",   text: "microplastics were confirmed in human placentas for the first time",
    url: "https://www.sciencedirect.com/science/article/pii/S0160412020322297" },
  { stat: "Glass",  text: "containers have zero leaching risk even when heated, frozen, or acidic",
    url: "https://www.sciencedirect.com/science/article/pii/S0048969719355457" },
  { stat: "4.4lb",  text: "of trash generated per person per day in the US — most of it packaging",
    url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling" },
  { stat: "80%",    text: "of ocean plastic pollution originates from land-based sources",
    url: "https://www.science.org/doi/10.1126/science.1260352" },
  { stat: "Breast", text: "milk was found to contain microplastics in studies across multiple countries",
    url: "https://www.sciencedirect.com/science/article/pii/S0160412022000460" },
  { stat: "40%",    text: "of plastic produced is single-use — designed to be discarded within minutes",
    url: "https://advances.sciencemag.org/content/3/7/e1700782" },
  { stat: "UPF",    text: "ultra-processed foods linked to cardiovascular disease and cognitive decline",
    url: "https://www.thelancet.com/journals/lanhl/article/PIIS2666-7568(24)00007-2/fulltext" },
  { stat: "50",     text: "uses to offset a stainless steel bottle vs single-use plastic",
    url: "https://www.ellenmacarthurfoundation.org/the-new-plastics-economy-rethinking-the-future-of-plastics" },
  { stat: "Nylon",  text: "and polyester shed microfibers during wear — not just during washing",
    url: "https://www.sciencedirect.com/science/article/pii/S0160412018316350" },
  { stat: "6.3B",   text: "tonnes of plastic waste generated since the 1950s — only 9% ever recycled",
    url: "https://advances.sciencemag.org/content/3/7/e1700782" },
  { stat: "Heated", text: "polypropylene baby bottles release millions of microplastic particles per litre",
    url: "https://www.nature.com/articles/s43016-020-00171-y" },
  { stat: "63%",   text: "of EWG Dirty Dozen produce samples contain PFAS forever chemical pesticides — 2026 report",
    url: "https://www.ewg.org/foodnews/dirty-dozen.php" },
  { stat: "96%",   text: "of Dirty Dozen produce tested positive for pesticide residues even after washing",
    url: "https://www.ewg.org/news-insights/news-release/2026/03/ewgs-2026-shoppers-guide-pesticides-producetm-finds-widespread" },
];

const STAGES = [
  "Searching for product data...",
  "Analysing materials and exposure...",
  "Auditing the score...",
  "Finding safer alternatives...",
];

const GlobeLoading = ({isMobile}) => {
  const containerRef = useRef(null);
  const angleRef     = useRef(0);
  const frameRef     = useRef(null);
  const glowRef      = useRef(Array.from({length:200}, () => 0));
  const glowTimer    = useRef(Array.from({length:200}, () => Math.floor(Math.random() * 180)));
  const shuffledFacts = useRef([...HEALTH_FACTS].sort(() => Math.random() - 0.5));
  const [activeFacts, setActiveFacts] = useState([]);
  const [stage, setStage] = useState(0);

  // Layout — computed once
  const mob = isMobile || (typeof window !== 'undefined' && window.innerWidth < 640);
  const W   = mob ? Math.min(typeof window !== 'undefined' ? window.innerWidth - 24 : 340, 360) : 600;
  const R   = mob ? 82  : 115;
  const CX  = W / 2;
  const CY  = mob ? 188 : 250;
  const H   = CY + R + (mob ? 100 : 120);

  // Slots: globe surface point (gx,gy) → line endpoint (lx,ly) → card (cx,cy,cw,ch)
  const SLOTS = mob ? [
    // Top — full-width card above globe
    { gx:CX,         gy:CY-R,       lx:CX,       ly:68,       cx:8,        cy:8,        cw:W-16,        ch:58 },
    // Bottom left
    { gx:CX-R*.72,   gy:CY+R*.52,   lx:20,       ly:CY+R+18,  cx:8,        cy:CY+R+16,  cw:(W-20)/2,    ch:58 },
    // Bottom right
    { gx:CX+R*.72,   gy:CY+R*.52,   lx:W-20,     ly:CY+R+18,  cx:(W+4)/2,  cy:CY+R+16,  cw:(W-20)/2,    ch:58 },
  ] : [
    { gx:CX,        gy:CY-R,       lx:CX,        ly:78,       cx:CX-88,    cy:10,       cw:176, ch:68 },
    { gx:CX+R*.866, gy:CY-R*.5,    lx:CX+R+15,   ly:CY-96,    cx:CX+R+15,  cy:CY-128,   cw:158, ch:68 },
    { gx:CX+R*.866, gy:CY+R*.5,    lx:CX+R+15,   ly:CY+42,    cx:CX+R+15,  cy:CY+8,     cw:158, ch:68 },
    { gx:CX-R*.866, gy:CY+R*.5,    lx:CX-R-15,   ly:CY+42,    cx:0,        cy:CY+8,     cw:158, ch:68 },
    { gx:CX-R*.866, gy:CY-R*.5,    lx:CX-R-15,   ly:CY-96,    cx:0,        cy:CY-128,   cw:158, ch:68 },
  ];

  // rAF: rotation + per-particle glow pulses
  useEffect(() => {
    const animate = () => {
      angleRef.current += 0.006;
      if (containerRef.current) {
        const els = containerRef.current.querySelectorAll("[data-pt]");
        const cos = Math.cos(angleRef.current);
        const sin = Math.sin(angleRef.current);
        els.forEach((el, i) => {
          const p = SPHERE_POINTS[i];
          const rx = p.x * cos - p.z * sin;
          const rz = p.x * sin + p.z * cos;
          const persp = 2.6 / (2.6 + rz);
          const sx = CX + rx * R * persp;
          const sy = CY - p.y * R * persp;
          const sz = Math.max(1.5, 1.5 + persp * 4.5).toFixed(1);
          const baseOp = Math.max(0.05, Math.min(0.88, 0.08 + (rz + 1) * 0.40));

          if (glowTimer.current[i] <= 0) {
            glowTimer.current[i] = 50 + Math.floor(Math.random() * 220);
            if (Math.random() < 0.28) glowRef.current[i] = 1.0;
          } else {
            glowTimer.current[i]--;
          }
          const g = glowRef.current[i];
          if (g > 0) glowRef.current[i] = Math.max(0, g - 0.032);

          el.style.transform = `translate(${(sx-2).toFixed(1)}px,${(sy-2).toFixed(1)}px)`;
          el.style.opacity   = Math.min(1, baseOp + g * 0.82).toFixed(2);
          el.style.width     = sz + "px";
          el.style.height    = sz + "px";
          el.style.background   = g > 0.4 ? "#86efac" : "#4ade80";
          el.style.boxShadow    = g > 0.35 ? `0 0 ${Math.round(g*10)}px rgba(74,222,128,${(g*0.85).toFixed(2)})` : "none";
        });
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [CX, CY, R]);

  // Stage progression
  useEffect(() => {
    const t = [
      setTimeout(() => setStage(1), 8000),
      setTimeout(() => setStage(2), 16000),
      setTimeout(() => setStage(3), 22000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  // Facts branch out one at a time, all stay for entire scan
  useEffect(() => {
    const maxSlots = SLOTS.length;
    let count = 0;
    const launch = () => {
      if (count >= maxSlots) return;
      const slot = SLOTS[count];
      const fact = shuffledFacts.current[count % shuffledFacts.current.length];
      setActiveFacts(prev => [...prev, { id: Date.now() + count, slot, fact }]);
      count++;
    };
    const t0 = setTimeout(launch, 900);
    const iv = setInterval(() => { if (count < maxSlots) launch(); }, 4000);
    return () => { clearTimeout(t0); clearInterval(iv); };
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <style>{`
        @keyframes factBranch {
          0%   { opacity:0; transform:scale(0.35); }
          55%  { opacity:1; transform:scale(1.05); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes lineGrow {
          from { stroke-dashoffset: var(--ll); }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes nodePop {
          0%   { r:0; opacity:0; }
          70%  { r:6; opacity:1; }
          100% { r:4.5; opacity:1; }
        }
        @keyframes globeRing {
          0%,100% { opacity:0.07; } 50% { opacity:0.18; }
        }
      `}</style>

      <div style={{position:"relative", width:W, height:H}}>

        {/* Particle layer — covers full container so transforms stay in sync */}
        <div ref={containerRef} style={{position:"absolute",top:0,left:0,width:W,height:H,pointerEvents:"none"}}>
          {SPHERE_POINTS.map((_, i) => (
            <div key={i} data-pt={i} style={{
              position:"absolute", top:0, left:0, width:4, height:4,
              borderRadius:"50%", background:"#4ade80",
            }}/>
          ))}
        </div>

        {/* SVG: globe ring + connecting lines + attachment dots */}
        <svg style={{position:"absolute",top:0,left:0,pointerEvents:"none",zIndex:6}} width={W} height={H}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#4ade80" strokeWidth={0.6}
            style={{animation:"globeRing 3.5s ease-in-out infinite"}}/>

          {activeFacts.map(af => {
            const s = af.slot;
            const len = Math.hypot(s.lx - s.gx, s.ly - s.gy).toFixed(1);
            return (
              <g key={af.id}>
                <line
                  x1={s.gx} y1={s.gy} x2={s.lx} y2={s.ly}
                  stroke="rgba(74,222,128,0.45)" strokeWidth={1.5}
                  strokeDasharray={len}
                  style={{"--ll": len, animation:"lineGrow 0.65s ease-out 0.08s forwards", strokeDashoffset: len}}
                />
                <circle cx={s.gx} cy={s.gy} r={0} fill="#4ade80"
                  style={{animation:"nodePop 0.45s ease-out 0.05s forwards"}}/>
              </g>
            );
          })}
        </svg>

        {/* Fact cards — stay in place for entire scan, tap to open source */}
        {activeFacts.map(af => (
          <a key={`c-${af.id}`}
            href={af.fact.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              position:"absolute",
              left: af.slot.cx, top: af.slot.cy,
              width: af.slot.cw,
              animation:"factBranch 0.55s cubic-bezier(0.34,1.4,0.64,1) 0.12s both",
              zIndex:10,
              textDecoration:"none",
              cursor: af.fact.url ? "pointer" : "default",
            }}>
            <div style={{
              background:"rgba(5,46,22,0.96)",
              border:"1.5px solid rgba(74,222,128,0.55)",
              borderRadius:12, padding:"10px 14px",
              boxShadow:"0 4px 24px rgba(74,222,128,0.18)",
              transition:"border-color 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(74,222,128,0.9)"; e.currentTarget.style.boxShadow="0 4px 32px rgba(74,222,128,0.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(74,222,128,0.55)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(74,222,128,0.18)";}}>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:800,
                fontSize:mob?18:20,color:"#4ade80",lineHeight:1,marginBottom:5}}>
                {af.fact.stat}
              </div>
              <div style={{fontSize:mob?10:11,color:"rgba(255,255,255,0.65)",lineHeight:1.4}}>
                {af.fact.text}
              </div>
              {af.fact.url && (
                <div style={{fontSize:9,color:"rgba(74,222,128,0.5)",marginTop:5,letterSpacing:"0.04em"}}>
                  TAP TO READ STUDY ↗
                </div>
              )}
            </div>
          </a>
        ))}

        {/* Stage indicator */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,textAlign:"center"}}>
          {/* Progress bar */}
          <div style={{width:"60%", maxWidth:280, height:3, borderRadius:99, background:"rgba(74,222,128,0.15)", margin:"0 auto 12px", overflow:"hidden"}}>
            <div style={{height:"100%", borderRadius:99, background:"#4ade80", transition:"width 1.2s ease",
              width: stage === 0 ? "15%" : stage === 1 ? "40%" : stage === 2 ? "72%" : "95%"
            }}/>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:8}}>
            {STAGES.map((_, i) => (
              <div key={i} style={{
                width: i === stage ? 20 : 7, height:7, borderRadius:99,
                background: i <= stage ? "#4ade80" : "rgba(74,222,128,0.15)",
                transition:"all 0.5s ease",
              }}/>
            ))}
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",letterSpacing:"0.03em"}}>
            {STAGES[stage]}
          </div>
        </div>
      </div>
    </div>
  );
};




const scoreLabel   = (s) => s<=2?"Safe":s<=4?"Good":s<=6?"Caution":s<=8?"Switch":"Avoid";
const scoreColor   = (s) => s<=2?"#16a34a":s<=4?"#65a30d":s<=6?"#ca8a04":s<=8?"#ea580c":"#dc2626";
const scoreBg      = (s) => s<=2?"#f0fdf4":s<=4?"#f7fee7":s<=6?"#fefce8":s<=8?"#fff7ed":"#fef2f2";
const scoreCardBg  = (s) => s<=2?"#f0fdf4":s<=4?"#f7fee7":s<=6?"#fefce8":s<=8?"#fff7ed":"#fff0f0";

const categoryMeta = {
  clothing:      {label:"Clothing",      color:"#6366f1",bg:"#eef2ff"},
  food_beverage: {label:"Food & Drink",  color:"#0891b2",bg:"#ecfeff"},
  personal_care: {label:"Personal Care", color:"#db2777",bg:"#fdf2f8"},
  kitchen:       {label:"Kitchen",       color:"#d97706",bg:"#fffbeb"},
  baby:          {label:"Baby & Kids",   color:"#7c3aed",bg:"#f5f3ff"},
  other:         {label:"General",       color:"#6b7280",bg:"#f9fafb"},
};

// ── URL SLUG HELPERS ──────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function getShareUrl(productName) {
  return `${window.location.origin}/scan/${toSlug(productName)}`;
}

const EXAMPLES = [
  {label:"Lipton tea bags",        hint:"plastic mesh!"},
  {label:"Styrofoam coffee cup",   hint:"high danger!"},
  {label:"Glad Press'n Seal wrap", hint:"pure plastic"},
];

const MOST_SEARCHED = [
  {label:"Lipton tea bags",        score:7, category:"food_beverage"},
  {label:"Non-stick frying pan",   score:8, category:"kitchen"},
  {label:"Plastic water bottle",   score:8, category:"food_beverage"},
  {label:"Synthetic fleece jacket",score:7, category:"clothing"},
  {label:"Baby formula bottle",    score:6, category:"baby"},
  {label:"Liquid foundation",      score:6, category:"personal_care"},
  {label:"Glass water bottle",     score:1, category:"food_beverage"},
  {label:"Organic cotton t-shirt", score:2, category:"clothing"},
];

// Source citations by category
const SOURCES = {
  clothing:      [{title:"Microfiber Pollution & the Apparel Industry", url:"https://www.patagonia.com/stories/an-update-on-microfiber-pollution/story-18783.html",journal:"Patagonia Research"},{title:"Synthetic Textile Microfiber Release Study",url:"https://www.nature.com/articles/s41598-019-43023-x",journal:"Nature Scientific Reports"},{title:"Microplastics in Freshwater Systems",url:"https://www.sciencedirect.com/science/article/pii/S0043135416307533",journal:"Water Research"}],
  food_beverage: [{title:"Microplastics in Bottled Water",url:"https://www.who.int/news/item/22-08-2019-who-calls-for-further-research-into-microplastics",journal:"WHO Report 2019"},{title:"Plastic Tea Bag Microparticle Release",url:"https://pubs.acs.org/doi/10.1021/acs.est.9b02540",journal:"Environmental Science & Technology"},{title:"Microplastics in Tap & Bottled Water",url:"https://orbmedia.org/stories/plus-plastic",journal:"Orb Media Study"}],
  personal_care: [{title:"Microbeads in Personal Care Products",url:"https://www.beatthemicrobead.org/science/",journal:"Beat the Microbead"},{title:"Plastic Packaging Leaching Study",url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5920378/",journal:"NIH Environmental Health"},{title:"Cosmetic Microplastic Regulations",url:"https://ec.europa.eu/environment/chemicals/reach/microplastics_en.htm",journal:"European Commission"}],
  kitchen:       [{title:"PTFE Non-stick Coating Health Research",url:"https://www.ewg.org/research/pfas-forever-chemicals-widespread-present-blood-97-percent-americans",journal:"Environmental Working Group"},{title:"Plastic Food Container Leaching",url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3222987/",journal:"NIH: Endocrine Disruption"},{title:"Microplastics in Household Dust",url:"https://pubs.acs.org/doi/10.1021/acs.est.9b03037",journal:"Environmental Science & Technology"}],
  baby:          [{title:"Infant Microplastic Exposure Study",url:"https://www.nature.com/articles/s43016-020-00171-y",journal:"Nature Food"},{title:"Microplastics in Baby Products",url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7068600/",journal:"NIH Environmental Research"},{title:"BPA & Phthalates in Baby Bottles",url:"https://www.healthystuff.org/",journal:"Healthy Stuff Study"}],
  other:         [{title:"Global Microplastics Overview",url:"https://www.unep.org/resources/report/plastics-planet-how-plastics-are-polluting-our-world",journal:"UNEP Report"},{title:"Microplastics in Human Body",url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7068600/",journal:"NIH Review Study"},{title:"Plastic Health Effects Research",url:"https://www.plastichealthcoalition.org/",journal:"Plastic Health Coalition"}],
};

// Bundle suggestions by category
const BUNDLES = {
  clothing: {title:"Plastic-Free Wardrobe Starter",desc:"Replace your 3 highest-shedding items",saving:"Save ~$0 in plastic exposure",items:["Pact Organic Cotton Underwear","Thought Clothing Bamboo Socks","prAna Hemp Blend T-Shirt","Guppyfriend Washing Bag"]},
  food_beverage: {title:"Plastic-Free Kitchen Bundle",desc:"Eliminate single-use plastics from your kitchen",saving:"Replaces hundreds of single-use items",items:["Klean Kanteen Stainless Water Bottle","Stasher Silicone Food Bags","Bee's Wrap Beeswax Food Wrap","Swedish Dishcloths"]},
  personal_care: {title:"Plastic-Free Bathroom Bundle",desc:"Replace your top plastic-heavy personal care items",saving:"Cuts bathroom plastic by ~80%",items:["Ethique Shampoo Bar","Bite Toothpaste Bits","Meow Meow Tweet Deodorant","LastObject Reusable Cotton Rounds"]},
  kitchen: {title:"Plastic-Free Cooking Bundle",desc:"Upgrade your cookware and cleaning essentials",saving:"Eliminates daily plastic exposure at mealtime",items:["Xtrema Pure Ceramic Cookware","Full Circle Loofah Dish Brush","Swedish Dishcloths","Ecover Laundry Detergent Sheets"]},
  baby: {title:"Plastic-Free Baby Essentials",desc:"The safest start for your little one",saving:"Reduces infant microplastic exposure",items:["Pehr Organic Cotton Onesie","Green Sprouts Glass Baby Bottles","Hanna Andersson Organic PJs","Bumkins Silicone Bib"]},
  other: {title:"Plastic-Free Starter Kit",desc:"The best low-plastic swaps across categories",saving:"Great starting point for any household",items:["Klean Kanteen Water Bottle","Ethique Shampoo Bar","Bee's Wrap Food Wrap","Swedish Dishcloths"]},
};

// ── SVG ICONS ─────────────────────────────────────────────────
const IconMicroscope = ({size=22,color="#fff"})  => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M9.5 2a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2h-1v1.5l2.24 2.24A7 7 0 1 1 5.06 16H3a1 1 0 0 1 0-2h2.06A7.01 7.01 0 0 1 9 8.07V6h-.5a1 1 0 0 1 0-2H9V3a1 1 0 0 1 .5-1zM12 11a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>;
const IconSearch     = ({size=18,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M10 2a8 8 0 1 0 4.906 14.32l4.387 4.387a1 1 0 0 0 1.414-1.414l-4.387-4.387A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 10 4z"/></svg>;
const IconChart      = ({size=26,color="#16a34a"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M3 3a1 1 0 0 1 1 1v14h16a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm14 2a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm-4 3a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm-4 3a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z"/></svg>;
const IconShield     = ({size=26,color="#16a34a"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/></svg>;
const IconWarning    = ({size=20,color="#dc2626"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>;
const IconCheck      = ({size=20,color="#16a34a"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const IconArrow      = ({size=14,color="#16a34a"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const IconTag        = ({size=22,color="#16a34a"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z"/></svg>;
const IconHistory    = ({size=18,color="#6b7280"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v3l4-4-4-4v3zm1 10h-2V8h2v4.41l2.29 2.3-1.41 1.41L14 13.83V13z"/></svg>;
const IconInstagram  = ({size=18,color="#fff"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const IconShare      = ({size=16,color="#6b7280"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 16c-.8 0-1.5.3-2 .8l-7.1-4.1c.1-.2.1-.5.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.1c-.1.2-.1.4-.1.7 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9S19.6 16 18 16z"/></svg>;

// ── CUSTOM BRAND ICONS ────────────────────────────────────────
const IcoScore       = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><polyline points="6,32 16,32 22,14 30,50 38,22 44,40 52,32 58,32" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="30" cy="50" r="4" fill="#3EC44A"/></svg>;
const IcoSafety      = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M32 6L10 16v16c0 13 10 22 22 26 12-4 22-13 22-26V16L32 6z" fill="#3EC44A" opacity="0.15" stroke="#3EC44A" strokeWidth="2.5" strokeLinejoin="round"/><path d="M22 32l6 6 14-12" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoVerified    = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="44" height="44" rx="6" fill="#3EC44A" opacity="0.15"/><path d="M20 10h-6a4 4 0 00-4 4v36a4 4 0 004 4h28a4 4 0 004-4V14a4 4 0 00-4-4h-6" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><path d="M24 10a4 4 0 014-4h8a4 4 0 014 4v2H24v-2z" stroke="#3EC44A" strokeWidth="2.5"/><path d="M22 32l6 6 14-12" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoScan        = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M8 22V12a4 4 0 014-4h10" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><path d="M56 22V12a4 4 0 00-4-4H42" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 42v10a4 4 0 004 4h10" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><path d="M56 42v10a4 4 0 01-4 4H42" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><line x1="8" y1="32" x2="56" y2="32" stroke="#3EC44A" strokeWidth="3" strokeLinecap="round"/><rect x="20" y="20" width="24" height="24" rx="4" fill="#3EC44A" opacity="0.18"/></svg>;
const IcoSearch      = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><circle cx="28" cy="28" r="16" fill="#3EC44A" opacity="0.15"/><circle cx="28" cy="28" r="16" stroke="#3EC44A" strokeWidth="2.5"/><line x1="40" y1="40" x2="54" y2="54" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const IcoProducts    = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M8 26L32 8l24 18v28a4 4 0 01-4 4H12a4 4 0 01-4-4V26z" fill="#3EC44A" opacity="0.15" stroke="#3EC44A" strokeWidth="2.5" strokeLinejoin="round"/><path d="M24 56V36h16v20" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoCategory    = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M14 24h28l-4 24H18L14 24z" fill="#3EC44A" opacity="0.15" stroke="#3EC44A" strokeWidth="2.5" strokeLinejoin="round"/><path d="M42 28h6a6 6 0 010 12h-6" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="56" x2="50" y2="56" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><path d="M22 18c0-4 4-4 4-8" stroke="#3EC44A" strokeWidth="2" strokeLinecap="round"/><path d="M30 18c0-4 4-4 4-8" stroke="#3EC44A" strokeWidth="2" strokeLinecap="round"/></svg>;
const IcoIngredients = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="8" y="12" width="48" height="40" rx="6" fill="#3EC44A" opacity="0.1"/><line x1="22" y1="20" x2="52" y2="20" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><line x1="22" y1="32" x2="52" y2="32" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><line x1="22" y1="44" x2="52" y2="44" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="20" r="3.5" fill="#3EC44A"/><circle cx="12" cy="32" r="3.5" fill="#3EC44A"/><circle cx="12" cy="44" r="3.5" fill="#3EC44A"/></svg>;
const IcoRating      = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M32 8l6 12 14 2-10 10 2 14-12-6-12 6 2-14L12 22l14-2z" fill="#3EC44A" opacity="0.85" stroke="#3EC44A" strokeWidth="2.5" strokeLinejoin="round"/></svg>;
const IcoSaved       = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M32 52S10 40 10 24a12 12 0 0122-6.7A12 12 0 0154 24c0 16-22 28-22 28z" fill="#3EC44A" opacity="0.8" stroke="#3EC44A" strokeWidth="2.5" strokeLinejoin="round"/></svg>;
const IcoInfo        = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" fill="#3EC44A" opacity="0.15" stroke="#3EC44A" strokeWidth="2.5"/><line x1="32" y1="28" x2="32" y2="44" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/><circle cx="32" cy="21" r="2.5" fill="#3EC44A"/></svg>;
const IcoProfile     = ({size=24}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="22" r="12" fill="#3EC44A" opacity="0.15" stroke="#3EC44A" strokeWidth="2.5"/><path d="M10 56a22 22 0 0144 0" stroke="#3EC44A" strokeWidth="2.5" strokeLinecap="round"/></svg>;


const IconTrash      = ({size=15,color="#9ca3af"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"/></svg>;
const IconMoon       = ({size=18,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>;
const IconSun        = ({size=18,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-12.37-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0zM7.05 18.36l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0z"/></svg>;
const IconFire       = ({size=14,color="#ef4444"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>;
const IconBook       = ({size=20,color="#6366f1"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>;
const IconLink       = ({size=14,color="#6366f1"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>;
const IconBundle     = ({size=20,color="#7c3aed"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.05 15.96 0 13.36 0c-1.31 0-2.4.5-3.27 1.33L9 2.5 7.91 1.33C7.04.5 5.95 0 4.64 0 2.04 0 0 2.05 0 4.64c0 .48.11.92.18 1.36H0v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6.64-4c.9 0 1.64.74 1.64 1.64 0 .97-.79 1.72-1.64 2.36C12.15 5.36 11.35 4.61 11.35 3.64 11.35 2.74 12.1 2 13.36 2zM4.64 2c1.26 0 2.01.74 2.01 1.64 0 .97-.8 1.72-2.01 2.36C3.43 5.36 2.64 4.61 2.64 3.64 2.64 2.74 3.38 2 4.64 2zM20 19H2v-2h18v2zm0-5H2V8h18v6z"/></svg>;

// ── ANIMATED SCORE ────────────────────────────────────────────
const AnimatedScore = ({target, color}) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const t = Number(target);
    if (!t || t <= 0 || isNaN(t)) { setDisplay(0); return; }
    let current = 0;
    let rafId;
    let done = false;
    const step = () => {
      if (done) return;
      current += 0.35;
      if (current >= t) { setDisplay(t); done = true; return; }
      setDisplay(Math.floor(current));
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => { done = true; cancelAnimationFrame(rafId); };
  }, [target]);
  return <tspan fill={color}>{display}</tspan>;
};

// ── SCORE ARC ────────────────────────────────────────────────
const ScoreArc = ({score}) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setAnimated(true), 120); return ()=>clearTimeout(t); }, [score]);
  const color  = scoreColor(score);
  const r      = 70;
  const circ   = 2 * Math.PI * r; // 439.8
  const filled = animated ? circ * (score / 10) : 0;
  const offset = circ - filled;
  const glow   = score <= 2 ? "rgba(34,197,94,0.35)"
               : score <= 4 ? "rgba(101,163,13,0.35)"
               : score <= 6 ? "rgba(202,138,4,0.35)"
               : score <= 8 ? "rgba(234,88,12,0.35)"
               : "rgba(220,38,38,0.35)";
  return (
    <div style={{position:"relative", width:176, height:176, margin:"0 auto"}}>
      <svg width="176" height="176" viewBox="0 0 176 176" style={{transform:"rotate(-90deg)"}}>
        {/* Glow filter */}
        <defs>
          <filter id="score-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Track */}
        <circle cx="88" cy="88" r={r} fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="10"/>
        {/* Fill */}
        <circle cx="88" cy="88" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          filter="url(#score-glow)"
          style={{transition:"stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.3s"}}/>
      </svg>
      {/* Centered score */}
      <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:0}}>
        <div style={{fontFamily:"'Outfit',sans-serif", fontSize:64, fontWeight:900, lineHeight:1, letterSpacing:"-0.04em", color, textShadow:`0 0 32px ${glow}`}}>
          <AnimatedScore target={score} color={color}/>
        </div>
        <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, color:"#6ee7b7", opacity:0.5, marginTop:2}}>out of 10</div>
      </div>
    </div>
  );
};

const RiskBar = ({score}) => {
  const pct = (score/10)*100;
  const meaning = score <= 2 ? "Safe — no significant concerns"
    : score <= 4 ? "Good — mostly clean, use with awareness"
    : score <= 6 ? "Caution — real concerns, consider alternatives"
    : score <= 8 ? "Switch — known concerns, time to swap"
    : "Avoid — confirmed harmful substances";
  return (
    <div style={{marginTop:16}}>
      <div style={{textAlign:"center", marginBottom:10}}>
        <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:scoreColor(score), padding:"5px 16px", borderRadius:20, background:`${scoreColor(score)}18`, border:`1px solid ${scoreColor(score)}33`}}>{meaning}</span>
      </div>
      <div style={{position:"relative", height:8, borderRadius:99, background:"linear-gradient(to right,#16a34a,#65a30d,#d97706,#dc2626,#991b1b)", overflow:"visible"}}>
        <div style={{position:"absolute", top:"50%", left:`${pct}%`, transform:"translate(-50%,-50%)", width:18, height:18, borderRadius:"50%", background:"#0f2a18", border:`3px solid ${scoreColor(score)}`, boxShadow:`0 0 12px ${scoreColor(score)}66`, transition:"left 1.2s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#6ee7b7", opacity:0.4, marginTop:7, fontWeight:600, letterSpacing:"0.06em"}}>
        <span>SAFER</span><span>RISKIER</span>
      </div>
    </div>
  );
};

// ── SCAN VS SAFE SPLIT VIEW ───────────────────────────────────
// ── BUNDLE RECOMMENDATION (replaced with simple CTA) ─────────
const BundleCard = ({category, isDark}) => {
  const bundle = BUNDLES[category] || BUNDLES.other;
  const surface = isDark?"#0f2a18":"#fff";
  const border  = isDark?"rgba(34,197,94,0.15)":"#eee";
  const text    = isDark?"#f0fdf4":"#111";
  const muted   = isDark?"#6ee7b7":"#888";
  const searches = {
    clothing:      "plastic-free organic cotton clothing",
    food_beverage: "plastic-free reusable food storage",
    personal_care: "plastic-free natural personal care",
    kitchen:       "plastic-free stainless steel cookware",
    baby:          "plastic-free organic baby products",
    other:         "plastic-free eco friendly products",
  };
  const searchQuery = searches[category] || searches.other;
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}&tag=partiqule-20`;
  return (
    <div style={{background:isDark?"#1a1f2e":"#f5f3ff", borderRadius:16, padding:"24px", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#ddd6fe"}`}}>
      <div style={{display:"flex", alignItems:"flex-start", gap:12, marginBottom:16}}>
        <div style={{width:40, height:40, borderRadius:10, background:"#7c3aed", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
          <IconBundle size={20} color="#fff"/>
        </div>
        <div>
          <div style={{fontSize:11, color:"#7c3aed", textTransform:"uppercase", fontWeight:700, letterSpacing:"0.05em", marginBottom:3}}>Bundle Recommendation</div>
          <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:17, color:text, lineHeight:1.3}}>{bundle.title}</div>
          <div style={{fontSize:13, color:muted, marginTop:3}}>{bundle.desc}</div>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:6, marginBottom:16}}>
        {bundle.items.map((item,i) => (
          <div key={i} style={{display:"flex", alignItems:"center", gap:8, fontSize:13, color:isDark?"#6ee7b7":"#444"}}>
            <div style={{width:18, height:18, borderRadius:"50%", background:"rgba(34,197,94,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <IconCheck size={11} color="#16a34a"/>
            </div>
            {item}
          </div>
        ))}
      </div>
      <a href={amazonUrl} target="_blank" rel="noopener noreferrer"
        style={{display:"flex", alignItems:"center", justifyContent:"center", gap:6, width:"100%", padding:"12px", borderRadius:10, background:"#7c3aed", color:"#fff", fontSize:14, fontWeight:600, textDecoration:"none", boxSizing:"border-box"}}>
        Shop this bundle on Amazon <IconArrow size={14} color="#fff"/>
      </a>
    </div>
  );
};

// ── SOURCE CITATIONS ──────────────────────────────────────────
const SourceCitations = ({category, isDark}) => {
  const [open, setOpen] = useState(false);
  const sources = SOURCES[category] || SOURCES.other;
  const surface = isDark?"#0f2a18":"#fff";
  const border  = isDark?"rgba(34,197,94,0.15)":"#eee";
  const text    = isDark?"#f0fdf4":"#111";
  const muted   = isDark?"#6ee7b7":"#888";
  return (
    <div style={{background:surface, borderRadius:16, border:`1.5px solid ${border}`, overflow:"hidden"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", background:"none", border:"none", cursor:"pointer", textAlign:"left"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:34, height:34, borderRadius:9, background:isDark?"#1e1f3a":"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <IconBook size={18} color="#6366f1"/>
          </div>
          <div>
            <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:text}}>Research & Sources</div>
            <div style={{fontSize:12, color:muted}}>Scores based on peer-reviewed studies</div>
          </div>
        </div>
        <div style={{fontSize:18, color:muted, transform:open?"rotate(180deg)":"none", transition:"transform 0.2s"}}>›</div>
      </button>
      {open && (
        <div style={{padding:"0 24px 20px", borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:12, color:muted, marginBottom:12, paddingTop:14}}>The risk scores for this category are informed by the following research:</div>
          {sources.map((s,i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{display:"flex", alignItems:"flex-start", gap:10, padding:"10px 0", borderBottom:i<sources.length-1?`1px solid ${border}`:"none", textDecoration:"none"}}>
              <div style={{width:28, height:28, borderRadius:7, background:isDark?"#1e1f3a":"#eef2ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1}}>
                <IconLink size={13} color="#6366f1"/>
              </div>
              <div>
                <div style={{fontSize:13, fontWeight:600, color:isDark?"#a5b4fc":"#4f46e5", lineHeight:1.4}}>{s.title}</div>
                <div style={{fontSize:11, color:muted, marginTop:2}}>{s.journal}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ── EDUCATION SECTION ─────────────────────────────────────────
const EducationSection = ({isDark, isMobile=false}) => {
  const surface = isDark?"#0f2a18":"#fff";
  const border  = isDark?"rgba(34,197,94,0.15)":"#eee";
  const text    = isDark?"#f0fdf4":"#111";
  const muted   = isDark?"#6ee7b7":"#666";
  const bg      = isDark?"#080f0a":"#fafafa";

  const sections = [
    {
      tag: "Your Health",
      tagColor: "#16a34a",
      tagBg: isDark?"#1a2a1a":"#f0fdf4",
      headline: "What your products are doing to your body",
      subhead: "From microplastics in arterial plaques to artificial dyes being phased out by the FDA, the research on everyday product exposure has reached a turning point.",
      stats: [
        {number:"100%", label:"of human blood samples tested in 2022 contained microplastics", color:"#16a34a", bg:"#f0fdf4"},
        {number:"58%",  label:"of carotid artery plaques studied in 2024 contained polypropylene (PP)", color:"#059669", bg:"#ecfdf5"},
        {number:"2025", label:"FDA banned Red 3 and began phasing out all petroleum-based synthetic food dyes", color:"#047857", bg:"#d1fae5"},
        {number:"UPF",  label:"ultra-processed foods now linked to cardiovascular disease, cognitive decline and stroke — The Lancet 2025", color:"#052e16", bg:"#bbf7d0"},
      ],
      faqs: [
        {q:"What are microplastics and why do they matter?", a:"Microplastics are plastic particles under 5mm, many invisible to the naked eye. A 2024 New England Journal of Medicine study found polypropylene (PP) in 58% of carotid artery plaques. Patients with detectable microplastics had significantly higher rates of heart attack, stroke, and death over the following years."},
        {q:"What are PFAS and where are they found?", a:"PFAS (per- and polyfluoroalkyl substances) are synthetic chemicals used in non-stick coatings, water-resistant clothing, food packaging, and some cleaning products. They are known endocrine disruptors linked to thyroid disruption, reduced fertility, elevated cholesterol, and several cancers. The FDA has flagged them as a priority health concern."},
        {q:"Why are artificial dyes a concern?", a:"The FDA banned Red 3 in 2025 and has begun phasing out all petroleum-derived synthetic dyes including Red 40, Yellow 5, Yellow 6, and Blue 1. Multiple studies have linked these dyes to hyperactivity in children and potential carcinogenicity. They appear in candy, cereals, drinks, and many processed foods. Partiqule flags each dye individually with its severity level and the research behind it."},
        {q:"What are ultra-processed foods and why do they score higher?", a:"Ultra-processed foods (NOVA Group 4) are industrial formulations containing ingredients not found in home kitchens — synthetic dyes, preservatives like BHA and BHT, emulsifiers, and artificial flavors. A 2025 Lancet review linked regular ultra-processed food consumption to cardiovascular disease, cognitive decline, and stroke. Partiqule scores these products higher on Materials and Usage because the chemical load is meaningfully higher than minimally processed or whole foods."},
        {q:"What are pesticide residues and should I be concerned?", a:"The EWG's 2026 Dirty Dozen report — analysing 54,344 USDA produce samples — found pesticide residues on 96% of the 12 most contaminated fruits and vegetables, including PFAS forever chemicals on 63% of samples. Spinach ranked highest for pesticide residues by weight. Partiqule flags conventional Dirty Dozen produce with a pesticide concern and credits organic produce as a positive. Importantly, all produce is healthy — the goal is to reduce exposure where practical, not avoid fruits and vegetables."},
        {q:"How does Partiqule calculate the product health score?", a:"The score combines two independent layers into one number. The first is chemical safety — synthetic pesticides, petroleum dyes, IARC carcinogens, BHA/BHT, PFAS, and similar substances. The second, for food and beverages, is nutritional impact — sugar, sodium, saturated fat, and trans fat are each scored against their daily recommended values, and the higher of the two floors wins. A juice with clean ingredients but 38g of sugar scores 5 because the glycemic impact is real regardless of what is in the ingredient list. Organic butter scores 2 — no pesticides, no synthetic additives. Protein and fiber appear as positive green badges when notably high."},
      ],
    },
    {
      tag: "Your Family and Home",
      tagColor: "#2563eb",
      tagBg: isDark?"#1e1f3a":"#eff6ff",
      headline: "What is coming into your home",
      subhead: "The packaging your products arrive in, the cleaning products you use around your family, and the exposure patterns of the people you live with all matter.",
      stats: [
        {number:"PVA",  label:"film in dishwasher and laundry pods dissolves but enters waterways as microplastic", color:"#2563eb", bg:"#eff6ff"},
        {number:"1,000+", label:"chemicals in everyday products are known or suspected endocrine disruptors", color:"#1d4ed8", bg:"#dbeafe"},
        {number:"10x",  label:"higher microplastic concentrations found in infants versus adults in some studies", color:"#1e40af", bg:"#bfdbfe"},
        {number:"80%",  label:"of packaged household products contain ultra-processed or synthetic chemical ingredients", color:"#1e3a8a", bg:"#93c5fd"},
      ],
      faqs: [
        {q:"Are cleaning products a health concern?", a:"Conventional cleaning products often contain synthetic fragrances, optical brighteners, and surfactants that leave residue on surfaces, dishes, and clothing. Dishwasher pods from brands like Cascade and Tide contain PVA film, which dissolves but enters waterways as microplastic. Genuinely plastic-free alternatives (Blueland, Branch Basics) avoid these entirely."},
        {q:"Why does packaging matter for my home?", a:"Primary packaging that touches a product can leach chemicals, especially when heated or in contact with acidic foods. Single-use plastic packaging that enters your home regularly adds up over time. Refillable and concentrated formats reduce the volume of plastic and synthetic chemicals circulating through your household."},
        {q:"Are baby and children's products more concerning?", a:"Yes. Children have higher surface-area-to-body-weight ratios, developing immune and hormonal systems, and different exposure patterns (more hand-to-mouth contact). A 2020 Nature Food study found that heating polypropylene baby bottles releases millions of microplastic particles per litre. Partiqule flags child products with a vulnerable population marker."},
        {q:"How does Partiqule score home and packaging risk?", a:"The Packaging score (15% weight) covers what enters your home: primary packaging material, whether the product is refillable, and its end-of-life fate. Incidental packaging that is discarded before use (a film pouch on a cleaning tablet) does not penalise the product itself."},
      ],
    },
    {
      tag: "The Planet",
      tagColor: "#d97706",
      tagBg: isDark?"#1e1200":"#fffbeb",
      headline: "The downstream impact of what we buy",
      subhead: "Every product has a lifecycle. From how it is made to how it is disposed of, everyday purchasing decisions accumulate into something much larger.",
      stats: [
        {number:"8M",   label:"tonnes of plastic enter the world's oceans every year", color:"#d97706", bg:"#fffbeb"},
        {number:"500",  label:"years for a standard plastic bag to break down in landfill", color:"#b45309", bg:"#fef3c7"},
        {number:"700K", label:"microfibers released per wash from a single synthetic fleece jacket", color:"#92400e", bg:"#fde68a"},
        {number:"1/3",  label:"of all plastic ever produced has ended up in nature", color:"#78350f", bg:"#fcd34d"},
      ],
      faqs: [
        {q:"What is sustainability scoring and why does it matter?", a:"Single-use disposables (paper towels, plastic bags, disposable cups, wipes) generate ongoing waste regardless of what they are made of. Partiqule's Sustainability score (15% weight) rewards multi-use, refillable, repairable, and compostable products, and penalises products designed to be thrown away after a single use."},
        {q:"Why does synthetic clothing contribute to ocean plastic?", a:"Polyester, nylon, acrylic, and spandex shed microscopic synthetic fibers every time they are washed. These microfibers pass through wastewater treatment and enter rivers and oceans. A single wash of a fleece jacket can release over 700,000 fibers. Natural fibers (cotton, wool, linen, hemp) do not shed synthetic microplastics."},
        {q:"What is a break-even calculation?", a:"When Partiqule suggests a safer alternative, it estimates how many uses it takes for the alternative to offset the environmental cost of its own production. A stainless steel water bottle, for example, breaks even against single-use plastic bottles at around 50 uses. After that, every use is net positive."},
        {q:"How does Partiqule score planet impact?", a:"Sustainability (15% weight) covers product longevity, replaceability of single-use items, and end-of-life circularity. Together they capture the downstream impact of buying a product."},
      ],
    },
    {
      tag: "How Scores Get More Accurate Over Time",
      tagColor: "#7c3aed",
      tagBg: isDark?"#1e1433":"#f5f3ff",
      headline: "From AI estimate to verified fact",
      subhead: "Every scan makes the system smarter. Here is the honest explanation of how Partiqule works today, and where it is going.",
      stats: [
        {number:"113",  label:"confirmed harmful substances in our registry — each with a hard minimum score it enforces in code", color:"#7c3aed", bg:"#f5f3ff"},
        {number:"2-pass", label:"every scan runs through an AI scorer and an independent AI auditor before a result is returned", color:"#6d28d9", bg:"#ede9fe"},
        {number:"Code", label:"substance floors are enforced in code, not just in AI prompts — the AI cannot override them", color:"#5b21b6", bg:"#ddd6fe"},
        {number:"Verified", label:"over time, known products get hard-coded scores the AI cannot deviate from — moving from estimate to fact", color:"#4c1d95", bg:"#c4b5fd"},
      ],
      faqs: [
        {q:"How does Partiqule score a product it has never seen before?", a:"Two AI passes analyse the product name, brand, and any visible ingredient or material information. The first pass produces a score across four dimensions. The second pass acts as an independent auditor, checking the first result for consistency. After both passes, a code-level system applies 113 substance floors — if a confirmed harmful substance is detected, the score cannot go below a minimum threshold regardless of what the AI said."},
        {q:"What is a substance floor and why does it matter?", a:"A substance floor is a hard minimum score enforced in code, not in a prompt. If a product contains Red 40, for example, the materials score cannot go below 7 — period. The AI cannot override it, no matter how it reasons. This is how we prevent the system from being fooled by good marketing or gaps in AI knowledge. We have 113 of these floors covering petroleum dyes, PFAS, aspartame, sucralose, formaldehyde releasers, heavy metals, and more."},
        {q:"Can the AI get a score wrong?", a:"Yes. The AI is an expert estimator, not a database. For products it has never seen before, it reasons from ingredient patterns, brand reputation, and category norms. It will occasionally be wrong. This is why the substance floor system exists — the most dangerous mistakes are caught in code before they reach you. For well-known products, we are building a verified calibration registry that enforces correct scores regardless of what the AI produces."},
        {q:"What is the calibration registry?", a:"The calibration registry is a growing database of verified scores for known products. When a product is in the registry, its score is enforced in code — the AI's estimate becomes irrelevant. Centrum Silver, for example, contains FD&C Blue 1 (a petroleum dye the FDA is phasing out), talc (IARC Group 2A), and titanium dioxide (IARC Group 2B). The registry locks this product to a minimum score of 6 regardless of how the AI interprets it. Over time, the most commonly scanned products all become deterministic. The AI handles new and unknown products. The registry handles everything it has already verified."},
        {q:"How does the registry grow?", a:"Every scan generates data. When the AI scores a known product differently from the registry, that is logged as an override. Patterns in these overrides reveal where the AI is most uncertain — those products become priority candidates for the next wave of verification. Users who flag a result as wrong also feed directly into the review queue. The registry grows through a combination of manual expert review and scan-volume signals."},
        {q:"Will Partiqule ever be fully deterministic?", a:"For commonly scanned products, yes — over time. For the long tail of new products, regional variants, and reformulations, the AI will always play a role. The goal is not to eliminate AI but to confine it to the edge cases where it is genuinely needed. A verified score for Cheerios should never be uncertain. A score for a small-batch artisan granola brand from a local market should be an expert estimate. That is the right division of labour."},
      ],
    },
  ];

  return (
    <section style={{background:bg, borderTop:`1px solid ${border}`, padding:isMobile?"40px 16px":"64px 40px"}}>
      <div style={{maxWidth:1100, margin:"0 auto"}}>
        {sections.map((sec, si) => (
          <div key={si} style={{marginBottom: si < sections.length - 1 ? (isMobile?48:80) : 0}}>
            {/* Section header */}
            <div style={{textAlign:"center", marginBottom:isMobile?32:48}}>
              <div style={{display:"inline-flex", alignItems:"center", gap:6, background:sec.tagBg, color:sec.tagColor, fontSize:13, fontWeight:600, padding:"5px 14px", borderRadius:20, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.05em"}}>
                {sec.tag}
              </div>
              <h2 style={{fontFamily:"'Outfit',sans-serif", fontSize:isMobile?26:34, fontWeight:700, color:text, margin:"0 0 14px", letterSpacing:"-0.5px"}}>{sec.headline}</h2>
              <p style={{fontSize:16, color:muted, maxWidth:600, margin:"0 auto", lineHeight:1.75}}>{sec.subhead}</p>
            </div>

            {/* Stats grid */}
            <div style={{display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:isMobile?10:20, marginBottom:isMobile?32:48}}>
              {sec.stats.map((s,i) => (
                <div key={i} style={{background:isDark?"#0f2a18":s.bg, borderRadius:14, padding:"24px 20px", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"transparent"}`, textAlign:"center"}}>
                  <div style={{fontFamily:"'Outfit',sans-serif", fontSize:28, fontWeight:800, color:isDark?"#4ade80":s.color, marginBottom:8, lineHeight:1.2}}>{s.number}</div>
                  <div style={{fontSize:13, color:isDark?"#6ee7b7":s.color, lineHeight:1.5, opacity:isDark?1:0.85}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* FAQ grid */}
            <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?10:20}}>
              {sec.faqs.map((faq,i) => (
                <div key={i} style={{background:surface, borderRadius:14, padding:"24px", border:`1.5px solid ${border}`}}>
                  <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:text, marginBottom:10}}>{faq.q}</div>
                  <div style={{fontSize:14, color:muted, lineHeight:1.7}}>{faq.a}</div>
                </div>
              ))}
            </div>

            {si < sections.length - 1 && (
              <div style={{borderTop:`1.5px solid ${border}`, marginTop:isMobile?40:64}}/>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── PLASTIC SCORE DROPDOWN ────────────────────────────────────
// ── EXPOSURE CALCULATOR — replaces break-even card ───────────
const FREQ_OPTIONS = [
  { value:"daily",     label:"Every day",        perYear: 365 },
  { value:"twice",     label:"2-3x per week",    perYear: 130 },
  { value:"weekly",    label:"Once a week",       perYear: 52  },
  { value:"monthly",   label:"A few times/month", perYear: 18  },
  { value:"rarely",    label:"Rarely",            perYear: 6   },
];

const CATEGORY_EXPOSURE = {
  food_beverage: {
    unit: "servings",
    chemical: (result) => {
      const fa = result.food_analysis;
      if (!fa) return "synthetic additives";
      const highs = (fa.concerns||[]).filter(c=>c.severity==="high");
      return highs.length > 0 ? highs.map(c=>c.ingredient).slice(0,2).join(" and ") : "synthetic additives";
    },
    analogy: (events) => {
      if (events >= 500) return `${events.toLocaleString()} servings of synthetic chemicals ingested`;
      return `${events} servings containing synthetic food additives`;
    },
  },
  personal_care: {
    unit: "applications",
    chemical: () => "synthetic chemicals",
    analogy: (events) => `${events.toLocaleString()} skin contact events with synthetic ingredients`,
  },
  kitchen: {
    unit: "uses",
    chemical: () => "chemical exposure",
    analogy: (events) => `${events.toLocaleString()} uses with direct chemical contact`,
  },
  clothing: {
    unit: "wears",
    chemical: () => "microfibers shed",
    analogy: (events) => `${events.toLocaleString()} wear events shedding synthetic microfibers onto skin`,
  },
  baby: {
    unit: "uses",
    chemical: () => "chemical exposures",
    analogy: (events) => `${events.toLocaleString()} exposures for your child`,
  },
  other: {
    unit: "uses",
    chemical: () => "exposures",
    analogy: (events) => `${events.toLocaleString()} contact events`,
  },
};

const ExposureCalculator = ({result, isDark, text, muted, isMobile, history=[]}) => {
  const [tab,       setTab]     = useState("exposure");
  const [freq,      setFreq]    = useState(() => {
    const f = result.dimensions?.usage_exposure?.frequency || result.exposure_frequency;
    if (f === "daily") return "daily";
    if (f === "weekly") return "weekly";
    if (f === "occasional") return "monthly";
    return "daily";
  });
  const [adults,   setAdults]   = useState(2);
  const [kids,     setKids]     = useState(0);
  const [spend,    setSpend]    = useState(10);

  const score    = result.overall_score || result.score;
  const altScore = result.break_even?.uses ? Math.max(1, Math.round(score * 0.3)) : 2;
  const freqData = FREQ_OPTIONS.find(f => f.value === freq) || FREQ_OPTIONS[0];
  const cat      = result.category || "other";
  const catConfig = CATEGORY_EXPOSURE[cat] || CATEGORY_EXPOSURE.other;
  const hasKids  = kids > 0;

  // Mirror SplitView's alt selection exactly:
  // same-category DB alt → AI alt → any DB alt
  // Price only comes from DB alts (AI alts have no price)
  const sameCat   = result.alternatives?.find(a => a.category === result.category);
  const anyStatic = result.alternatives?.[0];
  const aiAlt     = result.ai_alternatives?.[0];
  const splitAlt  = sameCat || (aiAlt ? null : anyStatic); // mirrors SplitView's `best`
  const useAiAlt  = !sameCat && !!aiAlt;                   // mirrors SplitView's `useAi`

  // Name: same product as SplitView shows
  const altName = useAiAlt
    ? (aiAlt?.name || "safer alternative")
    : (splitAlt?.name || result.break_even?.alternative_name || "safer alternative");

  // Price: only available from DB alts (AI alts have no price data)
  const altPriceStr = splitAlt?.price || "";

  // Named exposures — read from product_analysis (all categories) or food_analysis (legacy)
  const exposureItems = (() => {
    const analysis = result.food_analysis; // field name kept for compat
    const items = [];
    if (analysis?.concerns?.length) {
      // New product_analysis schema uses "substance", old food_analysis uses "ingredient"
      analysis.concerns
        .filter(c => c.severity === "high" || c.severity === "medium")
        .forEach(c => items.push({ name: c.substance || c.ingredient, severity: c.severity }));
    }
    // Always append identified plastics and harmful chemicals
    (result.identified_plastics || []).forEach(p => {
      if (!items.find(i => i.name === p))
        items.push({ name: p, severity: "high" });
    });
    (result.harmful_chemicals || []).forEach(c => {
      if (!items.find(i => i.name === c))
        items.push({ name: c, severity: "medium" });
    });
    return items.slice(0, 6);
  })();
  const SEV_COLOR = { high:"#dc2626", medium:"#d97706", low:"#6b7280" };
  const exposureNames = exposureItems.length > 0
    ? exposureItems.slice(0,3).map(e=>e.name).join(", ")
    : catConfig.chemical(result);

  // Calculations
  const perYear      = freqData.perYear;
  const adultTotal   = perYear * adults;
  const kidsTotal    = perYear * kids * 2.5; // children 2.5x more sensitive
  const totalCurrent = adultTotal + kidsTotal;
  const altTotal     = Math.round(totalCurrent * (altScore / score));
  const reduction    = Math.round(totalCurrent - altTotal);
  const reductionPct = Math.round((reduction / totalCurrent) * 100);

  // Health cost estimate (Trasande et al. 2018) — spend input used only for this
  const annualSpend  = spend * 12;
  const healthSaved  = hasKids ? Math.round(494 * kids * (reductionPct / 100)) : 0;

  const surface = isDark ? "#0f2a18" : "#fff";
  const border  = isDark ? "rgba(34,197,94,0.15)" : "#e5e7eb";

  // Stepper component
  const Stepper = ({label, value, setValue, min=0, max=10}) => (
    <div>
      <div style={{fontSize:11, color:muted, fontWeight:600, marginBottom:5}}>{label}</div>
      <div style={{display:"flex", alignItems:"center", gap:6}}>
        <button onClick={()=>setValue(v=>Math.max(min,v-1))} style={{width:28,height:28,borderRadius:6,border:`1px solid ${border}`,background:surface,color:text,cursor:"pointer",fontSize:16,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
        <span style={{fontWeight:700,fontSize:15,color:text,minWidth:18,textAlign:"center"}}>{value}</span>
        <button onClick={()=>setValue(v=>Math.min(max,v+1))} style={{width:28,height:28,borderRadius:6,border:`1px solid ${border}`,background:surface,color:text,cursor:"pointer",fontSize:16,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
      </div>
    </div>
  );

  const [open,     setOpen]     = useState(false);

  // ── Cumulative routine analysis from scan history ─────────────
  const [timeFilter, setTimeFilter] = useState("all"); // "30d" | "90d" | "all"
  const [notPurchased, setNotPurchased] = useState(new Set()); // product names marked as "just researching"

  const now = Date.now();
  const TIME_CUTOFFS = { "7d": 7*24*60*60*1000, "30d": 30*24*60*60*1000, "90d": 90*24*60*60*1000, "1y": 365*24*60*60*1000, "all": Infinity };

  const filteredHistory = history.filter(h => {
    if (h.product_name === result.product_name) return false;
    if (timeFilter !== "all" && h.scannedAt) {
      const age = now - new Date(h.scannedAt).getTime();
      if (age > TIME_CUTOFFS[timeFilter]) return false;
    }
    return true;
  }).slice(0, 20);

  const allProducts = [result, ...filteredHistory];
  const activeProducts = allProducts.filter(h => !notPurchased.has(h.product_name));

  // Build chemical frequency map — only counting active (purchased) products
  const chemicalCount = {};
  activeProducts.forEach(item => {
    const chemicals = [
      ...(item.harmful_chemicals || []),
      ...(item.identified_plastics || []),
      ...((item.food_analysis?.concerns || []).filter(c => c.severity === "high").map(c => c.substance || c.ingredient || "")),
    ].filter(Boolean);
    chemicals.forEach(chem => {
      const key = chem.toLowerCase().trim();
      if (!chemicalCount[key]) chemicalCount[key] = { name: chem, count: 0, products: [] };
      if (!chemicalCount[key].products.includes(item.product_name)) {
        chemicalCount[key].count++;
        chemicalCount[key].products.push(item.product_name);
      }
    });
  });

  // Sort by frequency — chemicals in multiple products are most concerning
  const repeatedChemicals = Object.values(chemicalCount)
    .filter(c => c.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const allChemicals = Object.values(chemicalCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // Routine load score — only active products
  const FREQ_MAP = {daily:365, weekly:52, monthly:18, occasional:18, rare:6};
  const routineScore = activeProducts.length > 1
    ? Math.round(activeProducts.reduce((sum, h) => sum + (h.overall_score || h.score || 5), 0) / activeProducts.length * 10) / 10
    : null;

  const tabs = [
    {id:"exposure", label:"This product"},
    {id:"routine",  label:`My routine${activeProducts.length > 1 ? ` (${activeProducts.length})` : ""}`},
    {id:"overtime", label:"Over time"},
  ];

  return (
    <div className="fade-up" style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, border:`1.5px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, overflow:"hidden", marginTop:16, textAlign:"left"}}>

      {/* Collapsed toggle header */}
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%", padding:"12px 18px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8}}>
        <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
          <div style={{display:"flex", alignItems:"center", gap:6}}>
            <IcoScore size={14} color="#16a34a"/>
            <span style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em"}}>Exposure Calculator</span>
          </div>
          {!open && (
            <span style={{fontSize:11, color:muted, fontWeight:500}}>
              {freqData.label.toLowerCase()} · {adults} adult{adults!==1?"s":""}{kids>0?` · ${kids} child${kids!==1?"ren":""}`:""}
              {exposureItems.length > 0 && <span style={{color:SEV_COLOR["high"], fontWeight:600}}> · {exposureItems.length} substance{exposureItems.length!==1?"s":""} flagged</span>}
            </span>
          )}
        </div>
        <span style={{fontSize:12, color:"#16a34a", transition:"transform 0.2s", display:"inline-block", transform:open?"rotate(180deg)":"rotate(0deg)", flexShrink:0}}>▾</span>
      </button>

      {/* Expanded content */}
      {open && (<>
      {/* Tabs */}
      <div style={{padding:"0 12px", borderTop:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, borderBottom:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, display:"flex", gap:0}}>
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:"8px 4px", fontSize:11, fontWeight:700,
            border:"none", background: tab===t.id ? (isDark?"#0f2a18":"#fff") : "transparent",
            color: tab===t.id ? "#16a34a" : muted,
            borderBottom: tab===t.id ? "2px solid #16a34a" : "2px solid transparent",
            cursor:"pointer", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{padding:"14px 14px"}}>

        {/* Inputs row — stacked on mobile */}
        <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:14}}>
          <div>
            <div style={{fontSize:11, color:muted, fontWeight:600, marginBottom:5}}>
              {cat === "food_beverage" ? "How often do you eat this?" : "How often do you use this?"}
            </div>
            <select value={freq} onChange={e=>setFreq(e.target.value)} style={{
              width:"100%", padding:"8px 10px", borderRadius:8, fontSize:13,
              border:`1px solid ${border}`, background:surface, color:text, cursor:"pointer",
            }}>
              {FREQ_OPTIONS.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div style={{display:"flex", gap:20}}>
            <Stepper label="Adults" value={adults} setValue={setAdults} min={1} max={8}/>
            <Stepper label="Children" value={kids} setValue={setKids} min={0} max={8}/>
          </div>
        </div>

        {/* What's in this product — chips */}
        {exposureItems.length > 0 && (
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6}}>
              What you're being exposed to
            </div>
            <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
              {exposureItems.map((item,i) => (
                <span key={i} style={{
                  fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:16,
                  background:isDark?"#1e1a2e":"#fef2f2",
                  color:SEV_COLOR[item.severity]||"#6b7280",
                  border:`1px solid ${SEV_COLOR[item.severity]||"#6b7280"}44`,
                }}>{item.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── MY ROUTINE (cumulative across history) ── */}
        {tab === "routine" && (
          <div>
            {/* Time filter */}
            <div style={{display:"flex", gap:6, marginBottom:12, alignItems:"center"}}>
              <span style={{fontSize:11, color:muted, fontWeight:600, whiteSpace:"nowrap"}}>Show:</span>
              {[["7d","Last week"],["30d","30 days"],["90d","90 days"],["1y","Annual"],["all","Lifetime"]].map(([val, label]) => (
                <button key={val} onClick={()=>setTimeFilter(val)} style={{
                  fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, cursor:"pointer",
                  border:`1px solid ${timeFilter===val?"#16a34a":(isDark?"rgba(34,197,94,0.15)":"#e2e8f0")}`,
                  background: timeFilter===val ? "#16a34a" : "transparent",
                  color: timeFilter===val ? "#fff" : muted,
                }}>{label}</button>
              ))}
            </div>

            {filteredHistory.length === 0 && allProducts.length <= 1 ? (
              <div style={{textAlign:"center", padding:"24px 16px", color:muted}}>
                <div style={{marginBottom:8, display:"flex", justifyContent:"center"}}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
                <div style={{fontSize:14, fontWeight:600, color:text, marginBottom:6}}>Scan more products to see your routine</div>
                <div style={{fontSize:12, lineHeight:1.6}}>Partiqule tracks chemicals across everything you scan and shows you which ones appear most often — that's where your real cumulative exposure comes from.</div>
              </div>
            ) : (<>

              {/* Product list with purchased toggles */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6}}>
                  Your scanned products — toggle off what you don't actually use
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:5}}>
                  {allProducts.map((item, i) => {
                    const s = item.overall_score || item.score || 5;
                    const isPurchased = !notPurchased.has(item.product_name);
                    const isCurrentProduct = item.product_name === result.product_name;
                    return (
                      <div key={i} style={{
                        display:"flex", alignItems:"center", gap:10, padding:"8px 10px",
                        borderRadius:8, border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`,
                        background: isPurchased ? (isDark?"#0f2a18":"#fff") : (isDark?"#080f0a":"#f8fafb"),
                        opacity: isPurchased ? 1 : 0.5,
                      }}>
                        <div style={{width:28, height:28, borderRadius:6, background:`${scoreColor(s)}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                          <span style={{fontSize:11, fontWeight:800, color:scoreColor(s)}}>{s}</span>
                        </div>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontSize:12, fontWeight:600, color:text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{item.product_name}</div>
                          {!isPurchased && <div style={{fontSize:10, color:muted}}>Not in my home</div>}
                        </div>
                        {!isCurrentProduct && (
                          <button onClick={()=>{
                            setNotPurchased(prev => {
                              const next = new Set(prev);
                              if (next.has(item.product_name)) next.delete(item.product_name);
                              else next.add(item.product_name);
                              return next;
                            });
                          }} style={{
                            fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:12, cursor:"pointer",
                            border:`1px solid ${isPurchased ? "#16a34a" : (isDark?"#374151":"#d1d5db")}`,
                            background: isPurchased ? "#f0fdf4" : "transparent",
                            color: isPurchased ? "#16a34a" : muted,
                            flexShrink:0,
                          }}>
                            {isPurchased ? "In my home" : "Not using"}
                          </button>
                        )}
                        {isCurrentProduct && (
                          <span style={{fontSize:10, color:"#16a34a", fontWeight:600, flexShrink:0}}>Current scan</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Routine score — only active products */}
              {routineScore !== null && activeProducts.length > 1 && (
                <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:12, padding:"12px 14px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`, marginBottom:12}}>
                  <div style={{fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6}}>
                    Active routine score ({activeProducts.length} products)
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:12}}>
                    <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:32, color:scoreColor(Math.round(routineScore)), lineHeight:1}}>{routineScore}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12, fontWeight:700, color:scoreColor(Math.round(routineScore)), marginBottom:4}}>{scoreLabel(Math.round(routineScore))}</div>
                      <div style={{height:6, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                        <div style={{height:"100%", width:`${Math.min(100,(routineScore/10)*100)}%`, background:scoreColor(Math.round(routineScore)), borderRadius:99}}/>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Repeated chemicals — the key insight */}
              {repeatedChemicals.length > 0 && (
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10, color:"#dc2626", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8}}>
                    ⚠ Chemicals in multiple active products
                  </div>
                  <div style={{display:"flex", flexDirection:"column", gap:6}}>
                    {repeatedChemicals.map((chem, i) => (
                      <div key={i} style={{background:isDark?"#2a1a1a":"#fef2f2", borderRadius:8, padding:"8px 12px", border:"1px solid #fca5a533"}}>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2}}>
                          <span style={{fontSize:13, fontWeight:700, color:"#dc2626"}}>{chem.name}</span>
                          <span style={{fontSize:11, fontWeight:700, color:"#dc2626", background:"#fef2f2", padding:"2px 8px", borderRadius:20, border:"1px solid #fca5a5"}}>{chem.count}× exposure</span>
                        </div>
                        <div style={{fontSize:11, color:muted}}>
                          {chem.products.slice(0,3).join(", ")}{chem.products.length > 3 ? ` +${chem.products.length-3} more` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:11, color:"#d97706", marginTop:8, lineHeight:1.5, padding:"8px 10px", background:isDark?"#2a1a00":"#fffbeb", borderRadius:8, border:"1px solid #fde68a"}}>
                    Repeated exposure across multiple products is where your real risk accumulates — even low amounts from each source compound over time.
                    {kids > 0 && <span style={{fontWeight:600}}> For children, cumulative exposure is 2-3x more impactful due to lower body weight.</span>}
                  </div>
                </div>
              )}

              {/* All chemicals */}
              {allChemicals.length > 0 && (
                <div>
                  <div style={{fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6}}>All flagged in active routine</div>
                  <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
                    {allChemicals.map((chem, i) => (
                      <span key={i} style={{
                        fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:16,
                        background: chem.count >= 2 ? (isDark?"#2a1a1a":"#fef2f2") : (isDark?"#0f2a18":"#f8fafb"),
                        color: chem.count >= 2 ? "#dc2626" : muted,
                        border:`1px solid ${chem.count >= 2 ? "#fca5a533" : (isDark?"rgba(34,197,94,0.15)":"#e5e7eb")}`,
                      }}>
                        {chem.name}{chem.count >= 2 ? ` ×${chem.count}` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {notPurchased.size > 0 && (
                <button onClick={()=>setNotPurchased(new Set())} style={{marginTop:10, fontSize:11, color:muted, background:"none", border:"none", cursor:"pointer", textDecoration:"underline"}}>
                  Reset — mark all as in my home
                </button>
              )}
            </>)}
          </div>
        )}

        {/* ── MY EXPOSURE ── */}
        {tab === "exposure" && (
          <div>
            {/* Big impact statement */}
            <div style={{background:isDark?"#2a1a1a":"#fef2f2", borderRadius:12, padding:"16px 18px", border:`2px solid ${scoreColor(score)}33`, marginBottom:12}}>
              <div style={{fontSize:11, color:scoreColor(score), fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8}}>
                Your household right now
              </div>
              <div style={{display:"flex", alignItems:"baseline", gap:8, flexWrap:"wrap", marginBottom:8}}>
                <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:42, color:scoreColor(score), lineHeight:1}}>
                  {totalCurrent.toLocaleString()}
                </span>
                <span style={{fontSize:14, color:isDark?"#6ee7b7":"#555", fontWeight:500}}>
                  {catConfig.unit} per year containing {exposureNames}
                </span>
              </div>
              {hasKids && (
                <div style={{fontSize:12, color:"#d97706", fontWeight:600, display:"flex", alignItems:"center", gap:5, marginBottom:4}}>
                  <IcoProfile size={13}/>
                  Includes {kids} child{kids>1?"ren":""} — counted at 2.5x adult sensitivity
                </div>
              )}
              <div style={{display:"flex", alignItems:"center", gap:8, marginTop:4}}>
                <div style={{flex:1, height:6, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                  <div style={{height:"100%", width:`${Math.min(100,(score/10)*100)}%`, background:scoreColor(score), borderRadius:99}}/>
                </div>
                <span style={{fontSize:11, color:scoreColor(score), fontWeight:700, whiteSpace:"nowrap"}}>{scoreLabel(score)} risk</span>
              </div>
            </div>

            {/* Arrow + alternative */}
            <div style={{textAlign:"center", fontSize:20, color:"#16a34a", margin:"4px 0"}}>↓</div>

            <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:12, padding:"16px 18px", border:"2px solid #16a34a33", marginBottom:12}}>
              <div style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8}}>
                If you switch to {altName}
              </div>
              <div style={{display:"flex", alignItems:"baseline", gap:8, flexWrap:"wrap", marginBottom:8}}>
                <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:42, color:"#16a34a", lineHeight:1}}>
                  {altTotal.toLocaleString()}
                </span>
                <span style={{fontSize:14, color:isDark?"#6ee7b7":"#555", fontWeight:500}}>
                  {catConfig.unit} per year
                </span>
              </div>
              <div style={{display:"flex", alignItems:"center", gap:8}}>
                <div style={{flex:1, height:6, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                  <div style={{height:"100%", width:`${Math.min(100,(altScore/10)*100)}%`, background:"#16a34a", borderRadius:99}}/>
                </div>
                <span style={{fontSize:11, color:"#16a34a", fontWeight:700, whiteSpace:"nowrap"}}>{scoreLabel(altScore)} risk</span>
              </div>
            </div>

            {/* The big why */}
            <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:12, padding:"14px 16px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#d1fae5"}`}}>
              <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:22, color:"#16a34a", marginBottom:4}}>
                {reductionPct}% fewer exposures
              </div>
              <div style={{fontSize:13, color:isDark?"#6ee7b7":"#444", lineHeight:1.6}}>
                That's <strong style={{color:text}}>{reduction.toLocaleString()} fewer {catConfig.unit}</strong> containing {exposureNames} for your household every year.
                {hasKids && (
                  <span style={{color:"#d97706"}}> For your {kids} child{kids>1?"ren":""}, whose developing systems are 2-3x more sensitive to these chemicals, this matters most.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── OVER TIME ── */}
        {tab === "overtime" && (
          <div>
            {/* Single cumulative view — cleaner than 3 separate cards */}
            <div style={{fontSize:12, color:muted, lineHeight:1.6, marginBottom:14}}>
              Cumulative {catConfig.unit} containing <strong style={{color:text}}>{exposureNames}</strong> for your household if you keep using this product vs switching now.
            </div>

            {[
              {years:1,  label:"1 year"},
              {years:5,  label:"5 years"},
              {years:10, label:"10 years"},
            ].map(({years, label}) => {
              const curr   = totalCurrent * years;
              const alt    = altTotal * years;
              const saved  = curr - alt;
              const pct    = Math.round((saved/curr)*100);
              return (
                <div key={years} style={{marginBottom:12}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
                    <span style={{fontSize:12, fontWeight:700, color:text}}>{label}</span>
                    <span style={{fontSize:11, color:"#16a34a", fontWeight:700, background:isDark?"#1a2a1a":"#f0fdf4", padding:"2px 8px", borderRadius:20}}>
                      {pct}% less by switching
                    </span>
                  </div>

                  {/* Current */}
                  <div style={{marginBottom:5}}>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
                      <span style={{fontSize:11, color:scoreColor(score), fontWeight:600}}>Current product</span>
                      <span style={{fontSize:12, color:scoreColor(score), fontWeight:800, fontFamily:"'Outfit',sans-serif"}}>{curr.toLocaleString()}</span>
                    </div>
                    <div style={{height:10, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                      <div style={{height:"100%", width:"100%", background:scoreColor(score), borderRadius:99}}/>
                    </div>
                  </div>

                  {/* Kids bar if applicable */}
                  {hasKids && (() => {
                    const kidsOnly = perYear * kids * 2.5 * years;
                    const pctBar   = Math.min(100, Math.round((kidsOnly/curr)*100));
                    return (
                      <div style={{marginBottom:5}}>
                        <div style={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
                          <span style={{fontSize:11, color:"#d97706", fontWeight:600}}>
                            {kids} child{kids>1?"ren":""} (2.5x sensitivity)
                          </span>
                          <span style={{fontSize:12, color:"#d97706", fontWeight:800, fontFamily:"'Outfit',sans-serif"}}>{kidsOnly.toLocaleString()}</span>
                        </div>
                        <div style={{height:10, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                          <div style={{height:"100%", width:`${pctBar}%`, background:"#d97706", borderRadius:99}}/>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Alternative */}
                  <div>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
                      <span style={{fontSize:11, color:"#16a34a", fontWeight:600}}>{altName}</span>
                      <span style={{fontSize:12, color:"#16a34a", fontWeight:800, fontFamily:"'Outfit',sans-serif"}}>{alt.toLocaleString()}</span>
                    </div>
                    <div style={{height:10, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                      <div style={{height:"100%", width:`${Math.round((alt/curr)*100)}%`, background:"#16a34a", borderRadius:99}}/>
                    </div>
                  </div>

                  {/* Plain-English saved */}
                  <div style={{fontSize:12, color:muted, marginTop:6}}>
                    Switching eliminates <strong style={{color:text}}>{saved.toLocaleString()} {catConfig.unit}</strong> containing {exposureNames} over {label}.
                  </div>
                  {years < 10 && <div style={{borderTop:`1px solid ${border}`, marginTop:12}}/>}
                </div>
              );
            })}

            {hasKids && (
              <div style={{fontSize:11, color:"#d97706", marginTop:6, lineHeight:1.5, padding:"8px 12px", background:isDark?"#2a1a00":"#fffbeb", borderRadius:8, border:"1px solid #fde68a"}}>
                Children's exposure is shown at 2.5x adult sensitivity — developing immune and hormonal systems are significantly more sensitive to {exposureNames} (Grandjean and Landrigan, The Lancet Neurology 2014).
              </div>
            )}
          </div>
        )}

      </div>
      </>)}
    </div>
  );
};

// ── PRODUCT INSIGHTS DROPDOWN — all categories ───────────────
const TIER_CONFIG = {
  // Food
  whole_food:          { label:"Whole Food",            color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Unprocessed or minimally processed" },
  minimally_processed: { label:"Minimally Processed",   color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", tier:2, headline:"Single-ingredient processing" },
  processed:           { label:"Processed",              color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Added salt, sugar, oil or preservatives" },
  ultra_processed:     { label:"Ultra-Processed",        color:"#dc2626", bg:"#fef2f2", border:"#fecaca", tier:4, headline:"Industrial formula with synthetic additives" },
  // Personal care
  clean_formula:       { label:"Clean Formula",          color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Plant-based, no flagged synthetics" },
  conventional:        { label:"Conventional",           color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", tier:2, headline:"Standard commercial formula" },
  synthetic_heavy:     { label:"Synthetic-Heavy",        color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Multiple petroleum-based chemicals" },
  high_concern:        { label:"High Concern",           color:"#dc2626", bg:"#fef2f2", border:"#fecaca", tier:4, headline:"Contains banned or flagged substances" },
  // Clothing
  natural_fiber:       { label:"Natural Fiber",          color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Certified organic or pure natural fiber" },
  synthetic:           { label:"Synthetic",              color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Petroleum-derived, microfiber shedding" },
  chemical_treated:    { label:"Chemical-Treated",       color:"#dc2626", bg:"#fef2f2", border:"#fecaca", tier:4, headline:"PFAS coating, formaldehyde finish or flame retardants" },
  // Kitchen
  plant_based:         { label:"Plant-Based",            color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Genuinely clean, no synthetic chemicals" },
  industrial_chemical: { label:"Industrial Chemical",    color:"#dc2626", bg:"#fef2f2", border:"#fecaca", tier:4, headline:"Contains PTFE, quats or EPA-flagged ingredients" },
  // Baby
  clean_safe:          { label:"Clean and Safe",         color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Formulated specifically for infant safety" },
  concern_flagged:     { label:"Concern Flagged",        color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Ingredients requiring caution for infants" },
  high_risk_infants:   { label:"High Risk for Infants",  color:"#dc2626", bg:"#fef2f2", border:"#fecaca", tier:4, headline:"Contains substances harmful to developing systems" },
  // Supplement
  whole_food_derived:  { label:"Whole Food Derived",     color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Food-sourced, third-party tested, no synthetics" },
  synthetic_formula:   { label:"Synthetic Formula",      color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Petroleum-derived vitamins, synthetic fillers" },
  // Home furnishing
  natural_materials:   { label:"Natural Materials",      color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0", tier:1, headline:"Organic cotton, wool, or natural latex — no synthetics" },
  synthetic_foam:      { label:"Synthetic Foam",         color:"#d97706", bg:"#fffbeb", border:"#fde68a", tier:3, headline:"Polyurethane foam with VOC off-gassing" },
};
const TIER_FALLBACK = { label:"Conventional", color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", tier:2, headline:"Standard commercial product" };

const SEVERITY_CONFIG = {
  high:   { color:"#dc2626", bg:"#fef2f2", border:"#fecaca" },
  medium: { color:"#d97706", bg:"#fffbeb", border:"#fde68a" },
  low:    { color:"#6b7280", bg:"#f9fafb", border:"#e5e7eb" },
};

const TYPE_LABELS = {
  dye:"Artificial Dye", preservative:"Preservative", sweetener:"Sweetener", additive:"Additive",
  uv_filter:"UV Filter", fragrance:"Fragrance", surfactant:"Surfactant",
  coating:"Coating", fiber:"Fiber", chemical:"Chemical", plasticizer:"Plasticizer",
  flame_retardant:"Flame Retardant", processing:"Processing", pesticide:"Pesticide",
  // legacy food types
  artificial_dye:"Artificial Dye", synthetic_preservative:"Preservative",
};

const CATEGORY_DROPDOWN_LABEL = {
  food_beverage:   "Ingredients and Nutrition",
  personal_care:   "Formula Breakdown",
  clothing:        "Fiber and Chemical Analysis",
  kitchen:         "Formula and Materials Analysis",
  baby:            "Safety Breakdown",
  supplement:      "Supplement Analysis",
  home_furnishing: "Materials and Off-Gas Analysis",
  restaurant:      "Ingredients and Nutrition",
  other:           "Substance Analysis",
};

const ProductInsightsDropdown = ({analysis, category, isDark}) => {
  const [open, setOpen] = useState(false);
  if (!analysis) return null;

  // Support both old food_analysis shape and new product_analysis shape
  const tierKey  = analysis.tier_label || analysis.processing_level || "conventional";
  const tierCfg  = TIER_CONFIG[tierKey] || TIER_FALLBACK;
  const tierNum  = analysis.composition_tier || analysis.nova_score || tierCfg.tier;

  // Normalize concern field name (ingredient vs substance) — filter out any with no name
  const concerns = (analysis.concerns || [])
    .map(c => ({ ...c, name: c.substance || c.ingredient || "" }))
    .filter(c => c.name && c.name.trim().length > 0);

  const highs  = concerns.filter(c => c.severity === "high");
  const meds   = concerns.filter(c => c.severity === "medium");
  const lows   = concerns.filter(c => c.severity === "low");
  const hasAny = concerns.length > 0 || analysis.positives?.length > 0;

  const headerBorder = highs.length > 0 ? "#fecaca" : isDark ? "rgba(34,197,94,0.15)" : "#e5e7eb";
  const headerColor  = highs.length > 0 ? "#dc2626" : isDark ? "#6ee7b7" : "#555";
  const dropdownLabel = CATEGORY_DROPDOWN_LABEL[category] || CATEGORY_DROPDOWN_LABEL.other;

  return (
    <div style={{marginBottom:10, borderRadius:14, overflow:"hidden", border:`1.5px solid ${headerBorder}`, background:isDark?"#0f2a18":"#f9fafb", textAlign:"left"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", gap:8}}>
        <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
          <span style={{display:"flex", alignItems:"center", opacity:0.9}}><IcoIngredients size={20}/></span>
          <span style={{fontSize:12, color:headerColor, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em"}}>{dropdownLabel}</span>
          <span style={{fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:20, background:tierCfg.bg, color:tierCfg.color, border:`1px solid ${tierCfg.border}`}}>
            Tier {tierNum} — {tierCfg.label}
          </span>
          {highs.length > 0 && (
            <span style={{fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:20, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca"}}>
              {highs.length} high concern{highs.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <span style={{fontSize:12, color:headerColor, transition:"transform 0.2s", display:"inline-block", transform:open?"rotate(180deg)":"rotate(0deg)", flexShrink:0}}>▾</span>
      </button>

      {open && (
        <div style={{padding:"0 16px 14px", borderTop:`1px solid ${headerBorder}`}}>

          {/* Tier detail card */}
          <div style={{marginTop:12, marginBottom:14, padding:"10px 14px", borderRadius:10, background:tierCfg.bg, border:`1px solid ${tierCfg.border}`}}>
            <div style={{fontSize:13, fontWeight:700, color:tierCfg.color, marginBottom:3}}>
              Tier {tierNum} — {tierCfg.label}
            </div>
            <div style={{fontSize:12, color:tierCfg.color, opacity:0.85}}>
              {analysis.tier_description || tierCfg.headline}
            </div>
          </div>

          {/* Nutrition — food only, compact single row */}
          {analysis.nutrition && (() => {
            const n = analysis.nutrition;
            const verified = analysis.nutrition_verified !== false;
            const nutColor  = isDark ? "#f0fdf4" : "#111";
            const nutMuted  = isDark ? "#64748b"  : "#888";
            const items = [
              n.calories   != null && { label:"cal",     val:n.calories,  unit:"" },
              n.protein_g  != null && { label:"protein", val:n.protein_g, unit:"g" },
              n.carbs_g    != null && { label:"carbs",   val:n.carbs_g,   unit:"g" },
              n.sugar_g    != null && { label:"sugar",   val:n.sugar_g,   unit:"g" },
              n.fat_g      != null && { label:"fat",     val:n.fat_g,     unit:"g" },
              n.fiber_g    != null && n.fiber_g > 0 && { label:"fiber",  val:n.fiber_g, unit:"g" },
              n.sodium_mg  != null && { label:"sodium",  val:n.sodium_mg, unit:"mg" },
            ].filter(Boolean);
            if (!items.length) return null;
            return (
              <div style={{marginBottom:14, padding:"8px 12px", borderRadius:8, background:isDark?"#0f2a18":"#f9fafb", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6}}>
                  <div style={{fontSize:10, color:nutMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em"}}>
                    Per serving{n.serving_size ? ` (${n.serving_size})` : ""}
                  </div>
                  {!verified && (
                    <div style={{fontSize:10, color:"#f59e0b", fontWeight:600, display:"flex", alignItems:"center", gap:3}}>
                      ⚠ Estimated
                    </div>
                  )}
                </div>
                <div style={{display:"flex", flexWrap:"wrap", gap:"4px 16px"}}>
                  {items.map((item,i) => (
                    <span key={i} style={{fontSize:12, color:nutColor}}>
                      <strong style={{fontFamily:"'Outfit',sans-serif"}}>{item.val}{item.unit}</strong>
                      <span style={{color:nutMuted, marginLeft:2}}>{item.label}</span>
                    </span>
                  ))}
                </div>
                {!verified && (
                  <div style={{fontSize:10, color:nutMuted, marginTop:6, fontStyle:"italic"}}>Values may be approximate — verify on the label or restaurant website</div>
                )}
              </div>
            );
          })()}

          {/* Concerns by severity */}
          {[{items:highs, label:"High Concern"}, {items:meds, label:"Medium Concern"}, {items:lows, label:"Low Concern"}].map(({items, label}) =>
            items.length > 0 && (
              <div key={label} style={{marginBottom:12}}>
                <div style={{fontSize:10, fontWeight:700, color:SEVERITY_CONFIG[items[0].severity].color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6}}>{label}</div>
                <div style={{display:"flex", flexDirection:"column", gap:6}}>
                  {items.map((c, i) => {
                    const cfg = SEVERITY_CONFIG[c.severity];
                    return (
                      <div key={i} style={{padding:"8px 12px", borderRadius:10, background:isDark?"#1a1a2e":cfg.bg, border:`1px solid ${cfg.border}`}}>
                        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:3, flexWrap:"wrap"}}>
                          <span style={{fontSize:12, fontWeight:700, color:cfg.color}}>{c.name}</span>
                          {c.type && TYPE_LABELS[c.type] && (
                            <span style={{fontSize:10, fontWeight:600, color:cfg.color, opacity:0.75, background:"rgba(0,0,0,0.05)", padding:"1px 6px", borderRadius:8}}>{TYPE_LABELS[c.type]}</span>
                          )}
                        </div>
                        <div style={{fontSize:12, color:isDark?"#6ee7b7":"#555", lineHeight:1.5}}>{c.reason}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {/* Positives */}
          {analysis.positives?.length > 0 && (
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6}}>Positive Attributes</div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {analysis.positives.map((p, i) => (
                  <div key={i} style={{padding:"8px 12px", borderRadius:10, background:isDark?"#1a2a1a":"#f0fdf4", border:"1px solid #bbf7d0", display:"flex", alignItems:"flex-start", gap:8}}>
                    <span style={{color:"#16a34a", fontWeight:700, fontSize:14, flexShrink:0}}>✓</span>
                    <div>
                      <div style={{fontSize:12, fontWeight:700, color:"#16a34a", marginBottom:2}}>{p.attribute}</div>
                      {p.reason && <div style={{fontSize:12, color:isDark?"#6ee7b7":"#555", lineHeight:1.5}}>{p.reason}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasAny && (
            <div style={{fontSize:13, color:isDark?"#6ee7b7":"#555", marginTop:10, fontStyle:"italic"}}>No specific substance concerns identified.</div>
          )}

          {analysis.confidence_note && analysis.confidence !== "high" && (
            <div style={{fontSize:11, color:isDark?"#6ee7b7":"#999", marginTop:10, display:"flex", alignItems:"center", gap:4}}>
              <IcoInfo size={12}/> {analysis.confidence_note}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Backward-compat alias
const FoodAnalysisDropdown = ({food, isDark}) => (
  <ProductInsightsDropdown analysis={food} category="food_beverage" isDark={isDark}/>
);

// ── DIMENSION DROPDOWN — reusable for all 4 main dimensions ──
const DimensionDropdown = ({icon, label, score, concerns, children, isDark}) => {
  const [open, setOpen] = useState(false);
  const isHigh      = score > 6;
  const color       = isHigh ? "#dc2626" : (isDark ? "#6ee7b7" : "#555");
  const bg          = isHigh ? (isDark ? "#2a1a1a" : "#fef2f2") : (isDark ? "#0f2a18" : "#f9fafb");
  const borderColor = isHigh ? "#fecaca" : (isDark ? "rgba(34,197,94,0.15)" : "#e5e7eb");
  return (
    <div style={{marginBottom:10, borderRadius:14, overflow:"hidden", border:`1.5px solid ${borderColor}`, background:bg, textAlign:"left"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", gap:8}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <span style={{display:"flex", alignItems:"center", opacity: isHigh ? 1 : 0.85}}>{icon}</span>
          <span style={{fontSize:12, color, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em"}}>{label}</span>
          <span style={{fontSize:13, fontWeight:800, color, fontFamily:"'Outfit',sans-serif"}}>{score}/10</span>
          {isHigh && <span style={{fontSize:11, color:"#dc2626", fontWeight:600, background:"#fef2f2", padding:"2px 8px", borderRadius:10}}>{scoreLabel(score)}</span>}
        </div>
        <span style={{fontSize:12, color, transition:"transform 0.2s", display:"inline-block", transform:open?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
      </button>
      {open && (
        <div style={{padding:"0 16px 14px", borderTop:`1px solid ${borderColor}`, textAlign:"left"}}>
          {children}
          {concerns?.length > 0 && (
            <div style={{display:"flex", flexDirection:"column", gap:6, marginTop:10}}>
              {concerns.map((c,i)=>(
                <div key={i} style={{display:"flex", alignItems:"flex-start", gap:8}}>
                  <span style={{color, fontSize:14, lineHeight:1.5, flexShrink:0, marginTop:1}}>•</span>
                  <span style={{fontSize:13, color:isDark?"#6ee7b7":"#555", lineHeight:1.5, textAlign:"left"}}>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── MANUFACTURING BADGE — smaller, always shows estimated ──
// ── LEGACY SHIMS — kept so other code that references these doesn't break ──
const PlasticScoreDropdown = ({result, isDark, muted}) => null;
const HealthScoreDropdown  = ({result, isDark, muted}) => null;

// ── SUGGESTION BOX ────────────────────────────────────────────
// Users can suggest a product they want scored. Appears at the bottom
// of the home page. Submits to /suggest, shows in admin panel.
const SuggestionBox = ({isDark, isMobile, surface, border, text, muted, user}) => {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState(null);

  const submit = async () => {
    if (!name.trim()) return;
    setStatus("sending");
    try {
      const r = await fetch(`${API_BASE}/suggest`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          product_name: name.trim(),
          user_email:   email.trim() || user?.email || null,
        }),
      });
      if (!r.ok) throw new Error();
      setStatus("sent");
      setName(""); setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{maxWidth:600, margin:"0 auto 60px", padding:`0 ${isMobile?"16px":"40px"}`}}>
      <div style={{background:surface, borderRadius:16, border:`1px solid ${border}`, padding:isMobile?"24px 20px":"32px 32px"}}>
        <div style={{fontSize:12, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6}}>Suggest a product</div>
        <p style={{fontSize:14, color:muted, margin:"0 0 20px", lineHeight:1.6}}>Want us to score a specific product? Let us know and we'll add it.</p>
        {status === "sent" ? (
          <div style={{fontSize:14, color:"#16a34a", fontWeight:600, padding:"16px 0", textAlign:"center"}}>
            Thanks! We'll add this to our queue.
          </div>
        ) : (
          <>
            <input
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="e.g. Stanley Quencher tumbler, Olaplex No. 3..."
              style={{width:"100%", padding:"12px 16px", borderRadius:10, border:`1.5px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:14, outline:"none", marginBottom:10, boxSizing:"border-box"}}
            />
            {!user && (
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email (optional — to get notified)"
                style={{width:"100%", padding:"12px 16px", borderRadius:10, border:`1.5px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:14, outline:"none", marginBottom:10, boxSizing:"border-box"}}
              />
            )}
            <button onClick={submit} disabled={!name.trim() || status === "sending"} style={{
              width:"100%", padding:"12px", borderRadius:10, border:"none",
              background: name.trim() ? "#16a34a" : isDark ? "#0f2a18" : "#e2e8f0",
              color: name.trim() ? "#fff" : muted,
              fontSize:14, fontWeight:700, cursor: name.trim() ? "pointer" : "default",
              opacity: status === "sending" ? 0.6 : 1,
            }}>
              {status === "sending" ? "Submitting..." : "Submit suggestion"}
            </button>
            {status === "error" && <div style={{fontSize:13, color:"#dc2626", marginTop:8, textAlign:"center"}}>Something went wrong. Please try again.</div>}
          </>
        )}
      </div>
    </div>
  );
};

// ── SCORE EXPLAINER ───────────────────────────────────────────
// Collapsible "How we got this score" panel that shows the triggered
// substance floors, dimension breakdown, and child/pregnancy bumps.
// Builds user trust by making the sophisticated scoring logic visible.
const ScoreExplainer = ({result, isDark, text, muted, surface, border, childMode, pregnancyMode}) => {
  const [open, setOpen] = useState(false);
  const score = result.overall_score || result.score;

  // Collect all the triggered reasons from the result
  const substanceFlags = result.flagged_substances || [];
  const childBumps = result.child_bumps || [];
  const pregnancyBumps = result.pregnancy_bumps || [];
  const dims = result.dimensions || {};

  // Nothing to show if we have no explanations
  const hasExplanations =
    substanceFlags.length > 0 ||
    (childMode && childBumps.length > 0) ||
    (pregnancyMode && pregnancyBumps.length > 0) ||
    Object.keys(dims).length > 0;

  if (!hasExplanations) return null;

  return (
    <div style={{background:surface, borderRadius:12, border:`1px solid ${border}`, overflow:"hidden", marginTop:16}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        width:"100%", padding:"14px 18px", background:"none", border:"none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        cursor:"pointer", color:text, textAlign:"left",
      }}>
        <div>
          <div style={{fontSize:11, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2}}>Transparency</div>
          <div style={{fontSize:15, fontWeight:700}}>Why is this a {score}/10?</div>
        </div>
        <div style={{fontSize:20, color:muted, transition:"transform 0.2s", transform: open ? "rotate(180deg)" : "none"}}>⌄</div>
      </button>

      {open && (
        <div style={{padding:"4px 18px 18px", borderTop:`1px solid ${border}`}}>

          {/* Dimension breakdown */}
          {Object.keys(dims).length > 0 && (
            <div style={{marginTop:16}}>
              <div style={{fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>Dimension breakdown</div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {[
                  {key:"materials",      label:"Materials",      dim:dims.materials},
                  {key:"usage_exposure", label:"Usage & Exposure", dim:dims.usage_exposure},
                  {key:"packaging",      label:"Packaging",      dim:dims.packaging},
                  {key:"sustainability", label:"Sustainability", dim:dims.sustainability},
                ].filter(x=>x.dim).map(({key,label,dim}) => {
                  const s = dim.score ?? 5;
                  const c = s <= 3 ? "#16a34a" : s <= 5 ? "#d97706" : s <= 7 ? "#ea580c" : "#dc2626";
                  return (
                    <div key={key} style={{display:"flex", alignItems:"center", gap:12, fontSize:13}}>
                      <div style={{flex:"0 0 130px", color:text, fontWeight:500}}>{label}</div>
                      <div style={{flex:1, height:6, background:isDark?"#0f2a18":"#f1f5f9", borderRadius:3, overflow:"hidden"}}>
                        <div style={{width:`${s*10}%`, height:"100%", background:c, borderRadius:3}}/>
                      </div>
                      <div style={{flex:"0 0 36px", fontWeight:700, color:c, textAlign:"right"}}>{s}/10</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Substance floors triggered */}
          {substanceFlags.length > 0 && (
            <div style={{marginTop:18}}>
              <div style={{fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>Flags that raised this score</div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {substanceFlags.slice(0,8).map((flag, i) => (
                  <div key={i} style={{padding:"8px 12px", background:isDark?"#1e1a1a":"#fff1f2", borderRadius:8, borderLeft:"3px solid #dc2626", fontSize:12, color:isDark?"#fecaca":"#7f1d1d", lineHeight:1.5}}>
                    {typeof flag === "string" ? flag : (flag.reason || flag.concern || JSON.stringify(flag))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Child score bumps — show when child mode is on */}
          {childMode && childBumps.length > 0 && (
            <div style={{marginTop:18}}>
              <div style={{fontSize:11, fontWeight:700, color:"#9d174d", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>
                Why child score is higher ({result.child_score}/10)
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {childBumps.slice(0, 6).map((bump, i) => (
                  <div key={i} style={{padding:"8px 12px", background:isDark?"#2a1a1f":"#fdf2f8", borderRadius:8, borderLeft:"3px solid #9d174d", fontSize:12, color:isDark?"#fbcfe8":"#831843", lineHeight:1.5}}>
                    {bump}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pregnancy score bumps — show when pregnancy mode is on */}
          {pregnancyMode && pregnancyBumps.length > 0 && (
            <div style={{marginTop:18}}>
              <div style={{fontSize:11, fontWeight:700, color:"#7c3aed", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>
                Why pregnancy score is higher ({result.pregnancy_score}/10)
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {pregnancyBumps.slice(0, 6).map((bump, i) => (
                  <div key={i} style={{padding:"8px 12px", background:isDark?"#1e1a2e":"#f5f3ff", borderRadius:8, borderLeft:"3px solid #7c3aed", fontSize:12, color:isDark?"#ddd6fe":"#5b21b6", lineHeight:1.5}}>
                    {bump}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{marginTop:16, paddingTop:12, borderTop:`1px solid ${border}`, fontSize:11, color:muted, textAlign:"center"}}>
            Our scores are code-enforced from 113 substance floors + two independent AI passes.{" "}
            <a href="/methodology" style={{color:"#16a34a", textDecoration:"none"}}>Read our methodology →</a>
          </div>
        </div>
      )}
    </div>
  );
};

// ── FEEDBACK BUTTON ───────────────────────────────────────────
// "Report this score" button on the result page. Collapses into a form
// when clicked, submits to /score-feedback, shows success confirmation.
const FeedbackButton = ({result, isDark, text, muted, border, surface, user}) => {
  const [open, setOpen]         = useState(false);
  const [tier, setTier]         = useState("");
  const [note, setNote]         = useState("");
  const [status, setStatus]     = useState(null); // null | "sending" | "sent" | "error"

  const submit = async () => {
    if (!tier) return;
    setStatus("sending");
    try {
      const r = await fetch(`${API_BASE}/score-feedback`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          product_name:   result.product_name,
          category:       result.category,
          returned_score: result.overall_score || result.score,
          suggested_tier: tier,
          note,
          user_email:     user?.email || null,
        }),
      });
      if (!r.ok) throw new Error();
      setStatus("sent");
      try { track("Score Feedback", {product: result.product_name, score: result.overall_score, tier}); } catch {}
      setTimeout(() => { setOpen(false); setStatus(null); setTier(""); setNote(""); }, 2200);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{padding:"12px 16px", borderRadius:12, background:isDark?"#052e16":"#f0fdf4", border:`1px solid ${isDark?"#14532d":"#bbf7d0"}`, textAlign:"center"}}>
        <div style={{fontSize:13, fontWeight:700, color:"#16a34a"}}>Thanks — feedback received</div>
        <div style={{fontSize:12, color:muted, marginTop:2}}>We review every report to improve scores.</div>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={()=>setOpen(true)} style={{
        width:"100%", padding:"10px 14px", borderRadius:10,
        border:`1px dashed ${border}`, background:"none", color:muted,
        fontSize:12, fontWeight:600, cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center", gap:6,
      }}>
        <span style={{fontSize:14}}>⚑</span> Think this score is wrong? Let us know
      </button>
    );
  }

  const TIER_OPTIONS = [
    {key:"too_high",        label:"Score is too high"},
    {key:"too_low",         label:"Score is too low"},
    {key:"wrong_category",  label:"Wrong category"},
    {key:"missing_concern", label:"Missing a concern"},
    {key:"other",           label:"Other issue"},
  ];

  return (
    <div style={{background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"16px 18px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div style={{fontSize:13, fontWeight:700, color:text}}>Report this score</div>
        <button onClick={()=>setOpen(false)} style={{background:"none", border:"none", color:muted, fontSize:18, cursor:"pointer", padding:0, lineHeight:1}}>×</button>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:6, marginBottom:12}}>
        {TIER_OPTIONS.map(opt => (
          <button key={opt.key} onClick={()=>setTier(opt.key)} style={{
            textAlign:"left", padding:"10px 12px", borderRadius:8,
            border:`1.5px solid ${tier === opt.key ? "#16a34a" : border}`,
            background: tier === opt.key ? (isDark?"#052e16":"#f0fdf4") : "none",
            color: tier === opt.key ? "#16a34a" : text,
            fontSize:13, fontWeight: tier === opt.key ? 700 : 500, cursor:"pointer",
          }}>{opt.label}</button>
        ))}
      </div>
      <textarea
        value={note} onChange={e=>setNote(e.target.value)}
        placeholder="Optional — what's the issue? (500 chars max)"
        maxLength={500}
        style={{
          width:"100%", minHeight:60, padding:"10px 12px", borderRadius:8,
          border:`1px solid ${border}`, background:isDark?"#0f1923":"#fff",
          color:text, fontSize:13, fontFamily:"inherit", resize:"vertical",
          boxSizing:"border-box", marginBottom:10, outline:"none",
        }}
      />
      <button onClick={submit} disabled={!tier || status === "sending"} style={{
        width:"100%", padding:"11px", borderRadius:10, border:"none",
        background: tier ? "#16a34a" : (isDark?"#0f2a18":"#e2e8f0"),
        color: tier ? "#fff" : muted,
        fontSize:14, fontWeight:700, cursor: tier ? "pointer" : "default",
        opacity: status === "sending" ? 0.6 : 1,
      }}>
        {status === "sending" ? "Submitting..." : "Submit feedback"}
      </button>
      {status === "error" && <div style={{fontSize:12, color:"#dc2626", marginTop:8, textAlign:"center"}}>Something went wrong. Please try again.</div>}
    </div>
  );
};

// ── PRODUCT CARD ─────────────────────────────────────────────

// ── PRODUCT CARD ─────────────────────────────────────────────
const ProductCard = ({product, isDark, altSource="amazon", childMode=false}) => {
  const cat = categoryMeta[product.category] || categoryMeta.other;
  const amazonFallback = `https://www.amazon.com/s?k=${encodeURIComponent((product.brand ? product.brand + " " : "") + product.name)}&tag=partiqule-20`;
  const linkUrl = altSource === "brand" ? getBrandUrl(product.brand, product.name)
    : altSource === "bigbox" ? `https://www.target.com/s?searchTerm=${encodeURIComponent(product.name)}`
    : (product.affiliateUrl || amazonFallback);
  const shopLabel = altSource === "brand" ? "Brand site" : altSource === "bigbox" ? "Target" : "Shop now";
  const hasLink = true;

  const cardStyle = {
    textDecoration:"none", display:"block",
    background:isDark?"#0f2a18":"#fff",
    borderRadius:12, padding:"18px 22px",
    border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#e8e8e8"}`,
    transition:"border-color 0.2s, box-shadow 0.2s",
    cursor: hasLink ? "pointer" : "default",
    WebkitTapHighlightColor:"transparent",
  };

  const inner = (
    <div style={{display:"flex", gap:14, alignItems:"flex-start"}}>
      {/* Product image */}
      <div style={{width:56, height:56, borderRadius:10, background:"rgba(34,197,94,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden"}}>
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
          : <IconTag size={24} color="#16a34a"/>
        }
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:3}}>
          <div>
            <div style={{fontSize:11, color:"#888", textTransform:"uppercase", letterSpacing:"0.05em"}}>{product.brand}</div>
            <div style={{fontSize:15, fontWeight:700, color:isDark?"#f0fdf4":"#111", fontFamily:"'Outfit',sans-serif", lineHeight:1.3}}>{product.name}</div>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0}}>
            <div style={{background:scoreBg(childMode && product.child_score != null ? product.child_score : product.score), color:scoreColor(childMode && product.child_score != null ? product.child_score : product.score), fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20}}>{childMode && product.child_score != null ? product.child_score : product.score}/10</div>
            <div style={{background:cat.bg, color:cat.color, fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:20}}>{cat.label}</div>
          </div>
        </div>
        <div style={{fontSize:13, color:isDark?"#6ee7b7":"#666", lineHeight:1.5}}>{product.material}{product.description ? ` — ${product.description}` : ""}</div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
          <div style={{display:"flex", alignItems:"center", gap:6}}>
            <span style={{fontSize:15, fontWeight:700, color:"#16a34a", fontFamily:"'Outfit',sans-serif"}}>{product.price}</span>
            {product.source === "amazon" && <span style={{fontSize:10, color:"#f59e0b", fontWeight:600, background:"#fffbeb", padding:"2px 6px", borderRadius:10}}>Amazon</span>}
          </div>
          {hasLink && <span style={{display:"flex", alignItems:"center", gap:4, fontSize:13, color:"#16a34a", fontWeight:600}}>{shopLabel} <IconArrow size={13} color="#16a34a"/></span>}
        </div>
      </div>
    </div>
  );

  if (!hasLink) {
    return <div style={cardStyle}>{inner}</div>;
  }

  return (
    <a href={linkUrl}
      rel="noopener noreferrer"
      onClick={()=>track("Affiliate Click", {product: product.name, brand: product.brand, category: product.category})}
      style={cardStyle}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.boxShadow="0 4px 24px rgba(22,163,74,0.12)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(34,197,94,0.15)":"#e8e8e8"; e.currentTarget.style.boxShadow="none";}}>
      {inner}
    </a>
  );
};

// ── MOST SEARCHED ─────────────────────────────────────────────
// ── ANALYTICS TRACK ──────────────────────────────────────────
function track(event, props = {}) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, { props });
  }
}

// ── LOADING STATE ─────────────────────────────────────────────
const LOADING_FACTS = [
  "The average person consumes about 5 grams of microplastics per week — the weight of a credit card.",
  "Microplastics have been found in human blood, lungs, breast milk and placentas.",
  "A single fleece jacket can release up to 700,000 microfibers in one wash cycle.",
  "93% of bottled water tested globally contains microplastic particles.",
  "Heating food in plastic containers can release millions of particles per litre.",
  "Babies ingest up to 10x more microplastics than adults relative to body weight.",
  "Non-stick pan coatings can begin releasing PTFE particles at everyday cooking temperatures.",
  "Microplastics have been detected in the air we breathe indoors and outdoors.",
  "A 2024 study in the New England Journal of Medicine found microplastics in arterial plaques — linked to higher risk of heart attack and stroke.",
  "Plastic pyramid tea bags (like Lipton Silken) release ~11 billion microplastic particles per cup. Paper tea bags are safer — choose loose-leaf or paper bags over plastic mesh.",
  "Synthetic gum base in mainstream chewing gum is made from polyvinyl acetate — a plastic you literally chew and swallow.",
  "Microplastics were found in 100% of human blood samples tested in a 2022 Environment International study.",
  "The FDA has begun phasing out all petroleum-based synthetic food dyes, including Red 40 and Yellow 5.",
  "PFAS — found in non-stick cookware, food packaging, and stain-resistant clothing — are linked to thyroid disruption, reduced fertility and elevated cholesterol.",
  "A 2024 Nature Medicine study found microplastics accumulating in human brain tissue — at higher concentrations in people with dementia.",
  "Microplastics have been detected in human placentas, meaning unborn babies are exposed before birth.",
  "Ultra-processed foods are linked to chronic disease, cardiovascular risk and cognitive decline according to a 2025 Lancet review.",
  "The plastic in synthetic clothing — polyester, nylon, acrylic — sheds microfibers every time it's worn and washed.",
  "Single-use paper towels are chemically bleached with chlorine and typically wrapped in plastic film — a sustainability double-hit.",
  "Stainless steel, cast iron, glass and ceramic cookware produce zero microplastic particles during cooking.",
  "Switching from a plastic water bottle to stainless steel can eliminate over 50 plastic-to-mouth exposures per week.",
  "Wet wipes contain polyester or polypropylene fibers — each wipe sheds synthetic fibers directly onto your skin.",
  "BPA-free plastics often contain BPS or BPF, which studies show have similar hormone-disrupting effects to BPA.",
  "Food stored in glass containers has zero plastic leaching risk — even when heated, frozen or acidic foods are involved.",
];

const LoadingState = () => {
  const [step,    setStep]    = useState(0);
  const [progress,setProgress]= useState(0);
  const [factIdx, setFactIdx] = useState(()=>Math.floor(Math.random()*LOADING_FACTS.length));

  const steps = [
    "Searching for product data…",
    "Running material analysis…",
    "Auditing the score…",
    "Finding safer alternatives…"
  ];

  useEffect(() => {
    const start = Date.now();
    const duration = 22000; // scans typically take 15-25s
    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = elapsed / duration;
      const p = Math.min(92, Math.round((1 - Math.pow(1 - raw, 2.2)) * 100));
      setProgress(p);
      if (p < 92) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const stepTimers = [
      setTimeout(()=>setStep(1), 4000),   // web search done
      setTimeout(()=>setStep(2), 12000),  // pass1 done
      setTimeout(()=>setStep(3), 18000),  // pass2 done
    ];
    const factTimer = setInterval(()=>setFactIdx(i=>(i+1)%LOADING_FACTS.length), 5000);
    return () => { stepTimers.forEach(clearTimeout); clearInterval(factTimer); };
  }, []);

  return (
    <div style={{margin:"24px auto 0", maxWidth:540, textAlign:"center"}}>
      <div style={{fontSize:22, fontWeight:700, color:"#fff", marginBottom:8, minHeight:34}}>
        {steps[step]}
      </div>
      <div style={{fontSize:14, color:"rgba(255,255,255,0.4)", marginBottom:24}}>
        This takes 15–25 seconds — we search the web then run two AI passes for accuracy.
      </div>
      <div style={{display:"flex", justifyContent:"center", gap:10, marginBottom:20, flexWrap:"wrap"}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex", alignItems:"center", gap:5, fontSize:13,
            color: i < step ? "#4ade80" : i === step ? "#fff" : "rgba(255,255,255,0.25)",
            fontWeight: i === step ? 600 : 400, transition:"all 0.3s"}}>
            {i < step
              ? <span style={{color:"#4ade80", fontSize:14}}>✓</span>
              : i === step
                ? <div style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",animation:"pulse 1s ease-in-out infinite"}}/>
                : <div style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,255,255,0.2)"}}/>
            }
            {s}
          </div>
        ))}
      </div>
      <div style={{height:6, background:"rgba(255,255,255,0.1)", borderRadius:99, marginBottom:24, overflow:"hidden"}}>
        <div style={{height:"100%", width:`${progress}%`, background:"linear-gradient(to right, #16a34a, #4ade80)", borderRadius:99, transition:"width 0.3s ease"}}/>
      </div>
      <div style={{background:"rgba(255,255,255,0.07)", borderRadius:14, padding:"20px 24px", border:"1px solid rgba(255,255,255,0.12)", textAlign:"left"}}>
        <div style={{fontSize:11, color:"#4ade80", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:8}}>Did you know?</div>
        <div style={{fontSize:15, color:"rgba(255,255,255,0.85)", lineHeight:1.7}}>{LOADING_FACTS[factIdx]}</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}`}</style>
    </div>
  );
};

const MostSearched = ({onSelect, isDark, isMobile}) => {
  const surface = isDark?"#0f2a18":"#fff";
  const border  = isDark?"rgba(34,197,94,0.15)":"#eee";
  const text    = isDark?"#f0fdf4":"#111";
  const muted   = isDark?"#6ee7b7":"#888";
  const px      = isMobile?"16px":"40px";
  return (
    <section style={{maxWidth:1100, margin:"0 auto 48px", padding:`0 ${px}`}}>
      <h2 style={{fontFamily:"'Outfit',sans-serif", fontSize:isMobile?20:24, fontWeight:700, color:text, textAlign:"center", marginBottom:8, letterSpacing:"-0.5px"}}>Most Searched Products</h2>
      <p style={{textAlign:"center", fontSize:14, color:muted, marginBottom:24}}>See how common products score — some results may surprise you</p>
      <div style={{display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:isMobile?10:12}}>
        {MOST_SEARCHED.map(item=>{
          const cat = categoryMeta[item.category]||categoryMeta.other;
          return (
            <button key={item.label} onClick={()=>onSelect(item.label)}
              style={{background:surface, border:`1.5px solid ${border}`, borderRadius:12, padding:"16px", cursor:"pointer", textAlign:"left", transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.boxShadow="0 4px 16px rgba(22,163,74,0.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(34,197,94,0.15)":"#eee"; e.currentTarget.style.boxShadow="none";}}>
              {item.score>=7&&<div style={{display:"flex", alignItems:"center", gap:2, fontSize:11, color:"#ef4444", fontWeight:600, marginBottom:6}}><IconFire size={12} color="#ef4444"/>Trending</div>}
              <div style={{fontSize:14, fontWeight:600, color:text, lineHeight:1.3, marginBottom:6}}>{item.label}</div>
              <div style={{background:cat.bg, color:cat.color, fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:20, display:"inline-block"}}>{cat.label}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

// ── GUIDES SYSTEM ─────────────────────────────────────────────
const GUIDE_CATEGORIES = ["general","food","beauty","home","baby","pregnancy"];
const CATEGORY_COLORS  = {general:"#6366f1",food:"#16a34a",beauty:"#ec4899",home:"#0891b2",baby:"#f59e0b",pregnancy:"#9333ea"};

// Simple markdown-like renderer for guide body HTML
const GuideBody = ({html}) => (
  <div dangerouslySetInnerHTML={{__html: html}}
    style={{lineHeight:1.85, fontSize:17, color:"inherit"}}
    className="guide-body"
  />
);

// Guides index page
const GuidesPage = ({isDark, text, muted, surface, border, isMobile, onNavigate}) => {
  const [guides, setGuides]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");

  useEffect(()=>{
    supabase.from("guides").select("id,slug,title,excerpt,category,author,read_time_minutes,created_at,cover_image_url")
      .eq("published",true).order("created_at",{ascending:false})
      .then(({data})=>{ setGuides(data||[]); setLoading(false); });
  },[]);

  const filtered = filter==="all" ? guides : guides.filter(g=>g.category===filter);

  return (
    <div style={{maxWidth:860, margin:"0 auto", padding:isMobile?"24px 16px 80px":"48px 40px 80px"}}>
      <style>{`
        .guide-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.08);}
        .guide-card{transition:transform 0.2s,box-shadow 0.2s;}
        .guide-body h2{font-size:24px;font-weight:700;margin:36px 0 12px;font-family:'Outfit',sans-serif;}
        .guide-body h3{font-size:20px;font-weight:700;margin:28px 0 10px;font-family:'Outfit',sans-serif;}
        .guide-body p{margin:0 0 20px;}
        .guide-body ul,.guide-body ol{margin:0 0 20px;padding-left:24px;}
        .guide-body li{margin-bottom:8px;}
        .guide-body strong{font-weight:700;}
        .guide-body em{font-style:italic;}
        .guide-body blockquote{border-left:4px solid #4ade80;margin:24px 0;padding:12px 20px;background:rgba(74,222,128,0.06);border-radius:0 8px 8px 0;}
        .guide-body a{color:#16a34a;text-decoration:underline;}
      `}</style>

      {/* Header */}
      <div style={{marginBottom:40}}>
        <div style={{fontSize:12,fontWeight:700,color:"#16a34a",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>From the team</div>
        <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:isMobile?30:42,fontWeight:800,color:text,margin:"0 0 12px",letterSpacing:"-0.5px",lineHeight:1.1}}>Product Safety Guides</h1>
        <p style={{fontSize:17,color:muted,margin:"0 0 28px",lineHeight:1.6}}>Real research. Real opinions. No brand influence.</p>

        {/* Category filter */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["all",...GUIDE_CATEGORIES].map(cat=>(
            <button key={cat} onClick={()=>setFilter(cat)} style={{
              padding:"6px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
              background:filter===cat?(CATEGORY_COLORS[cat]||"#052e16"):(isDark?"#0f2a18":"#f1f5f9"),
              color:filter===cat?"#fff":(isDark?"#6ee7b7":"#64748b"),
              transition:"all 0.15s",
            }}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{textAlign:"center",padding:"60px 0",color:muted}}>Loading guides…</div>
      ) : filtered.length===0 ? (
        <div style={{textAlign:"center",padding:"60px 0",color:muted}}>
          <div style={{fontSize:18,fontWeight:600,marginBottom:8}}>No guides yet</div>
          <div style={{fontSize:14}}>Check back soon — we are working on it.</div>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:24}}>
          {filtered.map(g=>(
            <div key={g.id} className="guide-card" onClick={()=>onNavigate("guide",g.slug)}
              style={{background:surface,borderRadius:16,border:`1px solid ${border}`,overflow:"hidden",cursor:"pointer",display:"flex",flexDirection:isMobile?"column":"row"}}>
              {/* Cover image or color block */}
              <div style={{
                width:isMobile?"100%":220, height:isMobile?160:160, flexShrink:0,
                background:g.cover_image_url?"none":(CATEGORY_COLORS[g.category]||"#052e16"),
                backgroundImage:g.cover_image_url?`url(${g.cover_image_url})`:"none",
                backgroundSize:"cover",backgroundPosition:"center",
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>
                {!g.cover_image_url && (
                  <span style={{fontSize:48,opacity:0.4}}>
                    {g.category==="food"?"Food":g.category==="beauty"?"Beauty":g.category==="home"?"Home":g.category==="baby"?"Baby":g.category==="pregnancy"?"Pregnancy":"Guide"}
                  </span>
                )}
              </div>
              <div style={{padding:"20px 24px",flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:11,fontWeight:700,color:CATEGORY_COLORS[g.category]||"#6366f1",textTransform:"uppercase",letterSpacing:"0.08em"}}>{g.category}</span>
                    <span style={{fontSize:11,color:muted}}>{g.read_time_minutes} min read</span>
                  </div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:700,color:text,marginBottom:8,lineHeight:1.3}}>{g.title}</div>
                  <div style={{fontSize:14,color:muted,lineHeight:1.6}}>{g.excerpt}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:26,height:26,borderRadius:"50%",overflow:"hidden",flexShrink:0}}>
                      {g.author==="Sara Miller"
                        ? <img src="/sara.jpg" alt="Sara" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transform:"scale(1.7)"}}/>
                        : <img src="/paul.jpg" alt="Paul" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transform:"scale(1.7)"}}/>
                      }
                    </div>
                    <span style={{fontSize:13,color:muted}}>{g.author}</span>
                  </div>
                  <span style={{fontSize:13,fontWeight:600,color:"#16a34a"}}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Individual guide page
const GuideViewPage = ({isDark, text, muted, surface, border, isMobile, slug, onNavigate, onScan}) => {
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(()=>{
    if(!slug) return;
    supabase.from("guides").select("*").eq("slug",slug).eq("published",true).single()
      .then(({data,error})=>{
        if(error||!data){ setNotFound(true); } else { setGuide(data); }
        setLoading(false);
      });
  },[slug]);

  if(loading) return <div style={{textAlign:"center",padding:"80px 0",color:muted}}>Loading…</div>;
  if(notFound) return (
    <div style={{textAlign:"center",padding:"80px 20px"}}>
      <div style={{fontSize:20,fontWeight:700,color:text,marginBottom:8}}>Guide not found</div>
      <button onClick={()=>onNavigate("guides")} style={{color:"#16a34a",background:"none",border:"none",cursor:"pointer",fontSize:15,fontWeight:600}}>← Back to guides</button>
    </div>
  );

  return (
    <div style={{maxWidth:720, margin:"0 auto", padding:isMobile?"24px 16px 80px":"48px 40px 80px"}}>
      {/* Back + Share row */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
        <button onClick={()=>onNavigate("guides")} style={{display:"flex",alignItems:"center",gap:6,color:muted,background:"none",border:"none",cursor:"pointer",fontSize:14,fontWeight:600,padding:0}}>
          ← All guides
        </button>
        <button onClick={async()=>{
          const url = `${window.location.origin}/guides/${guide.slug}`;
          const shareData = { title: guide.title, text: guide.excerpt || guide.title, url };

          // Try to fetch cover image and share as file
          if(guide.cover_image_url && navigator.share){
            try{
              const resp = await fetch(guide.cover_image_url);
              const blob = await resp.blob();
              const file = new File([blob], "partiqule-guide.png", {type: blob.type||"image/png"});
              if(navigator.canShare?.({files:[file]})){
                await navigator.share({ title: guide.title, text: guide.excerpt||guide.title, url, files:[file] });
                return;
              }
            } catch{}
          }
          // Fallback — share link only
          if(navigator.share){
            try{ await navigator.share(shareData); return; } catch{}
          }
          // Last resort — copy link
          await navigator.clipboard.writeText(url);
          alert("Link copied!");
        }} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 18px",borderRadius:20,border:`1.5px solid ${border}`,background:"none",color:text,fontSize:13,fontWeight:600,cursor:"pointer"}}>
          <IconShare size={14} color={muted}/> Share
        </button>
      </div>

      {/* Category + meta */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <span style={{fontSize:12,fontWeight:700,color:CATEGORY_COLORS[guide.category]||"#6366f1",textTransform:"uppercase",letterSpacing:"0.08em",background:isDark?"#0f2a18":"#f1f5f9",padding:"4px 12px",borderRadius:20}}>{guide.category}</span>
        <span style={{fontSize:13,color:muted}}>{guide.read_time_minutes} min read</span>
      </div>

      {/* Title */}
      <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:isMobile?28:40,fontWeight:800,color:text,margin:"0 0 16px",letterSpacing:"-0.5px",lineHeight:1.15}}>{guide.title}</h1>

      {/* Excerpt */}
      <p style={{fontSize:18,color:muted,margin:"0 0 24px",lineHeight:1.6,fontStyle:"italic"}}>{guide.excerpt}</p>

      {/* Author + date */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36,paddingBottom:32,borderBottom:`1px solid ${border}`}}>
        <div style={{width:48,height:48,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`2px solid ${border}`}}>
          {guide.author==="Sara Miller"
            ? <img src="/sara.jpg" alt="Sara Miller" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transform:"scale(1.7)"}}/>
            : <img src="/paul.jpg" alt="Paul Miller" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transform:"scale(1.7)"}}/>
          }
        </div>
        <div>
          <div style={{fontSize:14,fontWeight:600,color:text}}>{guide.author}</div>
          <div style={{fontSize:12,color:muted}}>Co-founder, Partiqule · {new Date(guide.created_at).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
        </div>
      </div>

      {/* Cover image */}
      {guide.cover_image_url && (
        <img src={guide.cover_image_url} alt={guide.title}
          style={{width:"100%",borderRadius:16,marginBottom:36,maxHeight:420,objectFit:"cover"}}/>
      )}

      {/* Body */}
      <div style={{color:text}}>
        <GuideBody html={guide.body||""}/>
      </div>

      {/* CTA */}
      <div style={{marginTop:48,padding:"28px 24px",background:"#052e16",borderRadius:16,textAlign:"center"}}>
        <div style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:8,fontFamily:"'Outfit',sans-serif"}}>Scan the products mentioned in this guide</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:20}}>Free scans, no account required</div>
        <button onClick={()=>onNavigate("home")} style={{background:"#4ade80",color:"#052e16",border:"none",borderRadius:10,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer"}}>
          Start scanning →
        </button>
      </div>
    </div>
  );
};

// Guide admin — write and publish guides
const GuideAdminPage = ({isDark, text, muted, surface, border, isMobile}) => {
  const [guides, setGuides]         = useState([]);
  const [editing, setEditing]       = useState(null); // null = list, {} = new/edit
  const [saving, setSaving]         = useState(false);
  const [msg, setMsg]               = useState("");

  // Form state
  const [title, setTitle]           = useState("");
  const [slug, setSlug]             = useState("");
  const [excerpt, setExcerpt]       = useState("");
  const [body, setBody]             = useState("");
  const [category, setCategory]     = useState("general");
  const [author, setAuthor]         = useState("Paul Miller");
  const [readTime, setReadTime]     = useState(5);
  const [coverUrl, setCoverUrl]     = useState("");
  const [published, setPublished]   = useState(false);

  const load = () => {
    supabase.from("guides").select("*").order("created_at",{ascending:false})
      .then(({data})=>setGuides(data||[]));
  };

  useEffect(()=>{ load(); },[]);

  const autoSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

  const startNew = () => {
    setTitle(""); setSlug(""); setExcerpt(""); setBody(""); setCategory("general");
    setAuthor("Paul Miller"); setReadTime(5); setCoverUrl(""); setPublished(false);
    setEditing({isNew:true});
  };

  const startEdit = (g) => {
    setTitle(g.title||""); setSlug(g.slug||""); setExcerpt(g.excerpt||"");
    setBody(g.body||""); setCategory(g.category||"general"); setAuthor(g.author||"Paul Miller");
    setReadTime(g.read_time_minutes||5); setCoverUrl(g.cover_image_url||""); setPublished(g.published||false);
    setEditing(g);
  };

  const save = async () => {
    if(!title.trim()||!slug.trim()) return setMsg("Title and slug are required.");
    setSaving(true); setMsg("");
    const payload = {
      title:title.trim(), slug:slug.trim(), excerpt:excerpt.trim(),
      body, category, author:author.trim(), read_time_minutes:parseInt(readTime)||5,
      cover_image_url:coverUrl.trim()||null, published, updated_at:new Date().toISOString(),
    };
    let err;
    if(editing?.isNew){
      ({error:err} = await supabase.from("guides").insert([payload]));
    } else {
      ({error:err} = await supabase.from("guides").update(payload).eq("id",editing.id));
    }
    setSaving(false);
    if(err){ setMsg("Error: "+err.message); }
    else { setMsg(published?"Published!":"Saved as draft."); load(); setTimeout(()=>setEditing(null),800); }
  };

  const deleteGuide = async (id) => {
    if(!window.confirm("Delete this guide?")) return;
    await supabase.from("guides").delete().eq("id",id);
    load();
  };

  const inp = (val,set,ph,type="text",rows) => rows ? (
    <textarea value={val} onChange={e=>set(e.target.value)} placeholder={ph} rows={rows}
      style={{width:"100%",padding:"10px 14px",borderRadius:8,border:`1px solid ${border}`,background:isDark?"#111":"#fff",color:text,fontSize:14,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
  ) : (
    <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
      style={{width:"100%",padding:"10px 14px",borderRadius:8,border:`1px solid ${border}`,background:isDark?"#111":"#fff",color:text,fontSize:14,boxSizing:"border-box"}}/>
  );

  const label = (l) => <div style={{fontSize:12,fontWeight:700,color:muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6,marginTop:16}}>{l}</div>;

  // Rich text toolbar actions
  const insertTag = (open,close) => {
    const ta = document.getElementById("guide-body-editor");
    if(!ta) return;
    const s=ta.selectionStart, e=ta.selectionEnd, val=ta.value;
    const selected=val.slice(s,e);
    const newVal=val.slice(0,s)+open+selected+close+val.slice(e);
    setBody(newVal);
    setTimeout(()=>{ ta.focus(); ta.setSelectionRange(s+open.length,e+open.length); },0);
  };

  const ToolbarBtn = ({label:l, onClick}) => (
    <button type="button" onClick={onClick}
      style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${border}`,background:isDark?"#0f2a18":"#f1f5f9",color:text,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
      {l}
    </button>
  );

  if(editing){
    return (
      <div style={{maxWidth:760,margin:"0 auto",padding:isMobile?"16px 16px 80px":"32px 40px 80px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
          <button onClick={()=>setEditing(null)} style={{color:muted,background:"none",border:"none",cursor:"pointer",fontSize:14,fontWeight:600,padding:0}}>← Back</button>
          <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,color:text,margin:0}}>{editing.isNew?"New Guide":"Edit Guide"}</h2>
        </div>

        {label("Title")}
        {inp(title,(v)=>{ setTitle(v); if(editing.isNew) setSlug(autoSlug(v)); },"e.g. The safest cookware we tested")}

        {label("Slug (URL)")}
        {inp(slug,setSlug,"e.g. safest-cookware-tested")}

        {label("Author")}
        <div style={{display:"flex",gap:8}}>
          {["Paul Miller","Sara Miller"].map(a=>(
            <button key={a} type="button" onClick={()=>setAuthor(a)}
              style={{padding:"8px 16px",borderRadius:8,border:`1.5px solid ${author===a?"#16a34a":border}`,background:author===a?"#f0fdf4":"none",color:author===a?"#16a34a":muted,fontSize:14,fontWeight:600,cursor:"pointer"}}>
              {a}
            </button>
          ))}
        </div>

        {label("Category")}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {GUIDE_CATEGORIES.map(c=>(
            <button key={c} type="button" onClick={()=>setCategory(c)}
              style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
                background:category===c?(CATEGORY_COLORS[c]||"#052e16"):(isDark?"#0f2a18":"#f1f5f9"),
                color:category===c?"#fff":(isDark?"#6ee7b7":"#64748b")}}>
              {c.charAt(0).toUpperCase()+c.slice(1)}
            </button>
          ))}
        </div>

        {label("Excerpt (shown in guide list)")}
        {inp(excerpt,setExcerpt,"A one or two sentence summary…","text",2)}

        {label("Body (HTML)")}
        {/* Toolbar */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          <ToolbarBtn label="B" onClick={()=>insertTag("<strong>","</strong>")}/>
          <ToolbarBtn label="I" onClick={()=>insertTag("<em>","</em>")}/>
          <ToolbarBtn label="H2" onClick={()=>insertTag("<h2>","</h2>")}/>
          <ToolbarBtn label="H3" onClick={()=>insertTag("<h3>","</h3>")}/>
          <ToolbarBtn label="Link" onClick={()=>insertTag('<a href="">',"</a>")}/>
          <ToolbarBtn label="Quote" onClick={()=>insertTag("<blockquote>","</blockquote>")}/>
          <ToolbarBtn label="UL" onClick={()=>insertTag("<ul>\n  <li>","</li>\n</ul>")}/>
          <ToolbarBtn label="P" onClick={()=>insertTag("<p>","</p>")}/>
        </div>
        <textarea id="guide-body-editor" value={body} onChange={e=>setBody(e.target.value)}
          placeholder="Write your guide here using HTML tags, or use the toolbar buttons above..."
          rows={18}
          style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`1px solid ${border}`,background:isDark?"#111":"#fff",color:text,fontSize:14,fontFamily:"'Outfit',monospace,sans-serif",resize:"vertical",boxSizing:"border-box",lineHeight:1.7}}/>

        {/* Preview */}
        {body && (
          <div style={{marginTop:12,padding:"20px 24px",background:surface,borderRadius:12,border:`1px solid ${border}`,color:text}}>
            <div style={{fontSize:11,fontWeight:700,color:muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>Preview</div>
            <GuideBody html={body}/>
          </div>
        )}

        {label("Cover image URL (optional)")}
        {inp(coverUrl,setCoverUrl,"https://...")}

        {label("Read time (minutes)")}
        <input type="number" value={readTime} onChange={e=>setReadTime(e.target.value)} min={1} max={60}
          style={{width:100,padding:"10px 14px",borderRadius:8,border:`1px solid ${border}`,background:isDark?"#111":"#fff",color:text,fontSize:14}}/>

        <div style={{display:"flex",alignItems:"center",gap:12,marginTop:24}}>
          <button onClick={()=>setPublished(p=>!p)} style={{
            width:52,height:30,borderRadius:15,border:"none",cursor:"pointer",
            background:published?"#16a34a":"#d1d5db",position:"relative",transition:"background 0.2s",flexShrink:0,
          }}>
            <div style={{position:"absolute",top:3,left:published?24:3,width:24,height:24,borderRadius:"50%",background:"white",transition:"left 0.2s"}}/>
          </button>
          <span style={{fontSize:14,color:text,fontWeight:600}}>{published?"Published — visible on guides page":"Draft — not visible publicly"}</span>
        </div>

        {msg && <div style={{marginTop:12,fontSize:14,color:msg.startsWith("Error")?"#dc2626":"#16a34a",fontWeight:600}}>{msg}</div>}

        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button onClick={save} disabled={saving} style={{flex:1,padding:"13px",borderRadius:10,background:"#052e16",border:"none",color:"#4ade80",fontSize:15,fontWeight:700,cursor:"pointer",opacity:saving?0.7:1}}>
            {saving?"Saving…":published?"Publish guide":"Save draft"}
          </button>
          <button onClick={()=>setEditing(null)} style={{padding:"13px 20px",borderRadius:10,border:`1.5px solid ${border}`,background:"none",color:muted,fontSize:15,cursor:"pointer"}}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Guide list view
  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:isMobile?"16px 16px 80px":"32px 40px 80px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,color:text,margin:0}}>Guides</h2>
        <button onClick={startNew} style={{padding:"10px 20px",borderRadius:10,background:"#052e16",border:"none",color:"#4ade80",fontSize:14,fontWeight:700,cursor:"pointer"}}>
          + New guide
        </button>
      </div>
      {guides.length===0 ? (
        <div style={{textAlign:"center",padding:"40px 0",color:muted}}>No guides yet. Write your first one.</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {guides.map(g=>(
            <div key={g.id} style={{background:surface,borderRadius:12,border:`1px solid ${border}`,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontSize:11,fontWeight:700,color:CATEGORY_COLORS[g.category]||"#6366f1",textTransform:"uppercase"}}>{g.category}</span>
                  <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:g.published?"#f0fdf4":"#f1f5f9",color:g.published?"#16a34a":"#9ca3af",fontWeight:600}}>{g.published?"Live":"Draft"}</span>
                </div>
                <div style={{fontSize:15,fontWeight:600,color:text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.title}</div>
                <div style={{fontSize:12,color:muted,marginTop:2}}>By {g.author} · {g.read_time_minutes}min</div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <button onClick={()=>startEdit(g)} style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${border}`,background:"none",color:text,fontSize:13,cursor:"pointer"}}>Edit</button>
                <button onClick={()=>deleteGuide(g.id)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid #fee2e2",background:"none",color:"#dc2626",fontSize:13,cursor:"pointer"}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── ADMIN PAGE ────────────────────────────────────────────────
const AdminPage = ({isDark, surface, border, text, muted, history: historyProp = []}) => {
  const [adminTab, setAdminTab] = useState("dashboard"); // dashboard | guides
  const [cacheStatus, setCacheStatus]   = useState(null);
  const [clearing, setClearing]         = useState(false);
  const [testQuery, setTestQuery]       = useState("");
  const [testResult, setTestResult]     = useState(null);
  const [testLoading, setTestLoading]   = useState(false);
  const [history, setHistory]           = useState(historyProp);
  const [recentScans, setRecentScans]   = useState([]);
  const [scansLoading, setScansLoading] = useState(false);
  const [scansSearch,  setScansSearch]  = useState("");
  const [scansCat,     setScansCat]     = useState("");
  const [scansOffset,  setScansOffset]  = useState(0);
  const [scansTotal,   setScansTotal]   = useState(0);
  const [feedback, setFeedback]         = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [suggestions, setSuggestions]   = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [overrides, setOverrides] = useState([]);
  const [newOverride, setNewOverride] = useState({name:"", floor:5, ceiling:7, category:"food_beverage", reason:"", substances:""});
  const [savingOverride, setSavingOverride] = useState(false);

  useEffect(() => {
    if (!historyProp.length) {
      try {
        const h = JSON.parse(localStorage.getItem("ps_history") || "[]");
        setHistory(h);
      } catch {}
    }
    fetchCacheStatus();
    fetchRecentScans();
    fetchFeedback();
    fetchSuggestions();
    fetchOverrides();
  }, []);

  const fetchOverrides = async () => {
    try {
      const r = await fetch(`${API_BASE}/admin/calibration?key=RowenaRavenclaw2024!`);
      if (r.ok) setOverrides(await r.json());
    } catch {}
  };

  const saveOverride = async () => {
    if (!newOverride.name.trim()) return;
    setSavingOverride(true);
    try {
      const body = {
        ...newOverride,
        floor:      parseInt(newOverride.floor),
        ceiling:    parseInt(newOverride.ceiling),
        substances: newOverride.substances ? newOverride.substances.split(",").map(s=>s.trim()).filter(Boolean) : [],
        updated_by: "admin",
      };
      const r = await fetch(`${API_BASE}/admin/calibration?key=RowenaRavenclaw2024!`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      });
      if (r.ok) {
        await fetchOverrides();
        setNewOverride({name:"", floor:5, ceiling:7, category:"food_beverage", reason:"", substances:""});
      }
    } catch {}
    setSavingOverride(false);
  };

  const deleteOverride = async (name) => {
    try {
      await fetch(`${API_BASE}/admin/calibration?name=${encodeURIComponent(name)}&key=RowenaRavenclaw2024!`, {
        method: "DELETE",
      });
      await fetchOverrides();
    } catch {}
  };

  const fetchFeedback = async () => {
    setFeedbackLoading(true);
    try {
      const r = await fetch(`${API_BASE}/score-feedback?key=RowenaRavenclaw2024!`);
      if (r.ok) setFeedback(await r.json());
    } catch {}
    setFeedbackLoading(false);
  };

  const fetchSuggestions = async () => {
    setSuggestionsLoading(true);
    try {
      const r = await fetch(`${API_BASE}/suggestions?key=RowenaRavenclaw2024!`);
      if (r.ok) setSuggestions(await r.json());
    } catch {}
    setSuggestionsLoading(false);
  };

  const resolveSuggestion = async (id, status) => {
    try {
      await fetch(`${API_BASE}/suggestions/resolve?key=RowenaRavenclaw2024!`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id, status }),
      });
      setSuggestions(s => s.filter(x => x.id !== id));
    } catch {}
  };

  const resolveFeedback = async (id, status) => {
    try {
      await fetch(`${API_BASE}/score-feedback/resolve?key=RowenaRavenclaw2024!`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id, status }),
      });
      setFeedback(f => f.filter(x => x.id !== id));
    } catch {}
  };

  const fetchCacheStatus = async () => {
    try {
      const r = await fetch(`${API_BASE}/cache-status`);
      if (r.ok) setCacheStatus(await r.json());
    } catch { setCacheStatus({error:"unreachable"}) }
  };

  const fetchRecentScans = async (opts = {}) => {
    setScansLoading(true);
    try {
      const cat    = opts.cat    ?? scansCat;
      const search = opts.search ?? scansSearch;
      const offset = opts.offset ?? scansOffset;
      const params = new URLSearchParams({ limit: 50, offset });
      if (cat)    params.set("category", cat);
      if (search) params.set("search", search);
      const r = await fetch(`${API_BASE}/recent-scans?${params}&key=RowenaRavenclaw2024!`);
      if (r.ok) {
        const data = await r.json();
        setRecentScans(offset > 0 ? prev => [...prev, ...data] : data);
        setScansTotal(data.length);
      }
    } catch {}
    setScansLoading(false);
  };

  const clearCache = async () => {
    setClearing(true);
    try {
      await fetch(`${API_BASE}/cache-clear?key=RowenaRavenclaw2024!`);
      await fetchCacheStatus();
    } finally { setClearing(false); }
  };

  const runTestScan = async () => {
    if (!testQuery.trim()) return;
    setTestLoading(true); setTestResult(null);
    try {
      const r = await fetch(`${API_BASE}/analyze`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({query: testQuery})
      });
      setTestResult(await r.json());
    } catch (e) { setTestResult({error: e.message}); }
    finally { setTestLoading(false); }
  };

  // Score distribution from local history
  const buckets = [
    {label:"1-2", min:1, max:2, color:"#16a34a"},
    {label:"3-4", min:3, max:4, color:"#65a30d"},
    {label:"5-6", min:5, max:6, color:"#d97706"},
    {label:"7-8", min:7, max:8, color:"#dc2626"},
    {label:"9-10",min:9, max:10, color:"#7f1d1d"},
  ].map(b => ({
    ...b,
    count: history.filter(h => {
      const s = h.score || h.overall_score || 0;
      return s >= b.min && s <= b.max;
    }).length,
    pct: history.length ? Math.round(history.filter(h => {
      const s = h.score || h.overall_score || 0;
      return s >= b.min && s <= b.max;
    }).length / history.length * 100) : 0,
  }));

  const avgScore = history.length
    ? (history.reduce((a,h) => a + (h.score || h.overall_score || 0), 0) / history.length).toFixed(1)
    : "—";

  const catCounts = {};
  history.forEach(h => {
    const c = h.category || "other";
    catCounts[c] = (catCounts[c] || 0) + 1;
  });
  const topCats = Object.entries(catCounts).sort((a,b) => b[1]-a[1]).slice(0,6);

  const card = {background:surface, borderRadius:14, border:`1px solid ${border}`, padding:"20px 24px", marginBottom:16};
  const sectionHead = {fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:muted, marginBottom:14};

  return (
    <div style={{maxWidth:1000, margin:"0 auto", padding:"32px 24px 80px"}}>
      <div style={{marginBottom:28}}>
        <div style={{fontSize:11, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6}}>Internal</div>
        <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>Admin</h1>
        {/* Tab bar */}
        <div style={{display:"flex", gap:8, borderBottom:`2px solid ${border}`, paddingBottom:0}}>
          {[["dashboard","Dashboard"],["scores","Score Review"],["guides","Guides"]].map(([t,l])=>(
            <button key={t} onClick={()=>setAdminTab(t)} style={{
              padding:"8px 20px", border:"none", background:"none", cursor:"pointer",
              fontSize:14, fontWeight:600,
              color:adminTab===t?"#16a34a":muted,
              borderBottom:adminTab===t?"2px solid #16a34a":"2px solid transparent",
              marginBottom:-2,
            }}>{l}</button>
          ))}
        </div>
      </div>

      {adminTab==="guides" ? (
        <GuideAdminPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={false}/>
      ) : adminTab==="scores" ? (
        <div>
          {/* Search + filter bar */}
          <div style={{display:"flex", gap:10, marginBottom:20, flexWrap:"wrap"}}>
            <input
              value={scansSearch}
              onChange={e=>setScansSearch(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"){ setScansOffset(0); fetchRecentScans({search:e.target.value, offset:0}); }}}
              placeholder="Search products…"
              style={{flex:1, minWidth:180, padding:"9px 14px", borderRadius:10, border:`1px solid ${border}`, background:surface, color:text, fontSize:14}}
            />
            <select value={scansCat} onChange={e=>{ setScansCat(e.target.value); setScansOffset(0); fetchRecentScans({cat:e.target.value, offset:0}); }}
              style={{padding:"9px 14px", borderRadius:10, border:`1px solid ${border}`, background:surface, color:text, fontSize:14, cursor:"pointer"}}>
              <option value="">All categories</option>
              {["food_beverage","beverage","personal_care","clothing","baby","home","supplement","toy","other"].map(c=>(
                <option key={c} value={c}>{c.replace(/_/g," ")}</option>
              ))}
            </select>
            <button onClick={()=>{ setScansOffset(0); fetchRecentScans({offset:0}); }} style={{padding:"9px 18px", borderRadius:10, background:"#052e16", color:"#4ade80", border:"none", fontWeight:700, fontSize:14, cursor:"pointer"}}>
              {scansLoading ? "Loading…" : "Search"}
            </button>
          </div>

          {/* Score list */}
          {recentScans.length === 0 && !scansLoading && (
            <div style={{textAlign:"center", color:muted, padding:"60px 0", fontSize:14}}>No scans found</div>
          )}
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {recentScans.map((s, i) => {
              const sc = s.score || 0;
              const col = sc<=2?"#16a34a":sc<=4?"#65a30d":sc<=6?"#d97706":sc<=8?"#dc2626":"#7f1d1d";
              const bg  = sc<=2?"#f0fdf4":sc<=4?"#f7fee7":sc<=6?"#fefce8":sc<=8?"#fff7ed":"#fff1f2";
              const flags = (s.flagged_substances||[]).slice(0,4);
              return (
                <div key={i} style={{background:surface, border:`1px solid ${border}`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"flex-start", gap:14}}>
                  {/* Score badge */}
                  <div style={{minWidth:48, height:48, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", border:`1px solid ${col}22`}}>
                    <div style={{fontSize:20, fontWeight:800, color:col, lineHeight:1}}>{sc}</div>
                    <div style={{fontSize:9, color:col, fontWeight:600, opacity:0.7}}>/10</div>
                  </div>
                  {/* Info */}
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontWeight:700, fontSize:15, color:text, marginBottom:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{s.product_name}</div>
                    <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:flags.length?6:0}}>
                      <span style={{fontSize:11, fontWeight:600, color:muted, background:isDark?"#1e293b":"#f1f5f9", padding:"2px 8px", borderRadius:6}}>{(s.category||"other").replace(/_/g," ")}</span>
                      {s.confidence && <span style={{fontSize:11, color:muted}}>{s.confidence} confidence</span>}
                      {s.child_score && s.child_score !== sc && (
                        <span style={{fontSize:11, fontWeight:600, color:"#60a5fa", display:"flex", alignItems:"center", gap:3}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 018 0v2"/></svg>Kids: {s.child_score}/10</span>
                      )}
                      {s.scanned_at && (
                        <span style={{fontSize:11, color:muted}}>{new Date(s.scanned_at).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
                      )}
                    </div>
                    {flags.length > 0 && (
                      <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
                        {flags.map((f,j)=>(
                          <span key={j} style={{fontSize:11, fontWeight:600, color:col, background:`${col}15`, padding:"2px 8px", borderRadius:20, border:`1px solid ${col}30`}}>{f}</span>
                        ))}
                      </div>
                    )}
                    {s.summary && (
                      <div style={{fontSize:12, color:muted, marginTop:5, lineHeight:1.5, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical"}}>{s.summary}</div>
                    )}
                  </div>
                  {/* Quick action */}
                  <button
                    onClick={()=>{ window.open(`https://partiqule.com?q=${encodeURIComponent(s.product_name)}`, "_blank"); }}
                    title="Re-scan this product"
                    style={{padding:"6px 10px", borderRadius:8, border:`1px solid ${border}`, background:"none", color:muted, fontSize:12, cursor:"pointer", whiteSpace:"nowrap"}}>
                    Re-scan
                  </button>
                </div>
              );
            })}
          </div>

          {/* Load more */}
          {recentScans.length >= 50 && (
            <button onClick={()=>{ const next = scansOffset+50; setScansOffset(next); fetchRecentScans({offset:next}); }}
              style={{width:"100%", marginTop:16, padding:"12px", borderRadius:10, background:"none", border:`1px solid ${border}`, color:muted, fontSize:14, cursor:"pointer"}}>
              {scansLoading ? "Loading…" : "Load more"}
            </button>
          )}
        </div>
      ) : (<>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:20}}>
        {[
          {label:"Local scans", value: history.length, color:"#16a34a"},
          {label:"Avg score", value: avgScore, color: parseFloat(avgScore) > 5 ? "#dc2626" : "#16a34a"},
          {label:"Cache entries", value: cacheStatus?.size ?? "—", color:"#d97706"},
        ].map((s,i) => (
          <div key={i} style={{background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"16px 20px"}}>
            <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:muted, marginBottom:6}}>{s.label}</div>
            <div style={{fontSize:28, fontWeight:800, color:s.color, fontFamily:"'Outfit',sans-serif"}}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Score distribution */}
      <div style={card}>
        <div style={sectionHead}>Score Distribution — local scan history</div>
        {history.length === 0 ? (
          <div style={{fontSize:13, color:muted}}>No local scan history yet. Run some scans to see distribution.</div>
        ) : (
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {buckets.map((b,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12}}>
                <div style={{fontSize:13, fontWeight:700, color:b.color, width:36, flexShrink:0}}>{b.label}</div>
                <div style={{flex:1, height:28, background:isDark?"#0f2a18":"#f1f5f9", borderRadius:6, overflow:"hidden"}}>
                  <div style={{
                    width: b.pct + "%", height:"100%", background:b.color,
                    borderRadius:6, minWidth: b.count > 0 ? 4 : 0,
                    transition:"width 0.6s ease", opacity:0.85,
                    display:"flex", alignItems:"center", paddingLeft:8,
                  }}>
                    {b.pct > 8 && <span style={{fontSize:11, fontWeight:700, color:"#fff"}}>{b.pct}%</span>}
                  </div>
                </div>
                <div style={{fontSize:12, color:muted, width:60, textAlign:"right", flexShrink:0}}>
                  {b.count} scan{b.count !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div style={{marginTop:16, paddingTop:16, borderTop:`1px solid ${border}`, fontSize:12, color:muted}}>
            <strong style={{color:text}}>Calibration health:</strong>{" "}
            {buckets[0].pct + buckets[1].pct >= 40
              ? "✓ Good spread — clean products scoring in safe tiers"
              : buckets[3].pct + buckets[4].pct >= 40
              ? "⚠ High scores dominating — check for ceiling miscalibration"
              : "Distribution looks reasonable"
            }
          </div>
        )}
      </div>

      {/* Category breakdown */}
      {topCats.length > 0 && (
        <div style={card}>
          <div style={sectionHead}>Top scanned categories</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
            {topCats.map(([cat, count]) => (
              <div key={cat} style={{background:isDark?"#0f2a18":"#f1f5f9", borderRadius:8, padding:"6px 14px", fontSize:13}}>
                <span style={{color:text, fontWeight:600}}>{cat}</span>
                <span style={{color:muted, marginLeft:6}}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cache controls */}
      <div style={card}>
        <div style={sectionHead}>Cache</div>
        <div style={{display:"flex", alignItems:"center", gap:16, flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            {cacheStatus?.error ? (
              <div style={{fontSize:13, color:"#dc2626"}}>Backend unreachable — {cacheStatus.error}</div>
            ) : cacheStatus ? (
              <div style={{fontSize:13, color:muted}}>
                {cacheStatus.size ?? 0} cached queries · backend up ·{" "}
                <span style={{color:"#16a34a"}}>Railway connected</span>
              </div>
            ) : (
              <div style={{fontSize:13, color:muted}}>Fetching cache status…</div>
            )}
          </div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={fetchCacheStatus} style={{padding:"8px 16px", borderRadius:8, border:`1px solid ${border}`, background:"none", color:muted, fontSize:13, cursor:"pointer"}}>
              Refresh
            </button>
            <button onClick={clearCache} disabled={clearing} style={{padding:"8px 16px", borderRadius:8, border:"none", background:"#dc2626", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", opacity: clearing ? 0.6 : 1}}>
              {clearing ? "Clearing…" : "Clear cache"}
            </button>
          </div>
        </div>
      </div>

      {/* Test scan */}
      <div style={card}>
        <div style={sectionHead}>Test scan — live scoring</div>
        <div style={{display:"flex", gap:8, marginBottom:testResult ? 16 : 0}}>
          <input
            value={testQuery} onChange={e => setTestQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && runTestScan()}
            placeholder="e.g. Honey Nut Cheerios, Pampers Swaddlers, Tide pods..."
            style={{flex:1, padding:"10px 16px", borderRadius:10, border:`1.5px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:14, outline:"none"}}
          />
          <button onClick={runTestScan} disabled={testLoading} style={{padding:"10px 24px", borderRadius:10, border:"none", background:"#16a34a", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", opacity: testLoading ? 0.6 : 1}}>
            {testLoading ? "Scanning…" : "Scan"}
          </button>
        </div>

        {testResult && (
          <div style={{background:isDark?"#0f1923":"#f8fafb", borderRadius:12, padding:"16px 20px", border:`1px solid ${border}`}}>
            {testResult.error ? (
              <div style={{color:"#dc2626", fontSize:13}}>{testResult.error}</div>
            ) : (
              <>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, flexWrap:"wrap", gap:8}}>
                  <div>
                    <div style={{fontSize:15, fontWeight:700, color:text}}>{testResult.product_name}</div>
                    <div style={{fontSize:12, color:muted, marginTop:2}}>category: {testResult.category} · confidence: {testResult.confidence}</div>
                  </div>
                  <div style={{
                    fontSize:26, fontWeight:800, color: testResult.overall_score <= 3 ? "#16a34a" : testResult.overall_score <= 5 ? "#d97706" : "#dc2626",
                    fontFamily:"'Outfit',sans-serif"
                  }}>
                    {testResult.overall_score || testResult.score}/10
                  </div>
                </div>
                {testResult.summary && <div style={{fontSize:12, color:muted, lineHeight:1.6, marginBottom:10}}>{testResult.summary}</div>}
                {testResult.concerns?.slice(0,3).map((c,i) => (
                  <div key={i} style={{fontSize:12, color: c.level === "high" ? "#dc2626" : c.level === "medium" ? "#d97706" : "#16a34a", marginBottom:3}}>
                    {c.level === "high" ? "▲" : c.level === "medium" ? "◆" : "●"} {c.concern}
                  </div>
                ))}
                {testResult.dimension_scores && (
                  <div style={{marginTop:12, display:"flex", gap:8, flexWrap:"wrap"}}>
                    {Object.entries(testResult.dimension_scores).map(([k,v]) => (
                      <div key={k} style={{background:isDark?"#0f2a18":"#fff", borderRadius:8, padding:"4px 10px", fontSize:11, border:`1px solid ${border}`}}>
                        <span style={{color:muted}}>{k}: </span><span style={{fontWeight:700, color:text}}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Recent local scans */}
      {history.length > 0 && (
        <div style={card}>
          <div style={sectionHead}>Recent scans (local history — {history.length} total)</div>
          <div style={{display:"flex", flexDirection:"column", gap:6}}>
            {history.slice(0,12).map((h,i) => {
              const score = h.score || h.overall_score || 0;
              const scoreColor = score <= 3 ? "#16a34a" : score <= 5 ? "#d97706" : "#dc2626";
              return (
                <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", background:isDark?"#0f2a18":"#f8fafb", borderRadius:8, border:`1px solid ${border}`}}>
                  <div style={{flex:1}}>
                    <span style={{fontSize:13, fontWeight:600, color:text}}>{h.product_name}</span>
                    <span style={{fontSize:11, color:muted, marginLeft:8}}>{h.category}</span>
                  </div>
                  <div style={{fontSize:15, fontWeight:800, color:scoreColor, marginLeft:12, flexShrink:0}}>{score}/10</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Score feedback from users */}
      <div style={card}>
        <div style={sectionHead}>User score feedback {feedback.length > 0 && <span style={{color:"#dc2626", marginLeft:8}}>({feedback.length} pending)</span>}</div>
        {feedbackLoading ? (
          <div style={{fontSize:13, color:muted}}>Loading...</div>
        ) : feedback.length === 0 ? (
          <div style={{fontSize:13, color:muted}}>No pending feedback. Users haven't flagged any scores yet.</div>
        ) : (
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {feedback.map(f => {
              const tierColor = {
                too_high:        "#dc2626",
                too_low:         "#d97706",
                wrong_category:  "#7c3aed",
                missing_concern: "#dc2626",
                other:           "#6b7280",
              }[f.suggested_tier] || "#6b7280";
              const tierLabel = {
                too_high:        "Too high",
                too_low:         "Too low",
                wrong_category:  "Wrong category",
                missing_concern: "Missing concern",
                other:           "Other",
              }[f.suggested_tier] || f.suggested_tier;
              return (
                <div key={f.id} style={{padding:"12px 14px", background:isDark?"#0f1923":"#f8fafb", borderRadius:10, border:`1px solid ${border}`}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:8}}>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:14, fontWeight:700, color:text}}>{f.product_name}</div>
                      <div style={{fontSize:11, color:muted, marginTop:2}}>
                        {f.category || "uncategorized"} · was scored {f.returned_score ?? "?"}/10 · {new Date(f.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{background:tierColor, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.05em", flexShrink:0}}>{tierLabel}</div>
                  </div>
                  {f.note && <div style={{fontSize:12, color:muted, marginBottom:8, padding:"8px 10px", background:isDark?"#0f2a18":"#fff", borderRadius:6, borderLeft:`3px solid ${tierColor}`}}>{f.note}</div>}
                  {f.user_email && <div style={{fontSize:11, color:muted, marginBottom:8}}>from {f.user_email}</div>}
                  <div style={{display:"flex", gap:8}}>
                    <button onClick={() => { setTestQuery(f.product_name); runTestScan(); }} style={{padding:"6px 12px", borderRadius:6, border:`1px solid ${border}`, background:"none", color:muted, fontSize:11, fontWeight:600, cursor:"pointer"}}>Rescan</button>
                    <button onClick={() => resolveFeedback(f.id, "resolved")} style={{padding:"6px 12px", borderRadius:6, border:"none", background:"#16a34a", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer"}}>Mark resolved</button>
                    <button onClick={() => resolveFeedback(f.id, "dismissed")} style={{padding:"6px 12px", borderRadius:6, border:`1px solid ${border}`, background:"none", color:muted, fontSize:11, fontWeight:600, cursor:"pointer"}}>Dismiss</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Calibration overrides — add/edit scores without code deploy */}
      <div style={card}>
        <div style={sectionHead}>Calibration overrides {overrides.length > 0 && <span style={{marginLeft:8, color:muted, fontWeight:400}}>({overrides.length} active)</span>}</div>
        <p style={{fontSize:12, color:muted, margin:"0 0 14px", lineHeight:1.5}}>Override or add product scores without a code deploy. Changes take effect within seconds and clear the product's cache automatically.</p>

        {/* Add new override form */}
        <div style={{background:isDark?"#0f1923":"#f8fafb", borderRadius:10, padding:"14px 16px", border:`1px solid ${border}`, marginBottom:12}}>
          <div style={{fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>Add / update override</div>
          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:8, marginBottom:8}}>
            <input
              value={newOverride.name} onChange={e=>setNewOverride({...newOverride, name:e.target.value})}
              placeholder="Product name (e.g. Huggies Little Movers)"
              style={{padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13}}
            />
            <input
              type="number" min="1" max="10" value={newOverride.floor} onChange={e=>setNewOverride({...newOverride, floor:e.target.value})}
              placeholder="Floor"
              style={{padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13}}
            />
            <input
              type="number" min="1" max="10" value={newOverride.ceiling} onChange={e=>setNewOverride({...newOverride, ceiling:e.target.value})}
              placeholder="Ceiling"
              style={{padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13}}
            />
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:8, marginBottom:8}}>
            <select
              value={newOverride.category} onChange={e=>setNewOverride({...newOverride, category:e.target.value})}
              style={{padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13}}
            >
              {["food_beverage","beverage","baby","personal_care","home","kitchen","clothing","toy","supplement","restaurant","home_furnishing","accessory","other"].map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </select>
            <input
              value={newOverride.substances} onChange={e=>setNewOverride({...newOverride, substances:e.target.value})}
              placeholder="Substances (comma-separated, e.g. Red 40, BHT)"
              style={{padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13}}
            />
          </div>
          <textarea
            value={newOverride.reason} onChange={e=>setNewOverride({...newOverride, reason:e.target.value})}
            placeholder="Reason / summary (shown in app)"
            style={{width:"100%", padding:"8px 12px", borderRadius:6, border:`1px solid ${border}`, background:isDark?"#0f2a18":"#fff", color:text, fontSize:13, minHeight:50, resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", marginBottom:8}}
          />
          <button onClick={saveOverride} disabled={!newOverride.name.trim() || savingOverride}
            style={{padding:"8px 20px", borderRadius:6, border:"none", background:newOverride.name.trim() ? "#16a34a" : isDark?"#0f2a18":"#e2e8f0", color:newOverride.name.trim() ? "#fff" : muted, fontSize:13, fontWeight:700, cursor:newOverride.name.trim() ? "pointer" : "default", opacity:savingOverride ? 0.6 : 1}}>
            {savingOverride ? "Saving..." : "Save override"}
          </button>
        </div>

        {/* Active overrides list */}
        {overrides.length > 0 && (
          <div style={{display:"flex", flexDirection:"column", gap:6}}>
            {overrides.map(o => (
              <div key={o.name} style={{display:"flex", alignItems:"center", gap:12, padding:"8px 12px", background:isDark?"#0f1923":"#fff", borderRadius:8, border:`1px solid ${border}`}}>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:600, color:text}}>{o.name}</div>
                  <div style={{fontSize:11, color:muted, marginTop:1}}>
                    floor {o.floor} · ceiling {o.ceiling} · {o.category}
                    {o.updated_by && ` · by ${o.updated_by}`}
                  </div>
                </div>
                <button onClick={() => deleteOverride(o.name)} style={{padding:"4px 10px", borderRadius:5, border:`1px solid ${border}`, background:"none", color:"#dc2626", fontSize:11, fontWeight:600, cursor:"pointer"}}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending product suggestions */}
      <div style={card}>
        <div style={sectionHead}>Pending suggestions {suggestions.length > 0 && <span style={{color:"#16a34a", marginLeft:8}}>({suggestions.length})</span>}</div>
        {suggestionsLoading ? (
          <div style={{fontSize:13, color:muted}}>Loading...</div>
        ) : suggestions.length === 0 ? (
          <div style={{fontSize:13, color:muted}}>No pending suggestions.</div>
        ) : (
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {suggestions.map(s => (
              <div key={s.id} style={{padding:"10px 14px", background:isDark?"#0f1923":"#f8fafb", borderRadius:10, border:`1px solid ${border}`}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:6}}>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:14, fontWeight:700, color:text}}>{s.product_name}</div>
                    <div style={{fontSize:11, color:muted, marginTop:2}}>
                      {s.user_email || "anonymous"} · {new Date(s.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex", gap:6, marginTop:6}}>
                  <button onClick={() => { setTestQuery(s.product_name); runTestScan(); }} style={{padding:"5px 12px", borderRadius:6, border:`1px solid ${border}`, background:"none", color:muted, fontSize:11, fontWeight:600, cursor:"pointer"}}>Score now</button>
                  <button onClick={() => resolveSuggestion(s.id, "added")} style={{padding:"5px 12px", borderRadius:6, border:"none", background:"#16a34a", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer"}}>Mark added</button>
                  <button onClick={() => resolveSuggestion(s.id, "dismissed")} style={{padding:"5px 12px", borderRadius:6, border:`1px solid ${border}`, background:"none", color:muted, fontSize:11, fontWeight:600, cursor:"pointer"}}>Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{textAlign:"center", fontSize:11, color:muted, marginTop:8}}>
        Admin key required · Partiqule internal · Not indexed
      </div>
    </>)}
    </div>
  );
};

// ── ROUTINE PAGE ──────────────────────────────────────────────
const RoutinePage = ({history, isDark, surface, border, text, muted, isMobile, user, onSelect, onSearch}) => {
  const [timeFilter,   setTimeFilter]   = useState("all");
  const [notPurchased, setNotPurchased] = useState(new Set());

  const now = Date.now();
  const TIME_CUTOFFS = {"7d":7*24*60*60*1000, "30d":30*24*60*60*1000, "90d":90*24*60*60*1000, "1y":365*24*60*60*1000, "all":Infinity};

  const filtered = history.filter(h => {
    if (timeFilter !== "all" && h.scannedAt) {
      if (now - new Date(h.scannedAt).getTime() > TIME_CUTOFFS[timeFilter]) return false;
    }
    return true;
  });

  const active   = filtered.filter(h => !notPurchased.has(h.product_name));
  const inactive = filtered.filter(h => notPurchased.has(h.product_name));

  // Chemical overlap across active products
  const chemMap = {};
  active.forEach(item => {
    const chems = [
      ...(item.harmful_chemicals || []),
      ...(item.identified_plastics || []),
      ...((item.food_analysis?.concerns || []).filter(c=>c.severity==="high").map(c=>c.substance||c.ingredient||"")),
    ].filter(Boolean);
    chems.forEach(chem => {
      const key = chem.toLowerCase().trim();
      if (!chemMap[key]) chemMap[key] = {name:chem, count:0, products:[]};
      if (!chemMap[key].products.includes(item.product_name)) {
        chemMap[key].count++;
        chemMap[key].products.push(item.product_name);
      }
    });
  });

  const repeated = Object.values(chemMap).filter(c=>c.count>=2).sort((a,b)=>b.count-a.count).slice(0,10);
  const allChems = Object.values(chemMap).sort((a,b)=>b.count-a.count).slice(0,16);
  const routineAvg = active.length
    ? Math.round(active.reduce((s,h)=>s+(h.overall_score||h.score||5),0)/active.length*10)/10
    : null;

  const bg = isDark?"#080f0a":"#fafafa";

  return (
    <div style={{maxWidth:680, margin:"0 auto", padding:isMobile?"16px 12px 80px":"32px 24px 80px"}}>

      {/* Header */}
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?22:28, color:text, margin:"0 0 4px"}}>My Routine</h1>
        <p style={{fontSize:14, color:muted, margin:0}}>Track your real chemical exposure across everything in your home</p>
      </div>

      {history.length === 0 ? (
        <div style={{textAlign:"center", padding:"60px 20px", color:muted}}>
          <div style={{marginBottom:12, display:"flex", justifyContent:"center"}}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
          <div style={{fontSize:16, fontWeight:600, color:text, marginBottom:8}}>No scans yet</div>
          <div style={{fontSize:14, lineHeight:1.6}}>Scan products to build your routine and see which chemicals appear most often across your home.</div>
        </div>
      ) : (<>

        {/* Time filter + stats row */}
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:16, flexWrap:"wrap"}}>
          {[["7d","Last week"],["30d","30 days"],["90d","90 days"],["1y","Annual"],["all","Lifetime"]].map(([val,label])=>(
            <button key={val} onClick={()=>setTimeFilter(val)} style={{
              fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:20, cursor:"pointer",
              border:`1px solid ${timeFilter===val?"#16a34a":(isDark?"rgba(34,197,94,0.15)":"#e2e8f0")}`,
              background:timeFilter===val?"#16a34a":"transparent",
              color:timeFilter===val?"#fff":muted,
            }}>{label}</button>
          ))}
          <span style={{fontSize:12, color:muted, marginLeft:"auto"}}>{active.length} active · {inactive.length} not using</span>
        </div>

        {/* Routine score card */}
        {routineAvg !== null && (
          <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:16, padding:"16px 20px", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`, marginBottom:16, display:"flex", alignItems:"center", gap:16}}>
            <div style={{textAlign:"center", flexShrink:0}}>
              <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:40, color:scoreColor(Math.round(routineAvg)), lineHeight:1}}>{routineAvg}</div>
              <div style={{fontSize:11, color:muted, marginTop:2}}>avg score</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700, color:scoreColor(Math.round(routineAvg)), marginBottom:6}}>{scoreLabel(Math.round(routineAvg))} routine</div>
              <div style={{height:8, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#e5e7eb", overflow:"hidden"}}>
                <div style={{height:"100%", width:`${Math.min(100,(routineAvg/10)*100)}%`, background:scoreColor(Math.round(routineAvg)), borderRadius:99, transition:"width 0.4s"}}/>
              </div>
              <div style={{fontSize:11, color:muted, marginTop:4}}>{active.length} products marked as in your home</div>
            </div>
          </div>
        )}

        {/* Repeated chemicals */}
        {repeated.length > 0 && (
          <div style={{background:isDark?"#1e1a1a":"#fff9f9", borderRadius:16, padding:"16px 20px", border:`1.5px solid #fca5a533`, marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:700, color:"#dc2626", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12}}>⚠ Repeated exposure across products</div>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {repeated.map((c,i)=>(
                <div key={i} style={{display:"flex", alignItems:"flex-start", gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:3}}>
                      <span style={{fontSize:13, fontWeight:700, color:"#dc2626"}}>{c.name}</span>
                      <span style={{fontSize:10, fontWeight:700, color:"#fff", background:"#dc2626", padding:"1px 7px", borderRadius:20}}>{c.count}×</span>
                    </div>
                    <div style={{height:4, borderRadius:99, background:isDark?"rgba(34,197,94,0.15)":"#fee2e2", overflow:"hidden", marginBottom:3}}>
                      <div style={{height:"100%", width:`${Math.min(100,(c.count/active.length)*100)}%`, background:"#dc2626", borderRadius:99}}/>
                    </div>
                    <div style={{fontSize:11, color:muted}}>{c.products.slice(0,2).join(", ")}{c.products.length>2?` +${c.products.length-2} more`:""}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{fontSize:11, color:"#d97706", marginTop:12, lineHeight:1.5, padding:"8px 10px", background:isDark?"#2a1a00":"#fffbeb", borderRadius:8, border:"1px solid #fde68a"}}>
              Chemicals repeated across multiple products represent your highest real-world exposure — small amounts from each source compound over time.
            </div>
          </div>
        )}

        {/* All chemicals bubble cloud */}
        {allChems.length > 0 && (
          <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:16, padding:"16px 20px", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`, marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>All flagged substances in active routine</div>
            <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
              {allChems.map((c,i)=>(
                <span key={i} style={{
                  fontSize:12, fontWeight:600, padding:"4px 11px", borderRadius:20,
                  background:c.count>=2?(isDark?"#2a1a1a":"#fef2f2"):(isDark?"#080f0a":"#f8fafb"),
                  color:c.count>=2?"#dc2626":muted,
                  border:`1px solid ${c.count>=2?"#fca5a544":(isDark?"rgba(34,197,94,0.15)":"#e5e7eb")}`,
                }}>
                  {c.name}{c.count>=2?` ×${c.count}`:""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product list */}
        <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:16, border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`, overflow:"hidden", marginBottom:16}}>
          <div style={{padding:"14px 20px", borderBottom:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#f0f0f0"}`}}>
            <div style={{fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em"}}>Your products</div>
          </div>

          {/* Active products */}
          {active.map((item,i)=>{
            const s = item.overall_score||item.score||5;
            return (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:`1px solid ${isDark?"#1e2533":"#f5f5f5"}`}}>
                <div style={{width:36, height:36, borderRadius:8, background:`${scoreColor(s)}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                  <span style={{fontSize:12, fontWeight:800, color:scoreColor(s)}}>{s}</span>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:600, color:text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{item.product_name}</div>
                  <div style={{fontSize:11, color:muted, textTransform:"capitalize"}}>{item.category}</div>
                </div>
                <div style={{display:"flex", gap:6, flexShrink:0}}>
                  <button onClick={()=>onSelect(item)} style={{fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:10, border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`, background:"transparent", color:muted, cursor:"pointer"}}>View</button>
                  <button onClick={()=>setNotPurchased(p=>{const n=new Set(p);n.add(item.product_name);return n;})} style={{fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:10, border:"1px solid #16a34a", background:"rgba(34,197,94,0.08)", color:"#16a34a", cursor:"pointer"}}>In my home</button>
                </div>
              </div>
            );
          })}

          {/* Inactive products */}
          {inactive.length > 0 && (<>
            <div style={{padding:"8px 20px", background:isDark?"#080f0a":"#fafafa"}}>
              <div style={{fontSize:10, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.07em"}}>Not in my home</div>
            </div>
            {inactive.map((item,i)=>{
              const s = item.overall_score||item.score||5;
              return (
                <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 20px", borderBottom:`1px solid ${isDark?"#1e2533":"#f5f5f5"}`, opacity:0.5}}>
                  <div style={{width:36, height:36, borderRadius:8, background:`${scoreColor(s)}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <span style={{fontSize:12, fontWeight:800, color:scoreColor(s)}}>{s}</span>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:600, color:text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{item.product_name}</div>
                    <div style={{fontSize:11, color:muted}}>Not using</div>
                  </div>
                  <button onClick={()=>setNotPurchased(p=>{const n=new Set(p);n.delete(item.product_name);return n;})} style={{fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:10, border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#d1d5db"}`, background:"transparent", color:muted, cursor:"pointer", flexShrink:0}}>Mark active</button>
                </div>
              );
            })}
          </>)}
        </div>

        {notPurchased.size > 0 && (
          <button onClick={()=>setNotPurchased(new Set())} style={{fontSize:12, color:muted, background:"none", border:"none", cursor:"pointer", textDecoration:"underline"}}>
            Reset — mark all as in my home
          </button>
        )}
      </>)}
    </div>
  );
};

// ── HISTORY PAGE ─────────────────────────────────────────────
const HistoryPage = ({history, isDark, surface, border, text, muted, onSelect, onClear, onSearch, isMobile}) => {
  const [priceFilter, setPriceFilter] = useState("all");
  const avg = history.length ? Math.round(history.reduce((a,h)=>a+h.score,0)/history.length*10)/10 : 0;
  const highest = history.length ? history.reduce((a,h)=>h.score>a.score?h:a, history[0]) : null;

  // Month-over-month comparison — shows if user is getting cleaner over time
  const now = Date.now();
  const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
  const thisMonthScans = history.filter(h => h.scanned_at && (now - new Date(h.scanned_at).getTime()) < ONE_MONTH);
  const lastMonthScans = history.filter(h => {
    if (!h.scanned_at) return false;
    const age = now - new Date(h.scanned_at).getTime();
    return age >= ONE_MONTH && age < 2 * ONE_MONTH;
  });
  const thisMonthAvg = thisMonthScans.length ? Math.round(thisMonthScans.reduce((a,h)=>a+(h.overall_score||h.score||0),0)/thisMonthScans.length*10)/10 : null;
  const lastMonthAvg = lastMonthScans.length ? Math.round(lastMonthScans.reduce((a,h)=>a+(h.overall_score||h.score||0),0)/lastMonthScans.length*10)/10 : null;
  const monthDelta = (thisMonthAvg !== null && lastMonthAvg !== null) ? Math.round((thisMonthAvg - lastMonthAvg) * 10) / 10 : null;
  // Category breakdown
  const catCounts = {};
  history.forEach(h => { const c = h.category || "other"; catCounts[c] = (catCounts[c] || 0) + 1; });
  const topCategory = Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0]?.[0];

  // Collect all alternatives from scan history, deduplicate by name
  const allAlts = [];
  const seen = new Set();
  history.forEach(item => {
    (item.alternatives || []).forEach(alt => {
      if (!seen.has(alt.name) && alt.affiliateUrl) {
        seen.add(alt.name);
        allAlts.push({...alt, fromProduct: item.product_name, fromScore: item.score});
      }
    });
  });

  // Price filter logic
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === "See on Amazon") return null;
    const match = priceStr.replace(/[$,]/g, "").match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
  };

  const filteredAlts = allAlts.filter(alt => {
    if (priceFilter === "all") return true;
    const price = parsePrice(alt.price);
    if (!price) return priceFilter === "all";
    if (priceFilter === "under15") return price < 15;
    if (priceFilter === "under30") return price < 30;
    if (priceFilter === "under50") return price < 50;
    if (priceFilter === "over50") return price >= 50;
    return true;
  });

  const formatDate = (iso) => {
    if (!iso) return "Recently";
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs/60000);
    const diffHours = Math.floor(diffMs/3600000);
    const diffDays = Math.floor(diffMs/86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", {month:"short", day:"numeric"});
  };

  const grouped = history.reduce((acc, item) => {
    const key = item.scannedAt ? new Date(item.scannedAt).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}) : "Recent";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div style={{maxWidth:900, margin:"0 auto", padding:isMobile?"20px 16px 60px":"48px 40px 80px"}}>
      <div style={{marginBottom:isMobile?24:40}}>
        <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?24:32, color:text, margin:"0 0 8px", letterSpacing:"-0.5px"}}>My Scans</h1>
        <p style={{fontSize:15, color:muted, margin:0}}>Your scan history and recommended safer alternatives</p>
      </div>

      {history.length === 0 ? (
        <div style={{textAlign:"center", padding:"80px 0", color:muted}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><IcoScan size={48}/></div>
          <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:18, color:text, marginBottom:8}}>No scans yet</div>
          <div style={{fontSize:14, marginBottom:24}}>Search for a product to get started</div>
          <button onClick={()=>onSearch("")} style={{padding:"10px 24px", borderRadius:8, border:"none", background:"#16a34a", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer"}}>Start Scanning</button>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:40}}>
            <div style={{background:surface, borderRadius:16, padding:"24px 28px", border:`1.5px solid ${border}`}}>
              <div style={{fontSize:12, color:muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12}}>Avg Safety Score</div>
              <div style={{display:"flex", alignItems:"flex-end", gap:8, marginBottom:10}}>
                <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:48, color:avg<=3?"#16a34a":avg<=6?"#d97706":"#dc2626", lineHeight:1}}>{avg}</span>
                <span style={{fontSize:14, color:muted, marginBottom:8}}>/10</span>
              </div>
              <div style={{height:6, borderRadius:99, background:"#e5e7eb", overflow:"hidden"}}>
                <div style={{height:"100%", width:`${(avg/10)*100}%`, background:avg<=3?"#16a34a":avg<=6?"#d97706":"#dc2626", borderRadius:99, transition:"width 1s ease"}}/>
              </div>
              <div style={{fontSize:12, color:muted, marginTop:8}}>Across {history.length} scan{history.length!==1?"s":""}</div>
            </div>
            {highest && (
              <div style={{background:surface, borderRadius:16, padding:"24px 28px", border:`1.5px solid ${border}`}}>
                <div style={{fontSize:12, color:muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12}}>Highest Risk Found</div>
                <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:text, marginBottom:6, lineHeight:1.3}}>{highest.product_name}</div>
                <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"#fee2e2", color:"#dc2626", padding:"4px 12px", borderRadius:20, fontSize:13, fontWeight:700}}>
                  {highest.score}/10 — {highest.score>=8?"Very High":highest.score>=6?"High":"Moderate"} Risk
                </div>
                <div style={{fontSize:12, color:"#16a34a", fontWeight:600, marginTop:10, cursor:"pointer"}} onClick={()=>onSelect(highest)}>
                  View result →
                </div>
              </div>
            )}
          </div>

          {/* Month-over-month comparison */}
          {thisMonthScans.length >= 3 && (
            <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, padding:"20px 24px", border:`1.5px solid ${isDark?"#1e3a22":"#bbf7d0"}`, marginBottom:24}}>
              <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap"}}>
                <div style={{flex:1, minWidth:200}}>
                  <div style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6}}>This month</div>
                  <div style={{display:"flex", alignItems:"baseline", gap:12, marginBottom:6}}>
                    <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:32, color:text}}>{thisMonthScans.length}</span>
                    <span style={{fontSize:13, color:muted}}>scan{thisMonthScans.length!==1?"s":""}</span>
                  </div>
                  {thisMonthAvg !== null && (
                    <div style={{fontSize:13, color:muted}}>
                      Average score: <strong style={{color: thisMonthAvg<=3?"#16a34a":thisMonthAvg<=6?"#d97706":"#dc2626"}}>{thisMonthAvg}/10</strong>
                      {monthDelta !== null && (
                        <span style={{marginLeft:10, fontSize:12, color: monthDelta < 0 ? "#16a34a" : monthDelta > 0 ? "#dc2626" : muted, fontWeight:600}}>
                          {monthDelta < 0 ? "↓" : monthDelta > 0 ? "↑" : "="} {Math.abs(monthDelta)} vs last month
                        </span>
                      )}
                    </div>
                  )}
                  {topCategory && (
                    <div style={{fontSize:13, color:muted, marginTop:4}}>
                      Most scanned: <strong style={{color:text}}>{topCategory.replace(/_/g," ")}</strong>
                    </div>
                  )}
                </div>
                {monthDelta !== null && monthDelta < 0 && (
                  <div style={{fontSize:12, color:"#16a34a", fontWeight:600, maxWidth:220, textAlign:"right"}}>
                    🎉 Your average is trending cleaner. Keep it up!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Household Exposure Summary */}
          {history.length >= 2 && (() => {
            const [expanded, setExpanded] = React.useState(false);
            const [adults2,  setAdults2]  = React.useState(2);
            const [kids2,    setKids2]    = React.useState(0);

            // Sort by score descending, pick top concerns
            const sorted      = [...history].sort((a,b)=>(b.overall_score||b.score)-(a.overall_score||a.score));
            const highRisk    = sorted.filter(h=>(h.overall_score||h.score)>=6);
            const totalScore  = history.reduce((a,h)=>a+(h.overall_score||h.score),0);
            const avgScore    = Math.round((totalScore/history.length)*10)/10;

            // Estimate total annual exposures across all daily-use products
            const FREQ_MAP = {daily:365, weekly:52, occasional:18, rare:6};
            let totalExposures = 0;
            let totalAltExposures = 0;
            history.forEach(item => {
              const s     = item.overall_score || item.score;
              const freq  = item.dimensions?.usage_exposure?.frequency || item.exposure_frequency || "daily";
              const perYr = FREQ_MAP[freq] || 365;
              const ppl   = adults2 + kids2 * 2.5;
              totalExposures    += perYr * ppl;
              totalAltExposures += Math.round(perYr * ppl * (Math.max(1,Math.round(s*0.3)) / s));
            });
            const totalReduction    = Math.round(totalExposures - totalAltExposures);
            const totalReductionPct = Math.round((totalReduction / totalExposures) * 100);

            const Stepper2 = ({label, value, setValue}) => (
              <div>
                <div style={{fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4}}>{label}</div>
                <div style={{display:"flex", alignItems:"center", gap:5}}>
                  <button onClick={()=>setValue(v=>Math.max(0,v-1))} style={{width:24,height:24,borderRadius:5,border:`1px solid ${border}`,background:surface,color:text,cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
                  <span style={{fontWeight:700,fontSize:14,color:text,minWidth:16,textAlign:"center"}}>{value}</span>
                  <button onClick={()=>setValue(v=>Math.min(8,v+1))} style={{width:24,height:24,borderRadius:5,border:`1px solid ${border}`,background:surface,color:text,cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
                </div>
              </div>
            );

            return (
              <div style={{marginBottom:40, background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, border:`1.5px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, overflow:"hidden"}}>
                <button onClick={()=>setExpanded(e=>!e)} style={{width:"100%", padding:"16px 20px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3}}>
                      Household Exposure Overview
                    </div>
                    <div style={{fontSize:14, color:text, fontWeight:600}}>
                      {history.length} products scanned — average score {avgScore}/10
                      {highRisk.length > 0 && <span style={{color:"#dc2626"}}> · {highRisk.length} high concern{highRisk.length!==1?"s":""}</span>}
                    </div>
                  </div>
                  <span style={{fontSize:13, color:"#16a34a", transition:"transform 0.2s", display:"inline-block", transform:expanded?"rotate(180deg)":"rotate(0deg)", flexShrink:0}}>▾</span>
                </button>

                {expanded && (
                  <div style={{padding:"0 20px 20px", borderTop:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`}}>

                    {/* Household inputs */}
                    <div style={{display:"flex", gap:20, marginTop:16, marginBottom:16}}>
                      <Stepper2 label="Adults" value={adults2} setValue={v=>setAdults2(Math.max(1,v))}/>
                      <Stepper2 label="Children" value={kids2} setValue={setKids2}/>
                    </div>

                    {/* Top concerns */}
                    {highRisk.length > 0 && (
                      <div style={{marginBottom:16}}>
                        <div style={{fontSize:11, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8}}>Highest concern products</div>
                        <div style={{display:"flex", flexDirection:"column", gap:6}}>
                          {sorted.slice(0,3).map((item,i) => {
                            const s = item.overall_score||item.score;
                            return (
                              <button key={i} onClick={()=>onSelect(item)} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:surface, borderRadius:10, border:`1px solid ${border}`, cursor:"pointer", textAlign:"left"}}>
                                <span style={{fontSize:13, color:text, fontWeight:600, flex:1, marginRight:8}}>{item.product_name}</span>
                                <span style={{fontSize:12, fontWeight:700, padding:"2px 10px", borderRadius:20, background:s>=7?"#fef2f2":s>=5?"#fffbeb":"#f0fdf4", color:s>=7?"#dc2626":s>=5?"#d97706":"#16a34a", whiteSpace:"nowrap"}}>{s}/10 — {scoreLabel(s)}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Total exposure summary */}
                    <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:12, padding:"14px 16px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#d1fae5"}`}}>
                      <div style={{fontSize:11, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10}}>
                        If you switched every high-risk product
                      </div>
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12}}>
                        <div>
                          <div style={{fontSize:10, color:scoreColor(Math.round(avgScore)), fontWeight:700, textTransform:"uppercase", marginBottom:4}}>Current (all products)</div>
                          <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:scoreColor(Math.round(avgScore)), lineHeight:1}}>
                            {Math.round(totalExposures).toLocaleString()}
                          </div>
                          <div style={{fontSize:11, color:muted}}>total annual exposures</div>
                        </div>
                        <div>
                          <div style={{fontSize:10, color:"#16a34a", fontWeight:700, textTransform:"uppercase", marginBottom:4}}>After switching</div>
                          <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:"#16a34a", lineHeight:1}}>
                            {Math.round(totalAltExposures).toLocaleString()}
                          </div>
                          <div style={{fontSize:11, color:muted}}>total annual exposures</div>
                        </div>
                      </div>
                      <div style={{fontSize:13, color:"#16a34a", fontWeight:700, marginBottom:4}}>
                        {totalReductionPct}% reduction across your whole household
                      </div>
                      <div style={{fontSize:12, color:muted, lineHeight:1.5}}>
                        Switching your scanned products to safer alternatives eliminates an estimated {totalReduction.toLocaleString()} exposure events per year
                        {kids2 > 0 && <span style={{color:"#d97706"}}> — including {kids2} child{kids2>1?"ren":""} at 2.5x sensitivity</span>}.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Recommended alternatives */}
          {filteredAlts.length > 0 && (
            <div style={{marginBottom:48}}>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20}}>
                <div>
                  <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?18:22, color:text, margin:"0 0 4px"}}>
                    Recommended Alternatives
                  </h2>
                  <p style={{fontSize:13, color:muted, margin:0}}>Safer swaps based on what you've scanned · #ad affiliate links</p>
                </div>
                {/* Price filter */}
                <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                  {[
                    {key:"all", label:"All prices"},
                    {key:"under15", label:"Under $15"},
                    {key:"under30", label:"Under $30"},
                    {key:"under50", label:"Under $50"},
                    {key:"over50", label:"$50+"},
                  ].map(f => (
                    <button key={f.key} onClick={()=>setPriceFilter(f.key)}
                      style={{padding:"5px 12px", borderRadius:20, border:`1.5px solid ${priceFilter===f.key?"#16a34a":border}`,
                        background:priceFilter===f.key?"#052e16":"none",
                        color:priceFilter===f.key?"#4ade80":muted,
                        fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap"}}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3,1fr)", gap:12}}>
                {filteredAlts.slice(0,9).map((alt, i) => (
                  <a key={i} href={alt.affiliateUrl} rel="noopener noreferrer"
                    style={{textDecoration:"none", display:"block", background:surface, borderRadius:14,
                      border:`1.5px solid ${border}`, overflow:"hidden", transition:"all 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#16a34a";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=border;}}>
                    {/* Score badge */}
                    <div style={{padding:"12px 14px 0"}}>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
                        <div style={{fontSize:10, fontWeight:700, color:"#16a34a", background:"rgba(34,197,94,0.08)", padding:"2px 8px", borderRadius:10}}>
                          {alt.score}/10 danger
                        </div>
                        {alt.price && alt.price !== "See on Amazon" && (
                          <div style={{fontSize:12, fontWeight:700, color:text}}>{alt.price}</div>
                        )}
                      </div>
                      <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:text, marginBottom:4, lineHeight:1.3}}>
                        {alt.name?.length > 45 ? alt.name.slice(0,42)+"…" : alt.name}
                      </div>
                      {alt.brand && (
                        <div style={{fontSize:11, color:muted, marginBottom:6}}>{alt.brand}</div>
                      )}
                      <div style={{fontSize:11, color:muted, lineHeight:1.5, marginBottom:10}}>
                        Safer swap for: <span style={{color:text, fontWeight:500}}>{alt.fromProduct?.length>30?alt.fromProduct.slice(0,27)+"…":alt.fromProduct}</span>
                      </div>
                    </div>
                    <div style={{padding:"8px 14px 12px"}}>
                      <div style={{width:"100%", padding:"7px", borderRadius:8, background:"#052e16", color:"#4ade80", fontSize:12, fontWeight:600, textAlign:"center"}}>
                        Shop now →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {filteredAlts.length === 0 && priceFilter !== "all" && (
                <div style={{textAlign:"center", padding:"32px", color:muted, fontSize:14}}>
                  No alternatives found in this price range. <button onClick={()=>setPriceFilter("all")} style={{color:"#16a34a", background:"none", border:"none", fontWeight:600, cursor:"pointer"}}>Show all</button>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          <div style={{marginBottom:8}}>
            <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?18:22, color:text, margin:"0 0 24px"}}>Scan History</h2>
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date} style={{marginBottom:36}}>
                <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
                  <div style={{fontSize:12, fontWeight:600, color:muted, textTransform:"uppercase", letterSpacing:"0.07em", whiteSpace:"nowrap"}}>{date}</div>
                  <div style={{flex:1, height:1, background:border}}/>
                </div>
                <div style={{position:"relative", paddingLeft:28}}>
                  <div style={{position:"absolute", left:9, top:8, bottom:8, width:2, background:border, borderRadius:2}}/>
                  {items.map((item, i) => (
                    <div key={i} style={{position:"relative", marginBottom:12, cursor:"pointer"}} onClick={()=>onSelect(item)}>
                      <div style={{position:"absolute", left:-24, top:16, width:12, height:12, borderRadius:"50%", background:item.score<=3?"#16a34a":item.score<=6?"#d97706":"#dc2626", border:`2px solid ${surface}`, zIndex:1}}/>
                      <div style={{background:surface, borderRadius:12, padding:"16px 20px", border:`1.5px solid ${border}`, transition:"all 0.15s"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.transform="translateX(3px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=border; e.currentTarget.style.transform="none";}}>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12}}>
                          <div style={{flex:1, minWidth:0}}>
                            <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:text, marginBottom:4, lineHeight:1.3}}>{item.product_name}</div>
                            <div style={{fontSize:12, color:muted}}>{item.summary?.slice(0,90)}{item.summary?.length>90?"…":""}</div>
                          </div>
                          <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0}}>
                            <div style={{background:item.score<=3?"#f0fdf4":item.score<=6?"#fffbeb":"#fef2f2", color:item.score<=3?"#16a34a":item.score<=6?"#d97706":"#dc2626", fontWeight:800, fontSize:16, padding:"4px 12px", borderRadius:20, fontFamily:"'Outfit',sans-serif"}}>{item.score}/10</div>
                            <div style={{fontSize:11, color:muted}}>{formatDate(item.scannedAt)}</div>
                          </div>
                        </div>
                        {item.category && (
                          <div style={{marginTop:10, display:"flex", alignItems:"center", gap:6}}>
                            {(() => { const cat = {clothing:{label:"Clothing",color:"#6366f1",bg:"#eef2ff"},food_beverage:{label:"Food & Drink",color:"#0891b2",bg:"#ecfeff"},personal_care:{label:"Personal Care",color:"#db2777",bg:"#fdf2f8"},kitchen:{label:"Kitchen",color:"#d97706",bg:"#fffbeb"},baby:{label:"Baby & Kids",color:"#7c3aed",bg:"#f5f3ff"},other:{label:"General",color:"#6b7280",bg:"#f9fafb"}}[item.category]||{label:"General",color:"#6b7280",bg:"#f9fafb"}; return <span style={{background:cat.bg,color:cat.color,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20}}>{cat.label}</span>; })()}
                            <span style={{fontSize:11, color:"#16a34a", fontWeight:600}}>Tap to view full result →</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clear button */}
          <div style={{textAlign:"center", marginTop:32}}>
            <button onClick={onClear} style={{padding:"10px 20px", borderRadius:8, border:`1px solid ${border}`, background:"none", color:muted, fontSize:13, cursor:"pointer"}}>
              Clear all history
            </button>
          </div>
        </>
      )}
    </div>
  );
};


// ── BARCODE SCANNER ───────────────────────────────────────────


const AboutPage = ({isDark, text, muted, surface, border, isMobile, onScan, onNavigate}) => {
  return (
    <div style={{maxWidth:860, margin:"0 auto", padding:isMobile?"24px 16px 60px":"48px 40px 80px"}}>

      {/* Hero header */}
      <div style={{marginBottom:48}}>
        <div style={{fontSize:12, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:16}}>About Partiqule</div>
        <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?32:48, color:text, margin:"0 0 24px", letterSpacing:"-1px", lineHeight:1.15}}>
          Know what's in your products.
        </h1>
        <p style={{fontSize:isMobile?16:18, color:muted, lineHeight:1.85, marginBottom:16, maxWidth:680}}>
          The food you eat, the clothes you wear, the cookware you cook with, the cleaning products in your home. All of it has a measurable impact on your health, your family's health, and the health of the planet. Most of that impact is invisible. There's no label, no warning, no easy way to know what to trust.
        </p>
        <p style={{fontSize:isMobile?17:20, color:"#16a34a", fontWeight:700, lineHeight:1.5, marginBottom:16}}>
          Partiqule exists to change that.
        </p>
        <p style={{fontSize:isMobile?15:16, color:muted, lineHeight:1.85, marginBottom:16, maxWidth:680}}>
          We score every product across four dimensions: materials, exposure, packaging and sustainability. The result is a complete picture of its chemical and environmental impact on you, your home, and the planet. Free, instant, and grounded in published science.
        </p>
        <p style={{fontSize:isMobile?15:16, color:muted, lineHeight:1.85, marginBottom:32, maxWidth:680}}>
          Because when you understand what you're buying, you can make better decisions for yourself and the people you love.
        </p>
        <button onClick={()=>onScan()}
          style={{padding:"12px 28px", borderRadius:10, border:"none", background:"#052e16", color:"#4ade80", fontWeight:700, fontSize:15, cursor:"pointer"}}>
          Try your first scan →
        </button>
      </div>

      {/* Mission */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>Our mission</h2>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          The things that affect your health most aren't always the things on the front of the label. Microplastics in food-contact packaging. Synthetic dyes linked to carcinogenicity. PFAS in non-stick coatings. PVA film dissolving into waterways. Synthetic textiles shedding microfibers onto your skin every day. The research is there — but it's scattered, technical, and inaccessible to most people.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          Partiqule is built to close that gap. We combine peer-reviewed science with two independent research passes to give every person access to the kind of information that used to require a toxicologist. Scan anything — a cleaning product, a piece of clothing, a food item, a baby product — and get a complete health picture in seconds.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85}}>
          Every score we produce is grounded in published research, including the New England Journal of Medicine, Nature Medicine, The Lancet, and the FDA. We flag what matters, explain why it matters, and show you what to do about it.
        </p>
      </div>

      {/* What we stand for */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 24px"}}>What we stand for</h2>
        <div style={{display:"flex", flexDirection:"column", gap:20}}>
          {[
            {title:"The full picture", body:"Microplastics are one part of the story. We score four dimensions: materials, exposure, packaging and sustainability. Your health, your home, and the planet are all affected differently by the same product."},
            {title:"Radical transparency", body:"Our scoring methodology is open. We show you the full breakdown across all four dimensions with the research behind each score. Judge for yourself rather than just trusting a number."},
            {title:"No conflicts of interest", body:"We recommend products because they're genuinely safer, not because we're paid to. Affiliate relationships are always clearly disclosed and never influence our scores."},
            {title:"Free to start", body:"Your first scans are on us. No account needed to get started — create a free account to save your history."},
            {title:"Science first", body:"Every score is grounded in published research. We cite our sources, maintain our methodology, and update our scoring when the science evolves."},
          ].map((v,i)=>(
            <div key={i} style={{display:"flex", gap:16, alignItems:"flex-start"}}>
              <div style={{width:8, height:8, borderRadius:"50%", background:"#16a34a", flexShrink:0, marginTop:6}}/>
              <div>
                <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:text, marginBottom:4}}>{v.title}</div>
                <div style={{fontSize:15, color:muted, lineHeight:1.7}}>{v.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founders & human oversight */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>Built by humans. Guided by expertise.</h2>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:24}}>
          Partiqule was founded by <strong style={{color:text}}>Paul and Sara Miller</strong>, combining 20+ years of experience across technology and operations. Every scoring framework, weighting decision, and quality standard on this platform is grounded in peer-reviewed research and intentionally designed by its founders. AI powers the scale — but the system itself is human-built and continuously refined.
        </p>

        {/* Founder cards */}
        <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16, marginBottom:24}}>
          {[
            {name:"Paul Miller", role:"Co-Founder, Product Development", detail:"Leads product development and defines the scoring framework behind every result.", photo:"/paul.jpg"},
            {name:"Sara Miller", role:"Co-Founder, Operations & Integrity", detail:"Leads day-to-day operations, ensuring Partiqule delivers consistent, trustworthy results at scale.", photo:"/sara.jpg"},
          ].map((person, i) => (
            <div key={i} style={{background:surface, borderRadius:14, padding:"24px 22px", border:`1.5px solid ${border}`, display:"flex", gap:18, alignItems:"flex-start"}}>
              <div style={{width:110, height:110, borderRadius:"50%", flexShrink:0, overflow:"hidden", border:"2px solid #16a34a"}}>
                <img src={person.photo} alt={person.name} style={{
                  width:"170%", height:"170%",
                  objectFit:"cover",
                  marginLeft:"-35%", marginTop:"-35%",
                }}/>
              </div>
              <div>
                <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16, color:text, marginBottom:4}}>{person.name}</div>
                <div style={{fontSize:12, fontWeight:600, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10}}>{person.role}</div>
                <div style={{fontSize:14, color:muted, lineHeight:1.7}}>{person.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Founders story */}
        <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, padding:"28px", border:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, marginBottom:16}}>
          <div style={{fontSize:12, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16}}>Why we started Partiqule</div>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:14}}>
            We started Partiqule after what we now call our awakening to product health.
          </p>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:14}}>
            It began with plastics. One night, after putting our kids to bed, we landed on <em>The Plastic Detox</em>. What we thought would be background noise quickly became a turning point. The documentary follows couples facing infertility challenges who, working with researcher Shanna Swan, explore the impact of microplastics on their fertility, highlighting how everyday exposures from food packaging to clothing to household items can accumulate in ways most of us never consider.
          </p>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:14}}>
            As parents who experienced fertility challenges with our second child, this hit close to home. We were paying attention to things like sugar and ingredients, but we had almost no awareness of how much plastic we were interacting with daily, or what that meant for our family's health.
          </p>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:14}}>
            But the more we dug in, the bigger the picture became. It was not just plastic. It was the PFAS coating on the pan we cooked in every night. It was the artificial dyes in the snacks our kids loved. It was the synthetic chemicals in the cleaning products we used around the house every week. It was the PVA film in the laundry pods dissolving into the water supply. Each discovery led to another, and the thread connecting all of them was the same: the products most of us use without a second thought are doing things to our health, our children's health, and the planet that we were never told about.
          </p>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:14}}>
            So we started asking questions. What products are actually safe? How do you weigh the different kinds of risk? Are there realistic alternatives for everyday life? Where do you even start? There was no simple, trustworthy tool that looked at the full picture.
          </p>
          <p style={{fontSize:15, color:muted, lineHeight:1.85, marginBottom:0}}>
            So we built one. Partiqule was designed to look at every product the way we wished something had looked at them for us: across materials, exposure, packaging and sustainability. The full picture, not just one piece of it. We are just two parents trying to do better for our family, and hoping to make it easier for yours.
          </p>
        </div>

        <div style={{padding:"14px 18px", background:isDark?"#0f2a18":"#f8fafc", borderRadius:12, border:`1px solid ${border}`}}>
          <span style={{fontSize:14, color:muted, lineHeight:1.7}}>
            Learn more:{" "}
            <span onClick={()=>onNavigate("science")} style={{color:"#16a34a", fontWeight:600, cursor:"pointer", textDecoration:"underline"}}>The Science</span>
            {" "}behind our scores, or see a full breakdown of our process on the{" "}
            <span onClick={()=>onNavigate("methodology")} style={{color:"#16a34a", fontWeight:600, cursor:"pointer", textDecoration:"underline"}}>How It Works</span>
            {" "}page.
          </span>
        </div>
      </div>

      {/* The impact */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>The impact we're working toward</h2>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          Every scan is a small act of informed decision-making. When enough people start checking before they buy, manufacturers notice. We have already seen this happen. Public pressure and consumer awareness led to bans on microbeads across dozens of countries, forced reformulations of PFAS-coated cookware, and drove major brands to rethink their packaging. That change started with information.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          We're not anti-product. We're pro-information. The goal is a world where every product that touches your food, your skin, your children, or your home carries the same transparency as a nutrition label: materials, exposure risk, sustainability impact, and what to choose instead.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85}}>
          Your health. Your family's health. The planet's health. That's the full picture Partiqule is built to give you.
        </p>
      </div>

      {/* AI Environmental Transparency */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>A note on AI energy and water use</h2>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          We know this question is coming. We'd rather address it directly than hope nobody asks.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          Each Partiqule scan runs two AI passes to generate your score. Based on current lifecycle research, a single AI query uses roughly 5–10ml of water when you account for data centre cooling and electricity generation. Two passes means a scan uses approximately <strong style={{color:text}}>15–20ml of water</strong> — about the same as brushing your teeth.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          We're not pretending AI is free. It isn't. But we think the trade-off is worth being transparent about. If a scan helps you replace a non-stick pan you cook on every day, or switch away from a detergent releasing synthetic chemicals into your home and waterways, the health payback is significant and ongoing. One scan. Years of impact.
        </p>
        <p style={{fontSize:16, color:muted, lineHeight:1.85, marginBottom:16}}>
          We also use Claude Haiku, Anthropic's most efficient model, specifically because it produces accurate results with a smaller compute footprint than larger models. We run the minimum number of passes needed for accuracy and cache results so the same product is never scored twice unnecessarily.
        </p>
        <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:14, padding:"20px 24px", border:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`}}>
          <div style={{fontSize:13, fontWeight:700, color:"#16a34a", marginBottom:8}}>Our commitment</div>
          <p style={{fontSize:15, color:muted, lineHeight:1.7, margin:0}}>
            As Partiqule grows, we'll publish an annual transparency note on our AI usage, water and energy estimates, and what we're doing to reduce them. We believe the tools that expose environmental harm should hold themselves to the same standard.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:26, color:text, margin:"0 0 16px"}}>Get in touch</h2>
        <p style={{fontSize:16, color:muted, lineHeight:1.85}}>
          Questions, partnerships, press, or just want to say hi? Reach us at{" "}
          <a href="mailto:paul@partiqule.com" onClick={e=>{e.preventDefault(); window.location.href="mailto:paul@partiqule.com";}} style={{color:"#16a34a", textDecoration:"none", fontWeight:600}}>paul@partiqule.com</a>.
          We read every email.
        </p>
      </div>
    </div>
  );
};

// ── METHODOLOGY PAGE ──────────────────────────────────────────
const MethodologyPage = ({isDark, text, muted, surface, border, isMobile}) => {
  const steps = [
    {
      number: "01",
      title: "Human-defined scoring parameters",
      color: "#16a34a",
      content: [
        {
          heading: "Founded by domain experts",
          body: "Partiqule was built by Paul and Sara Miller, who bring a combined 20 years of experience across technology, compliance, and operations. The scoring framework was designed drawing on published peer-reviewed research in polymer chemistry, toxicology, consumer product safety, and sustainability science. It was not generated by AI."
        },
        {
          heading: "What we measure",
          body: "Every product is evaluated across three spheres of impact — your personal health, the health of your family and home, and the health of the planet. These map to four scored dimensions: Materials, Exposure, Packaging and Sustainability."
        },
        {
          heading: "Dual scoring formula — food vs non-food",
          body: "Food and non-food products use different dimension weights because the risks are fundamentally different. What goes in your body matters more than what touches your skin.",
          list: [
            "Food, Beverage and Restaurant: Ingredients 90% · Packaging 10% — ingredients are the story. Organic spinach in a plastic bag still scores 2. The packaging concern is flagged separately, not used to tank a clean food.",
            "Beverage: Ingredients 75% · Packaging 25% — the container leaches directly into every sip. A plastic water bottle consumed daily is different from a plastic cereal box.",
            "Beauty and Personal Care: Materials 45% · Exposure 45% · Packaging 5% · Sustainability 5% — leave-on daily skin contact makes exposure equally important as what's in the product.",
            "Clothing and Shoes: Materials 35% · Exposure 30% · Sustainability 35% — microfiber shedding into waterways gives sustainability real weight.",
            "Home (cleaning, candles, furniture): Materials 30% · Exposure 45% · Packaging 10% · Sustainability 15% — inhalation and residue contact is the primary story.",
            "Baby Products: Materials 55% · Exposure 40% · Packaging 5% — developing systems and higher skin absorption demand the most protective formula.",
          ]
        },
        {
          heading: "NOVA processing level modifier — food only",
          body: "Before substance scoring, food products are assessed on the NOVA processing scale. Ultra-processed formulations (NOVA 4) start with a structural materials penalty regardless of individual ingredient claims — because industrial formulations with 20+ additives present cumulative chemical load beyond any single ingredient:",
          list: [
            "NOVA 1 — Unprocessed or minimally processed (fresh fruit, vegetables, plain oats, eggs): no penalty",
            "NOVA 2 — Processed culinary ingredients (oils, vinegar, flour, salt): no penalty on their own",
            "NOVA 3 — Processed foods (canned beans, cheese, fermented foods, bread with simple ingredients): materials baseline 2-4",
            "NOVA 4 — Ultra-processed formulations with industrial additives (most breakfast cereals, packaged snacks, plant-based meat, most fast food): materials baseline 5+",
          ]
        },
        {
          heading: "Added sugar penalty — food only",
          body: "WHO recommends less than 25g added sugar per day. Most cereal, snack bars, and flavored beverages are consumed daily, so cumulative sugar exposure is scored independently of substance concerns:",
          list: [
            "0–5g added sugar per serving: no penalty",
            "6–10g added sugar per serving: materials +1",
            ">10g added sugar per serving: materials +2",
            ">20g added sugar per serving: materials +3 — exceeds half the WHO daily limit in one serving",
          ]
        },
        {
          heading: "What the score means",
          body: "This is an ingredient safety score — it measures chemical risk, not nutritional quality. Organic butter scores 1-2. That means no pesticides, no synthetic additives. It does not mean unlimited consumption is recommended.",
          list: [
            "1-2 Safe — No significant chemical or ingredient concerns. Cleanest in its category from a safety standpoint.",
            "3-4 Good — Mostly clean. Minor concerns, nothing alarming. Fine for regular use.",
            "5-6 Caution — Real concerns worth knowing. Consider reducing use or finding a cleaner alternative.",
            "7-8 Switch — Significant concerns. We will show you a better option.",
            "9-10 Avoid — Known harmful substances. Significant and documented safety risk.",
          ]
        },
        {
          heading: "Positive signals that actively lower a score",
          body: "The following certifications are enforced as server-side score ceilings — they cannot be overridden by the AI:",
          list: [
            "USDA Organic certified food + no confirmed dangerous substances: final score cannot exceed 3",
            "Non-GMO Project Verified + no synthetic dyes + no synthetic preservatives: final score cannot exceed 4",
            "Fair Trade certified — workers paid living wage, safe conditions",
            "B-Corp certified — legal accountability to people and planet",
            "GOTS certified textiles — organic fiber verified through the full supply chain",
            "EWG Verified, NSF certified, or Rainforest Alliance",
          ]
        },
        {
          heading: null,
          body: "These parameters are hardcoded into the AI prompts and server-side formula. The AI applies them. It does not define them."
        }
      ]
    },
    {
      number: "02",
      title: "113-substance registry",
      color: "#dc2626",
      content: [
        {
          heading: "Ingredient-triggered score floors",
          body: "When the AI identifies a specific harmful substance in its analysis, a minimum materials score is enforced in code — not by the AI. This means the AI cannot underestimate the risk of a confirmed harmful ingredient regardless of how it weights other factors. Floors only activate when the substance is actually confirmed. A clean product like Poppi soda will never trigger a floor because it contains none of these substances."
        },
        {
          heading: "Sources",
          body: "The registry was built from seven authoritative sources:",
          list: [
            "EU REACH Candidate List — 253 Substances of Very High Concern as of February 2026",
            "IARC Monographs Volumes 1-141 — carcinogens classified Group 1 (known), 2A (probable), and 2B (possible)",
            "EWG Skin Deep database — cosmetic ingredient hazard ratings",
            "FDA banned and restricted substances lists",
            "EPA Safer Choice and Toxic Substances lists",
            "NTP 15th Report on Carcinogens",
            "WHO chemical safety guidelines",
          ]
        },
        {
          heading: "20 substance categories — 113 total substances",
          body: null,
          list: [
            "PFAS and forever chemicals (7) — PFOA, PFOS floor at M≥9 (IARC Group 1)",
            "Petroleum dyes (6) — Red 40, Yellow 5/6, titanium dioxide (EU food ban, IARC 2B)",
            "Preservatives (7) — TBHQ, BHA, BHT, potassium bromate, sodium nitrite",
            "Formaldehyde and releasers (6) — DMDM hydantoin, quaternium-15, bronopol",
            "Parabens (4) — long-chain isobutyl/isopropyl EU banned, floor M≥6",
            "Phthalates (5) — DEHP, DBP, BBP all EU SVHC, floor M≥7",
            "Bisphenols (5) — BPA, BPS, BPF, BPAF (EU SVHC February 2026)",
            "Chemical UV filters (6) — oxybenzone floor M≥7 (detected in bloodstream after single use)",
            "Heavy metals (7) — mercury, lead, arsenic, cadmium floor M≥8-9",
            "Plastic food contact chemicals (6) — PVC, polystyrene, PVA film, 1,4-dioxane",
            "Flame retardants (7) — PBDE banned, TCEP/TDCPP IARC 2B, TPhP EU SVHC 2024",
            "Synthetic fragrance and VOCs (6) — toluene, benzene, undisclosed phthalates",
            "Textile chemicals (7) — azo dyes, nonylphenol, PFAS DWR coatings",
            "Sweeteners and additives (8) — aspartame IARC 2B, BVO FDA proposed ban",
            "Antimicrobials (3) — triclosan and triclocarban FDA banned in soaps 2017",
            "Pesticides (5) — glyphosate IARC 2A, chlorpyrifos EPA banned 2021, PFAS pesticides",
            "Solvents (6) — n-hexane EU SVHC 2026, methylene chloride IARC Group 1",
            "Hair dye chemicals (4) — PPD, aminophenol, lead acetate, resorcinol",
            "Microplastics (2) — microbeads, microfiber shedding",
            "Polychlorinated compounds (3) — PCBs and dioxins floor M≥9 (IARC Group 1)",
          ]
        }
      ]
    },
    {
      number: "03",
      title: "AI analysis — two-pass system",
      color: "#2563eb",
      content: [
        {
          heading: "Why two passes?",
          body: "Each product scan runs two independent AI passes using Anthropic's Claude. The two-pass structure was designed to reduce hallucination and catch cases where the first pass may have over- or under-scored a product."
        },
        {
          heading: "Pass 1 — Research and analysis",
          body: "The AI searches the web for real material data on the specific product, then scores it across all four dimensions using the parameters we defined. It identifies harmful chemicals, natural materials, packaging type, sustainability story, and exposure pathway. For every scan it produces a Tier 1-4 composition classification and a named substance breakdown tailored to the category."
        },
        {
          heading: "Pass 2 — Independent audit",
          body: "A second independent AI instance reviews Pass 1 output as a skeptical auditor. It applies calibration anchors, checks that genuinely safe products are not penalised unfairly, and flags low-confidence results. The substance registry floors are then applied in server-side code after both passes complete — the AI cannot override them."
        },
        {
          heading: "Confidence levels",
          body: null,
          list: [
            "High — full ingredient list verified, known brand formulation, or label read directly from photo",
            "Medium — brand known but full ingredient list not public. Score based on known brand practices",
            "Low — unknown brand or no public data. Score is a conservative directional estimate",
          ]
        }
      ]
    },
    {
      number: "04",
      title: "Human quality review and test suite",
      color: "#d97706",
      content: [
        {
          heading: "Automated test suite",
          body: "We run an automated test suite against the live API after every significant change to scoring parameters. The suite scans 20+ known products and verifies scores fall within expected ranges, correct substances are flagged, and self-recommendation bugs are absent."
        },
        {
          heading: "Food model calibration anchors",
          body: null,
          list: [
            "Organic spinach / fresh produce: must score 1-2",
            "Larabar / RX Bar (whole food, minimal ingredients): must score 1-3",
            "Kashi Organic cereal (USDA certified): must score 1-3 — organic ceiling enforced server-side",
            "Kashi conventional GO cereal (Non-GMO, no dyes): must score 3-4 — Non-GMO clean ceiling enforced server-side",
            "365 WFM protein bites (dates, nuts, no dyes): must score 2-4",
            "Oats Overnight organic (certified organic): must score 2-4",
            "Cliff Bar (conventional oats, whole food base): must score 3-5",
            "Quaker oats conventional: must score 5-6 — primary oat with confirmed glyphosate",
            "Honey Nut Cheerios: must score 6-8 — primary oat with confirmed glyphosate above EWG child threshold + 12g sugar",
            "M&Ms / Skittles: must score 6-9 and flag petroleum dyes",
            "Hot dogs / processed meat: must score 6-9 and flag nitrites",
            "All alcoholic beverages: must score 6-9 and flag IARC Group 1 ethanol",
          ]
        },
        {
          heading: "Non-food calibration anchors",
          body: null,
          list: [
            "Blueland tablets must score 1-3. Neutrogena sunscreen must score 6-9 and flag oxybenzone.",
            "Teflon non-stick pan must score 6-9 and flag PTFE. Patagonia organic cotton tee must score 1-3.",
            "Poppi Prebiotic Soda must score 1-4 and must never recommend itself as an alternative.",
            "Pampers diapers must score 6-8. Hello Bello must score 3-5. Andy Pandy bamboo must score 2-4.",
          ]
        },
        {
          heading: "Cache invalidation",
          body: "When scoring parameters are updated or a systematic error is identified, the result cache is cleared so all products are rescored under the current methodology. Every score reflects the current rules."
        }
      ]
    },
    {
      number: "05",
      title: "Affiliate product standards",
      color: "#7c3aed",
      content: [
        {
          heading: "How alternatives are selected",
          body: "Products recommended as safer alternatives on Partiqule meet the following criteria:",
          list: [
            "The alternative must score materially lower than the scanned product across materials, exposure, and sustainability combined",
            "A product is never recommended as an alternative to itself or its own brand family",
            "Affiliate links are clearly disclosed with #ad labeling on every results page",
            "Affiliate relationships have zero influence on scoring — the score is calculated before any alternative is suggested. No brand can pay to change a score.",
          ]
        }
      ]
    },
    {
      number: "06",
      title: "Ongoing maintenance",
      color: "#0891b2",
      content: [
        {
          heading: null,
          body: null,
          list: [
            "Scoring parameters are reviewed when new peer-reviewed research is published on chemical exposure, endocrine disruption, or sustainability",
            "The substance registry is updated when EU REACH, IARC, EWG, FDA, or EPA publish new flagged substances — currently tracks the 253-entry REACH SVHC list updated February 2026",
            "The AI model version is reviewed periodically to ensure accuracy has not regressed",
            "An annual transparency note is published disclosing AI usage and any methodology changes",
            "User feedback is monitored — products that generate unusual concern or contradiction are flagged for manual review",
          ]
        }
      ]
    },
  ];

  return (
    <div style={{maxWidth:760, margin:"0 auto", padding:isMobile?"24px 16px 60px":"48px 40px 80px"}}>
      {/* Header */}
      <div style={{marginBottom:40}}>
        <div style={{fontSize:12, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12}}>Transparency & Methodology</div>
        <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?28:38, color:text, margin:"0 0 16px", letterSpacing:"-0.5px"}}>How Partiqule Works</h1>
        <p style={{fontSize:16, color:muted, lineHeight:1.8, margin:"0 0 8px"}}>
          Every score on Partiqule reflects the chemical and environmental impact of a product — what it's made of, how it exposes you, what happens to it after use. This page explains exactly how we measure that — combining expert-defined parameters, a 113-substance registry sourced from EU REACH, IARC, EWG, FDA and EPA, a dual scoring formula calibrated by category, and human quality review. We believe tools that expose hidden harm should be fully transparent about their own process.
        </p>
        <div style={{fontSize:13, color:muted, opacity:0.6, fontStyle:"italic"}}>Methodology last reviewed: April 2026</div>
      </div>

      {/* Key stats bar */}
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:40}}>
        {[
          {number:"20+", label:"Years combined expertise"},
          {number:"113", label:"Flagged substances in registry"},
          {number:"2",   label:"AI passes per scan"},
          {number:"100%",label:"Affiliate-independent scoring"},
        ].map((s,i) => (
          <div key={i} style={{background:surface, borderRadius:14, padding:"20px 16px", border:`1.5px solid ${border}`, textAlign:"center"}}>
            <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:"#16a34a", marginBottom:4}}>{s.number}</div>
            <div style={{fontSize:12, color:muted, lineHeight:1.4}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Founders callout */}
      <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, padding:"24px", border:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, marginBottom:48}}>
        <div style={{fontSize:12, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>About the founders</div>
        <p style={{fontSize:15, color:muted, lineHeight:1.8, margin:0}}>
          Partiqule was built by <strong style={{color:text}}>Paul and Sara Miller</strong>, who bring a combined 20 years of experience across technology, compliance, and audit. The scoring methodology, parameters, and quality review processes described on this page were designed and are maintained by them — not generated by AI. The AI applies the framework; Paul and Sara built it.
        </p>
      </div>

      {/* Steps */}
      {steps.map((step, si) => (
        <div key={si} style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
          <div style={{display:"flex", alignItems:"flex-start", gap:20, marginBottom:20}}>
            <div style={{width:48, height:48, borderRadius:12, background:`${step.color}15`, border:`1.5px solid ${step.color}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:15, color:step.color}}>{step.number}</span>
            </div>
            <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?20:24, color:text, margin:"10px 0 0", letterSpacing:"-0.3px"}}>{step.title}</h2>
          </div>
          {step.content.map((block, bi) => (
            <div key={bi} style={{marginBottom:16, paddingLeft:68}}>
              {block.heading && (
                <div style={{fontSize:14, fontWeight:700, color:text, marginBottom:6}}>{block.heading}</div>
              )}
              {block.body && (
                <p style={{fontSize:15, color:muted, lineHeight:1.8, margin:"0 0 8px"}}>{block.body}</p>
              )}
              {block.list && (
                <div style={{display:"flex", flexDirection:"column", gap:8}}>
                  {block.list.map((item, li) => (
                    <div key={li} style={{display:"flex", alignItems:"flex-start", gap:10}}>
                      <div style={{width:6, height:6, borderRadius:"50%", background:step.color, flexShrink:0, marginTop:6}}/>
                      <span style={{fontSize:15, color:muted, lineHeight:1.7}}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Scoring examples */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <div style={{display:"flex", alignItems:"flex-start", gap:20, marginBottom:20}}>
          <div style={{width:48, height:48, borderRadius:12, background:"#052e1615", border:"1.5px solid #052e1644", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
            <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:15, color:"#052e16"}}>eg.</span>
          </div>
          <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?20:24, color:text, margin:"10px 0 0", letterSpacing:"-0.3px"}}>Worked examples</h2>
        </div>
        <div style={{paddingLeft:68}}>

          {/* Example 1 */}
          <div style={{marginBottom:32}}>
            <div style={{fontSize:14, fontWeight:700, color:text, marginBottom:12}}>Example 1 — Non-stick frying pan</div>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {[
                {step:"Web search", detail:"AI searches for real material specs and confirms PTFE (Teflon) coating on cooking surface, aluminium body, plastic handle."},
                {step:"Pass 1: Analysis", detail:"Materials: 9 (PTFE/PFAS — FDA-flagged endocrine disruptors). Usage: 9 (daily ingestion pathway, heated surface accelerates breakdown). Packaging: 3. Sustainability: 4 (durable but PTFE unrecyclable). "},
                {step:"Pass 2: Audit", detail:"Daily heat + ingestion penalty confirmed. Weighted score: (9×0.40)+(9×0.25)+(3×0.15)+(4×0.15)+(6×0.05) = 3.6+2.25+0.45+0.6+0.3 = 7.2. Final score: 7. Confidence: high."},
                {step:"Human review", detail:"Paul cross-references EWG PFAS database. Score confirmed. Caraway and GreenPan ceramic alternatives shown with break-even at 200 uses."},
              ].map((row, i) => (
                <div key={i} style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"180px 1fr", gap:12, padding:"12px 16px", background:surface, borderRadius:10, border:`1px solid ${border}`}}>
                  <div style={{fontSize:13, fontWeight:700, color:"#16a34a"}}>{row.step}</div>
                  <div style={{fontSize:14, color:muted, lineHeight:1.6}}>{row.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Example 2 */}
          <div>
            <div style={{fontSize:14, fontWeight:700, color:text, marginBottom:12}}>Example 2 — Brawny paper towels</div>
            <p style={{fontSize:14, color:muted, lineHeight:1.7, marginBottom:12}}>
              A product that scores low on materials but high on sustainability — showing why all four dimensions matter, not just what the product is made of.
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {[
                {step:"Web search", detail:"AI confirms paper product with PE/PP plastic outer packaging, cardboard tube core, bleached virgin wood pulp."},
                {step:"Pass 1: Analysis", detail:"Materials: 2 (paper, no direct plastic exposure — packaging discarded before use). Usage: 2 (not ingested or absorbed). Packaging: 5 (PE film wrap, cardboard tube). Sustainability: 8 (single-use by design, high disposal frequency, virgin wood pulp). "},
                {step:"Pass 2: Audit", detail:"Low materials risk confirmed. Sustainability penalty upheld — single-use disposable by design. Weighted score: (2×0.40)+(2×0.25)+(5×0.15)+(8×0.15)+(4×0.05) = 0.8+0.5+0.75+1.2+0.2 = 3.45. Final score: 3."},
                {step:"Human review", detail:"Sara reviews — sustainability score of 8 appropriate. Swedish dishcloths, bamboo paper towels and microfibre cloths shown as alternatives."},
              ].map((row, i) => (
                <div key={i} style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"180px 1fr", gap:12, padding:"12px 16px", background:surface, borderRadius:10, border:`1px solid ${border}`}}>
                  <div style={{fontSize:13, fontWeight:700, color:"#16a34a"}}>{row.step}</div>
                  <div style={{fontSize:14, color:muted, lineHeight:1.6}}>{row.detail}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Research sources */}
      <div style={{marginBottom:48, paddingBottom:48, borderBottom:`1px solid ${border}`}}>
        <div style={{display:"flex", alignItems:"flex-start", gap:20, marginBottom:20}}>
          <div style={{width:48, height:48, borderRadius:12, background:"#0891b215", border:"1.5px solid #0891b244", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
            <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:13, color:"#0891b2"}}>refs</span>
          </div>
          <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?20:24, color:text, margin:"10px 0 0", letterSpacing:"-0.3px"}}>Research sources</h2>
        </div>
        <div style={{paddingLeft:68}}>
          <p style={{fontSize:15, color:muted, lineHeight:1.8, marginBottom:20}}>
            The scoring parameters on Partiqule are grounded in published peer-reviewed research. Key studies that informed our framework, organised by topic. We update these references as new research is published:
          </p>

          {[
            {
              category: "Microplastics in the human body",
              color: "#dc2626",
              refs: [
                {citation:"Ragusa et al. (2021)", title:"Plasticenta: First evidence of microplastics in human placenta", journal:"Environment International"},
                {citation:"Leslie et al. (2022)", title:"Discovery and quantification of plastic particle pollution in human blood", journal:"Environment International"},
                {citation:"Yan et al. (2024)", title:"Bioaccumulation of microplastics in decedent human brains", journal:"Nature Medicine — higher concentrations found in brains with dementia diagnosis"},
                {citation:"Marfella et al. (2024)", title:"Microplastics and nanoplastics in atheromas and cardiovascular events", journal:"New England Journal of Medicine — linked to increased heart attack and stroke risk"},
                {citation:"Schwabl et al. (2019)", title:"Detection of various microplastics in human stool", journal:"Annals of Internal Medicine"},
                {citation:"Amato-Lourenco et al. (2021)", title:"Presence of airborne microplastics in human lung tissue", journal:"THORAX — microplastics found in all regions of the human lung"},
                {citation:"Landrigan et al. (2025)", title:"Microplastic and nanoplastic pollution and associated potential disease risks", journal:"The Lancet Planetary Health — cardiovascular, metabolic and cancer risk review"},
                {citation:"WWF / University of Newcastle (2019)", title:"No Plastic in Nature: Assessing Plastic Ingestion from Nature to People", journal:"WWF Report — basis for the 5g/week estimate"},
              ]
            },
            {
              category: "Product-specific plastic exposure",
              color: "#ea580c",
              refs: [
                {citation:"Li et al. (2020)", title:"Microplastic release from the degradation of polypropylene feeding bottles during infant formula preparation", journal:"Nature Food — millions of particles per litre when heated"},
                {citation:"Hernandez et al. (2019)", title:"Plastic teabags release billions of microparticles and nanoparticles into tea", journal:"Environmental Science & Technology"},
                {citation:"Kosuth et al. (2018)", title:"Anthropogenic contamination of tap water, beer, and sea salt", journal:"PLOS ONE"},
                {citation:"Thompson et al. (2024)", title:"Twenty years of microplastics pollution research: what have we learned?", journal:"Science"},
                {citation:"Cox et al. (2019)", title:"Human consumption of microplastics", journal:"Environmental Science and Technology — estimates annual ingestion by food, water and air"},
                {citation:"Pivokonsky et al. (2018)", title:"Occurrence of microplastics in raw and treated drinking water", journal:"Science of the Total Environment"},
              ]
            },
            {
              category: "PFAS and non-stick chemicals",
              color: "#7c3aed",
              refs: [
                {citation:"FDA Total Diet Study (2024)", title:"Analytical results of testing food for PFAS from environmental contamination", journal:"U.S. FDA — PFAS detected across seafood, meat and dairy"},
                {citation:"Sunderland et al. (2019)", title:"A review of the pathways of human exposure to poly and perfluoroalkyl substances (PFAS)", journal:"Journal of Exposure Science and Environmental Epidemiology — thyroid, fertility, cholesterol"},
                {citation:"Steenland et al. (2018)", title:"Epidemiologic evidence on the health effects of perfluorooctanoic acid (PFOA)", journal:"Environmental Health Perspectives — kidney cancer, testicular cancer, thyroid disease"},
                {citation:"Rappazzo et al. (2017)", title:"Exposure to perfluorinated alkyl substances and health outcomes in children", journal:"International Journal of Environmental Research and Public Health"},
                {citation:"EWG (2023)", title:"PFAS in drinking water: updated national analysis", journal:"Environmental Working Group — PFAS detected in water supplies serving 200+ million Americans"},
              ]
            },
            {
              category: "Endocrine disruptors and hormonal chemicals",
              color: "#9333ea",
              refs: [
                {citation:"Vandenberg et al. (2012)", title:"Hormones and endocrine-disrupting chemicals: low-dose effects and nonmonotonic dose responses", journal:"Endocrine Reviews — foundational review on EDC mechanisms"},
                {citation:"Braun et al. (2021)", title:"Endocrine-disrupting chemicals: a scientific statement", journal:"Endocrine Society Scientific Statement — comprehensive review of BPA, phthalates, PFAS"},
                {citation:"Swan et al. (2021)", title:"Reproductive consequences of prenatal chemical exposure", journal:"Endocrinology — phthalates, BPA and reduced fertility (basis for The Plastic Detox documentary)"},
                {citation:"Hauser and Calafat (2005)", title:"Phthalates and human health", journal:"Occupational and Environmental Medicine — foundational phthalate exposure review"},
                {citation:"Rochester (2013)", title:"Bisphenol A and human health: a review of the literature", journal:"Reproductive Toxicology — BPA endocrine disruption and reproductive harm"},
                {citation:"Trasande et al. (2018)", title:"Estimating burden and disease costs of exposure to endocrine-disrupting chemicals in the European Union", journal:"Journal of Clinical Endocrinology and Metabolism — USD 163 billion annual health cost attributed to EDCs"},
              ]
            },
            {
              category: "Artificial dyes and food additives",
              color: "#ca8a04",
              refs: [
                {citation:"FDA (2025)", title:"FDA announces phase-out of petroleum-based synthetic food dyes", journal:"FDA press release — Red 3 banned, further petroleum-based dyes under review"},
                {citation:"McCann et al. (2007)", title:"Food additives and hyperactive behaviour in children", journal:"The Lancet — foundational study linking synthetic dyes to hyperactivity"},
                {citation:"Arnold et al. (2012)", title:"Artificial food colors and attention-deficit/hyperactivity disorder", journal:"Neurotherapeutics — meta-analysis confirming dye-behaviour link"},
                {citation:"EFSA (2021)", title:"Re-evaluation of titanium dioxide (E171) as a food additive", journal:"European Food Safety Authority — classified as no longer safe, EU food ban followed"},
                {citation:"Mortensen et al. (2017)", title:"Introduction to food colours", journal:"WHO/FAO JECFA — global review of synthetic food colour safety profiles"},
                {citation:"Poole et al. (2022)", title:"Aspartame and cancer risk: an updated meta-analysis", journal:"IARC — aspartame classified Group 2B possible carcinogen in 2023"},
              ]
            },
            {
              category: "Pesticides in produce — EWG 2026",
              color: "#16a34a",
              refs: [
                {citation:"EWG Shopper's Guide to Pesticides in Produce (2026)", title:"2026 Dirty Dozen and Clean Fifteen — PFAS pesticides found on 63% of Dirty Dozen samples", journal:"Environmental Working Group — analysis of 54,344 USDA samples across 47 fruits and vegetables"},
                {citation:"USDA Pesticide Data Program (2025)", title:"Pesticide residue testing of domestic and imported produce", journal:"USDA — basis for EWG annual rankings; produce washed and peeled before testing"},
                {citation:"Subramaniam et al. (2025)", title:"Updated methodology for EWG Shopper's Guide pesticide rankings including toxicity weighting", journal:"EWG — peer-reviewed methodology published 2025, applied to 2026 report"},
                {citation:"American Academy of Pediatrics (2012)", title:"Pesticide exposure in children", journal:"Pediatrics — children especially susceptible to pesticide exposure, even in utero"},
                {citation:"Mnif et al. (2011)", title:"Effect of endocrine disruptor pesticides: a review", journal:"International Journal of Environmental Research and Public Health — pesticides linked to endocrine disruption, reproductive harm"},
              ]
            },
            {
              category: "Ultra-processed foods",
              color: "#0891b2",
              refs: [
                {citation:"Monteiro et al. (2025)", title:"Ultra-processed foods and human health: the main thesis and the evidence", journal:"The Lancet — comprehensive evidence review linking UPFs to chronic disease"},
                {citation:"Srour et al. (2024)", title:"Ultra-processed food consumption and risk of all-cause and cause-specific mortality", journal:"BMJ — prospective cohort study, 30% higher mortality risk"},
                {citation:"Lane et al. (2024)", title:"Ultra-processed food exposure and adverse brain outcomes", journal:"Neurology — linked to cognitive decline, stroke and anxiety"},
                {citation:"Chen et al. (2023)", title:"Ultra-processed food consumption and risk of type 2 diabetes", journal:"The Lancet Regional Health Europe"},
                {citation:"Zhong et al. (2021)", title:"Association of ultra-processed food consumption with cardiovascular mortality", journal:"JAMA Internal Medicine"},
                {citation:"Blanco-Rojo et al. (2019)", title:"Consumption of ultra-processed foods and obesity", journal:"Nutrients — dose-response relationship between UPF intake and obesity risk"},
              ]
            },
            {
              category: "Synthetic preservatives",
              color: "#b45309",
              refs: [
                {citation:"NTP (2023)", title:"NTP technical report on BHA carcinogenicity", journal:"National Toxicology Program — BHA classified reasonably anticipated to be a human carcinogen"},
                {citation:"IARC (2010)", title:"IARC monographs on the evaluation of carcinogenic risks to humans — Volume 95", journal:"World Health Organization — BHA listed as Group 2B possible carcinogen"},
                {citation:"Bouvard et al. (2015)", title:"Carcinogenicity of consumption of red and processed meat", journal:"The Lancet Oncology — processed meat (sodium nitrate) classified Group 1 carcinogen"},
                {citation:"Hord et al. (2009)", title:"Food sources of nitrates and nitrites: the physiologic context for potential health benefits", journal:"American Journal of Clinical Nutrition — nitrate/nitrite pathways and cancer risk"},
                {citation:"Wormuth et al. (2006)", title:"What are the sources of exposure to eight frequently used phthalic acid esters in Europeans?", journal:"Risk Analysis — daily phthalate intake from food packaging and cosmetics"},
              ]
            },
            {
              category: "Sunscreen chemicals and skin absorption",
              color: "#dc2626",
              refs: [
                {citation:"Matta et al. (2019)", title:"Effect of sunscreen application under maximal use conditions on plasma concentration of sunscreen active ingredients", journal:"JAMA — oxybenzone, avobenzone detected in bloodstream after single application"},
                {citation:"Matta et al. (2020)", title:"Sunscreen drug products for over-the-counter human use: proposed rule", journal:"FDA — six chemical UV filters (including oxybenzone) flagged for further safety study"},
                {citation:"Downs et al. (2016)", title:"Toxicopathological effects of the sunscreen UV filter oxybenzone on coral reef fish", journal:"Archives of Environmental Contamination and Toxicology — reef toxicity, endocrine disruption"},
                {citation:"Kim and Choi (2021)", title:"Oxybenzone and its metabolites detected in human urine", journal:"Toxics — confirmed systemic absorption and urinary excretion"},
              ]
            },
            {
              category: "Synthetic fragrance and indoor air quality",
              color: "#16a34a",
              refs: [
                {citation:"Steinemann (2017)", title:"Fragranced consumer products: exposures and effects from emissions", journal:"Air Quality, Atmosphere and Health — 156 VOCs identified in 25 scented products"},
                {citation:"Nazaroff and Weschler (2004)", title:"Cleaning products and air fresheners: exposure to primary and secondary air pollutants", journal:"Atmospheric Environment — benzene, formaldehyde from synthetic fragrance products"},
                {citation:"Dodson et al. (2012)", title:"Endocrine disruptors and asthma-associated chemicals in consumer products", journal:"Environmental Health Perspectives — phthalates and synthetic fragrance linked to asthma"},
                {citation:"NRDC (2007)", title:"Synthetic musks and the secret hazards of synthetic fragrance", journal:"NRDC Report — phthalates, synthetic musks found in air fresheners and personal care"},
                {citation:"Klepeis et al. (2001)", title:"The National Human Activity Pattern Survey (NHAPS)", journal:"Journal of Exposure Science — Americans spend 87% of time indoors; indoor air quality a major exposure pathway"},
              ]
            },
            {
              category: "Microfibers and synthetic textiles",
              color: "#1d4ed8",
              refs: [
                {citation:"Browne et al. (2011)", title:"Accumulation of microplastic on shorelines worldwide: sources and sinks", journal:"Environmental Science and Technology — first study linking synthetic textiles to ocean microfibers"},
                {citation:"De Falco et al. (2018)", title:"Microfiber release to water, via laundering, and to air, via everyday use: a comparison", journal:"International Journal of Environmental Research and Public Health — shedding during wear"},
                {citation:"Henry et al. (2019)", title:"Microfibres from apparel and home textiles: prospective directions for research and policy", journal:"Science of the Total Environment — 700K+ fibers per wash estimate"},
                {citation:"Liu et al. (2022)", title:"Microplastic pollution in drinking water and food: a global systematic review", journal:"Science of the Total Environment — textiles as major source of food chain contamination"},
              ]
            },
            {
              category: "Children, pregnancy and vulnerable populations",
              color: "#9d174d",
              refs: [
                {citation:"Lanphear et al. (2005)", title:"Low-level environmental lead exposure and children's intellectual function", journal:"Environmental Health Perspectives — children's elevated sensitivity to environmental chemical exposure"},
                {citation:"Grandjean and Landrigan (2014)", title:"Neurobehavioural effects of developmental toxicity", journal:"The Lancet Neurology — 12 industrial chemicals identified as developmental neurotoxicants"},
                {citation:"Trasande et al. (2016)", title:"Prenatal phthalate exposure and reduced cognitive development", journal:"Environmental Health Perspectives — in utero chemical exposure linked to IQ loss"},
                {citation:"Braun et al. (2023)", title:"Exposure to per- and polyfluoroalkyl substances and children's health", journal:"Pediatrics — PFAS exposure in children linked to immune dysfunction and obesity"},
                {citation:"FDA/EPA (2024)", title:"Advice about eating fish for women who are pregnant or breastfeeding", journal:"FDA/EPA joint advisory — mercury and PFAS in fish during pregnancy"},
              ]
            },
            {
              category: "Flame retardants and household chemicals",
              color: "#374151",
              refs: [
                {citation:"Stapleton et al. (2011)", title:"Novel and high volume use flame retardants in US couches", journal:"Environmental Science and Technology — flame retardants in furniture foam linked to thyroid disruption"},
                {citation:"Harrad et al. (2008)", title:"Brominated flame retardants in domestic dust from UK homes", journal:"Chemosphere — PBDE exposure from household dust, particularly in children"},
                {citation:"Shaw et al. (2010)", title:"Halogenated flame retardants: do the fire safety benefits justify the risks?", journal:"Reviews on Environmental Health — endocrine disruption and developmental neurotoxicity"},
                {citation:"GreenScience Policy Institute (2021)", title:"Flame retardants in children's products: exposure and health risks", journal:"GreenScience Policy Institute — flame retardants in mattresses, car seats, baby products"},
              ]
            },
            {
              category: "Sustainability and single-use waste",
              color: "#059669",
              refs: [
                {citation:"Geyer et al. (2017)", title:"Production, use, and fate of all plastics ever made", journal:"Science Advances — basis for single-use plastic waste estimates"},
                {citation:"Jambeck et al. (2015)", title:"Plastic waste inputs from land into the ocean", journal:"Science — 8 million metric tons of plastic entering oceans annually"},
                {citation:"Ellen MacArthur Foundation (2016)", title:"The New Plastics Economy: Rethinking the future of plastics", journal:"World Economic Forum — lifecycle analysis of plastic packaging"},
                {citation:"Lau et al. (2020)", title:"Evaluating scenarios toward zero plastic pollution", journal:"Science — lifecycle analysis showing only 40% reduction in ocean plastic by 2040 under current policy"},
                {citation:"Zalasiewicz et al. (2016)", title:"The geological cycle of plastics and their use as a stratigraphic indicator", journal:"Anthropocene — plastic as permanent geological record"},
              ]
            },
          ].map((section, si) => (
            <div key={si} style={{marginBottom:28}}>
              <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
                <div style={{width:10, height:10, borderRadius:"50%", background:section.color, flexShrink:0}}/>
                <div style={{fontSize:12, fontWeight:700, color:section.color, textTransform:"uppercase", letterSpacing:"0.07em"}}>{section.category}</div>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:6}}>
                {section.refs.map((ref, i) => (
                  <div key={i} style={{padding:"10px 14px", background:surface, borderRadius:10, border:`1px solid ${border}`}}>
                    <div style={{fontSize:13, fontWeight:700, color:text, marginBottom:2}}>{ref.citation} — {ref.title}</div>
                    <div style={{fontSize:12, color:muted, fontStyle:"italic"}}>{ref.journal}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SCORING SYSTEM ─────────────────────────────────────── */}
      <div style={{marginBottom:40}}>
        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
          <span style={{fontSize:11, fontWeight:700, color:"#16a34a", textTransform:"uppercase", letterSpacing:"0.1em", background:"rgba(34,197,94,0.08)", padding:"3px 10px", borderRadius:20}}>How We Score</span>
        </div>
        <h2 style={{fontFamily:"'Outfit',sans-serif", fontSize:isMobile?20:26, fontWeight:700, color:text, margin:"0 0 8px", letterSpacing:"-0.3px"}}>The scoring system, in full</h2>
        <p style={{fontSize:15, color:muted, lineHeight:1.7, margin:"0 0 28px"}}>Every score is the output of a deterministic formula applied server-side. The AI provides dimension scores — we apply the weights. Here is the complete logic.</p>

        {/* Category formula table */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>Category Formulas — applied server-side, AI cannot override</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>Manufacturing removed — too inconsistent to measure fairly. All weights sum to 100%.</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:isMobile?11:13}}>
              <thead>
                <tr style={{background:isDark?"#1a2030":"#f1f5f9"}}>
                  {["Category","Ingredients / Materials","Exposure","Packaging","Sustainability","Why"].map((h,i)=>(
                    <th key={i} style={{padding:"10px 14px", textAlign:"left", fontWeight:700, color:text, fontSize:11, textTransform:"uppercase", letterSpacing:"0.05em", whiteSpace:"nowrap", borderBottom:`1px solid ${border}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {cat:"Food",         m:"90%", u:"0%",  pk:"10%", s:"0%",  why:"Ingredients are the entire story. Organic food in plastic still scores 2 — packaging is flagged separately."},
                  {cat:"Beverage",     m:"75%", u:"0%",  pk:"25%", s:"0%",  why:"The container leaches into every sip. Plastic bottle is part of the consumption story."},
                  {cat:"Restaurant",   m:"85%", u:"0%",  pk:"10%", s:"5%",  why:"Same logic as food, small sustainability weight for restaurant practices."},
                  {cat:"Supplement",   m:"65%", u:"25%", pk:"10%", s:"0%",  why:"Concentrated daily ingestion — what's in it matters most, plus how it interacts with your body."},
                  {cat:"Beauty",       m:"45%", u:"45%", pk:"5%",  s:"5%",  why:"Leave-on daily skin contact. Materials and exposure are equally important."},
                  {cat:"Toys",         m:"50%", u:"40%", pk:"5%",  s:"5%",  why:"Children put toys in their mouths. Ingestion risk is real."},
                  {cat:"Clothing",     m:"35%", u:"30%", pk:"0%",  s:"35%", why:"Microfiber shedding into waterways gives sustainability real weight. Packaging irrelevant."},
                  {cat:"Accessories",  m:"40%", u:"25%", pk:"0%",  s:"35%", why:"Jewelry touches skin all day. Environmental footprint of fast fashion accessories matters."},
                  {cat:"Home",         m:"30%", u:"45%", pk:"10%", s:"15%", why:"Inhalation and residue contact from cleaners, candles, and rugs is the primary story."},
                  {cat:"Baby",         m:"55%", u:"40%", pk:"5%",  s:"0%",  why:"Developing systems and higher skin absorption. Sustainability is secondary to safety."},
                ].map((row, i) => (
                  <tr key={i} style={{borderBottom:`1px solid ${border}`, background: i%2===0 ? "transparent" : isDark?"#1a2030":"#fafafa"}}>
                    <td style={{padding:"10px 14px", fontWeight:700, color:text, whiteSpace:"nowrap"}}>{row.cat}</td>
                    <td style={{padding:"10px 14px", color:"#16a34a", fontWeight:700}}>{row.m}</td>
                    <td style={{padding:"10px 14px", color:muted}}>{row.u}</td>
                    <td style={{padding:"10px 14px", color:muted}}>{row.pk}</td>
                    <td style={{padding:"10px 14px", color:muted}}>{row.s}</td>
                    <td style={{padding:"10px 14px", color:muted, fontSize:11, lineHeight:1.5, maxWidth:220}}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOVA processing modifier */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>NOVA Processing Level — applied before substance scoring</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>The biggest predictor of food risk after specific substances. Ultra-processed formulations (NOVA 4) start with a structural materials penalty regardless of individual ingredient claims.</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:isMobile?11:13}}>
              <thead>
                <tr style={{background:isDark?"#1a2030":"#f1f5f9"}}>
                  {["Level","Description","Examples","Materials baseline"].map((h,i)=>(
                    <th key={i} style={{padding:"10px 14px", textAlign:"left", fontWeight:700, color:text, fontSize:11, textTransform:"uppercase", letterSpacing:"0.05em", borderBottom:`1px solid ${border}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {level:"NOVA 1", desc:"Unprocessed or minimally processed", ex:"Fresh fruit, vegetables, plain oats, eggs, plain yogurt, meat", base:"1-2 — no penalty"},
                  {level:"NOVA 2", desc:"Processed culinary ingredients", ex:"Oils, vinegars, flours, salt, sugar on their own", base:"1-2 — no penalty"},
                  {level:"NOVA 3", desc:"Processed foods", ex:"Canned beans, cheese, cured meats, bread with simple ingredients, fermented foods", base:"2-4 — moderate"},
                  {level:"NOVA 4", desc:"Ultra-processed formulations — industrial ingredients not found in home kitchens", ex:"Breakfast cereals with synthetic dyes, packaged cookies, plant-based meat, most fast food, flavored chips", base:"5+ — structural penalty"},
                ].map((row,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${border}`, background:i%2===0?"transparent":isDark?"#1a2030":"#fafafa"}}>
                    <td style={{padding:"10px 14px", fontWeight:700, color:i===3?"#dc2626":text}}>{row.level}</td>
                    <td style={{padding:"10px 14px", color:muted, fontSize:12}}>{row.desc}</td>
                    <td style={{padding:"10px 14px", color:muted, fontSize:11}}>{row.ex}</td>
                    <td style={{padding:"10px 14px", fontWeight:700, color:i===3?"#dc2626":"#16a34a", fontSize:12}}>{row.base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sugar penalty */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>Added Sugar Penalty — scored independently of other concerns</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>WHO recommends less than 25g added sugar per day. Most cereal, snack bars, and beverages are consumed daily — cumulative exposure matters.</div>
          </div>
          <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:8}}>
            {[
              {range:"0–5g added sugar per serving", penalty:"No penalty", color:"#16a34a"},
              {range:"6–10g added sugar per serving", penalty:"Materials +1", color:"#d97706"},
              {range:">10g added sugar per serving", penalty:"Materials +2", color:"#ea580c"},
              {range:">20g added sugar per serving", penalty:"Materials +3 — exceeds half the WHO daily limit in one serving", color:"#dc2626"},
            ].map((row,i)=>(
              <div key={i} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, background:isDark?"#1a2433":"#f8fafc", border:`1px solid ${border}`}}>
                <div style={{fontSize:13, color:text}}>{row.range}</div>
                <div style={{fontSize:12, fontWeight:700, color:row.color, flexShrink:0, marginLeft:12}}>{row.penalty}</div>
              </div>
            ))}
          </div>
        </div>

        {/* IARC substance floors - updated */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>IARC Substance Floors — context-sensitive, not a blanket rule</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>IARC classifies the strength of evidence, not the dose. A trace of glyphosate in a multi-grain product is not the same as glyphosate as the primary ingredient in a children's cereal.</div>
          </div>
          <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:12}}>
            {[
              {
                tier:"IARC Group 1 — Known carcinogen as primary ingredient",
                floor:"Materials 7-8 minimum",
                color:"#dc2626", bg:"#fef2f2", border_:"#fecaca",
                examples:"Nitrites in hot dogs/bacon/deli meat. Ethanol in all alcoholic beverages.",
                note:"The science says: causes cancer in humans. No safe level per WHO."
              },
              {
                tier:"IARC Group 2A — Probable carcinogen as PRIMARY ingredient with confirmed residues",
                floor:"Materials 6-7",
                color:"#d97706", bg:"#fffbeb", border_:"#fde68a",
                examples:"Glyphosate in Cheerios/Quaker oats (EWG confirmed above child threshold — oats are the primary ingredient).",
                note:"Context: oats as primary ingredient in a children's daily cereal is different from oats as one of 7 grains."
              },
              {
                tier:"IARC Group 2A — Probable carcinogen as MINOR ingredient in otherwise clean product",
                floor:"Materials +1 only, flagged as MEDIUM",
                color:"#ca8a04", bg:"#fefce8", border_:"#fef08a",
                examples:"Glyphosate in Kashi (oats are 1 of 7+ whole grains, Non-GMO verified, high fiber, no dyes).",
                note:"Dose and dilution matter. The IARC classification applies to the substance, not the product."
              },
              {
                tier:"IARC Group 2B — Possible carcinogen confirmed in product",
                floor:"Materials +1-2, flagged as concern",
                color:"#059669", bg:"#f0fdf4", border_:"#bbf7d0",
                examples:"BHA, TBHQ, titanium dioxide (EU food ban), caramel color IV, potassium bromate, aspartame.",
                note:"Possible evidence — worth flagging but not the same severity as confirmed carcinogens."
              },
              {
                tier:"Speculative — hedged language only",
                floor:"No floor applied",
                color:"#6b7280", bg:isDark?"#0f2a18":"#f8fafc", border_:border,
                examples:"\"May contain,\" \"possible trace,\" \"could include\" — stripped before floors are checked.",
                note:"Speculation does not warrant a penalty regardless of how dangerous the theoretical substance is."
              },
            ].map((item, i) => (
              <div key={i} style={{background:item.bg, border:`1.5px solid ${item.border_}`, borderRadius:12, padding:"14px 16px"}}>
                <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, flexWrap:"wrap", marginBottom:6}}>
                  <div style={{fontSize:13, fontWeight:700, color:item.color, flex:1}}>{item.tier}</div>
                  <div style={{fontSize:12, fontWeight:700, color:item.color, background:"white", padding:"2px 10px", borderRadius:10, border:`1px solid ${item.border_}`, whiteSpace:"nowrap", flexShrink:0}}>{item.floor}</div>
                </div>
                <div style={{fontSize:12, color:isDark?"#6ee7b7":"#374151", lineHeight:1.6, marginBottom:4}}><strong>Examples:</strong> {item.examples}</div>
                <div style={{fontSize:11, color:item.color, fontStyle:"italic"}}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Positive ceilings */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>Positive Ceilings — clean products are protected from over-scoring</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>We have 113 substance floors that push risky products up. These ceilings prevent genuinely clean products from being over-penalised by a paranoid AI. Applied server-side — the AI cannot override them.</div>
          </div>
          <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:10}}>
            {[
              {label:"USDA Organic certified + no confirmed dangerous substances", cap:"Final score cannot exceed 3", color:"#16a34a", note:"Organic certification prohibits synthetic pesticides, GMOs, and most synthetic additives. If no dangerous substance floors fired, the product is genuinely clean."},
              {label:"Non-GMO Project Verified + no synthetic dyes + no synthetic preservatives", cap:"Final score cannot exceed 4", color:"#059669", note:"Conventionally farmed but free of the worst additives. Kashi GO, clean conventional snacks, and similar products land here."},
            ].map((item,i)=>(
              <div key={i} style={{padding:"12px 16px", background:isDark?"#1a2433":"#f0fdf4", borderRadius:12, border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#bbf7d0"}`}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:6, flexWrap:"wrap"}}>
                  <div style={{fontSize:13, fontWeight:700, color:item.color, flex:1}}>{item.label}</div>
                  <div style={{fontSize:12, fontWeight:700, color:"#fff", background:item.color, padding:"3px 12px", borderRadius:10, flexShrink:0}}>{item.cap}</div>
                </div>
                <div style={{fontSize:12, color:muted, lineHeight:1.5}}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Child vulnerability system */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>Child Vulnerability System</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>Children have thinner skin, developing organ systems, and lower body weight — meaning a higher effective dose per kilogram. Every score can be viewed through a child safety lens.</div>
          </div>
          <div style={{padding:"16px 20px"}}>
            <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12, marginBottom:16}}>
              {[
                {sub:"Petroleum dyes (Red 40, Yellow 5/6, Blue 1)", bump:"+2", why:"Linked to ADHD and hyperactivity in children — McCann et al., The Lancet 2007"},
                {sub:"PFAS / forever chemicals", bump:"+2", why:"Disrupts immune and hormonal development — CDC child health priority"},
                {sub:"Phthalates (DEHP, DBP)", bump:"+2", why:"Disrupts reproductive development — most critical in early childhood (Swan 2021)"},
                {sub:"Flame retardants (PBDE, TCEP)", bump:"+2", why:"Neurotoxicity disproportionately affects developing brains (Stapleton 2011)"},
                {sub:"Glyphosate residue", bump:"+1", why:"EWG child threshold is lower than adult — body weight dose adjustment"},
                {sub:"Synthetic fragrance", bump:"+1", why:"Developing endocrine systems more sensitive to fragrance phthalates"},
                {sub:"Parabens", bump:"+1", why:"Hormone mimicry — developing endocrine systems more vulnerable"},
                {sub:"BPA / BPS / BPF", bump:"+2", why:"Endocrine disruption most harmful during developmental windows"},
              ].map((item, i) => (
                <div key={i} style={{background:isDark?"#1a2433":"#f8fafc", borderRadius:10, padding:"10px 14px", border:`1px solid ${border}`}}>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4}}>
                    <div style={{fontSize:12, fontWeight:700, color:text}}>{item.sub}</div>
                    <div style={{fontSize:12, fontWeight:800, color:"#dc2626", background:"#fef2f2", padding:"1px 8px", borderRadius:8, flexShrink:0, marginLeft:8}}>{item.bump}</div>
                  </div>
                  <div style={{fontSize:11, color:muted, lineHeight:1.5}}>{item.why}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:12, color:muted, background:isDark?"#1a2433":"#f0fdf4", borderRadius:10, padding:"10px 14px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#bbf7d0"}`}}>
              <strong style={{color:"#16a34a"}}>How to use it:</strong> Tap the child safety toggle on any result to see the child-adjusted score. Child products (Honey Nut Cheerios, Pampers, baby lotions) are auto-detected and show a prompt automatically.
            </div>
          </div>
        </div>

        {/* Consistency checks */}
        <div style={{background:surface, borderRadius:14, border:`1px solid ${border}`, overflow:"hidden", marginBottom:24}}>
          <div style={{padding:"16px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
            <div style={{fontSize:13, fontWeight:700, color:text}}>Hallucination Guards — 4 rules that run after every score</div>
            <div style={{fontSize:12, color:muted, marginTop:2}}>The AI scores dimensions. These rules catch cases where those scores contradict the AI's own reasoning.</div>
          </div>
          <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:10}}>
            {[
              {rule:"Label contradiction ceiling", detail:"If the AI's own label says \"inert,\" \"zero leaching,\" or \"minimal exposure\" but scored that dimension 6+, the score is capped at 4. The AI cannot contradict itself."},
              {rule:"Dimension spread sanity check", detail:"If Materials scores 1-2 but the formula would produce a final score of 7+, the output is flagged and recomputed. A clean-ingredient product cannot score dangerous."},
              {rule:"Confidence-linked ceiling", detail:"Low confidence means the AI doesn't know enough to flag confirmed harmful substances. A low-confidence result cannot score above 6 — directional estimates only."},
              {rule:"Inert material ceiling", detail:"Glass, borosilicate, ceramic, and stainless steel cannot score above 3 on Materials. Hot water through glass has zero leaching risk. This is non-negotiable."},
            ].map((item, i) => (
              <div key={i} style={{display:"flex", gap:14, padding:"12px 14px", background:isDark?"#1a2433":"#f8fafc", borderRadius:10, border:`1px solid ${border}`}}>
                <div style={{width:24, height:24, borderRadius:"50%", background:"#052e16", color:"#4ade80", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0}}>{i+1}</div>
                <div>
                  <div style={{fontSize:13, fontWeight:700, color:text, marginBottom:3}}>{item.rule}</div>
                  <div style={{fontSize:12, color:muted, lineHeight:1.6}}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div style={{background:isDark?"#0f2a18":"#f8fafc", borderRadius:14, padding:"20px 24px", border:`1px solid ${border}`}}>
        <div style={{fontSize:13, fontWeight:700, color:text, marginBottom:8}}>Questions about our methodology?</div>
        <p style={{fontSize:14, color:muted, lineHeight:1.7, margin:0}}>
          We welcome scrutiny. If you believe a score is inaccurate, or have published research that should inform our parameters, email us at{" "}
          <a href="mailto:paul@partiqule.com" onClick={e=>{e.preventDefault(); window.location.href="mailto:paul@partiqule.com";}} style={{color:"#16a34a", textDecoration:"none", fontWeight:600}}>paul@partiqule.com</a>.
          We read every message.
        </p>
      </div>
    </div>
  );
};

// ── PRIVACY PAGE ──────────────────────────────────────────────
// ── AUTH MODAL ────────────────────────────────────────────────
const AuthModal = ({isDark, onClose, onAuth}) => {
  const [mode,     setMode]     = useState("signin"); // signin | signup | reset
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [success,  setSuccess]  = useState(null);

  const surface = isDark ? "#0f2a18" : "#fff";
  const border  = isDark ? "rgba(34,197,94,0.15)" : "#e5e7eb";
  const text    = isDark ? "#f0fdf4" : "#111";
  const muted   = isDark ? "#6ee7b7" : "#666";

  const submit = async () => {
    if (!email.includes("@") || (mode !== "reset" && password.length < 6)) {
      setError(mode === "reset" ? "Enter a valid email." : "Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setLoading(true); setError(null); setSuccess(null);
    try {
      if (mode === "signup") {
        const { error: e } = await supabase.auth.signUp({ email, password });
        if (e) throw e;
        setSuccess("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else if (mode === "signin") {
        const { data, error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) throw e;
        onAuth(data.user);
        onClose();
      } else if (mode === "reset") {
        const { error: e } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "https://partiqule.com/reset-password",
        });
        if (e) throw e;
        setSuccess("Password reset email sent. Check your inbox.");
      }
    } catch(e) {
      setError(e.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{position:"fixed", inset:0, zIndex:9998, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", padding:16}}
      onClick={onClose}>
      <div style={{background:surface, borderRadius:20, padding:"32px 28px", width:"100%", maxWidth:400, border:`1.5px solid ${border}`, position:"relative"}}
        onClick={e=>e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose} style={{position:"absolute", top:16, right:16, background:"none", border:"none", cursor:"pointer", fontSize:20, color:muted, lineHeight:1}}>×</button>

        {/* Logo */}
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:24}}>
          <div style={{width:32, height:32, borderRadius:8, background:"#052e16", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <span style={{color:"#4ade80", fontWeight:800, fontSize:16}}>P</span>
          </div>
          <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:text}}>Partiqule</span>
        </div>

        <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:22, color:text, margin:"0 0 6px"}}>
          {mode === "signup" ? "Create account" : mode === "reset" ? "Reset password" : "Welcome back"}
        </h2>
        <p style={{fontSize:14, color:muted, margin:"0 0 24px", lineHeight:1.5}}>
          {mode === "signup" ? "Save your scan history and never lose it." : mode === "reset" ? "We will send you a reset link." : "Sign in to access your scan history."}
        </p>

        {error   && <div style={{background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#dc2626", marginBottom:16}}>{error}</div>}
        {success && <div style={{background:"rgba(34,197,94,0.08)", border:"1px solid #bbf7d0", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#16a34a", marginBottom:16}}>{success}</div>}

        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&submit()}
            style={{padding:"11px 14px", borderRadius:10, border:`1.5px solid ${border}`, background:isDark?"#080f0a":"#f9fafb", color:text, fontSize:14, outline:"none"}}/>
          {mode !== "reset" && (
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&submit()}
              style={{padding:"11px 14px", borderRadius:10, border:`1.5px solid ${border}`, background:isDark?"#080f0a":"#f9fafb", color:text, fontSize:14, outline:"none"}}/>
          )}
          <button onClick={submit} disabled={loading}
            style={{padding:"12px", borderRadius:10, background:"#052e16", color:"#4ade80", border:"none", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, cursor:loading?"default":"pointer", opacity:loading?0.7:1}}>
            {loading ? "Please wait..." : mode === "signup" ? "Create account" : mode === "reset" ? "Send reset link" : "Sign in"}
          </button>
        </div>

        <div style={{marginTop:20, textAlign:"center", fontSize:13, color:muted}}>
          {mode === "signin" && <>
            <span style={{cursor:"pointer", color:"#16a34a"}} onClick={()=>{setMode("signup"); setError(null); setSuccess(null);}}>Create an account</span>
            <span style={{margin:"0 10px", opacity:0.4}}>·</span>
            <span style={{cursor:"pointer", color:muted}} onClick={()=>{setMode("reset"); setError(null); setSuccess(null);}}>Forgot password?</span>
          </>}
          {mode === "signup" && <>
            Already have an account?{" "}
            <span style={{cursor:"pointer", color:"#16a34a"}} onClick={()=>{setMode("signin"); setError(null); setSuccess(null);}}>Sign in</span>
          </>}
          {mode === "reset" && <>
            <span style={{cursor:"pointer", color:"#16a34a"}} onClick={()=>{setMode("signin"); setError(null); setSuccess(null);}}>Back to sign in</span>
          </>}
        </div>
      </div>
    </div>
  );
};

const PrivacyPage = ({isDark, text, muted, surface, border, isMobile}) => {
  const sections = [
    { title:"1. Who we are", body:"Partiqule is a product health scanner operated by Partiqule Inc. We help people understand what is in the products they use every day. You can reach us at paul@partiqule.com." },
    { title:"2. What information we collect", body:"Partiqule collects the minimum information needed to provide the service.\n\nScan data: When you scan a product, we send the product name or image to our AI analysis service (Anthropic). We do not store a record of scans associated with you unless you create an account.\n\nEmail address: If you choose to save your scan history, we collect your email address. We use this only to associate your scan history with your account and to notify you of important product recalls or reformulations. We do not send marketing emails without your explicit consent.\n\nUsage data: We collect anonymous analytics (page views, scan counts, affiliate clicks) using Plausible Analytics, which is privacy-preserving and does not use cookies or track individuals.\n\nDevice data: We do not collect device identifiers, location data, or any data beyond what is described above." },
    { title:"3. How we use your information", body:"We use your information only to:\n\n• Provide and improve the Partiqule service\n• Associate your scan history with your account (if you create one)\n• Notify you of product recalls or significant reformulations for products you have scanned\n• Understand aggregate usage patterns to improve the product\n\nWe do not sell your data. We do not share your data with advertisers. We do not use your data for profiling or targeted advertising." },
    { title:"4. Affiliate links", body:"Partiqule earns a commission when you purchase products through affiliate links. These are clearly marked with an #ad disclosure. Affiliate relationships have no influence on our scoring or recommendations — scores are generated independently by our AI analysis system." },
    { title:"5. Third-party services", body:"Partiqule uses the following third-party services to operate:\n\n• Anthropic — AI analysis of product queries. Queries are processed per Anthropic's privacy policy.\n• Railway — Server hosting. Your requests pass through Railway infrastructure.\n• Vercel — Frontend hosting.\n• Plausible Analytics — Anonymous, cookieless usage analytics.\n• Amazon Associates — Affiliate product links.\n\nWe do not use Google Analytics, Facebook Pixel, or any advertising trackers." },
    { title:"6. Data retention", body:"Scan history stored in your browser (localStorage) persists until you clear it or use the Clear History function in the app.\n\nIf you create an account, your scan history is stored on our servers and retained until you delete your account.\n\nEmail addresses are retained until you request deletion." },
    { title:"7. Your rights", body:"You have the right to:\n\n• Access the data we hold about you\n• Request deletion of your account and associated data\n• Opt out of any email communications\n\nTo exercise any of these rights, email paul@partiqule.com. We will respond within 30 days." },
    { title:"8. Children", body:"Partiqule is not directed at children under 13. We do not knowingly collect personal information from children under 13." },
    { title:"9. Changes to this policy", body:"We may update this Privacy Policy from time to time. We will notify registered users of material changes by email. Continued use of Partiqule after changes constitutes acceptance of the updated policy." },
    { title:"10. Contact", body:"Questions about privacy? Email paul@partiqule.com." },
  ];
  return (
    <div style={{maxWidth:720, margin:"0 auto", padding:isMobile?"24px 16px 60px":"48px 40px 80px"}}>
      <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?24:32, color:text, margin:"0 0 8px"}}>Privacy Policy</h1>
      <p style={{fontSize:14, color:muted, marginBottom:40}}>Last updated: April 2026</p>
      {sections.map((s, i) => (
        <div key={i} style={{marginBottom:32, paddingBottom:32, borderBottom: i < sections.length-1 ? `1px solid ${border}` : "none"}}>
          <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:text, margin:"0 0 12px"}}>{s.title}</h2>
          {s.body.split("\n\n").map((para, j) => (
            <p key={j} style={{fontSize:15, color:muted, lineHeight:1.8, margin:"0 0 12px", whiteSpace:"pre-line"}}>{para}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

const TermsPage = ({isDark, text, muted, surface, border, isMobile}) => {
  const sections = [
    { title:"1. Overview", body:"Partiqule provides product health information and exposure scores to help you make more informed decisions. By using Partiqule, you agree to these Terms of Service." },
    { title:"2. Not medical advice", body:"Partiqule's scores, analyses, and recommendations are provided for informational and educational purposes only. They are based on available peer-reviewed research and AI analysis, and are not medical, health, or safety advice.\n\nYou should not rely on Partiqule as a substitute for professional medical, scientific, or nutritional guidance. Use of the platform is at your own risk." },
    { title:"3. How our scoring works", body:"Our product scores are generated using a two-pass AI analysis system and research-based weighting factors covering material composition, usage exposure, packaging and sustainability.\n\nWhile we aim for accuracy and transparency, we do not guarantee that any score, analysis, or recommendation is complete, accurate, or up to date. Product formulations change. New research emerges. Treat scores as a starting point for your own research." },
    { title:"4. Affiliate disclosure", body:"Some links on Partiqule are affiliate links. We may earn a commission if you make a purchase through them, at no additional cost to you.\n\nAffiliate relationships do not influence our scoring or recommendations. No brand can pay to change a score." },
    { title:"5. No warranties", body:"Partiqule is provided as-is and as-available. We make no warranties, express or implied, including but not limited to accuracy or completeness of information, fitness for a particular purpose, or reliability of the service." },
    { title:"6. Limitation of liability", body:"To the fullest extent permitted by law, Partiqule and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service, decisions made based on Partiqule content, or third-party products or services." },
    { title:"7. Third-party services", body:"Partiqule links to third-party websites including retailers and research sources. We are not responsible for their content, products, or privacy practices.\n\nOur analysis is powered in part by Anthropic's AI. By using Partiqule, you acknowledge that product queries are processed by Anthropic per their usage policies." },
    { title:"8. Acceptable use", body:"You agree not to misuse or attempt to disrupt the service, attempt to reverse engineer or manipulate scoring systems, scrape or mass-query the API, or use the platform for unlawful purposes." },
    { title:"9. Intellectual property", body:"All content, branding, scoring methodology, and product database on Partiqule are owned by Partiqule and may not be copied, reproduced, or distributed without permission." },
    { title:"10. Changes to these terms", body:"We may update these Terms from time to time. Continued use of Partiqule after changes means you accept the updated Terms. Material changes will be communicated to registered users by email." },
    { title:"11. Governing law", body:"These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles." },
    { title:"12. Contact", body:"Questions about these Terms? Email paul@partiqule.com." },
  ];
  return (
    <div style={{maxWidth:720, margin:"0 auto", padding:isMobile?"24px 16px 60px":"48px 40px 80px"}}>
      <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?24:32, color:text, margin:"0 0 8px"}}>Terms of Service</h1>
      <p style={{fontSize:14, color:muted, marginBottom:40}}>Last updated: April 2026</p>
      {sections.map((s, i) => (
        <div key={i} style={{marginBottom:32, paddingBottom:32, borderBottom: i < sections.length-1 ? `1px solid ${border}` : "none"}}>
          <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:18, color:text, margin:"0 0 12px"}}>{s.title}</h2>
          {s.body.split("\n\n").map((para, j) => (
            <p key={j} style={{fontSize:15, color:muted, lineHeight:1.8, margin:"0 0 12px", whiteSpace:"pre-line"}}>{para}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

// ── RESPONSIVE HOOK ───────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

// ── MAIN APP ──────────────────────────────────────────────────
function App() {
  const [query,       setQuery]      = useState("");
  const [searchMode,  setSearchMode] = useState("name");
  const [result,      setResult]     = useState(null);
  const [loading,     setLoading]    = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayTimerRef = useRef(null);
  const loadingStartRef = useRef(null);
  const MIN_OVERLAY_MS  = 2000; // minimum time to show globe

  useEffect(()=>{
    if(loading){
      setShowOverlay(true);
      loadingStartRef.current = Date.now();
      clearTimeout(overlayTimerRef.current);
    } else {
      // Loading done — calculate how long we've already shown the globe
      const elapsed  = Date.now() - (loadingStartRef.current || Date.now());
      const remaining = Math.max(0, MIN_OVERLAY_MS - elapsed);
      overlayTimerRef.current = setTimeout(()=>setShowOverlay(false), remaining);
    }
    return()=>clearTimeout(overlayTimerRef.current);
  },[loading]);
  const [error,       setError]      = useState(null);
  const [isDark,      setIsDark]     = useState(true);
  const [page,        setPage]       = useState("home");
  const [guideSlug,   setGuideSlug]  = useState("");

  const navigateTo = (pg, slug="") => {
    setPage(pg);
    if(pg==="guides"){ setGuideSlug(""); window.history.pushState({},"","/guides"); }
    else if(pg==="guide"&&slug){ setGuideSlug(slug); window.history.pushState({},"",`/guides/${slug}`); }
    else if(pg==="home"){ setResult(null); window.history.pushState({},"","/"); }
  };
  const [menuOpen,    setMenuOpen]   = useState(false);
  const [history,     setHistory]    = useState(()=>{try{return JSON.parse(localStorage.getItem("ps_history")||"[]");}catch{return [];}});
  const [emailDismissed, setEmailDismissed] = useState(()=>{try{return !!localStorage.getItem("ps_email_captured");}catch{return false;}});
  const [captureEmail,   setCaptureEmail]   = useState("");
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureMsg,     setCaptureMsg]     = useState("");

  const submitCaptureEmail = async () => {
    if (!captureEmail.includes("@")) return;
    setCaptureSubmitting(true);
    try {
      await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email: captureEmail.trim(), source: "scan_result" }),
      });
      setCaptureMsg("You are in! Check your inbox for a welcome email.");
      try { localStorage.setItem("ps_email_captured","1"); } catch {}
      setTimeout(()=>setEmailDismissed(true), 3000);
    } catch {
      setCaptureMsg("Something went wrong. Please try again.");
    }
    setCaptureSubmitting(false);
  };
  const [emailInput,  setEmailInput] = useState("");
  const [emailDone,   setEmailDone]  = useState(false);
  const [user,        setUser]       = useState(null);
  const [showAuth,    setShowAuth]   = useState(false);
  const [childMode,     setChildMode]  = useState(()=>{try{return !!JSON.parse(localStorage.getItem("ps_child_mode_default")||"false");}catch{return false;}});
  const [pregnancyMode, setPregnancyMode] = useState(()=>{try{return !!JSON.parse(localStorage.getItem("ps_pregnancy_mode")||"false");}catch{return false;}});
  const [revealDone,    setRevealDone]  = useState(false);
  const [showAlts,    setShowAlts]   = useState(false);
  const [fabOpen,     setFabOpen]    = useState(false);
  const [altSource,   setAltSource]  = useState("amazon"); // "amazon" | "brand" | "bigbox"
  const [showScanModal, setShowScanModal] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [modalQuery,  setModalQuery] = useState("");
  // ── Scan counter + subscription ───────────────────────────────
  const [scanCount,    setScanCount]    = useState(()=>{try{return parseInt(localStorage.getItem("ps_scan_count")||"0");}catch{return 0;}});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(null); // "account" | "paywall" | null
  const [iapPrice,     setIapPrice]     = useState("$4.99/month"); // loaded from StoreKit
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAccountDeleted, setShowAccountDeleted] = useState(false);

  const deleteAccount = async () => {
    if (!user) { alert("Not signed in."); return; }
    try {
      const r = await fetch(`${API_BASE}/delete-account`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ userId: user.id }),
      });
      const d = await r.json();
      if (!r.ok) { alert("Delete failed: " + (d.error || r.status)); return; }
      await supabase.auth.signOut().catch(()=>{});
      setUser(null);
      setShowDeleteConfirm(false);
      setHistory([]);
      try { localStorage.removeItem("ps_history"); } catch {}
      setPage("home");
      setResult(null);
      setShowAccountDeleted(true);
      setTimeout(() => setShowAccountDeleted(false), 4000);
    } catch(e) { alert("Error: " + e.message); }
  };
  const [checkingOut,  setCheckingOut]  = useState(false);
  const FREE_LIMIT = 10;
  const PAID_LIMIT = 20;
  // ── Accessibility: font scale ────────────────────────────────
  const [fontScale,   setFontScale]  = useState(()=>{try{return parseFloat(localStorage.getItem("ps_font_scale")||"1");}catch{return 1;}});
  const cycleFontScale = () => {
    const next = fontScale >= 1.4 ? 1 : parseFloat((fontScale + 0.2).toFixed(1));
    setFontScale(next);
    try { localStorage.setItem("ps_font_scale", next); } catch {}
  };
  // Apply font scale to root
  useEffect(() => {
    document.documentElement.style.fontSize = fontScale === 1 ? "" : `${fontScale * 100}%`;
  }, [fontScale]);

  const width   = useWindowWidth();
  const isMobile = width < 768;

  // ── Auth listener ────────────────────────────────────────────
  const checkSubscription = async (userId) => {
    try {
      const r = await fetch(`${API_BASE}/subscription-status?userId=${userId}`);
      const d = await r.json();
      setIsSubscribed(!!d.is_subscribed);
      return !!d.is_subscribed;
    } catch { setIsSubscribed(false); return false; }
  };

  const syncScanCount = async (userId) => {
    try {
      const r = await fetch(`${API_BASE}/scan-count?userId=${userId}`);
      const d = await r.json();
      const serverCount = d.scan_count || 0;
      const localCount = parseInt(localStorage.getItem("ps_scan_count") || "0");
      // Use whichever is higher — server wins across devices
      const finalCount = Math.max(serverCount, localCount);
      setScanCount(finalCount);
      try { localStorage.setItem("ps_scan_count", String(finalCount)); } catch {}
    } catch {}
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadCloudHistory(session.user.id);
        // Check subscription FIRST before syncing scan count — prevents race condition
        // where high server scan count fires paywall before subscription status arrives
        checkSubscription(session.user.id).then(() => {
          syncScanCount(session.user.id);
        });
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      setUser(u);
      if (u) {
        loadCloudHistory(u.id);
        checkSubscription(u.id).then(() => syncScanCount(u.id));
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Stripe checkout ───────────────────────────────────────────
  const IAP_PRODUCT_ID = "com.partiqule.app.premium.monthly";

  // Load product price from StoreKit on iOS so we show the real App Store price
  useEffect(() => {
    if (!IS_NATIVE) return;
    NativePurchases.getProducts({ productIdentifiers: [IAP_PRODUCT_ID], productType: PURCHASE_TYPE.SUBS })
      .then(({ products }) => {
        if (products?.[0]?.priceString) setIapPrice(products[0].priceString + "/month");
      })
      .catch(() => {}); // silently fall back to default price string
  }, []);

  const startCheckout = async () => {
    if (!user) { setShowAuth(true); return; }

    if (IS_NATIVE) {
      // iOS — purchase via StoreKit through @capgo/native-purchases
      setCheckingOut(true);
      try {
        const { transaction } = await NativePurchases.purchaseProduct({
          productIdentifier: IAP_PRODUCT_ID,
          productType: PURCHASE_TYPE.SUBS,
        });
        if (transaction) {
          // Mark subscribed locally — server validation can happen in background
          setIsSubscribed(true);
          setScanCount(0);
          try { localStorage.setItem("ps_scan_count", "0"); } catch {}
          setShowLimitModal(null);
          // Notify backend to record the subscription
          try {
            await fetch(`${API_BASE}/apple-iap-confirm`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: user?.id, transactionId: transaction.transactionIdentifier, receipt: transaction.receipt }),
            });
          } catch {} // non-critical — local state already updated
        }
      } catch (e) {
        if (!e.message?.includes("cancelled")) {
          alert("Purchase could not be completed. Please try again.");
        }
      }
      setCheckingOut(false);
      return;
    }

    // Web — Stripe checkout
    setCheckingOut(true);
    try {
      const r = await fetch(`${API_BASE}/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, email: user.email }),
      });
      const d = await r.json();
      if (d.url) { window.location.href = d.url; }
    } catch { alert("Something went wrong. Please try again."); }
    setCheckingOut(false);
  };

  const loadCloudHistory = async (userId) => {
    const { data, error } = await supabase
      .from("scans")
      .select("result_json, scanned_at")
      .eq("user_id", userId)
      .order("scanned_at", { ascending: false })
      .limit(50);
    if (!error && data?.length) {
      const items = data.map(r => ({...r.result_json, scannedAt: r.scanned_at}));
      setHistory(items);
      try { localStorage.setItem("ps_history", JSON.stringify(items)); } catch {}
    }
  };

  const saveToCloud = async (item, userId) => {
    try {
      const { error } = await supabase.from("scans").upsert({
        user_id:      userId,
        product_name: item.product_name,
        category:     item.category || "other",
        score:        item.score || 0,
        // Store lightweight version — skip large AI arrays to keep row size manageable
        result_json:  {
          product_name:     item.product_name,
          category:         item.category,
          score:            item.score,
          overall_score:    item.overall_score,
          child_score:      item.child_score      ?? null,
          is_child_product: item.is_child_product ?? null,
          child_bumps:      item.child_bumps       ?? null,
          pregnancy_score:  item.pregnancy_score   ?? null,
          pregnancy_bumps:  item.pregnancy_bumps   ?? null,
          summary:          item.summary,
          confidence:       item.confidence,
          concerns:         item.concerns,
          dimensions:       item.dimensions,
          food_analysis:    item.food_analysis,
          cached:           item.cached,
        },
        scanned_at:   new Date().toISOString(),
      }, { onConflict: "user_id,product_name" });
      if (error) console.warn("Cloud sync failed:", error.message);
    } catch(e) {
      console.warn("Cloud sync error:", e.message);
      // Non-critical — local history still saved
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Read slug from URL on first load
  useEffect(() => {
    const path   = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    // Stripe redirect — subscription confirmed
    if (params.get("subscribed") === "true") {
      setIsSubscribed(true);
      setScanCount(0);
      try { localStorage.setItem("ps_scan_count", "0"); } catch {}
      window.history.replaceState({}, "", path); // clean URL
    }

    // Admin page — key check (move PARTIQULE_ADMIN_KEY to env var for production hardening)
    if (path === "/admin") {
      const adminKey = process?.env?.PARTIQULE_ADMIN_KEY || "RowenaRavenclaw2024!";
      if (params.get("key") === adminKey) {
        setPage("admin");
      } else {
        setPage("404");
      }
      return;
    }

    const scanMatch = path.match(/^\/scan\/(.+)$/);
    if (scanMatch) {
      const slug = scanMatch[1];
      const name = slug.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
      // Check if cached history has an exact slug match to avoid collision
      // e.g. "honey-nut-cheerios" should not load "Honey Nut Cheerios Value Pack"
      try {
        const hist = JSON.parse(localStorage.getItem("ps_history") || "[]");
        const match = hist.find(h => toSlug(h.product_name) === slug);
        if (match) { setResult(match); setQuery(match.product_name); return; }
      } catch {}
      // No cache match — run a fresh scan
      setTimeout(()=>analyze(name), 100);
      return;
    }
    if (path === "/privacy") { setPage("privacy"); return; }
    if (path === "/about") { setPage("about"); return; }
    if (path === "/methodology") { setPage("methodology"); return; }
    if (path === "/terms") { setPage("terms"); return; }
    if (path === "/guides") { setPage("guides"); return; }
    if (path.startsWith("/guides/")) { setPage("guide"); setGuideSlug(path.replace("/guides/","")); return; }

    const known = ["/", "/science", "/history", "/privacy", "/terms", "/about", "/methodology", "/guides"];
    const isScanPath = path.startsWith("/scan/");
    const isGuidePath = path.startsWith("/guides/");
    if (!known.includes(path) && !isScanPath && !isGuidePath) setPage("404");
  }, []);

  // Update browser URL when result changes
  useEffect(() => {
    if (result?.product_name) {
      const slug = toSlug(result.product_name);
      window.history.pushState({}, "", `/scan/${slug}`);
      document.title = `${result.product_name} Microplastics Score — Partiqule`;
    } else if (!result) {
      window.history.pushState({}, "", "/");
      document.title = "Partiqule — Know What's In Your Products";
    }
  }, [result]);

  // Scroll to top on every page change and every result load
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page views for all non-home pages
    if (page !== "home") track("Page View", { page });
  }, [page, result]);

  const saveToHistory = (item) => {
    setHistory(prev=>{
      const filtered = prev.filter(h=>h.product_name!==item.product_name);
      const updated  = [{...item, scannedAt: new Date().toISOString()}, ...filtered].slice(0, 100); // cap at 100 — prevents localStorage quota overflow
      try {
        localStorage.setItem("ps_history", JSON.stringify(updated));
      } catch(e) {
        // localStorage quota exceeded — trim further and retry
        try {
          const trimmed = updated.slice(0, 50);
          localStorage.setItem("ps_history", JSON.stringify(trimmed));
          return trimmed;
        } catch { /* silent — cloud sync still works if signed in */ }
      }
      return updated;
    });
    if (user) saveToCloud(item, user.id);
  };

  const analyze = async (q=query) => {
    if (!q.trim()) return Promise.resolve();
    setShowScanModal(false); // always close the modal when a scan kicks off
    // ── Scan limit gate ──
    if (!isSubscribed) {
      if (scanCount >= FREE_LIMIT) {
        if (!user) setShowLimitModal("account");
        else setShowLimitModal("paywall");
        return;
      }
    }
    setLoading(true); setError(null); setResult(null); setRevealDone(false);
    track("Scan", { product: q.trim() });
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 75000); // 45s — two AI passes + alts
      const res = await fetch(`${API_BASE}/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:q.trim(), userId: user?.id || null}),signal:controller.signal});
      clearTimeout(timeout);
      if (!res.ok){const e=await res.json(); throw new Error(e.error||`Error ${res.status}`);}
      const data = await res.json();
      setResult(data); saveToHistory(data);
      track("Score Returned", { product: data.product_name, score: data.score, category: data.category });
      // ── Scan counter — increment and check limits ──
      if (!isSubscribed) {
        const newCount = scanCount + 1;
        setScanCount(newCount);
        try { localStorage.setItem("ps_scan_count", String(newCount)); } catch {}
        if (newCount >= FREE_LIMIT) {
          if (!user) setShowLimitModal("account");
          else setShowLimitModal("paywall");
        }
      }
    } catch(e){
      const msg = e.name === "AbortError"
        ? "Scan timed out — please try again in a moment."
        : e.message;
      setError(msg);
      track("Scan Error", { error: msg });
    }
    setLoading(false);
  };

  const runDemo = () => {
    const demo = {
      product_name: "M&Ms Milk Chocolate Candies",
      category: "food",
      score: 7,
      overall_score: 7,
      child_score: 9,
      child_bumps: ["Children's developing organ systems require more protective thresholds", "Petroleum dyes disrupt neurodevelopment — hyperactivity link confirmed in children (McCann, Lancet 2007)", "Child vulnerability — M&Ms commonly consumed by children daily"],
      is_child_product: true,
      summary: "Ultra-processed candy with four FDA-flagged petroleum dyes, daily ingestion pathway, and single-use plastic packaging.",
      confidence: "high",
      confidence_note: "Ingredient list confirmed — well-documented formula",
      cached: true,
      isDemo: true,
      composition_tier: 4,
      nutrition: { serving_size:"1.69 oz (48g)", calories:240, protein_g:2, carbs_g:33, sugar_g:31, fat_g:10, sat_fat_g:5, fiber_g:0, sodium_mg:30 },
      ingredient_list: ["milk chocolate (sugar, chocolate, skim milk, cocoa butter, lactose, milkfat, soy lecithin, salt, artificial flavors)", "sugar", "cornstarch", "corn syrup", "gum acacia", "coloring (Red 40, Yellow 5, Yellow 6, Blue 1)", "carnauba wax", "dextrin"],
      identified_plastics: ["Polyethylene (bag packaging)"],
      harmful_chemicals: ["Red 40", "Yellow 5", "Yellow 6", "Blue 1", "Titanium dioxide"],
      natural_materials: [],
      concerns: ["Four FDA-flagged petroleum dyes linked to hyperactivity and carcinogenicity", "Titanium dioxide banned in EU food — IARC Group 2B", "Ultra-processed formula with daily ingestion pathway"],
      exposure_frequency: "daily",
      exposure_type: "ingestion",
      scan_next: ["Skittles", "Reese's Pieces", "Sour Patch Kids", "Organic dark chocolate"],
      break_even: { uses: null, alternative_name: "Hu Chocolate Bar", note: "Switch to dye-free organic chocolate", source: "Food dye harm reduction" },
      food_analysis: {
        composition_tier: 4,
        tier_label: "ultra_processed",
        tier_description: "Industrial candy with multiple synthetic additives",
        nutrition: { serving_size:"1.69 oz (48g)", calories:240, protein_g:2, carbs_g:33, sugar_g:31, fat_g:10, sat_fat_g:5, fiber_g:0, sodium_mg:30 },
        nutrition_verified: true,
        concerns: [
          { substance: "Red 40 (Allura Red)", type: "dye", severity: "high", reason: "FDA phasing out — hyperactivity and carcinogenicity in studies" },
          { substance: "Yellow 5 (Tartrazine)", type: "dye", severity: "high", reason: "Linked to hyperactivity and ADHD in children (McCann, Lancet 2007)" },
          { substance: "Yellow 6 (Sunset Yellow)", type: "dye", severity: "high", reason: "Hyperactivity link, possible carcinogen under review" },
          { substance: "Blue 1 (Brilliant Blue)", type: "dye", severity: "high", reason: "FDA phasing out all petroleum-based food dyes (2025)" },
          { substance: "Titanium dioxide", type: "additive", severity: "high", reason: "IARC Group 2B — banned in EU food since 2022" },
          { substance: "Artificial flavors", type: "additive", severity: "low", reason: "Undisclosed petroleum-derived compounds" },
          { substance: "Sugar", type: "additive", severity: "low", reason: "31g per serving — 62% adult DV, 124% children's DV" },
        ],
        positives: [],
        confidence: "high",
        confidence_note: "Ingredient list verified from product label",
      },
      dimensions: {
        materials:    { score:8, label:"Four FDA-flagged petroleum dyes + titanium dioxide — all high concern", concerns:["Red 40, Yellow 5, Yellow 6, Blue 1 — FDA phasing out entire class","Titanium dioxide banned in EU food (IARC Group 2B)"] },
        usage_exposure:{ score:7, label:"Daily candy ingestion — direct chemical consumption", frequency:"daily", type:"ingestion", intensity:"single-contact", vulnerable:true, concerns:["Daily direct ingestion of multiple synthetic chemicals","Children particularly sensitive — developing immune and hormonal systems"] },
        packaging:    { score:5, label:"Single-use plastic bag — not recyclable", primary:"plastic", refillable:false, end_of_life:"landfill", concerns:["Multi-layer plastic film bag — not accepted by curbside recycling"] },
        sustainability:{ score:6, label:"Single-use by design — packaging discarded at every purchase", reusable:false, replaces_single_use:false, replaces_count:null, circularity:"landfill", concerns:["Single-use plastic packaging","Mars Inc. sustainability commitments unverified at product level"] },
        manufacturing: { score:5, label:"Large-scale industrial confectionery manufacturing", tier:"neutral", confidence:"low", concerns:["Supply chain data not independently verified"] },
      },
      alternatives: [
        { id:"hu-bar", name:"Hu Chocolate Bar", brand:"Hu", score:2, material:"Organic cacao, no refined sugar, no soy lecithin", description:"No refined sugar, no dairy, no emulsifiers, no artificial flavors. USDA Organic.", price:"$3-4", affiliateUrl:"https://www.amazon.com/s?k=hu+chocolate+bar&tag=partiqule-20", category:"food" },
        { id:"unreal-choc", name:"Unreal Dark Chocolate Gems", brand:"Unreal", score:2, material:"No artificial dyes — colored with plant-based ingredients", description:"M&M-style chocolate candies with no artificial colors, flavors or preservatives.", price:"$5-7", affiliateUrl:"https://www.amazon.com/s?k=unreal+dark+chocolate+gems&tag=partiqule-20", category:"food" },
        { id:"yum-earth", name:"YumEarth Organic Gummy Bears", brand:"YumEarth", score:2, material:"Organic fruit juice colors, no petroleum dyes", description:"USDA Organic, no artificial dyes, allergen-free. Colored with organic fruit and vegetable juice.", price:"$6-8", affiliateUrl:"https://www.amazon.com/s?k=yumearth+organic+candy&tag=partiqule-20", category:"food" },
      ],
      ai_alternatives: [],
      peer_comparison: "M&Ms scores higher than 85% of scanned food and beverage products.",
      scannedAt: new Date().toISOString(),
    };
    setResult(demo);
    setQuery("M&Ms Milk Chocolate Candies");
    window.scrollTo(0,0);
  };

  const reset = () => {setResult(null); setError(null); setQuery(""); setPage("home"); setMenuOpen(false); setShowAlts(false); setFabOpen(false); setShowScanModal(false); setShowBarcodeScanner(false); setModalQuery(""); setChildMode(false);};

  // Shared image scan handler — used by hero and scan modal
  const handleImageScan = async (file, onDone) => {
    if (!file) return;
    // ── Scan limit gate — same as text scan ──
    if (!isSubscribed && scanCount >= FREE_LIMIT) {
      if (!user) setShowLimitModal("account");
      else setShowLimitModal("paywall");
      return;
    }
    setShowScanModal(false);
    setResult(null); setError(null); setPage("home");
    setLoading(true); setQuery("Reading label…"); setRevealDone(false); setResult(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX = 1200;
          const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
          canvas.width  = Math.round(img.width  * ratio);
          canvas.height = Math.round(img.height * ratio);
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          res(canvas.toDataURL("image/jpeg", 0.85).split(",")[1]);
        };
        img.onerror = rej;
        img.src = url;
      });
      const imgController = new AbortController();
      const imgTimeout = setTimeout(() => imgController.abort(), 75000);
      const idResp = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType: "image/jpeg", userId: user?.id || null }),
        signal: imgController.signal,
      });
      clearTimeout(imgTimeout);
      if (idResp.status === 429) { setLoading(false); setQuery(""); setError("Too many requests. Please wait a moment and try again."); return; }
      if (!idResp.ok) throw new Error(`Server error ${idResp.status}`);
      const data = await idResp.json();
      if (!data.product_name) throw new Error("Nothing detected");
      setQuery(data.product_name);
      setResult(data);
      saveToHistory(data);
      // ── Increment scan counter ──
      if (!isSubscribed) {
        const newCount = scanCount + 1;
        setScanCount(newCount);
        try { localStorage.setItem("ps_scan_count", String(newCount)); } catch {}
        if (newCount >= FREE_LIMIT) {
          if (!user) setShowLimitModal("account");
          else setShowLimitModal("paywall");
        }
      }
      setLoading(false);
      if (onDone) onDone();
    } catch(err) {
      console.error("Image scan error:", err);
      setLoading(false); setQuery("");
      setError(err.name === "AbortError"
        ? "Scan timed out — please try again in a moment."
        : "Couldn't identify that product. Try a photo of the front label, nutrition panel, or clothing tag — or just type the product name.");
    }
  };

  const bg      = isDark?"#080f0a":"#fafafa";
  const surface = isDark?"#0f2a18":"#fff";
  const border  = isDark?"rgba(34,197,94,0.15)":"#eee";
  const text    = isDark?"#f0fdf4":"#111";
  const muted   = isDark?"#6ee7b7":"#888";
  const px      = isMobile ? "16px" : "40px";

  return (
    <div style={{minHeight:"100vh", background:bg, fontFamily:"'DM Sans',system-ui,sans-serif", transition:"background 0.3s"}}>
      <style>{`
        *{box-sizing:border-box;}
        body{margin:0;background:#080f0a;}
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        :root{
          --green-deep:#052e16;--green-mid:#14532d;--green-bright:#22c55e;
          --lime:#a3e635;--amber:#f59e0b;--orange:#f97316;--red:#ef4444;
          --surface:#0f2a18;--card:#0f2a18;--border:rgba(34,197,94,0.15);
          --text:#f0fdf4;--muted:#6ee7b7;
        }
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fade-up{animation:fadeUp 0.4s ease forwards}
        @keyframes slideInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.score-reveal{animation:slideInUp 0.5s ease forwards}
        @keyframes arcDraw{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}.arc-animate{animation:arcDraw 1.4s cubic-bezier(0.4,0,0.2,1) forwards}
        @keyframes popIn{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}.pop-in{animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards}
        @keyframes pulseScan{0%,100%{box-shadow:0 4px 20px rgba(34,197,94,0.5),0 0 0 4px rgba(34,197,94,0.12)}50%{box-shadow:0 4px 28px rgba(34,197,94,0.7),0 0 0 6px rgba(34,197,94,0.18)}}
        @keyframes ringDraw{from{stroke-dashoffset:var(--dash-total,440)}to{stroke-dashoffset:var(--dash-offset,220)}}.ring-animate{animation:ringDraw 1.2s cubic-bezier(0.4,0,0.2,1) forwards}
        @keyframes gFloat1{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-22px) translateX(10px)}}
        @keyframes gFloat2{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-14px) translateX(-12px)}}
        @keyframes gFloat3{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-18px) translateX(8px)}}
        @keyframes gFloat4{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-10px) translateX(-16px)}}
        @keyframes gFloat5{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-20px) translateX(14px)}}
        input,button,select,textarea{font-family:'DM Sans',system-ui,sans-serif;}
        h1,h2,h3,.outfit{font-family:'Outfit',sans-serif;}
      `}</style>

      {/* ── GLOBAL FLOATING PARTICLES — fixed, full viewport, always present ── */}
      {/* Low opacity so they read as ambient texture not foreground elements */}
      {!result && [
        {s:8, x:"6%",  y:"12%", a:0.09, anim:"gFloat1", dur:"7s",   delay:"0s",   shape:"circle"},
        {s:5, x:"14%", y:"55%", a:0.07, anim:"gFloat2", dur:"9s",   delay:"1.2s", shape:"circle"},
        {s:12,x:"22%", y:"80%", a:0.08, anim:"gFloat3", dur:"8s",   delay:"0.5s", shape:"diamond"},
        {s:6, x:"35%", y:"20%", a:0.10, anim:"gFloat1", dur:"6.5s", delay:"2s",   shape:"circle"},
        {s:4, x:"48%", y:"70%", a:0.07, anim:"gFloat4", dur:"10s",  delay:"0.8s", shape:"diamond"},
        {s:9, x:"58%", y:"8%",  a:0.09, anim:"gFloat2", dur:"7.5s", delay:"3s",   shape:"circle"},
        {s:5, x:"68%", y:"45%", a:0.08, anim:"gFloat5", dur:"8.5s", delay:"1.5s", shape:"circle"},
        {s:11,x:"76%", y:"88%", a:0.07, anim:"gFloat3", dur:"11s",  delay:"0.3s", shape:"circle"},
        {s:4, x:"84%", y:"30%", a:0.10, anim:"gFloat1", dur:"6s",   delay:"2.5s", shape:"diamond"},
        {s:7, x:"92%", y:"65%", a:0.08, anim:"gFloat4", dur:"9.5s", delay:"1s",   shape:"circle"},
        {s:5, x:"3%",  y:"40%", a:0.07, anim:"gFloat5", dur:"8s",   delay:"4s",   shape:"circle"},
        {s:8, x:"28%", y:"92%", a:0.08, anim:"gFloat2", dur:"7s",   delay:"1.8s", shape:"diamond"},
        {s:6, x:"44%", y:"35%", a:0.09, anim:"gFloat1", dur:"9s",   delay:"0.6s", shape:"circle"},
        {s:4, x:"62%", y:"78%", a:0.07, anim:"gFloat3", dur:"6.5s", delay:"3.5s", shape:"circle"},
        {s:10,x:"88%", y:"15%", a:0.08, anim:"gFloat5", dur:"10s",  delay:"2.2s", shape:"diamond"},
        {s:5, x:"52%", y:"55%", a:0.06, anim:"gFloat4", dur:"12s",  delay:"0.9s", shape:"circle"},
        {s:7, x:"18%", y:"25%", a:0.08, anim:"gFloat2", dur:"8s",   delay:"1.4s", shape:"circle"},
        {s:4, x:"72%", y:"20%", a:0.07, anim:"gFloat1", dur:"7.5s", delay:"3.2s", shape:"diamond"},
        {s:6, x:"96%", y:"50%", a:0.09, anim:"gFloat3", dur:"9s",   delay:"0.4s", shape:"circle"},
        {s:8, x:"38%", y:"60%", a:0.06, anim:"gFloat5", dur:"11s",  delay:"2.8s", shape:"circle"},
      ].map((p,i)=>(
        <div key={`gp-${i}`} style={{
          position:"fixed",
          left:p.x, top:p.y,
          width:p.s, height:p.s,
          borderRadius: p.shape==="circle" ? "50%" : "2px",
          transform: p.shape==="diamond" ? "rotate(45deg)" : undefined,
          background:"#22c55e",
          opacity:p.a,
          animation:`${p.anim} ${p.dur} ease-in-out infinite`,
          animationDelay:p.delay,
          pointerEvents:"none",
          zIndex:0,
        }}/>
      ))}

      {/* HEADER */}
      <header style={{background:"rgba(5,46,22,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid rgba(34,197,94,0.15)`, position:"sticky", top:0, zIndex:100, transition:"background 0.3s", paddingTop: SAFE_TOP ? `${SAFE_TOP}px` : 0}}>
        <div style={{maxWidth:1100, margin:"0 auto", padding:`0 ${px}`, height:44, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer"}} onClick={reset}>
            <img src="/logo.png" alt="Partiqule" style={{height:32, width:"auto", objectFit:"contain"}}/>
            <span style={{fontFamily:"'Outfit', sans-serif", fontWeight:800, fontSize:isMobile?18:22, color:"#f0fdf4", letterSpacing:"-0.5px"}}>Partiqule</span>
          </div>

          {isMobile ? (
            /* Mobile — icon row */
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <span onClick={()=>{setPage("history"); setResult(null); setMenuOpen(false);}} style={{position:"relative", cursor:"pointer", padding:8}}>
                <IconHistory size={20} color={page==="history"?"#16a34a":muted}/>
                {history.length>0&&<span style={{position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:"#16a34a"}}/>}
              </span>
              <button onClick={()=>setMenuOpen(o=>!o)} style={{width:36, height:36, borderRadius:8, border:`1px solid ${border}`, background:"none", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer"}}>
                <div style={{width:16, height:2, background:text, borderRadius:2}}/>
                <div style={{width:16, height:2, background:text, borderRadius:2}}/>
                <div style={{width:16, height:2, background:text, borderRadius:2}}/>
              </button>
            </div>
          ) : (
            /* Desktop nav */
            <nav style={{display:"flex", gap:4, alignItems:"center"}}>
              {[
                {label:"About",      action:()=>{setPage("about"); setResult(null);},     active:page==="about"},
                {label:"Guides",     action:()=>navigateTo("guides"),                      active:page==="guides"||page==="guide"},
                {label:"The Science",action:()=>{setPage("science"); setResult(null);},    active:page==="science"},
                {label:"My Routine", action:()=>{setPage("routine"); setResult(null);},    active:page==="routine"},
                {label:"My Scans",   action:()=>{setPage("history"); setResult(null);},    active:page==="history"},
              ].map((item,i)=>(
                <span key={i} onClick={item.action} style={{
                  fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:item.active?700:500,
                  color:item.active?"#22c55e":"#6ee7b7", opacity:item.active?1:0.55,
                  cursor:"pointer", padding:"6px 12px", borderRadius:8,
                  background:item.active?"rgba(34,197,94,0.1)":"transparent",
                  transition:"all 0.15s",
                }}>{item.label}{item.label==="My Scans"&&history.length>0&&<span style={{background:"#052e16",color:"#4ade80",fontSize:10,fontWeight:800,padding:"2px 6px",borderRadius:10,marginLeft:6}}>{history.length}</span>}</span>
              ))}
              {isAdminUser(user) && (
                <span onClick={()=>{setPage("admin"); setResult(null);}} style={{fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#a78bfa", cursor:"pointer", fontWeight:700, padding:"6px 12px"}}>Admin</span>
              )}
              {user ? (
                <div style={{display:"flex", alignItems:"center", gap:8, marginLeft:8}}>
                  <div style={{width:32, height:32, borderRadius:"50%", background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}} title={user.email}>
                    <span style={{fontFamily:"'Outfit',sans-serif", color:"#22c55e", fontWeight:800, fontSize:13}}>{user.email[0].toUpperCase()}</span>
                  </div>
                  <button onClick={signOut} style={{padding:"6px 14px", borderRadius:8, border:"1px solid rgba(34,197,94,0.2)", background:"none", color:"#6ee7b7", fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer"}}>Sign out</button>
                </div>
              ) : (
                <button onClick={()=>setShowAuth(true)} style={{marginLeft:8, padding:"8px 18px", borderRadius:10, border:"none", background:"rgba(34,197,94,0.12)", color:"#22c55e", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, cursor:"pointer", border:"1px solid rgba(34,197,94,0.2)"}}>Sign in</button>
              )}
              <button onClick={reset} style={{padding:"8px 20px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", boxShadow:"0 2px 12px rgba(34,197,94,0.3)"}}>New Scan</button>
            </nav>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{background:"rgba(5,46,22,0.98)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(34,197,94,0.15)", padding:"8px 16px 16px", display:"flex", flexDirection:"column", gap:2}}>
            {[
              {label:"About",        pg:"about"},
              {label:"The Science",  pg:"science"},
              {label:"How it Works", pg:"methodology"},
              {label:"Guides",       pg:"guides"},
              {label:"My Routine",   pg:"routine"},
              {label:"My Scans",     pg:"history"},
              {label:"Settings",     pg:"settings"},
              ...(isAdminUser(user) ? [{label:"Admin", pg:"admin"}] : []),
            ].map(item=>(
              <button key={item.pg} onClick={()=>{
                if(item.pg==="guides") navigateTo("guides");
                else { setPage(item.pg); setResult(null); }
                setMenuOpen(false);
              }}
                style={{padding:"12px 16px", borderRadius:10, border:"none",
                  background:page===item.pg?"rgba(34,197,94,0.12)":"transparent",
                  color:page===item.pg?"#22c55e":"#6ee7b7",
                  fontFamily:"'Outfit',sans-serif", fontSize:15,
                  fontWeight:page===item.pg?700:500, cursor:"pointer", textAlign:"left",
                  opacity:page===item.pg?1:0.7,
                }}>
                {item.label}
              </button>
            ))}
            {user ? (
              <div style={{padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:4, borderTop:"1px solid rgba(34,197,94,0.1)"}}>
                <span style={{fontSize:13, color:"#6ee7b7", opacity:0.6}}>{user.email}</span>
                <button onClick={()=>{signOut(); setMenuOpen(false);}} style={{padding:"6px 14px", borderRadius:8, border:"1px solid rgba(34,197,94,0.2)", background:"none", color:"#6ee7b7", fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer"}}>Sign out</button>
              </div>
            ) : (
              <button onClick={()=>{setShowAuth(true); setMenuOpen(false);}} style={{padding:"12px 16px", borderRadius:10, border:"1.5px solid rgba(34,197,94,0.3)", background:"none", color:"#22c55e", fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:700, cursor:"pointer", textAlign:"left", marginTop:8}}>
                Sign in / Create account
              </button>
            )}
            <button onClick={()=>{reset(); setMenuOpen(false);}} style={{padding:"13px 16px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:800, cursor:"pointer", marginTop:8, boxShadow:"0 2px 12px rgba(34,197,94,0.3)"}}>
              New Scan
            </button>
          </div>
        )}
      </header>

      {showAuth && <AuthModal isDark={isDark} onClose={()=>setShowAuth(false)} onAuth={u=>{setUser(u); if(isAdminUser(u)){setPage("admin"); setShowAuth(false); return;} checkSubscription(u.id).then(subscribed => { if (!subscribed) setShowLimitModal("paywall"); });}}/>}

      {/* ── Delete account confirmation modal ── */}
      {/* Account deleted toast */}
      {showAccountDeleted && (
        <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:9999,
          background:"#052e16",color:"#4ade80",padding:"14px 28px",borderRadius:14,
          fontSize:15,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,0.25)",
          display:"flex",alignItems:"center",gap:10,whiteSpace:"nowrap"}}>
          <span style={{fontSize:18}}>✓</span> Account deleted
        </div>
      )}

      {showDeleteConfirm && (
        <div onClick={()=>setShowDeleteConfirm(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:isDark?"#1a1a18":"#fff",borderRadius:16,padding:"28px 24px",maxWidth:380,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#dc2626",marginBottom:8}}>Delete account?</div>
            <div style={{fontSize:14,color:isDark?"#6ee7b7":"#64748b",marginBottom:24,lineHeight:1.6}}>This will permanently delete your account, scan history, and cancel any active subscription. This cannot be undone.</div>
            <button onClick={deleteAccount} style={{width:"100%",padding:"13px",borderRadius:10,background:"#dc2626",border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}}>Yes, delete my account</button>
            <button onClick={()=>setShowDeleteConfirm(false)} style={{width:"100%",padding:"11px",borderRadius:10,background:"none",border:`1px solid ${isDark?"#374151":"#e2e8f0"}`,color:isDark?"#6ee7b7":"#64748b",fontSize:14,cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── Scan limit modals ── */}
      {showLimitModal && (
        <div onClick={()=>setShowLimitModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:isDark?"#1a1a18":"#fff",borderRadius:16,padding:"28px 24px",maxWidth:400,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>

            {showLimitModal === "account" && (<>
              <div style={{fontSize:22,fontWeight:700,color:isDark?"#fff":"#1a1a18",marginBottom:8}}>You've been busy.</div>
              <div style={{fontSize:14,color:isDark?"#6ee7b7":"#64748b",marginBottom:20,lineHeight:1.5}}>You've used your {FREE_LIMIT} free scans. Create an account to keep going — unlimited scans, kids mode, and clean alternatives for $4.99/month.</div>
              <button onClick={()=>{setShowLimitModal(null); setShowAuth(true);}} style={{width:"100%",padding:"13px",borderRadius:10,background:"#16a34a",border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}}>Create account</button>
              <button onClick={()=>setShowLimitModal(null)} style={{width:"100%",padding:"11px",borderRadius:10,background:"none",border:`1px solid ${isDark?"#374151":"#e2e8f0"}`,color:isDark?"#6ee7b7":"#64748b",fontSize:14,cursor:"pointer"}}>Maybe later</button>
            </>)}

            {showLimitModal === "paywall" && (<>
              <div style={{fontSize:22,fontWeight:700,color:isDark?"#fff":"#1a1a18",marginBottom:8}}>You've found a lot to think about</div>
              <div style={{fontSize:14,color:isDark?"#6ee7b7":"#64748b",marginBottom:20,lineHeight:1.5}}>Unlimited scans, kids mode, and clean alternatives for $4.99/month. Cancel anytime.</div>
              <button onClick={startCheckout} disabled={checkingOut} style={{width:"100%",padding:"13px",borderRadius:10,background:"#16a34a",border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:12,opacity:checkingOut?0.7:1}}>
                {checkingOut ? "Loading..." : `Subscribe — ${iapPrice}`}
              </button>
              {IS_NATIVE && (
                <div style={{fontSize:11,color:isDark?"#6ee7b7":"#9ca3af",textAlign:"center",marginTop:8,lineHeight:1.5}}>
                  Payment will be charged to your Apple ID. Subscription auto-renews unless cancelled at least 24 hours before the end of the current period. Manage in Settings.
                </div>
              )}
              <button onClick={()=>setShowLimitModal(null)} style={{width:"100%",padding:"11px",borderRadius:10,background:"none",border:`1px solid ${isDark?"#374151":"#e2e8f0"}`,color:isDark?"#6ee7b7":"#64748b",fontSize:14,cursor:"pointer"}}>Maybe later</button>
            </>)}

          </div>
        </div>
      )}

      {page === "admin" ? (
        <AdminPage isDark={isDark} surface={surface} border={border} text={text} muted={muted} history={history}/>
      ) : page === "guides" ? (
        <GuidesPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile} onNavigate={navigateTo}/>
      ) : page === "guide" ? (
        <GuideViewPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile} slug={guideSlug} onNavigate={navigateTo} onScan={reset}/>
      ) : page === "privacy" ? (
        <PrivacyPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile}/>
      ) : page === "terms" ? (
        <TermsPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile}/>
      ) : page === "about" ? (
        <AboutPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile} onScan={reset} onNavigate={setPage}/>
      ) : page === "methodology" ? (
        <MethodologyPage isDark={isDark} text={text} muted={muted} surface={surface} border={border} isMobile={isMobile}/>
      ) : page === "404" ? (
        <div style={{maxWidth:600, margin:"0 auto", padding:"100px 40px", textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><IcoScan size={64}/></div>
          <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:32, color:text, margin:"0 0 12px"}}>Page not found</h1>
          <p style={{fontSize:16, color:muted, margin:"0 0 32px", lineHeight:1.6}}>That page doesn't exist — but we can scan any product for microplastics risk.</p>
          <button onClick={reset} style={{padding:"12px 28px", borderRadius:10, border:"none", background:"#052e16", color:"#4ade80", fontWeight:700, fontSize:15, cursor:"pointer"}}>
            Go to Partiqule →
          </button>
        </div>
      ) : page === "routine" ? (
        <RoutinePage
          history={history}
          isDark={isDark} surface={surface} border={border} text={text} muted={muted}
          isMobile={isMobile} user={user}
          onSelect={(item)=>{setResult(item); setPage("home");}}
          onSearch={(q)=>{setPage("home"); setQuery(q); analyze(q);}}
        />
      ) : page === "history" ? (
        <HistoryPage history={history} isDark={isDark} surface={surface} border={border} text={text} muted={muted}
          isMobile={isMobile}
          onSelect={(item)=>{setResult(item); setPage("home");}}
          onClear={()=>{setHistory([]); try{localStorage.removeItem("ps_history")}catch{}}}
          onSearch={(q)=>{setPage("home"); setQuery(q); analyze(q);}}
        />
      ) : page === "science" ? (
        <div style={{maxWidth:1100, margin:"0 auto", padding:isMobile?"24px 16px 60px":"48px 40px 80px"}}>
          <div style={{marginBottom:32}}>
            <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?24:32, color:text, margin:"0 0 8px", letterSpacing:"-0.5px"}}>The Science</h1>
            <p style={{fontSize:15, color:muted, margin:0}}>The research behind product health: your body, your home, and the planet</p>
          </div>
          <EducationSection isDark={isDark} isMobile={isMobile}/>
        </div>
      ) : page === "settings" ? (
        <div style={{maxWidth:600, margin:"0 auto", padding:isMobile?"24px 16px 80px":"48px 40px 80px"}}>
          <div style={{marginBottom:32}}>
            <h1 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?24:28, color:text, margin:"0 0 8px", letterSpacing:"-0.5px"}}>Settings</h1>
            <p style={{fontSize:15, color:muted, margin:0}}>Personalise your Partiqule experience</p>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:16}}>

            {/* Account */}
            <div style={{background:surface, borderRadius:16, border:`1px solid ${border}`, overflow:"hidden"}}>
              <div style={{padding:"14px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
                <div style={{fontSize:12, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em"}}>Account</div>
              </div>
              {user ? (
                <div style={{padding:"16px 20px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:14, marginBottom:16}}>
                    <div style={{width:44, height:44, borderRadius:"50%", background:"#052e16", display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <span style={{color:"#4ade80", fontWeight:700, fontSize:18}}>{user.email[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <div style={{fontSize:15, fontWeight:600, color:text}}>{user.email}</div>
                      <div style={{fontSize:13, color:"#16a34a", fontWeight:600}}>Signed in</div>
                    </div>
                  </div>
                  <button onClick={signOut} style={{width:"100%", padding:"12px", borderRadius:10, border:`1.5px solid ${border}`, background:"none", color:muted, fontSize:14, fontWeight:600, cursor:"pointer"}}>
                    Sign out
                  </button>
                  <button onClick={()=>setShowDeleteConfirm(true)} style={{width:"100%", padding:"12px", borderRadius:10, border:"1.5px solid #fee2e2", background:"none", color:"#dc2626", fontSize:14, fontWeight:600, cursor:"pointer", marginTop:8}}>
                    Delete account
                  </button>
                </div>
              ) : (
                <div style={{padding:"16px 20px"}}>
                  <p style={{fontSize:14, color:muted, margin:"0 0 14px", lineHeight:1.6}}>Sign in to save your scan history across devices and unlock cloud sync.</p>
                  <button onClick={()=>setShowAuth(true)} style={{width:"100%", padding:"12px", borderRadius:10, border:"none", background:"#16a34a", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer"}}>
                    Sign in / Create account
                  </button>
                </div>
              )}
            </div>

            {/* Child safety default */}
            <div style={{background:surface, borderRadius:16, border:`1px solid ${border}`, overflow:"hidden"}}>
              <div style={{padding:"14px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
                <div style={{fontSize:12, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em"}}>Scoring</div>
              </div>
              <div style={{padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:15, fontWeight:600, color:text, marginBottom:2}}>Always show child safety score</div>
                  <div style={{fontSize:13, color:muted}}>Auto-enable child mode on every scan result</div>
                </div>
                <button onClick={()=>{
                  const next = !childMode;
                  setChildMode(next);
                  try { localStorage.setItem("ps_child_mode_default", next); } catch {}
                }} style={{
                  width:52, height:30, borderRadius:15, border:"none", cursor:"pointer",
                  background: childMode ? "#16a34a" : "#d1d5db",
                  position:"relative", transition:"background 0.2s", flexShrink:0,
                }}>
                  <div style={{
                    position:"absolute", top:3, left: childMode ? 24 : 3,
                    width:24, height:24, borderRadius:"50%", background:"white",
                    transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
                  }}/>
                </button>
              </div>
              <div style={{height:1, background:border, margin:"0 20px"}}/>
              <div style={{padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:15, fontWeight:600, color:text, marginBottom:2}}>Pregnancy safety mode</div>
                  <div style={{fontSize:13, color:muted}}>Show pregnancy-adjusted scores — flags retinoids, mercury, alcohol, and other pregnancy concerns</div>
                </div>
                <button onClick={()=>{
                  const next = !pregnancyMode;
                  setPregnancyMode(next);
                  try { localStorage.setItem("ps_pregnancy_mode", next); } catch {}
                }} style={{
                  width:52, height:30, borderRadius:15, border:"none", cursor:"pointer",
                  background: pregnancyMode ? "#9333ea" : "#d1d5db",
                  position:"relative", transition:"background 0.2s", flexShrink:0,
                }}>
                  <div style={{
                    position:"absolute", top:3, left: pregnancyMode ? 24 : 3,
                    width:24, height:24, borderRadius:"50%", background:"white",
                    transition:"left 0.2s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
                  }}/>
                </button>
              </div>
            </div>

            {/* About */}
            <div style={{background:surface, borderRadius:16, border:`1px solid ${border}`, overflow:"hidden"}}>
              <div style={{padding:"14px 20px", borderBottom:`1px solid ${border}`, background:isDark?"#080f0a":"#f8fafc"}}>
                <div style={{fontSize:12, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.08em"}}>About</div>
              </div>
              {[
                {label:"The Science",   action:()=>{setPage("science"); }},
                {label:"How it Works",  action:()=>{setPage("methodology"); }},
                {label:"About us",      action:()=>{setPage("about"); }},
                {label:"Privacy Policy",action:()=>{setPage("privacy"); }},
              ].map((item, i, arr) => (
                <button key={item.label} onClick={item.action} style={{
                  width:"100%", padding:"14px 20px", border:"none",
                  borderBottom: i < arr.length-1 ? `1px solid ${border}` : "none",
                  background:"none", color:text, fontSize:15, cursor:"pointer",
                  textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between",
                }}>
                  {item.label}
                  <span style={{color:muted, fontSize:18}}>›</span>
                </button>
              ))}
            </div>

            <div style={{textAlign:"center", fontSize:12, color:muted, paddingTop:4}}>
              Partiqule · Version 1.0 · <a href="mailto:paul@partiqule.com" style={{color:"#16a34a", textDecoration:"none"}}>Contact us</a>
            </div>
          </div>
        </div>
      ) : !result ? (
        <>
          {/* Globe overlay */}
          {showOverlay && (
            <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#052e16",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"globeOverlayIn 0.4s ease forwards"}}>
              <style>{`@keyframes globeOverlayIn{from{opacity:0}to{opacity:1}}`}</style>
              <GlobeLoading isMobile={isMobile}/>
            </div>
          )}

          {/* ── RETURNING USER: compact scan bar + discovery feed ── */}
          {history.length > 0 ? (() => {
            const routineScore = Math.round(history.slice(0,20).reduce((a,h)=>a+(h.overall_score||h.score||5),0)/Math.min(history.length,20)*10)/10;
            const highRisk = history.filter(h=>(h.overall_score||h.score||0)>=7).slice(0,2);
            const swapList = history.filter(h=>(h.overall_score||h.score||0)>=5).slice(0,2);
            const firstName = user?.email ? user.email.split("@")[0].split(".")[0] : null;
            const greet = firstName ? `Good ${new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"}, ${firstName.charAt(0).toUpperCase()+firstName.slice(1)}` : "Welcome back";

            // ── Streak counter (Serial Position Effect: anchors the greeting) ──
            const streak = (() => {
              try {
                const today = new Date().toDateString();
                const visits = JSON.parse(localStorage.getItem("pq_visits")||"[]");
                if (!visits.length || visits[0] !== today) {
                  visits.unshift(today);
                  localStorage.setItem("pq_visits", JSON.stringify(visits.slice(0,60)));
                }
                let s = 0;
                for (let i = 0; i < visits.length; i++) {
                  const exp = new Date(); exp.setDate(exp.getDate()-i);
                  if (visits[i] === exp.toDateString()) s++; else break;
                }
                return s;
              } catch { return 1; }
            })();

            // ── New badge: tracks which For You products were seen before today ──
            const isNewCard = (() => {
              try {
                const today = new Date().toDateString();
                const stored = JSON.parse(localStorage.getItem("pq_foryou")||"{}");
                return (name) => stored.date !== today || !(stored.seen||[]).includes(name);
              } catch { return () => false; }
            })();
            const markSeen = (names) => {
              try {
                const today = new Date().toDateString();
                const existing = JSON.parse(localStorage.getItem("pq_foryou")||"{}");
                const seen = existing.date === today ? [...new Set([...(existing.seen||[]),...names])] : names;
                localStorage.setItem("pq_foryou", JSON.stringify({date:today, seen}));
              } catch {}
            };

            // ── Date labels for comparison card ──
            const todayLabel = new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

            const comparisons = [
              {a:{name:"Heinz Ketchup",score:6,flags:"HFCS · Caramel color"},    b:{name:"Annie's Ketchup",score:2,flags:"Organic · 5 ingredients"}},
              {a:{name:"Tide Pods",score:7,flags:"PVA film · Optical brighteners"},b:{name:"Blueland Laundry",score:2,flags:"Plastic-free · Clean formula"}},
              {a:{name:"Neutrogena SPF 50",score:6,flags:"Oxybenzone · Parabens"}, b:{name:"Badger Mineral SPF",score:2,flags:"Zinc oxide only"}},
              {a:{name:"Febreze Air",score:7,flags:"Synthetic fragrance · VOCs"},  b:{name:"Branch Basics Spray",score:2,flags:"No synthetic fragrance"}},
              {a:{name:"Gatorade",score:6,flags:"Artificial dyes · HFCS"},         b:{name:"Liquid IV",score:3,flags:"Cleaner formula"}},
              {a:{name:"Dawn Dish Soap",score:5,flags:"Synthetic fragrance · SLS"}, b:{name:"Branch Basics Dish",score:2,flags:"Fragrance-free · Clean"}},
              {a:{name:"Lay's Chips",score:5,flags:"Seed oils · Natural flavors"},  b:{name:"Siete Chips",score:2,flags:"Avocado oil · Clean"}},
            ];
            const todayComp = comparisons[new Date().getDay()];
            const scoreCol = s => s<=2?"#22c55e":s<=4?"#a3e635":s<=6?"#f59e0b":s<=8?"#f97316":"#ef4444";
            return (
              <div style={{paddingBottom: isMobile ? 160 : 60}}>

                {/* ── FIXED SCAN BAR — always visible, never scrolls away ── */}
                <div style={{
                  position:"fixed", top: 44 + SAFE_TOP, left:0, right:0, zIndex:40,
                  background:"rgba(5,46,22,0.97)", backdropFilter:"blur(12px)",
                  borderBottom:"1px solid rgba(34,197,94,0.15)",
                  padding: isMobile ? "10px 16px" : "12px 40px",
                }}>
                  <div style={{maxWidth:860, margin:"0 auto", display:"flex", alignItems:"center", gap:10}}>
                    <div style={{flex:1, display:"flex", alignItems:"center", gap:10, background:"rgba(15,42,24,0.9)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:14, padding:"10px 16px", cursor:"text"}}
                      onClick={()=>{setShowScanModal(true); setModalQuery("");}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" opacity="0.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <span style={{fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#6ee7b7", opacity:0.45}}>Search any product…</span>
                    </div>
                    {/* Camera button */}
                    <div onClick={()=>isMobile?setShowBarcodeScanner(true):document.getElementById("home-file-input").click()}
                      style={{width:44, height:44, borderRadius:12, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </div>
                    {!isMobile && <input id="home-file-input" type="file" accept="image/*" style={{display:"none"}} onChange={async(e)=>{const f=e.target.files?.[0];if(!f)return;e.target.value="";await handleImageScan(f);}}/>}
                  </div>
                </div>

                {/* ── FEED CONTENT ── */}
                <div style={{maxWidth:860, margin:"0 auto", padding: isMobile ? `${44 + SAFE_TOP + 32}px 16px 24px` : "68px 40px 32px"}}>

                  {/* Greeting + streak */}
                  <div style={{marginBottom:20, display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontFamily:"'Outfit',sans-serif", fontSize:isMobile?22:26, fontWeight:800, color:"#f0fdf4", marginBottom:4}}>{greet}</div>
                      <div style={{fontSize:13, color:"#6ee7b7", opacity:0.7}}>{history.length} product{history.length!==1?"s":""} scanned</div>
                    </div>
                    {/* Streak — Zeigarnik: loss aversion keeps people coming back */}
                    {streak >= 1 && (
                      <div style={{display:"flex", alignItems:"center", gap:6, background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:20, padding:"6px 12px", flexShrink:0}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <span style={{fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:800, color:"#f59e0b"}}>{streak} day streak</span>
                      </div>
                    )}</div>

                  {/* Routine score pill */}
                  <div onClick={()=>{setPage("routine"); setResult(null);}}
                    style={{marginBottom:24, background:"linear-gradient(135deg,rgba(20,83,45,0.8),rgba(15,42,24,0.8))", border:"1px solid rgba(34,197,94,0.2)", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:16, cursor:"pointer"}}>
                    <div style={{width:52, height:52, borderRadius:"50%", background:`conic-gradient(${scoreCol(routineScore)} 0% ${routineScore*10}%, rgba(34,197,94,0.1) ${routineScore*10}% 100%)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, position:"relative"}}>
                      <div style={{position:"absolute", inset:5, borderRadius:"50%", background:"#0f2a18", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <span style={{fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:900, color:scoreCol(routineScore)}}>{routineScore}</span>
                      </div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:700, color:"#f0fdf4", marginBottom:2}}>My Routine Score</div>
                      <div style={{fontSize:12, color:"#6ee7b7", opacity:0.7}}>{history.length} products · {highRisk.length>0?`${highRisk.length} need attention`:"looking good"}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2.5" opacity="0.4"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>

                  {/* For You */}
                  {(() => {
                    const forYou = [];
                    history.filter(h=>(h.overall_score||h.score||0)>=6).slice(0,1).forEach(h=>forYou.push({type:"warn",reason:"In your routine",name:h.product_name,detail:`Scored ${h.overall_score||h.score}/10 — tap to see safer alternatives`,cta:"See swaps",item:h}));
                    history.filter(h=>(h.flagged_substances||[]).length>0&&(h.overall_score||h.score||0)>=5).slice(0,1).forEach(h=>forYou.push({type:"bad",reason:"Based on your scan",name:h.product_name,detail:`Contains ${h.flagged_substances[0]} — worth a closer look`,cta:"Dig deeper",item:h}));
                    history.filter(h=>(h.overall_score||h.score||0)<=2).slice(0,1).forEach(h=>forYou.push({type:"good",reason:"You scanned this",name:h.product_name,detail:`Scored ${h.overall_score||h.score}/10 — one of your cleanest products`,cta:"View result",item:h}));
                    if (!forYou.length) return null;
                    markSeen(forYou.map(c=>c.name));
                    const ts = {warn:{accent:"#f59e0b",bg:"rgba(245,158,11,0.08)",border:"rgba(245,158,11,0.2)",ctaBg:"rgba(245,158,11,0.12)",ctaColor:"#f59e0b"},bad:{accent:"#ef4444",bg:"rgba(239,68,68,0.08)",border:"rgba(239,68,68,0.2)",ctaBg:"rgba(239,68,68,0.12)",ctaColor:"#ef4444"},good:{accent:"#22c55e",bg:"rgba(34,197,94,0.06)",border:"rgba(34,197,94,0.18)",ctaBg:"rgba(34,197,94,0.12)",ctaColor:"#22c55e"}};
                    return (
                      <div style={{marginBottom:24}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:"#f0fdf4"}}>For You</div>
                          <span onClick={()=>{setPage("history");setResult(null);}} style={{fontSize:12,color:"#22c55e",fontWeight:600,cursor:"pointer"}}>See all</span>
                        </div>
                        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
                          {forYou.map((card,i)=>{
                            const st=ts[card.type];
                            const isNew = isNewCard(card.name);
                            return (
                              <div key={i} onClick={()=>card.item&&setResult(card.item)}
                                style={{flexShrink:0,width:160,background:st.bg,border:`1px solid ${st.border}`,borderRadius:14,padding:12,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:st.accent,borderRadius:"14px 14px 0 0"}}/>
                                {/* New badge — Von Restorff: breaks pattern on first daily visit */}
                                {isNew && (
                                  <div style={{position:"absolute",top:8,right:8,background:"#22c55e",color:"#052e16",fontFamily:"'Outfit',sans-serif",fontSize:8,fontWeight:900,padding:"2px 6px",borderRadius:20,letterSpacing:"0.08em"}}>NEW</div>
                                )}
                                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:st.accent,marginBottom:8,marginTop:2}}>{card.reason}</div>
                                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:700,color:"#f0fdf4",marginBottom:6,lineHeight:1.3}}>{card.name.length>28?card.name.slice(0,26)+"…":card.name}</div>
                                <div style={{fontSize:10,color:"#6ee7b7",lineHeight:1.5,marginBottom:10,opacity:0.8}}>{card.detail}</div>
                                <div style={{display:"inline-block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:20,background:st.ctaBg,color:st.ctaColor}}>{card.cta} →</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Today's Comparison */}
                  <div style={{marginBottom:24}}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12}}>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:"#f0fdf4"}}>Today's Comparison</div>
                      <div style={{fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, color:"#6ee7b7", opacity:0.8, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:20, padding:"3px 10px"}}>{todayLabel}</div>
                    </div>
                    <div style={{background:"linear-gradient(135deg,#0f2a18,#122e1a)",border:"1px solid rgba(34,197,94,0.15)",borderRadius:16,overflow:"hidden",position:"relative"}}>
                      <div style={{position:"absolute",top:10,left:10,background:"#a3e635",color:"#052e16",fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:"0.08em",textTransform:"uppercase"}}>Head to Head</div>
                      <div style={{padding:"36px 20px 20px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                          {[todayComp.a, todayComp.b].map((prod,pi)=>(
                            <React.Fragment key={pi}>
                              {pi===1&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:800,color:"#6ee7b7",opacity:0.5,flexShrink:0}}>VS</div>}
                              <div onClick={()=>{setQuery(prod.name);analyze(prod.name);}}
                                style={{flex:1,background:"rgba(0,0,0,0.2)",borderRadius:12,padding:"14px 10px",textAlign:"center",border:"1px solid rgba(34,197,94,0.1)",cursor:"pointer"}}>
                                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:700,color:"#f0fdf4",marginBottom:8,lineHeight:1.3}}>{prod.name}</div>
                                <div style={{width:44,height:44,borderRadius:"50%",background:`${scoreCol(prod.score)}18`,border:`2px solid ${scoreCol(prod.score)}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
                                  <span style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:900,color:scoreCol(prod.score)}}>{prod.score}</span>
                                </div>
                                <div style={{fontSize:10,color:"#6ee7b7",opacity:0.6,lineHeight:1.4}}>{prod.flags}</div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={{fontSize:12,color:"#6ee7b7",lineHeight:1.6,paddingTop:12,borderTop:"1px solid rgba(34,197,94,0.1)"}}>
                          <span style={{color:"#22c55e",fontWeight:600}}>{todayComp.b.name}</span> is the cleaner choice. Tap either to scan the full breakdown.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trending Scans */}
                  <div style={{marginBottom:24}}>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:"#f0fdf4",marginBottom:12}}>Trending Scans</div>
                    <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
                      {[
                        {name:"Honey Nut Cheerios",cat:"Cereal",  score:6,scans:"2.4k"},
                        {name:"Dawn Dish Soap",    cat:"Cleaning", score:5,scans:"1.8k"},
                        {name:"Skittles",          cat:"Candy",    score:8,scans:"980"},
                        {name:"Aveeno Lotion",     cat:"Skincare", score:3,scans:"1.1k"},
                        {name:"Liquid Death",      cat:"Beverage", score:1,scans:"870"},
                      ].map((item,i)=>(
                        <div key={i} onClick={()=>{setQuery(item.name);analyze(item.name);}}
                          style={{flexShrink:0,width:140,background:"#0f2a18",border:"1px solid rgba(34,197,94,0.15)",borderRadius:14,padding:12,cursor:"pointer"}}>
                          <div style={{fontSize:11,color:"#6ee7b7",opacity:0.6,marginBottom:8}}>{item.cat}</div>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:700,color:"#f0fdf4",marginBottom:10,lineHeight:1.3}}>{item.name}</div>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <span style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:900,color:scoreCol(item.score)}}>{item.score}</span>
                            <span style={{fontSize:9,color:"#6ee7b7",opacity:0.5}}>{item.scans} scans</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Swap List */}
                  {swapList.length>0&&(
                    <div style={{marginBottom:24}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:"#f0fdf4"}}>Your Swap List</div>
                        <span onClick={()=>{setPage("routine");setResult(null);}} style={{fontSize:12,color:"#22c55e",fontWeight:600,cursor:"pointer"}}>All swaps</span>
                      </div>
                      {swapList.map((h,i)=>{
                        const s=h.overall_score||h.score||5;
                        const alt=h.alternatives?.[0]||h.ai_alternatives?.[0];
                        return (
                          <div key={i} onClick={()=>setResult(h)}
                            style={{marginBottom:10,background:"#0f2a18",border:"1px solid rgba(34,197,94,0.15)",borderRadius:14,padding:"14px 16px",cursor:"pointer",position:"relative",overflow:"hidden"}}>
                            <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${scoreCol(s)},${scoreCol(s)}88)`,borderRadius:"14px 0 0 14px"}}/>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:alt?10:0}}>
                              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,color:"#f0fdf4",flex:1}}>{h.product_name?.length>36?h.product_name.slice(0,34)+"…":h.product_name}</div>
                              <div style={{width:28,height:28,borderRadius:"50%",background:`${scoreCol(s)}18`,border:`1.5px solid ${scoreCol(s)}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:800,color:scoreCol(s)}}>{s}</span>
                              </div>
                            </div>
                            {alt&&(
                              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(34,197,94,0.07)",border:"1px solid rgba(34,197,94,0.18)",borderRadius:10,padding:"8px 12px"}}>
                                <div>
                                  <div style={{fontSize:9,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:"#22c55e",marginBottom:2}}>Try instead</div>
                                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:700,color:"#f0fdf4"}}>{(alt.name||"").slice(0,34)}</div>
                                </div>
                                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:900,color:"#22c55e"}}>{alt.score||alt.estimated_score||2}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Danger Zone */}
                  {highRisk.length>0&&(
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,color:"rgba(239,68,68,0.4)"}}>
                        <div style={{flex:1,height:1,background:"rgba(239,68,68,0.15)"}}/>
                        <span style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase"}}>Danger Zone</span>
                        <div style={{flex:1,height:1,background:"rgba(239,68,68,0.15)"}}/>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:800,color:"#ef4444"}}>Danger Zone</span>
                        <div style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:20,padding:"2px 8px",fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:800,color:"#ef4444"}}>{highRisk.length} Products</div>
                      </div>
                      {highRisk.map((h,i)=>{
                        const s=h.overall_score||h.score||8;
                        const flags=(h.flagged_substances||[]).slice(0,3);
                        return (
                          <div key={i} onClick={()=>setResult(h)}
                            style={{marginBottom:10,background:"linear-gradient(135deg,#1a0a0a,#1f0f0f)",border:"1px solid rgba(239,68,68,0.35)",borderRadius:14,padding:"16px",cursor:"pointer",position:"relative",overflow:"hidden"}}>
                            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#ef4444,transparent)",backgroundSize:"200% 100%",animation:"scanLine 2s linear infinite"}}/>
                            <style>{`@keyframes scanLine{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
                            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
                              <div style={{flex:1}}>
                                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:800,color:"#fca5a5",marginBottom:6}}>{h.product_name?.length>36?h.product_name.slice(0,34)+"…":h.product_name}</div>
                                {flags.length>0&&(
                                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                                    {flags.map((f,j)=>(
                                      <span key={j} style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.25)",color:"#fca5a5"}}>{f}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:40,fontWeight:900,color:"#ef4444",lineHeight:1,textShadow:"0 0 20px rgba(239,68,68,0.4)",marginLeft:12,flexShrink:0}}>{s}</div>
                            </div>
                            <div style={{display:"flex",gap:8}}>
                              <div style={{flex:1,padding:"9px 12px",borderRadius:10,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",textAlign:"center",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:700,color:"#fca5a5"}}>Find a safe swap</div>
                              <div style={{padding:"9px 14px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.3)"}}>Learn why</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>
            );
          })() : (
          <>
          {/* ── NEW USER: full hero ── */}

          {/* ── FIXED SCAN BAR — always visible, never scrolls away ── */}
          {/* Fitts's Law: scan is always one tap away regardless of scroll position */}
          <div style={{
            position:"fixed", top: 44 + SAFE_TOP, left:0, right:0, zIndex:40,
            background:"rgba(5,46,22,0.97)", backdropFilter:"blur(12px)",
            borderBottom:"1px solid rgba(34,197,94,0.15)",
            padding: isMobile ? "10px 16px" : "12px 40px",
          }}>
            <div style={{maxWidth:860, margin:"0 auto", display:"flex", alignItems:"center", gap:10}}>
              <div style={{flex:1, display:"flex", alignItems:"center", gap:10, background:"rgba(15,42,24,0.9)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:14, padding:"10px 16px", cursor:"text"}}
                onClick={()=>document.getElementById("hero-search-input").focus()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" opacity="0.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  id="hero-search-input"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&analyze()}
                  placeholder="Search any product…"
                  style={{flex:1, border:"none", outline:"none", fontFamily:"'DM Sans',sans-serif", fontSize:15, background:"transparent", color:"#f0fdf4", minWidth:0}}
                />
                {query.trim() && (
                  <button onClick={()=>analyze()} style={{padding:"6px 14px", borderRadius:10, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", flexShrink:0, boxShadow:"0 2px 8px rgba(34,197,94,0.35)"}}>Scan</button>
                )}
              </div>
              <div onClick={()=>isMobile?setShowBarcodeScanner(true):document.getElementById("hero-file-input").click()}
                style={{width:44, height:44, borderRadius:12, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
              {!isMobile && <input id="hero-file-input" type="file" accept="image/*" style={{display:"none"}} onChange={async(e)=>{const f=e.target.files?.[0];if(!f)return;e.target.value="";await handleImageScan(f);}}/>}
            </div>
          </div>

          <section style={{background:"#052e16", position:"relative", overflow:"hidden", padding: isMobile ? `${44 + SAFE_TOP + 52}px 20px 40px` : "112px 40px 56px"}}>
            {/* Animated gradient mesh background */}
            <div style={{position:"absolute", inset:0, background:"linear-gradient(135deg,#052e16 0%,#0a3d1f 25%,#052e16 50%,#071f0c 75%,#052e16 100%)", backgroundSize:"400% 400%", animation:"gradientShift 12s ease infinite", pointerEvents:"none"}}/>
            {/* Radial glow that breathes */}
            <div style={{position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:600, height:300, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(34,197,94,0.12) 0%,transparent 70%)", animation:"livePulse 4s ease-in-out infinite", pointerEvents:"none"}}/>
            {/* Floating particles */}
            <style>{`
              @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-18px) translateX(8px)} }
              @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-12px) translateX(-10px)} }
              @keyframes float3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-20px) translateX(6px)} }
              @keyframes float4 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-8px) translateX(-14px)} }
              @keyframes float5 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-15px) translateX(12px)} }
              @keyframes countUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
              @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
              @keyframes heroReveal { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
              @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
              @keyframes autoScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
              @keyframes scoreReveal { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
            `}</style>
            {[
              {s:10,x:"8%",  y:"20%",a:0.25,anim:"float1",dur:"6s",  shape:"circle"},
              {s:6, x:"15%", y:"65%",a:0.18,anim:"float2",dur:"8s",  shape:"circle"},
              {s:14,x:"88%", y:"15%",a:0.20,anim:"float3",dur:"7s",  shape:"circle"},
              {s:8, x:"92%", y:"70%",a:0.15,anim:"float1",dur:"9s",  shape:"diamond"},
              {s:5, x:"75%", y:"30%",a:0.30,anim:"float4",dur:"5s",  shape:"circle"},
              {s:12,x:"25%", y:"82%",a:0.15,anim:"float5",dur:"10s", shape:"circle"},
              {s:7, x:"60%", y:"78%",a:0.20,anim:"float2",dur:"7.5s",shape:"diamond"},
              {s:9, x:"45%", y:"12%",a:0.18,anim:"float3",dur:"6.5s",shape:"circle"},
              {s:5, x:"82%", y:"50%",a:0.25,anim:"float1",dur:"8.5s",shape:"circle"},
              {s:11,x:"5%",  y:"48%",a:0.15,anim:"float4",dur:"9.5s",shape:"diamond"},
              {s:4, x:"38%", y:"88%",a:0.20,anim:"float5",dur:"7s",  shape:"circle"},
              {s:8, x:"70%", y:"8%", a:0.22,anim:"float2",dur:"6s",  shape:"circle"},
              {s:6, x:"52%", y:"92%",a:0.15,anim:"float3",dur:"11s", shape:"diamond"},
              {s:10,x:"20%", y:"35%",a:0.12,anim:"float1",dur:"8s",  shape:"circle"},
              {s:5, x:"95%", y:"38%",a:0.20,anim:"float5",dur:"7.5s",shape:"circle"},
              {s:7, x:"33%", y:"18%",a:0.20,anim:"float3",dur:"9s",  shape:"diamond"},
              {s:4, x:"67%", y:"55%",a:0.18,anim:"float4",dur:"6.5s",shape:"circle"},
              {s:9, x:"12%", y:"85%",a:0.12,anim:"float2",dur:"8s",  shape:"circle"},
              {s:5, x:"78%", y:"42%",a:0.20,anim:"float1",dur:"7s",  shape:"diamond"},
              {s:6, x:"42%", y:"72%",a:0.15,anim:"float5",dur:"9.5s",shape:"circle"},
              {s:8, x:"55%", y:"25%",a:0.18,anim:"float3",dur:"7.5s",shape:"circle"},
              {s:4, x:"3%",  y:"72%",a:0.22,anim:"float4",dur:"6s",  shape:"diamond"},
              {s:6, x:"86%", y:"85%",a:0.15,anim:"float2",dur:"10s", shape:"circle"},
              {s:10,x:"48%", y:"5%", a:0.12,anim:"float1",dur:"8.5s",shape:"circle"},
              {s:5, x:"22%", y:"52%",a:0.20,anim:"float5",dur:"7s",  shape:"diamond"},
              {s:7, x:"64%", y:"40%",a:0.16,anim:"float2",dur:"9s",  shape:"circle"},
              {s:4, x:"30%", y:"95%",a:0.14,anim:"float4",dur:"6.5s",shape:"diamond"},
              {s:9, x:"50%", y:"60%",a:0.12,anim:"float1",dur:"11s", shape:"circle"},
              {s:5, x:"18%", y:"10%",a:0.20,anim:"float3",dur:"7s",  shape:"circle"},
              {s:8, x:"97%", y:"22%",a:0.18,anim:"float5",dur:"8s",  shape:"diamond"},
              {s:4, x:"40%", y:"45%",a:0.14,anim:"float2",dur:"10s", shape:"circle"},
              {s:6, x:"73%", y:"95%",a:0.12,anim:"float4",dur:"7.5s",shape:"circle"},
              {s:10,x:"2%",  y:"30%",a:0.15,anim:"float1",dur:"9s",  shape:"diamond"},
              {s:5, x:"58%", y:"15%",a:0.20,anim:"float3",dur:"6s",  shape:"circle"},
              {s:7, x:"35%", y:"60%",a:0.12,anim:"float5",dur:"8.5s",shape:"circle"},
              {s:4, x:"80%", y:"62%",a:0.18,anim:"float2",dur:"7s",  shape:"diamond"},
              {s:11,x:"10%", y:"95%",a:0.10,anim:"float4",dur:"12s", shape:"circle"},
              {s:5, x:"90%", y:"45%",a:0.20,anim:"float1",dur:"6.5s",shape:"circle"},
              {s:6, x:"28%", y:"40%",a:0.14,anim:"float3",dur:"9.5s",shape:"diamond"},
              {s:8, x:"62%", y:"68%",a:0.12,anim:"float5",dur:"8s",  shape:"circle"},
            ].map((p,i)=>(
              <div key={i} style={{position:"absolute",left:p.x,top:p.y,width:p.s,height:p.s,borderRadius:p.shape==="circle"?"50%":"2px",transform:p.shape==="diamond"?"rotate(45deg)":undefined,background:"white",opacity:p.a,animation:`${p.anim} ${p.dur} ease-in-out infinite`,animationDelay:`${i*0.3}s`,pointerEvents:"none"}}/>
            ))}

            <div style={{maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1,
              transition:"opacity 0.4s ease", opacity: loading ? 0 : 1, pointerEvents: loading ? "none" : "auto"}}>

              {/* Live social proof */}
              <div style={{display:"inline-flex", alignItems:"center", gap:8, background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.25)", color:"#86efac", fontSize:12, fontWeight:600, padding:"6px 16px", borderRadius:20, marginBottom:20, backdropFilter:"blur(4px)", animation:"heroReveal 0.6s ease 0.1s both"}}>
                <div style={{width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"livePulse 1.8s ease-in-out infinite", flexShrink:0}}/>
                <span>2,847 products scanned today</span>
              </div>

              <h1 style={{fontFamily:"'Outfit',sans-serif", fontSize:isMobile?36:56, fontWeight:900, color:"#ffffff", margin:"0 0 16px", letterSpacing:isMobile?"-1px":"-2px", lineHeight:1.08, animation:"heroReveal 0.6s ease 0.2s both"}}>
                Scan anything.<br/><span style={{color:"#22c55e"}}>Know everything.</span>
              </h1>
              <p style={{fontSize:isMobile?15:18, color:"#86efac", margin:"0", lineHeight:1.7, opacity:0.8, animation:"heroReveal 0.6s ease 0.35s both"}}>
                {isMobile ? "Understand what's in your products before it affects your health." : "Understand the chemical reality of every product in your home, before it affects your health."}
              </p>
            </div>
          </section>

          {/* ── PRODUCT SHOWCASE — Endowment Effect: see value before committing ── */}
          {/* Clicking any card triggers a real scan instantly */}
          <div style={{background:"linear-gradient(180deg,#052e16 0%,#080f0a 60%)", paddingBottom:0}}>
            <div style={{padding: isMobile ? "28px 0 20px" : "36px 0 24px"}}>
              <div style={{textAlign:"center", marginBottom:16, padding:"0 20px"}}>
                <div style={{fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:800, color:"#6ee7b7", opacity:0.5, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6}}>Tap any product to scan it</div>
              </div>
              {/* Auto-scrolling infinite carousel — pauses on hover */}
              <style>{`.showcase-track:hover{animation-play-state:paused!important}`}</style>
              <div style={{overflow:"hidden",position:"relative"}}>
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:60,background:"linear-gradient(90deg,#080f0a,transparent)",zIndex:2,pointerEvents:"none"}}/>
                <div style={{position:"absolute",right:0,top:0,bottom:0,width:60,background:"linear-gradient(270deg,#080f0a,transparent)",zIndex:2,pointerEvents:"none"}}/>
                <div className="showcase-track" style={{display:"flex",gap:10,paddingBottom:4,animation:"autoScroll 32s linear infinite",width:"max-content"}}>
                  {[
                    {name:"M&Ms",cat:"Candy",score:8,flag:"Red 40 · Yellow 5"},
                    {name:"Tide Pods",cat:"Laundry",score:7,flag:"PVA film · Brighteners"},
                    {name:"Honey Nut Cheerios",cat:"Cereal",score:6,flag:"BHT · Pesticides"},
                    {name:"Liquid Death",cat:"Water",score:1,flag:"Clean — no concerns"},
                    {name:"Neutrogena SPF",cat:"Sunscreen",score:6,flag:"Oxybenzone"},
                    {name:"RXBAR",cat:"Snack",score:2,flag:"Dates · Eggs · Nuts"},
                    {name:"Huggies Diapers",cat:"Baby",score:8,flag:"PFAS · Ahcovel"},
                    {name:"Skittles",cat:"Candy",score:8,flag:"Red 40 · Titanium dioxide"},
                    {name:"Lodge Cast Iron",cat:"Cookware",score:1,flag:"No coating — pure iron"},
                    {name:"Teflon Pan",cat:"Cookware",score:9,flag:"PTFE · Heat volatiles"},
                    {name:"Oat Yeah Oat Milk",cat:"Beverage",score:2,flag:"Oats · Water · Clean"},
                    {name:"Dawn Dish Soap",cat:"Cleaning",score:5,flag:"Synthetic fragrance"},
                    {name:"M&Ms",cat:"Candy",score:8,flag:"Red 40 · Yellow 5"},
                    {name:"Tide Pods",cat:"Laundry",score:7,flag:"PVA film · Brighteners"},
                    {name:"Honey Nut Cheerios",cat:"Cereal",score:6,flag:"BHT · Pesticides"},
                    {name:"Liquid Death",cat:"Water",score:1,flag:"Clean — no concerns"},
                    {name:"Neutrogena SPF",cat:"Sunscreen",score:6,flag:"Oxybenzone"},
                    {name:"RXBAR",cat:"Snack",score:2,flag:"Dates · Eggs · Nuts"},
                    {name:"Huggies Diapers",cat:"Baby",score:8,flag:"PFAS · Ahcovel"},
                    {name:"Skittles",cat:"Candy",score:8,flag:"Red 40 · Titanium dioxide"},
                    {name:"Lodge Cast Iron",cat:"Cookware",score:1,flag:"No coating — pure iron"},
                    {name:"Teflon Pan",cat:"Cookware",score:9,flag:"PTFE · Heat volatiles"},
                    {name:"Oat Yeah Oat Milk",cat:"Beverage",score:2,flag:"Oats · Water · Clean"},
                    {name:"Dawn Dish Soap",cat:"Cleaning",score:5,flag:"Synthetic fragrance"},
                  ].map((item,i)=>{
                    const sc=item.score<=2?"#22c55e":item.score<=4?"#a3e635":item.score<=6?"#f59e0b":item.score<=8?"#f97316":"#ef4444";
                    const isClean=item.score<=2;
                    return(
                      <div key={i} onClick={()=>{setQuery(item.name);analyze(item.name);}}
                        style={{flexShrink:0,width:148,background:"rgba(15,42,24,0.85)",border:`1px solid ${isClean?"rgba(34,197,94,0.3)":"rgba(34,197,94,0.1)"}`,borderRadius:16,padding:"14px",cursor:"pointer",position:"relative",overflow:"hidden",
                          marginLeft:i===0?(isMobile?16:40):0}}>
                        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:sc,borderRadius:"16px 16px 0 0"}}/>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:"#6ee7b7",opacity:0.55,marginBottom:8,fontWeight:600}}>{item.cat}</div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:700,color:"#f0fdf4",marginBottom:10,lineHeight:1.3}}>{item.name}</div>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:30,fontWeight:900,color:sc,lineHeight:1,textShadow:`0 0 12px ${sc}66`}}>{item.score}</div>
                        <div style={{fontSize:9,color:sc,opacity:0.6,marginTop:6,lineHeight:1.4}}>{item.flag}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── GOAL GRADIENT HOOK — Zeigarnik: incomplete task stays in memory ── */}
            <div style={{maxWidth:600, margin:"0 auto 32px", padding:"0 20px"}}>
              <div style={{background:"rgba(34,197,94,0.06)", border:"1px dashed rgba(34,197,94,0.25)", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:14}}>
                <div style={{display:"flex", gap:6, flexShrink:0}}>
                  {[1,2,3].map(n=>(
                    <div key={n} style={{width:28, height:28, borderRadius:"50%", border:"1.5px dashed rgba(34,197,94,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:800, color:"rgba(34,197,94,0.35)"}}>
                      {n}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:"#22c55e", marginBottom:2}}>Scan 3 products to unlock your Routine Score</div>
                  <div style={{fontSize:11, color:"#6ee7b7", opacity:0.6}}>See your overall health exposure across everything you use daily</div>
                </div>
              </div>
            </div>

            {/* ── TODAY'S COMPARISON — Peak-End: memorable, shareable ── */}
            {(() => {
              const comps = [
                {a:{name:"Heinz Ketchup",score:6,flags:"HFCS · Caramel color"},    b:{name:"Annie's Ketchup",score:2,flags:"Organic · 5 ingredients"}},
                {a:{name:"Tide Pods",score:7,flags:"PVA film · Brighteners"},       b:{name:"Blueland Laundry",score:2,flags:"Plastic-free · Clean"}},
                {a:{name:"Neutrogena SPF",score:6,flags:"Oxybenzone · Parabens"},   b:{name:"Badger Mineral SPF",score:2,flags:"Zinc oxide only"}},
                {a:{name:"Febreze Air",score:7,flags:"Synthetic fragrance · VOCs"}, b:{name:"Branch Basics",score:2,flags:"No synthetic fragrance"}},
                {a:{name:"Gatorade",score:6,flags:"Artificial dyes · HFCS"},        b:{name:"Liquid IV",score:3,flags:"Cleaner formula"}},
                {a:{name:"Dawn Dish Soap",score:5,flags:"Fragrance · SLS"},         b:{name:"Branch Basics Dish",score:2,flags:"Fragrance-free"}},
                {a:{name:"Lay's Chips",score:5,flags:"Seed oils · Natural flavors"},b:{name:"Siete Chips",score:2,flags:"Avocado oil · Clean"}},
              ];
              const tc = comps[new Date().getDay()];
              const sc = s => s<=2?"#22c55e":s<=4?"#a3e635":s<=6?"#f59e0b":s<=8?"#f97316":"#ef4444";
              return (
                <div style={{maxWidth:600, margin:"0 auto 40px", padding:"0 20px"}}>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12}}>
                    <div style={{fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:700, color:"#f0fdf4"}}>Today's Comparison</div>
                    <div style={{background:"#a3e635", color:"#052e16", fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:800, padding:"3px 10px", borderRadius:20, letterSpacing:"0.08em", textTransform:"uppercase"}}>Daily</div>
                  </div>
                  <div style={{background:"linear-gradient(135deg,#0f2a18,#122e1a)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:16, padding:"20px", display:"flex", gap:10, alignItems:"center"}}>
                    {[tc.a, tc.b].map((prod,pi)=>(
                      <React.Fragment key={pi}>
                        {pi===1&&<div style={{fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:800, color:"rgba(110,231,183,0.4)", flexShrink:0}}>VS</div>}
                        <div onClick={()=>{setQuery(prod.name);analyze(prod.name);}}
                          style={{flex:1, background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"14px 12px", textAlign:"center", border:"1px solid rgba(34,197,94,0.1)", cursor:"pointer"}}>
                          <div style={{fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:700, color:"#f0fdf4", marginBottom:8, lineHeight:1.3}}>{prod.name}</div>
                          <div style={{width:44, height:44, borderRadius:"50%", background:`${sc(prod.score)}18`, border:`2px solid ${sc(prod.score)}44`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 6px"}}>
                            <span style={{fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:900, color:sc(prod.score)}}>{prod.score}</span>
                          </div>
                          <div style={{fontSize:10, color:"#6ee7b7", opacity:0.55, lineHeight:1.4}}>{prod.flags}</div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{textAlign:"center", marginTop:12}}>
                    <span style={{fontSize:12, color:"#6ee7b7", opacity:0.5}}>Tap either product to see the full breakdown</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {error&&<div style={{maxWidth:600, margin:"0 auto 20px", padding:"0 20px"}}><div style={{padding:"14px 20px",background:"rgba(239,68,68,0.15)",borderRadius:10,color:"#fca5a5",fontSize:14,border:"1px solid rgba(239,68,68,0.3)"}}>{error}</div></div>}

          {/* Homepage email capture */}
          {!emailDismissed && !user && (
            <div style={{maxWidth:520, margin:"0 auto 0", padding:"0 20px 32px"}}>
              <div style={{background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:16, padding:"20px"}}>
                <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:"#f0fdf4", marginBottom:4}}>Get weekly safety alerts</div>
                <div style={{fontSize:12, color:"#6ee7b7", opacity:0.7, marginBottom:14}}>Product recalls, ingredient flags, and safer swaps — straight to your inbox</div>
                <div style={{display:"flex", gap:8}}>
                  <input type="email" placeholder="your@email.com" value={captureEmail} onChange={e=>setCaptureEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitCaptureEmail()}
                    style={{flex:1, padding:"10px 14px", borderRadius:10, border:"1px solid rgba(34,197,94,0.2)", background:"rgba(15,42,24,0.8)", color:"#f0fdf4", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif"}}/>
                  <button onClick={submitCaptureEmail} disabled={captureSubmitting}
                    style={{padding:"10px 18px", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", whiteSpace:"nowrap", opacity:captureSubmitting?0.7:1, boxShadow:"0 2px 10px rgba(34,197,94,0.3)"}}>
                    {captureSubmitting ? "..." : captureMsg ? "Done!" : "Stay informed"}
                  </button>
                </div>
              </div>
            </div>
          )}
          </>
          )}

          {history.length === 0 && (
          <div style={{paddingTop: isMobile?32:56}}>

            {/* Trust strip — moved up, first thing below hero */}
            <div style={{maxWidth:860, margin:"0 auto 60px", padding:`0 ${isMobile?"16px":"40px"}`}}>
              <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?16:24}}>
                {[
                  {icon:"score",    title:"Science-backed",      body:"Every score grounded in peer-reviewed research from NEJM, Nature Medicine and The Lancet"},
                  {icon:"safety",   title:"No brand influence",   body:"No brand can pay to change a score. Affiliate links are always clearly disclosed"},
                  {icon:"verified", title:"Two-pass verified",    body:"Every scan runs two independent AI passes to check and audit the score"},
                  {icon:"scan",     title:"Free to start",          body:"No account needed to get started. Create a free account to save your scan history across devices"},
                ].map((item,i) => (
                  <div key={i} style={{
                    background:isDark?"#0f2a18":"#fff",
                    borderRadius:16, padding:"24px 20px", textAlign:"center",
                    border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#f0fdf4"}`,
                    display:"flex", flexDirection:"column", alignItems:"center", gap:12,
                  }}>
                    <div style={{width:64, height:64, borderRadius:"50%", background:isDark?"#1a2a1a":"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center"}}>
                      {item.icon==="score"&&<IcoScore size={36}/>}{item.icon==="safety"&&<IcoSafety size={36}/>}{item.icon==="verified"&&<IcoVerified size={36}/>}{item.icon==="scan"&&<IcoScan size={36}/>}
                    </div>
                    <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:isDark?"#f0fdf4":"#111"}}>{item.title}</div>
                    <div style={{fontSize:13, color:isDark?"#6ee7b7":"#888", lineHeight:1.6}}>{item.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENTLY VIEWED CAROUSEL */}
            {history.length > 0 && (
              <div style={{maxWidth:1100, margin:"0 auto 40px", padding:`0 ${isMobile?"16px":"40px"}`}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14}}>
                  <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?16:18, color:text, margin:0}}>Recently viewed</h2>
                  <span onClick={()=>{setPage("history"); setResult(null);}} style={{fontSize:13, color:"#16a34a", fontWeight:600, cursor:"pointer"}}>See all →</span>
                </div>
                <div style={{display:"flex", gap:12, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none", msOverflowStyle:"none"}}>
                  <style>{`.carousel::-webkit-scrollbar{display:none}`}</style>
                  <div className="carousel" style={{display:"flex", gap:12, overflowX:"auto", paddingBottom:8, width:"100%"}}>
                    {history.slice(0,8).map((item,i)=>(
                      <button key={i} onClick={()=>setResult(item)}
                        style={{flexShrink:0, width:isMobile?140:160, background:surface, borderRadius:12, padding:"14px", border:`1.5px solid ${border}`, cursor:"pointer", textAlign:"left", transition:"all 0.15s"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor="#16a34a";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=border;}}>
                        {/* Score circle */}
                        <div style={{width:40, height:40, borderRadius:"50%", background:scoreBg(item.score), display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10}}>
                          <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:16, color:scoreColor(item.score)}}>{item.score}</span>
                        </div>
                        <div style={{fontSize:13, fontWeight:600, color:text, lineHeight:1.3, marginBottom:4, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical"}}>
                          {item.product_name}
                        </div>
                        <div style={{fontSize:11, color:scoreColor(item.score), fontWeight:600}}>{scoreLabel(item.score)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Impact stats box */}
            <div style={{maxWidth:960, margin:"0 auto 60px", padding:`0 ${isMobile?"16px":"40px"}`}}>
              <div style={{background:isDark?"#0f2a18":"#f4f7f4", borderRadius:20, padding:isMobile?"32px 24px":"48px 56px", position:"relative", overflow:"hidden", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#d1e8d1"}`}}>
                {/* Floating particles */}
                {[
                  {s:8, x:"5%",  y:"20%", a:0.25, shape:"circle"},
                  {s:5, x:"92%", y:"15%", a:0.2,  shape:"diamond"},
                  {s:12,x:"88%", y:"70%", a:0.18, shape:"circle"},
                  {s:6, x:"8%",  y:"75%", a:0.22, shape:"diamond"},
                  {s:9, x:"50%", y:"8%",  a:0.15, shape:"circle"},
                  {s:4, x:"70%", y:"90%", a:0.2,  shape:"circle"},
                  {s:7, x:"25%", y:"85%", a:0.15, shape:"diamond"},
                  {s:5, x:"78%", y:"45%", a:0.2,  shape:"circle"},
                ].map((p,i)=>(
                  <div key={i} style={{position:"absolute", left:p.x, top:p.y, width:p.s, height:p.s, borderRadius:p.shape==="circle"?"50%":"2px", transform:p.shape==="diamond"?"rotate(45deg)":undefined, background:"#16a34a", opacity:p.a, pointerEvents:"none"}}/>
                ))}

                <div style={{position:"relative", zIndex:1}}>
                  <div style={{fontSize:isMobile?13:14, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, textAlign:"center"}}>Why it matters</div>
                  <p style={{fontSize:isMobile?14:16, color:isDark?"#6ee7b7":"#555", lineHeight:1.7, maxWidth:560, margin:"0 auto 40px", textAlign:"center"}}>
                    The products around you affect more than you realize. Here is what the research says.
                  </p>

                  {/* Three spheres */}
                  {[
                    {
                      label: "Your Health",
                      color: "#16a34a",
                      stats: [
                        {number:"100%", label:"of human blood samples tested contained microplastics", sub:"Leslie et al. 2022"},
                        {number:"58%",  label:"of arterial plaques studied contained polypropylene plastic", sub:"Marfella et al. NEJM 2024"},
                        {number:"2024", label:"FDA banned Red 3 and began phasing out all petroleum-based synthetic dyes", sub:"FDA announcement"},
                      ]
                    },
                    {
                      label: "Your Home",
                      color: "#16a34a",
                      stats: [
                        {number:"PVA",   label:"film in dishwasher and laundry pods enters waterways as microplastic after dissolving", sub:"peer-reviewed lifecycle analysis"},
                        {number:"1,000+",label:"chemicals in everyday home products are known or suspected endocrine disruptors", sub:"Environmental Working Group"},
                        {number:"10x",   label:"higher microplastic concentrations found in infants compared to adults", sub:"multiple peer-reviewed studies"},
                      ]
                    },
                    {
                      label: "The Planet",
                      color: "#16a34a",
                      stats: [
                        {number:"8M",    label:"tonnes of plastic enter the world's oceans every single year", sub:"UNEP estimate"},
                        {number:"700K",  label:"microfibers released per wash from a single synthetic fleece jacket", sub:"Environment International"},
                        {number:"500yr", label:"the time it takes a standard plastic bag to break down in landfill", sub:"environmental science consensus"},
                      ]
                    },
                  ].map((sphere, si) => (
                    <div key={si} style={{marginBottom: si < 2 ? (isMobile?36:40) : 0}}>
                      <div style={{fontSize:12, fontWeight:700, color:sphere.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16, textAlign:isMobile?"center":"left"}}>{sphere.label}</div>
                      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:isMobile?16:24}}>
                        {sphere.stats.map((s,i)=>(
                          <div key={i} style={{textAlign:isMobile?"center":"left"}}>
                            <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:isMobile?26:32, color:sphere.color, lineHeight:1, marginBottom:8}}>{s.number}</div>
                            <div style={{fontSize:12, color:isDark?"#6ee7b7":"#444", lineHeight:1.5, marginBottom:4}}>{s.label}</div>
                            <div style={{fontSize:10, color:isDark?"#475569":"#999", fontStyle:"italic"}}>{s.sub}</div>
                          </div>
                        ))}
                      </div>
                      {si < 2 && <div style={{borderTop:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#d1e8d1"}`, marginTop:isMobile?28:32}}/>}
                    </div>
                  ))}

                  <div style={{fontSize:isMobile?14:16, color:isDark?"#6ee7b7":"#555", lineHeight:1.7, maxWidth:520, margin:"36px auto 0", textAlign:"center"}}>
                    Most products carry no warning. No label. No guidance on what to do instead.
                    <span style={{color:"#16a34a", fontWeight:700}}> That is why Partiqule exists.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggest a product — users can request new products for scoring */}
            <SuggestionBox isDark={isDark} isMobile={isMobile} surface={surface} border={border} text={text} muted={muted} user={user}/>

          </div>
          )}
        </>
      ) : (
        /* RESULTS */
        <>
        <div style={{maxWidth:1100, margin:"0 auto", padding:isMobile?"8px 0 60px":`40px 40px 80px`}}>
          <div style={{padding: isMobile ? "0 12px" : 0}}>
          </div>

          {/* Demo banner */}
          {result.isDemo && (
            <div style={{marginBottom:20, padding:"12px 20px", background:isDark?"#1a1a2e":"#eff6ff", borderRadius:12, border:"1.5px solid #93c5fd", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                <div>
                  <div style={{fontSize:13, fontWeight:700, color:"#2563eb"}}>This is a demo scan</div>
                  <div style={{fontSize:12, color:isDark?"#6ee7b7":"#555"}}>M&Ms is a real example. Scan any product to get your own result.</div>
                </div>
              </div>
              <button onClick={reset} style={{padding:"7px 16px", borderRadius:8, background:"#2563eb", color:"#fff", border:"none", fontWeight:600, fontSize:13, cursor:"pointer", whiteSpace:"nowrap"}}>
                Scan a product →
              </button>
            </div>
          )}
          <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?12:28, alignItems:"start", padding:isMobile?"0 8px":0}}>

            {/* LEFT */}
            {(() => {
            const displayScore = pregnancyMode && result.pregnancy_score ? result.pregnancy_score : (childMode && result.child_score) ? result.child_score : (result.overall_score || result.score);
            return (
            <div style={{display:"flex", flexDirection:"column", gap:isMobile?12:20}}>
              <div className="score-reveal" style={{background:isDark?"#0f2a18":scoreCardBg(result.overall_score||result.score), borderRadius:isMobile?16:20, padding:isMobile?"20px 14px":"40px 36px", border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":scoreBg(result.overall_score||result.score)}`, textAlign:"center"}}>
                {/* Header row */}
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:10, flexWrap:"wrap"}}>
                  <div style={{fontSize:11,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.1em"}}>
                    <><IcoRating size={14}/> Product Health Score</> <span style={{fontSize:10, opacity:0.6}}>(10 = highest concern)</span>
                  </div>
                  {result.cached && <div style={{fontSize:10, fontWeight:600, color:"#16a34a", background:"rgba(34,197,94,0.08)", padding:"2px 8px", borderRadius:10}}><IcoVerified size={14}/> Verified</div>}
                  {result.confidence && (
                    <div style={{fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:10,
                      background:result.confidence==="high"?"#f0fdf4":result.confidence==="medium"?"#fffbeb":"#fef2f2",
                      color:result.confidence==="high"?"#16a34a":result.confidence==="medium"?"#d97706":"#dc2626"}}>
                      {result.confidence==="high"?"High confidence":result.confidence==="medium"?"Medium confidence":"Low confidence"}
                    </div>
                  )}
                  {/* Social proof — scanned by others */}
                  {result.cached && (
                    <div style={{fontSize:10, color:muted, padding:"2px 8px", borderRadius:10, background:isDark?"#0f2a18":"#f9fafb", border:`1px solid ${border}`}}>
                      Scanned by others ✓
                    </div>
                  )}
                </div>

                <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:isMobile?22:28,fontWeight:700,color:text,margin:"0 0 24px",letterSpacing:"-0.5px",wordBreak:"break-word"}}>{result.product_name?.length > 60 ? result.product_name.slice(0,57)+"…" : result.product_name}</h2>

                {/* Hero score — swaps to child score when childMode active */}
                {(() => {
                  return (<>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:4}}>
                      <ScoreArc score={displayScore}/>
                    </div>

                    {/* Dual scoring explanation — one line, always visible */}
                    {(() => {
                      const foodCats = ["food_beverage","beverage","restaurant","baby"];
                      if (!foodCats.includes(result.category)) return null;
                      return (
                        <div style={{fontSize:10, color:muted, marginTop:4, marginBottom:2, letterSpacing:"0.02em"}}>
                          Chemical safety + nutritional impact · combined into one score
                        </div>
                      );
                    })()}

                    <RiskBar score={displayScore}/>

                    {/* Pregnancy mode indicator — shown when pregnancy mode active in settings */}
                    {pregnancyMode && result.pregnancy_score && (
                      <div style={{marginTop:14, marginBottom:4}}>
                        <div style={{
                          display:"flex", alignItems:"center", gap:8, margin:"0 auto", width:"fit-content",
                          padding:"7px 16px", borderRadius:20,
                          background:"#4a1942", border:"none",
                        }}>
                          <span style={{fontSize:13, fontWeight:700, color:"#f9a8d4"}}>PREG</span>
                          <span style={{fontSize:12, fontWeight:700, color:"#f9a8d4", letterSpacing:"0.03em"}}>
                            Viewing pregnancy safety score
                          </span>
                        </div>
                        {result.pregnancy_score !== (result.overall_score || result.score) && (
                          <div style={{
                            marginTop:12, background:isDark?"#2a1a2a":"#fdf4ff",
                            border:"1.5px solid #a855f744", borderRadius:12,
                            padding:"12px 16px", textAlign:"left",
                          }}>
                            <div style={{fontSize:12, fontWeight:700, color:"#7e22ce", marginBottom:6}}>
                              Pregnancy safety score: {result.pregnancy_score}/10 vs {result.overall_score || result.score}/10 standard
                            </div>
                            {(result.pregnancy_bumps || []).slice(0,2).map((b,i) => (
                              <div key={i} style={{fontSize:11, color:isDark?"#d8b4fe":"#6b21a8", lineHeight:1.5, marginBottom:i < (result.pregnancy_bumps||[]).length-1 ? 4 : 0}}>
                                · {b}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Child mode toggle — only shown when pregnancy mode is off */}
                    {!pregnancyMode && (
                    <div style={{marginTop:14, marginBottom:4}}>
                      <button
                        onClick={() => { const next = !childMode; setChildMode(next); track("Child Mode Toggle", {enabled: next, product: result?.product_name}); }}
                        style={{
                          display:"flex", alignItems:"center", gap:8, margin:"0 auto",
                          padding:"7px 16px", borderRadius:20,
                          background: childMode ? "#052e16" : isDark ? "#0f2a18" : "#f1f5f9",
                          border: childMode ? "none" : `1px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`,
                          cursor:"pointer", transition:"all 0.2s",
                        }}>
                        <span style={{fontSize:12, fontWeight:700,
                          color: childMode ? "#4ade80" : muted,
                          letterSpacing:"0.03em",
                        }}>
                          {childMode ? "Viewing child safety score" : "Score for a child?"}
                        </span>
                        {/* Toggle pill */}
                        <div style={{
                          width:32, height:18, borderRadius:9,
                          background: childMode ? "#16a34a" : isDark ? "#374151" : "#d1d5db",
                          position:"relative", transition:"background 0.2s", flexShrink:0,
                        }}>
                          <div style={{
                            position:"absolute", top:3, left: childMode ? 15 : 3,
                            width:12, height:12, borderRadius:"50%", background:"white",
                            transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)",
                          }}/>
                        </div>
                      </button>

                      {/* Child score explanation card */}
                      {childMode && result.child_score && result.child_score !== (result.overall_score || result.score) && (
                        <div style={{
                          marginTop:12, background:isDark?"#1a2a1a":"#f0fdf4",
                          border:"1.5px solid #16a34a44", borderRadius:12,
                          padding:"12px 16px", textAlign:"left",
                        }}>
                          <div style={{fontSize:12, fontWeight:700, color:"#15803d", marginBottom:6}}>
                            Child safety score: {result.child_score}/10 vs {result.overall_score || result.score}/10 for adults
                          </div>
                          {(result.child_bumps || []).slice(0,2).map((b,i) => (
                            <div key={i} style={{fontSize:11, color:isDark?"#86efac":"#166534", lineHeight:1.5, marginBottom:i < (result.child_bumps||[]).length-1 ? 4 : 0}}>
                              · {b}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Auto-detected child product notice */}
                      {result.is_child_product && !childMode && (
                        <div style={{marginTop:10}}>
                          <button
                            onClick={() => setChildMode(true)}
                            style={{
                              width:"100%", padding:"8px 14px", borderRadius:10,
                              background:isDark?"#1a2a1a":"#f0fdf4",
                              border:"1px dashed #16a34a88",
                              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                            }}>
                            <span style={{fontSize:12, color:"#16a34a", fontWeight:600}}>
                              This looks like a child's product — see child safety score
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    )}
                  </>);
                })()}

                {/* ── FLAGGED SUBSTANCE BUBBLES — prime spot right after score arc ── */}
                {(() => {
                  // Generic food/processing terms that are NOT harmful substances
                  const GENERIC_TERMS = new Set([
                    "binding agents","emulsifiers","natural flavoring","natural flavors",
                    "natural flavor","artificial flavor","artificial flavoring","flavorings",
                    "processing aids","processing aid","stabilizers","stabilizer",
                    "thickeners","thickener","food additives","additives","preservatives",
                    "colorings","coloring","colors","colour","colouring","antioxidants",
                    "antioxidant","humectants","humectant","fillers","filler","carriers",
                    "carrier","solvents","solvent","natural ingredients","whole ingredients",
                    "organic ingredients","clean ingredients","certified ingredients",
                    "natural coffee","coffee flavor","coffee taste","almond flavor",
                    "menthol concentration","menthol","peppermint oil","wintergreen oil",
                    "polymeric coating","interior coating","tin coating","metal coating",
                    "food grade coating","lacquer","enamel coating",
                  ]);
                  const isGeneric = (name) => {
                    const n = name.toLowerCase().trim();
                    if (GENERIC_TERMS.has(n)) return true;
                    // Filter descriptions not chemical names
                    if (n.length > 40) return true;
                    if (/\b(for|with|in|of|from|using|added|used|based|concentration|coating|level)\b/.test(n)) return true;
                    return false;
                  };
                  // Clean parenthetical hedges from substance names before displaying
                  const cleanName = (name) => name
                    .replace(/\s*\((presumed|potential|possible|suspected|unconfirmed|estimated|likely|may be present|trace)\)/gi, "")
                    .trim();

                  const flagged = [];
                  const seen = new Set();
                  const add = (name, severity) => {
                    const key = (name||"").toLowerCase().trim();
                    if (!key || key === "unknown" || key.length < 2 || seen.has(key)) return;
                    if (isGeneric(name)) return;
                    seen.add(key);
                    flagged.push({name, severity});
                  };
                  (result.food_analysis?.concerns || []).forEach(c => {
                    if (c?.substance && c.substance !== "Unknown") add(c.substance, c.severity || "medium");
                  });
                  (result.harmful_chemicals || []).forEach(c => add(c, "high"));
                  const allConcerns = [
                    ...(result.dimensions?.materials?.concerns || []),
                    ...(result.concerns || []),
                  ];
                  allConcerns.forEach(c => {
                    if (typeof c === "string") {
                      const match = c.match(/^([A-Z][A-Za-z0-9\s\-\/]{1,30}?)(?:\s*[—:–]|\s+is\s|\s+\()/);
                      if (match) add(match[1].trim(), "medium");
                    } else if (c?.substance) {
                      add(c.substance, c.severity || "medium");
                    }
                  });
                  if (flagged.length === 0) return null;
                  const sStyle = (sev) => ({
                    high:   {bg:"rgba(239,68,68,0.12)",   color:"#fca5a5", border:"1.5px solid rgba(239,68,68,0.3)"},
                    medium: {bg:"rgba(245,158,11,0.12)",  color:"#fcd34d", border:"1.5px solid rgba(245,158,11,0.3)"},
                    low:    {bg:"rgba(34,197,94,0.1)",    color:"#86efac", border:"1.5px solid rgba(34,197,94,0.25)"},
                  })[sev] || {bg:"rgba(245,158,11,0.12)", color:"#fcd34d", border:"1.5px solid rgba(245,158,11,0.3)"};
                  return (
                    <div style={{marginTop:16, marginBottom:4, textAlign:"left"}}>
                      <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:10}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span style={{fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:800, color:"#ef4444", textTransform:"uppercase", letterSpacing:"0.1em"}}>Flagged Substances</span>
                        <span style={{background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:20, padding:"2px 8px", fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:800, color:"#ef4444"}}>{flagged.slice(0,8).length}</span>
                      </div>
                      <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                        {flagged.slice(0, 8).map((f, i) => {
                          const st = sStyle(f.severity);
                          const displayName = cleanName(f.name);
                          if (!displayName || isGeneric(displayName)) return null;
                          return (
                            <span key={i} style={{fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:20, background:st.bg, color:st.color, border:st.border, whiteSpace:"nowrap", letterSpacing:"0.01em"}}>
                              {displayName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Hero label */}
                {(() => {
                  const displayScore = pregnancyMode && result.pregnancy_score ? result.pregnancy_score : (childMode && result.child_score) ? result.child_score : (result.overall_score || result.score);
                  const catLabel = result.category === "food" ? "for food" : result.category === "beverage" ? "for beverages" : result.category === "food_beverage" ? "for food" : result.category === "personal_care" ? "for beauty" : result.category === "clothing" ? "for clothing" : result.category === "home" ? "for home" : result.category === "kitchen" ? "for home" : result.category === "home_furnishing" ? "for home" : result.category === "baby" ? "for baby products" : result.category === "supplement" ? "for supplements" : result.category === "toy" ? "for toys" : result.category === "accessory" ? "for accessories" : result.category === "restaurant" ? "for restaurant food" : "Overall";
                  return (
                    <div style={{marginBottom:16}}>
                      <div style={{display:"inline-block", background:`${scoreColor(displayScore)}18`, color:scoreColor(displayScore), border:`1px solid ${scoreColor(displayScore)}33`, padding:"7px 22px", borderRadius:20, fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:800, margin:"18px 0 8px", letterSpacing:"0.02em"}}>
                        {scoreLabel(displayScore)} — {pregnancyMode && result.pregnancy_score ? "pregnancy safety" : childMode && result.child_score ? "for children" : catLabel}
                      </div>
                      <div style={{fontSize:11,color:muted,marginTop:2}}>
                        {result.category === "food"           ? "Ingredients 90% · Packaging 10%"
                        : result.category === "food_beverage" ? "Ingredients 90% · Packaging 10%"
                        : result.category === "beverage"      ? "Ingredient safety · Nutrition impact"
                        : result.category === "restaurant"    ? "Ingredients 85% · Packaging 10% · Sustainability 5%"
                        : result.category === "supplement"    ? "Ingredients 65% · Exposure 25% · Packaging 10%"
                        : result.category === "personal_care" ? "Materials 45% · Exposure 45% · Packaging 5% · Sustainability 5%"
                        : result.category === "toy"           ? "Materials 50% · Exposure 40% · Packaging 5% · Sustainability 5%"
                        : result.category === "clothing"      ? "Materials 35% · Exposure 30% · Sustainability 35%"
                        : result.category === "accessory"     ? "Materials 40% · Exposure 25% · Sustainability 35%"
                        : result.category === "home"          ? "Materials 30% · Exposure 45% · Packaging 10% · Sustainability 15%"
                        : result.category === "baby"          ? "Materials 55% · Exposure 40% · Packaging 5%"
                        : "Materials 45% · Exposure 30% · Packaging 10% · Sustainability 15%"
                        }
                      </div>
                    </div>
                  );
                })()}

                {/* Alt teaser — below hero label */}
                {(() => {
                  const topAlt = result.alternatives?.[0] || result.ai_alternatives?.[0];
                  const currentScore = pregnancyMode && result.pregnancy_score ? result.pregnancy_score : (childMode && result.child_score) ? result.child_score : (result.overall_score || result.score);
                  if (!topAlt || currentScore <= 3) return null;
                  const altS = topAlt.score ?? topAlt.estimated_score ?? 2;
                  if (altS >= currentScore) return null;
                  return (
                    <button
                      onClick={()=> isMobile ? setShowAlts(true) : document.getElementById("desktop-alternatives")?.scrollIntoView({behavior:"smooth", block:"start"})}
                      style={{width:"100%", marginBottom:14, padding:"10px 16px", borderRadius:12,
                        background:isDark?"#1a2a1a":"#f0fdf4", border:"1.5px solid #16a34a55",
                        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, textAlign:"left"}}>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <span style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em"}}>Better option</span>
                        <span style={{fontSize:13, color:text, fontWeight:600}}>{topAlt.name}</span>
                        <span style={{fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:12, background:"rgba(34,197,94,0.08)", color:"#16a34a", border:"1px solid #bbf7d0"}}>{altS}/10</span>
                      </div>
                      <span style={{fontSize:12, color:"#16a34a", fontWeight:600, flexShrink:0}}>
                        {isMobile ? "See alternatives →" : "See right →"}
                      </span>
                    </button>
                  );
                })()}

                {/* Confidence disclaimer — medium/low only */}
                {result.confidence && result.confidence !== "high" && (
                  <div style={{background:result.confidence==="medium"?"#fffbeb":"#fef2f2", border:`1px solid ${result.confidence==="medium"?"#fde68a":"#fecaca"}`, borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start"}}>
                    <span style={{fontSize:16, flexShrink:0}}>⚠️</span>
                    <div>
                      <div style={{fontSize:12, fontWeight:700, color:result.confidence==="medium"?"#92400e":"#991b1b", marginBottom:2}}>
                        {result.confidence==="medium"?"Ingredient data partially verified":"Limited ingredient data — score is an estimate"}
                      </div>
                      <div style={{fontSize:11, color:result.confidence==="medium"?"#78350f":"#7f1d1d", lineHeight:1.5}}>
                        {result.confidence_reason || "Full ingredient list not publicly available. Score based on known brand practices and typical materials for this product type."}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NUTRITION BADGES — % Daily Values ── */}
                {(() => {
                  const n = result.nutrition;
                  const cat = result.category || "";
                  const isFood = ["food","food_beverage","beverage","restaurant","supplement"].includes(cat);
                  if (!n || !isFood) return null;

                  const sugarDV  = childMode ? 25  : 50;
                  const sodiumDV = childMode ? 1500 : 2300;
                  const satFatDV = childMode ? 13  : 20;

                  const getSev = (pct) => pct >= 100 ? "very_high" : pct >= 60 ? "high" : pct >= 30 ? "moderate" : "low";
                  const SEV = {
                    very_high: { bg: isDark?"#3b0a0a":"#fef2f2", border:"#fca5a5", color:"#dc2626" },
                    high:      { bg: isDark?"#2a1a00":"#fff7ed", border:"#fdba74", color:"#c2410c" },
                    moderate:  { bg: isDark?"#2a2000":"#fefce8", border:"#fde047", color:"#a16207" },
                    low:       { bg: isDark?"#1a1f2e":"#f1f5f9", border:"#cbd5e1", color:"#475569" },
                  };

                  const badges = [];

                  if (n.sugar_g != null) {
                    const pct = Math.round((n.sugar_g / sugarDV) * 100);
                    const cfg = SEV[getSev(pct)];
                    badges.push(
                      <div key="sugar" style={{flex:"1 1 auto", minWidth:80, textAlign:"center", padding:"10px 8px", borderRadius:10, background:cfg.bg, border:`1.5px solid ${cfg.border}`}}>
                        <div style={{fontSize:17, fontWeight:700, color:cfg.color, lineHeight:1}}>{n.sugar_g}g</div>
                        <div style={{fontSize:11, color:isDark?"#6ee7b7":"#64748b", margin:"3px 0 2px"}}>Sugar</div>
                        <div style={{fontSize:12, fontWeight:700, color:cfg.color}}>{pct}% DV</div>
                      </div>
                    );
                  }

                  if (n.sodium_mg != null) {
                    const pct = Math.round((n.sodium_mg / sodiumDV) * 100);
                    const cfg = SEV[getSev(pct)];
                    badges.push(
                      <div key="sodium" style={{flex:"1 1 auto", minWidth:80, textAlign:"center", padding:"10px 8px", borderRadius:10, background:cfg.bg, border:`1.5px solid ${cfg.border}`}}>
                        <div style={{fontSize:17, fontWeight:700, color:cfg.color, lineHeight:1}}>{n.sodium_mg}mg</div>
                        <div style={{fontSize:11, color:isDark?"#6ee7b7":"#64748b", margin:"3px 0 2px"}}>Sodium</div>
                        <div style={{fontSize:12, fontWeight:700, color:cfg.color}}>{pct}% DV</div>
                      </div>
                    );
                  }

                  if (n.sat_fat_g != null) {
                    const pct = Math.round((n.sat_fat_g / satFatDV) * 100);
                    const cfg = SEV[getSev(pct)];
                    badges.push(
                      <div key="satfat" style={{flex:"1 1 auto", minWidth:80, textAlign:"center", padding:"10px 8px", borderRadius:10, background:cfg.bg, border:`1.5px solid ${cfg.border}`}}>
                        <div style={{fontSize:17, fontWeight:700, color:cfg.color, lineHeight:1}}>{n.sat_fat_g}g</div>
                        <div style={{fontSize:11, color:isDark?"#6ee7b7":"#64748b", margin:"3px 0 2px"}}>Sat fat</div>
                        <div style={{fontSize:12, fontWeight:700, color:cfg.color}}>{pct}% DV</div>
                      </div>
                    );
                  }

                  if (!badges.length) return null;
                  return (
                    <div style={{marginBottom:16}}>
                      <div style={{fontSize:10, fontWeight:700, color:isDark?"#6ee7b7":"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>
                        Nutrition · {childMode ? "Children's Daily Values" : "Daily Values"}
                      </div>
                      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                        {badges}
                      </div>
                    </div>
                  );
                })()}

                {/* ── INGREDIENT LIST ── */}
                {result.ingredient_list && result.ingredient_list.length > 0 && (
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:10, fontWeight:700, color:isDark?"#6ee7b7":"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>
                      Full ingredient list
                    </div>
                    <div style={{background:isDark?"#1a1a18":"#f8f9fa", borderRadius:10, padding:"12px 14px", border:`1px solid ${isDark?"#2a2a28":"#e9ecef"}`}}>
                      <p style={{fontSize:12, color:isDark?"#6ee7b7":"#64748b", lineHeight:1.7, margin:0}}>
                        {result.ingredient_list.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {/* ── 5 DIMENSION DROPDOWNS ── */}
                <div style={isMobile ? {margin:"0 -14px"} : {}}>
                {result.dimensions ? (() => {
                  const d = result.dimensions;
                  // When child mode is on, bump health-relevant dimensions by the same delta as overall score
                  const childDimBump = pregnancyMode && result.pregnancy_score && result.overall_score
                    ? Math.max(0, result.pregnancy_score - (result.overall_score || result.score))
                    : (childMode && result.child_score && result.overall_score)
                    ? Math.max(0, result.child_score - (result.overall_score || result.score))
                    : 0;
                  return (<>
                    {/* Product Insights — all categories */}
                    {result.food_analysis && (
                      <div style={{position:"relative"}}>
                        <ProductInsightsDropdown
                          analysis={result.food_analysis}
                          category={result.category}
                          isDark={isDark}
                        />
                      </div>
                    )}
                    {/* 1. Materials */}
                    <DimensionDropdown icon={<IcoIngredients size={20}/>} label="Materials" score={Math.min(10,(d.materials?.score||result.score)+childDimBump)} concerns={d.materials?.concerns} isDark={isDark}>
                      {d.materials?.label && <p style={{fontSize:13,color:isDark?"#6ee7b7":"#555",lineHeight:1.6,margin:"10px 0 4px",fontStyle:"italic"}}>{d.materials.label}</p>}
                      {/* Only show chips when no Product Insights — otherwise redundant */}
                      {!result.food_analysis && (<>
                        {result.identified_plastics?.length > 0 && (
                          <div style={{marginTop:8,marginBottom:4}}>
                            <div style={{fontSize:11,color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Plastics identified</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                              {result.identified_plastics.map((p,i)=>(
                                <span key={i} style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:16,background:isDark?"#2a1a1a":"#fef2f2",color:"#dc2626",border:"1px solid #fecaca"}}>{p}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.harmful_chemicals?.length > 0 && (
                          <div style={{marginTop:8}}>
                            <div style={{fontSize:11,color:"#d97706",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Harmful chemicals</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                              {result.harmful_chemicals.map((c,i)=>(
                                <span key={i} style={{fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:16,background:isDark?"#2a1a00":"#fffbeb",color:"#d97706",border:"1px solid #fde68a"}}>{c}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.natural_materials?.length > 0 && (
                          <div style={{marginTop:8}}>
                            <div style={{fontSize:11,color:"#16a34a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Natural materials</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                              {result.natural_materials.map((m,i)=>(
                                <span key={i} style={{fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:16,background:isDark?"#1a2a1a":"#f0fdf4",color:"#16a34a",border:"1px solid #bbf7d0"}}>{m}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>)}
                    </DimensionDropdown>

                    {/* 2. Usage & Exposure */}
                    <DimensionDropdown icon={<IcoSafety size={20}/>} label="Usage & Exposure" score={Math.min(10,(d.usage_exposure?.score||5)+childDimBump)} concerns={d.usage_exposure?.concerns} isDark={isDark}>
                      {d.usage_exposure?.label && <p style={{fontSize:13,color:isDark?"#6ee7b7":"#555",lineHeight:1.6,margin:"10px 0 4px",fontStyle:"italic"}}>{d.usage_exposure.label}</p>}
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                        {d.usage_exposure?.frequency && d.usage_exposure.frequency !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"#eff6ff",color:"#1d4ed8",display:"flex",alignItems:"center",gap:4}}>
                            <IcoScore size={12}/>{d.usage_exposure.frequency === "daily" ? "Daily use" : d.usage_exposure.frequency === "weekly" ? "Weekly use" : d.usage_exposure.frequency === "occasional" ? "Occasional" : "Rare use"}
                          </span>
                        )}
                        {d.usage_exposure?.type && d.usage_exposure.type !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"#fdf4ff",color:"#7e22ce",display:"flex",alignItems:"center",gap:4}}>
                            <IcoSafety size={12}/>{d.usage_exposure.type === "ingestion" ? "Ingestion risk" : d.usage_exposure.type === "skin_contact" ? "Skin contact" : d.usage_exposure.type === "inhalation" ? "Inhalation risk" : "Mixed exposure"}
                          </span>
                        )}
                        {d.usage_exposure?.intensity && d.usage_exposure.intensity !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"#fff7ed",color:"#c2410c",display:"flex",alignItems:"center",gap:4}}>
                            <IcoScore size={12}/>{d.usage_exposure.intensity === "leave-on" ? "Leave-on" : d.usage_exposure.intensity === "rinse-off" ? "Rinse-off" : "Single contact"}
                          </span>
                        )}
                        {d.usage_exposure?.vulnerable && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"#fdf2f8",color:"#9d174d",display:"flex",alignItems:"center",gap:4}}><IcoProfile size={12}/> Child product</span>
                        )}
                      </div>
                    </DimensionDropdown>

                    {/* 3. Packaging */}
                    <DimensionDropdown icon={<IcoCategory size={20}/>} label="Packaging" score={d.packaging?.score||5} concerns={d.packaging?.concerns} isDark={isDark}>
                      {d.packaging?.label && <p style={{fontSize:13,color:isDark?"#6ee7b7":"#555",lineHeight:1.6,margin:"10px 0 4px",fontStyle:"italic"}}>{d.packaging.label}</p>}
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                        {d.packaging?.refillable && <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"rgba(34,197,94,0.08)",color:"#16a34a"}}><IcoSaved size={12}/> Refillable</span>}
                        {d.packaging?.primary && d.packaging.primary !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:isDark?"#0f2a18":"#f9fafb",color:isDark?"#6ee7b7":"#555",border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`}}>
                            {d.packaging.primary}
                          </span>
                        )}
                        {d.packaging?.end_of_life && d.packaging.end_of_life !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:isDark?"#0f2a18":"#f9fafb",color:isDark?"#6ee7b7":"#555",border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`}}>
                            {d.packaging.end_of_life}
                          </span>
                        )}
                      </div>
                    </DimensionDropdown>

                    {/* 4. Sustainability */}
                    <DimensionDropdown icon={<IcoSaved size={20}/>} label="Sustainability" score={d.sustainability?.score||5} concerns={d.sustainability?.concerns} isDark={isDark}>
                      {d.sustainability?.label && <p style={{fontSize:13,color:isDark?"#6ee7b7":"#555",lineHeight:1.6,margin:"10px 0 4px",fontStyle:"italic"}}>{d.sustainability.label}</p>}
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                        {d.sustainability?.reusable && <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"rgba(34,197,94,0.08)",color:"#16a34a"}}><IcoSaved size={12}/> Reusable</span>}
                        {d.sustainability?.replaces_single_use && <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:"rgba(34,197,94,0.08)",color:"#16a34a"}}><IcoVerified size={12}/> Replaces single-use</span>}
                        {d.sustainability?.circularity && d.sustainability.circularity !== "unknown" && (
                          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,background:isDark?"#0f2a18":"#f9fafb",color:isDark?"#6ee7b7":"#555",border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`}}>
                            {d.sustainability.circularity}
                          </span>
                        )}
                      </div>
                    </DimensionDropdown>

                    {/* Sustainability and Packaging dropdowns render above */}

                    {/* See Alternatives CTA — replaces mobile scroll button */}
                    <button
                      onClick={()=>setShowAlts(true)}
                      style={{
                        width:"100%", marginTop:8, padding:"14px 16px",
                        background:"#052e16", color:"#4ade80",
                        border:"none", borderRadius:12, cursor:"pointer",
                        fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15,
                        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                      }}>
                      See safer alternatives →
                    </button>
                  </>);
                })() : (
                  <div style={{padding:"12px 16px", background:isDark?"#0f2a18":"#f9fafb", borderRadius:12, border:`1px dashed ${isDark?"rgba(34,197,94,0.15)":"#e5e7eb"}`, marginBottom:10, textAlign:"left"}}>
                    <div style={{fontSize:12, color:muted, lineHeight:1.6}}><IcoScan size={14}/> <strong>Rescan for full breakdown</strong> — this result predates our 5-dimension analysis. Scan again to see Materials, Exposure, Packaging and Sustainability scores.</div>
                  </div>
                )}

                </div>{/* end dropdowns negative-margin wrapper */}

                {/* Peer comparison */}
                <p style={{fontSize:15,color:"#6ee7b7",lineHeight:1.75,margin:0,textAlign:"left"}}>{result.summary}</p>

                {/* Score explainability — "why is this a 7?" */}
                <ScoreExplainer
                  result={result}
                  isDark={isDark}
                  text={text}
                  muted={muted}
                  surface={surface}
                  border={border}
                  childMode={childMode}
                  pregnancyMode={pregnancyMode}
                />

                {/* for food items scoring safe/good where fat, sugar, or calories are a real consideration */}
                {(() => {
                  const score = result.overall_score || result.score;
                  const isFood = ["food","food_beverage","beverage","restaurant"].includes(result.category);
                  if (!isFood || score > 4) return null;

                  // Products where the "clean but dense" note is genuinely useful
                  const allText = JSON.stringify([result.concerns, result.summary, result.product_name]).toLowerCase();
                  const hasDenseIngredients = /\b(fat|saturated|calori|sugar|carb|sodium|cholesterol|butter|oil|cream|honey|syrup|maple|coconut oil|ghee|lard|avocado oil)\b/.test(allText);
                  if (!hasDenseIngredients) return null;

                  return (
                    <div style={{
                      marginTop:12, padding:"10px 16px", borderRadius:10,
                      background:isDark?"#1a2030":"#f8fafc",
                      border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`,
                      display:"flex", alignItems:"flex-start", gap:10,
                    }}>
                      <span style={{fontSize:16, flexShrink:0, marginTop:1}}>ℹ</span>
                      <span style={{fontSize:12, color:muted, lineHeight:1.6}}>
                        <strong style={{color:text}}>Score measures ingredient safety, not nutrition.</strong>{" "}
                        This score reflects chemical risk — synthetic pesticides, additives, and processing — not fat, sugar, or calorie content. A low score means clean ingredients, not a green light to eat freely.
                      </span>
                    </div>
                  );
                })()}

                {/* Exposure Calculator — only show for products that need a swap */}
                {displayScore > 3 && (result.break_even || result.alternatives?.length > 0) && (
                  <ExposureCalculator
                    result={result}
                    isDark={isDark}
                    text={text}
                    muted={muted}
                    isMobile={isMobile}
                    history={history}
                  />
                )}

                {/* ADD TO ROUTINE CTA — Goal-Gradient Effect: feels like completing something */}
                {(() => {
                  const alreadyInRoutine = history.some(h => h.product_name === result.product_name);
                  return (
                    <div
                      onClick={() => {
                        if (!alreadyInRoutine) {
                          const entry = {...result, scannedAt: new Date().toISOString()};
                          const next = [entry, ...history.filter(h => h.product_name !== result.product_name)].slice(0, 200);
                          setHistory(next);
                          try { localStorage.setItem("ps_history", JSON.stringify(next)); } catch {}
                        } else {
                          setPage("routine"); setResult(null);
                        }
                      }}
                      style={{
                        marginTop:16, padding:"14px 18px",
                        background:"rgba(34,197,94,0.06)",
                        border:"1.5px dashed rgba(34,197,94,0.35)",
                        borderRadius:14, display:"flex", alignItems:"center", gap:14,
                        cursor:"pointer", transition:"background 0.2s",
                      }}
                    >
                      <div style={{width:38, height:38, borderRadius:"50%", background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                        {alreadyInRoutine
                          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        }
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:"#22c55e", marginBottom:2}}>
                          {alreadyInRoutine ? "In My Routine — view breakdown" : "Add to My Routine"}
                        </div>
                        <div style={{fontSize:11, color:"#6ee7b7", opacity:0.7}}>
                          {alreadyInRoutine ? "See cumulative exposure and your overall score" : "Track cumulative exposure across all your products"}
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" style={{opacity:0.5}}><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  );
                })()}

              </div>

              {/* ACCOUNT / EMAIL CAPTURE — after 1st scan */}
              {result && !user && !emailDismissed && (
                <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, padding:"20px 24px", border:`1.5px solid ${isDark?"#1e3a1e":"#bbf7d0"}`}}>
                  <button onClick={()=>{setEmailDismissed(true); try{localStorage.setItem("ps_email_captured","1")}catch{}}}
                    style={{float:"right", background:"none", border:"none", color:muted, cursor:"pointer", fontSize:18, lineHeight:1, padding:0}}>×</button>
                  <div style={{fontSize:14, fontWeight:700, color:"#16a34a", marginBottom:4}}>Get your results by email</div>
                  <div style={{fontSize:13, color:muted, lineHeight:1.5, marginBottom:14}}>
                    We will send you a weekly roundup of products to avoid, plus tips on safer swaps. No spam, unsubscribe any time.
                  </div>
                  <div style={{display:"flex", gap:8, marginBottom:8}}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={captureEmail}
                      onChange={e=>setCaptureEmail(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&submitCaptureEmail()}
                      style={{flex:1, padding:"10px 14px", borderRadius:8, border:`1px solid ${isDark?"#374151":"#d1fae5"}`, background:isDark?"#111":"#fff", color:text, fontSize:14}}
                    />
                    <button onClick={submitCaptureEmail} disabled={captureSubmitting}
                      style={{padding:"10px 18px", borderRadius:8, background:"#052e16", color:"#4ade80", border:"none", fontWeight:700, fontSize:13, cursor:"pointer", opacity:captureSubmitting?0.7:1}}>
                      {captureSubmitting ? "..." : "Subscribe"}
                    </button>
                  </div>
                  {captureMsg && <div style={{fontSize:12, color:"#16a34a", fontWeight:600}}>{captureMsg}</div>}
                  <div style={{display:"flex", gap:8, marginTop:10}}>
                    <button onClick={()=>setShowAuth(true)}
                      style={{fontSize:12, color:"#16a34a", background:"none", border:"none", cursor:"pointer", fontWeight:600, padding:0}}>
                      Or create a free account →
                    </button>
                  </div>
                </div>
              )}

              {/* Signed in — sync confirmation */}
              {user && history.length > 0 && (
                <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:12, padding:"12px 16px", border:`1px solid ${isDark?"#1e3a1e":"#bbf7d0"}`, display:"flex", alignItems:"center", gap:10}}>
                  <IcoVerified size={16}/>
                  <span style={{fontSize:13, color:"#16a34a", fontWeight:600}}>Scans synced to your account</span>
                </div>
              )}

            </div>
            );})()}

            {/* RIGHT — desktop alternatives sticky panel — only show if score > 3 */}
            {!isMobile && ((childMode && result.child_score) ? result.child_score : (result.overall_score || result.score)) > 3 && (
              <div id="desktop-alternatives" style={{position:"sticky", top:20, display:"flex", flexDirection:"column", gap:16}}>
                <div style={{background:isDark?"#0f2a18":"#fff", borderRadius:20, border:`1.5px solid ${isDark?"rgba(34,197,94,0.15)":"#e2e8f0"}`, overflow:"hidden"}}>
                  <div style={{background:"#052e16", padding:"20px 24px"}}>
                    <div style={{fontSize:11, fontWeight:700, color:"#4ade80", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4}}>Safer alternatives</div>
                    <div style={{fontSize:18, fontWeight:700, color:"#fff", fontFamily:"'Outfit',sans-serif"}}>
                      {(result.alternatives?.length||0) + (result.ai_alternatives?.length||0) > 0
                        ? `${(result.alternatives?.length||0) + (result.ai_alternatives?.length||0)} better option${((result.alternatives?.length||0) + (result.ai_alternatives?.length||0)) !== 1 ? "s" : ""} found`
                        : "Exploring alternatives"}
                    </div>
                    {/* Source toggle */}
                    <div style={{display:"flex", gap:6, marginTop:10, flexWrap:"wrap"}}>
                      {[["amazon","Amazon"],["brand","Brand site"],["bigbox","Target"]].map(([src,label]) => (
                        <button key={src} onClick={()=>setAltSource(src)} style={{fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, border:"none", cursor:"pointer", background: altSource===src ? "#4ade80" : "rgba(255,255,255,0.1)", color: altSource===src ? "#052e16" : "#86efac"}}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{padding:"16px", display:"flex", flexDirection:"column", gap:10, maxHeight:600, overflowY:"auto"}}>
                    {(filterAltsBySource(result.alternatives, altSource) || []).map((alt, i) => {
                      const shopUrl = altSource === "brand" ? getBrandUrl(alt.brand, alt.name)
                        : altSource === "bigbox" ? BIGBOX_URLS.target(alt.name)
                        : alt.affiliateUrl;
                      return (
                      <div key={i} style={{background:isDark?"#080f0a":"#f8fafb", borderRadius:12, padding:"14px 16px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e8f5e9"}`}}>
                        <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:6}}>
                          <div style={{fontSize:14, fontWeight:700, color:text, lineHeight:1.3}}>{alt.name}</div>
                          <div style={{fontSize:13, fontWeight:800, color:"#16a34a", background:"rgba(34,197,94,0.08)", padding:"2px 10px", borderRadius:10, flexShrink:0, border:"1px solid #bbf7d0"}}>{alt.score}/10</div>
                        </div>
                        {alt.material && <div style={{fontSize:12, color:muted, marginBottom:6, lineHeight:1.4}}>{alt.material}</div>}
                        {alt.price && <div style={{fontSize:11, color:"#16a34a", fontWeight:600, marginBottom:8}}>{alt.price}</div>}
                        {shopUrl && (
                          <a href={shopUrl} target="_blank" rel="noopener noreferrer"
                            onClick={()=>track("Affiliate Click", {product:alt.name, placement:"desktop_panel", source:altSource, category:result.category})}
                            style={{display:"inline-block", fontSize:12, fontWeight:700, color:"#fff", background:"#16a34a", padding:"6px 14px", borderRadius:8, textDecoration:"none"}}>
                            {altSource === "brand" ? "Brand site →" : altSource === "bigbox" ? "Target →" : "Amazon →"}
                          </a>
                        )}
                      </div>
                      );
                    })}
                    {(filterAltsBySource(result.ai_alternatives, altSource) || []).filter(a => a.estimated_score && a.estimated_score < (result.overall_score||result.score)).map((alt, i) => {
                      const shopUrl = altSource === "brand" ? getBrandUrl(alt.name, alt.name)
                        : altSource === "bigbox" ? BIGBOX_URLS.target(alt.name)
                        : `https://www.amazon.com/s?k=${encodeURIComponent(alt.name)}&tag=partiqule-20`;
                      return (
                      <div key={`ai-${i}`} style={{background:isDark?"#080f0a":"#f8fafb", borderRadius:12, padding:"14px 16px", border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#e8f5e9"}`}}>
                        <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:6}}>
                          <div style={{fontSize:14, fontWeight:700, color:text, lineHeight:1.3}}>{alt.name}</div>
                          <div style={{fontSize:13, fontWeight:800, color:"#16a34a", background:"rgba(34,197,94,0.08)", padding:"2px 10px", borderRadius:10, flexShrink:0, border:"1px solid #bbf7d0"}}>{alt.estimated_score}/10</div>
                        </div>
                        {alt.reason && <div style={{fontSize:12, color:muted, lineHeight:1.4, marginBottom:6}}>{alt.reason}</div>}
                        <a href={shopUrl} target="_blank" rel="noopener noreferrer"
                          onClick={()=>track("Affiliate Click", {product:alt.name, placement:"desktop_panel_ai", source:altSource, category:result.category})}
                          style={{display:"inline-block", fontSize:12, fontWeight:700, color:"#fff", background:"#16a34a", padding:"6px 14px", borderRadius:8, textDecoration:"none"}}>
                          {altSource === "brand" ? "Brand site →" : altSource === "bigbox" ? "Target →" : "Amazon →"}
                        </a>
                      </div>
                      );
                    })}
                    {(!filterAltsBySource(result.alternatives, altSource)?.length && !filterAltsBySource(result.ai_alternatives, altSource)?.filter(a=>a.estimated_score < (result.overall_score||result.score)).length) && (
                      <div style={{textAlign:"center", padding:"32px 16px", color:muted}}>
                        <div style={{fontSize:13, fontWeight:600, marginBottom:4}}>
                          {altSource === "brand" ? "No direct brand alternatives" : altSource === "bigbox" ? "No big-box alternatives" : "No swap needed"}
                        </div>
                        <div style={{fontSize:12}}>
                          {altSource === "brand" ? "Try Amazon for more options →" : altSource === "bigbox" ? "Try Amazon or brand sites instead →" : "This product scores well — no specific alternative to recommend."}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── ALTERNATIVES PAGE OVERLAY ── */}
        {showAlts && result && (
          <div style={{position:"fixed", inset:0, zIndex:9990, background:isDark?"#080f0a":"#fafafa", overflowY:"auto"}}>

            {/* Globe-inspired header */}
            <div style={{background:"#052e16", padding:isMobile?`${28 + SAFE_TOP}px 20px 32px`:"40px 40px 44px", position:"relative", overflow:"hidden", textAlign:"center"}}>
              <style>{`
                @keyframes orbitSpin1{from{transform:rotate(-25deg)}to{transform:rotate(335deg)}}
                @keyframes orbitSpin2{from{transform:rotate(50deg)}to{transform:rotate(410deg)}}
                @keyframes corePulse{0%,100%{r:18}50%{r:20}}
                @keyframes altFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
                @keyframes particleFade{0%,100%{opacity:0.2}50%{opacity:0.6}}
                .alt-globe{animation:altFloat 3s ease-in-out infinite}
                .orbit1{transform-origin:60px 60px;animation:orbitSpin1 4s linear infinite}
                .orbit2{transform-origin:60px 60px;animation:orbitSpin2 6s linear infinite reverse}
              `}</style>
              {/* Particle dots */}
              {[
                {s:8,x:"8%",y:"25%",a:0.2,d:"0s"},{s:5,x:"88%",y:"18%",a:0.15,d:"0.5s"},
                {s:10,x:"15%",y:"70%",a:0.12,d:"1s"},{s:6,x:"92%",y:"65%",a:0.18,d:"1.5s"},
                {s:4,x:"45%",y:"8%",a:0.2,d:"0.8s"},{s:7,x:"72%",y:"80%",a:0.12,d:"0.3s"},
                {s:5,x:"30%",y:"85%",a:0.15,d:"1.2s"},{s:8,x:"80%",y:"40%",a:0.1,d:"0.6s"},
              ].map((p,i)=>(
                <div key={i} style={{position:"absolute", left:p.x, top:p.y, width:p.s, height:p.s, borderRadius:"50%", background:"white", opacity:p.a, pointerEvents:"none", animation:`particleFade 3s ease-in-out ${p.d} infinite`}}/>
              ))}

              <button onClick={()=>setShowAlts(false)} style={{position:"absolute", top:16, left:16, background:"rgba(255,255,255,0.1)", border:"none", color:"#86efac", cursor:"pointer", fontSize:14, fontWeight:600, padding:"8px 14px", borderRadius:20, display:"flex", alignItems:"center", gap:6}}>
                ← Back
              </button>

              {/* Animated orbital rings */}
              <svg width="120" height="120" viewBox="0 0 120 120" style={{margin:"0 auto 16px", display:"block"}} className="alt-globe">
                <ellipse cx="60" cy="60" rx="50" ry="15" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.55" className="orbit1"/>
                <ellipse cx="60" cy="60" rx="44" ry="12" fill="none" stroke="#86efac" strokeWidth="1" opacity="0.35" className="orbit2"/>
                <circle cx="60" cy="60" r="22" fill="#16a34a"/>
                <circle cx="60" cy="60" r="18" fill="#4ade80"/>
                <circle cx="53" cy="53" r="7" fill="#bbf7d0" opacity="0.6"/>
              </svg>

              <div style={{fontSize:11, color:"#86efac", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6}}>Safer alternatives for</div>
              <h2 style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:isMobile?20:26, color:"#fff", margin:"0 0 6px", lineHeight:1.2}}>
                {result.product_name?.length > 50 ? result.product_name.slice(0,47)+"…" : result.product_name}
              </h2>
              <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.1)", borderRadius:20, padding:"4px 14px"}}>
                <span style={{fontSize:13, color:"#4ade80", fontWeight:700}}>{result.overall_score||result.score}/10</span>
                <span style={{fontSize:12, color:"rgba(255,255,255,0.6)"}}>→ switch to score 1-3</span>
              </div>
            </div>

            {/* Content */}
            <div style={{maxWidth:640, margin:"0 auto", padding:isMobile?"20px 12px 60px":"32px 24px 80px", display:"flex", flexDirection:"column", gap:20}}>

              {/* Source toggle */}
              <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
                <span style={{fontSize:12, color:muted, fontWeight:600}}>Shop via:</span>
                {[["amazon","Amazon"],["brand","Brand site"],["bigbox","Target"]].map(([src,label]) => (
                  <button key={src} onClick={()=>setAltSource(src)} style={{fontSize:12, fontWeight:600, padding:"5px 14px", borderRadius:20, border:`1px solid ${altSource===src?"#16a34a":"#e2e8f0"}`, cursor:"pointer", background: altSource===src ? "#16a34a" : "transparent", color: altSource===src ? "#fff" : muted}}>
                    {label}
                  </button>
                ))}
              </div>

              {/* DB alternatives */}
              {(() => {
                const isRestaurant = result.category === "restaurant";
                const dbAlts = filterAltsBySource(result.alternatives, altSource).slice(0, 3);
                const dbNames = new Set(dbAlts.map(p => p.name?.toLowerCase().trim()));
                const aiAlts = filterAltsBySource(result.ai_alternatives, altSource)
                  .filter((a, i, arr) => arr.findIndex(b => b.name?.toLowerCase().trim() === a.name?.toLowerCase().trim()) === i)
                  .filter(a => !dbNames.has(a.name?.toLowerCase().trim()))
                  .slice(0, 3 - dbAlts.length);
                const hasAffiliate = dbAlts.length > 0 && result.category !== "other" && result.category !== "restaurant";

                // For restaurants use result.alternatives directly (AI suggestions land there)
                // Split: first 2 = same place, last = better alternative
                const restAlts = isRestaurant ? dbAlts : [];
                const samePlace = isRestaurant ? restAlts.slice(0, 2) : [];
                const betterAlt = isRestaurant ? restAlts.slice(2) : [];

                const noResults = isRestaurant ? restAlts.length === 0 : (!dbAlts.length && !aiAlts.length);
                if (noResults) return (
                  <div style={{textAlign:"center", padding:"40px 20px", color:muted, fontSize:14}}>
                    {altSource === "brand" ? "No direct brand alternatives found. Try Amazon for more options." : altSource === "bigbox" ? "No big-box alternatives found. Try Amazon or brand sites instead." : "No specific alternatives found. Try scanning a similar product for recommendations."}
                  </div>
                );

                const amazonUrl = (name) => `https://www.amazon.com/s?k=${encodeURIComponent(name)}&tag=partiqule-20`;

                const AltCard = ({alt, i}) => {
                  const score = alt.estimated_score ?? alt.score ?? 3;
                  const reason = alt.reason || alt.description || "";
                  const material = alt.material || "";
                  const buyUrl = alt.affiliateUrl || amazonUrl(alt.name);
                  return (
                    <div key={i} style={{background:isDark?"#1a2a1e":"#f0fdf4", borderRadius:12, padding:"16px 18px", border:`1.5px solid ${isDark?"#1e3a22":"#bbf7d0"}`}}>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:6}}>
                        <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, color:text, lineHeight:1.3}}>{alt.name}</div>
                        <div style={{background:`${scoreColor(score)}18`, color:scoreColor(score), fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20, flexShrink:0}}>{score}/10</div>
                      </div>
                      {material && <div style={{fontSize:12, color:isDark?"#86efac":"#166534", marginBottom:6, lineHeight:1.5}}>{material}</div>}
                      {reason && <div style={{fontSize:13, color:muted, lineHeight:1.5, marginBottom:10}}>{reason}</div>}
                      <div style={{display:"flex", gap:12, alignItems:"center", flexWrap:"wrap"}}>
                        <button onClick={()=>{setShowAlts(false); setResult(null); setQuery(alt.name); analyze(alt.name);}}
                          style={{display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#16a34a", fontWeight:600, background:"none", border:"none", cursor:"pointer", padding:0}}>
                          <IcoSearch size={14}/> Scan this →
                        </button>
                        <a href={altSource === "brand" ? getBrandUrl(alt.brand || alt.name, alt.name) : altSource === "bigbox" ? BIGBOX_URLS.target(alt.name) : buyUrl} target="_blank" rel="noopener noreferrer"
                          style={{display:"flex", alignItems:"center", gap:4, fontSize:12, color:isDark?"#6ee7b7":"#6b7280", fontWeight:600, textDecoration:"none"}}>
                          🛒 {altSource === "brand" ? "Brand site" : altSource === "bigbox" ? "Find on Target" : "Find on Amazon"}
                        </a>
                      </div>
                    </div>
                  );
                };

                return (
                  <div style={{display:"flex", flexDirection:"column", gap:10}}>
                    {isRestaurant ? (<>
                      {samePlace.length > 0 && (<>
                        <div style={{fontSize:11, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4}}>Order smarter — same place</div>
                        {samePlace.map((alt, i) => <AltCard key={i} alt={alt} i={i}/>)}
                      </>)}
                      {betterAlt.length > 0 && (<>
                        <div style={{fontSize:11, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginTop:8, marginBottom:4}}>Better alternative</div>
                        {betterAlt.map((alt, i) => <AltCard key={i} alt={alt} i={i}/>)}
                      </>)}
                    </>) : (<>
                      <div style={{fontSize:11, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4}}>Recommended swaps</div>
                      {dbAlts.map(p => <ProductCard key={p.id} product={p} isDark={isDark} altSource={altSource} childMode={childMode}/>)}
                      {aiAlts.length > 0 && (
                        <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:dbAlts.length>0?4:0}}>
                          {dbAlts.length > 0 && <div style={{fontSize:12, color:muted, textAlign:"center"}}>More from our AI</div>}
                          {aiAlts.map((alt, i) => <AltCard key={i} alt={alt} i={i}/>)}
                        </div>
                      )}
                      {hasAffiliate && <p style={{fontSize:11, color:muted, textAlign:"center", lineHeight:1.5}}>Affiliate links — commission at no extra cost to you. Never influences our scores.</p>}
                    </>)}
                  </div>
                );
              })()}

              {/* Bundle */}
              <BundleCard category={result.category} isDark={isDark}/>

              {/* Scan next — works for all categories when suggestions exist */}
              {result.scan_next?.length > 0 && (
                <div style={{background:isDark?"#1a2a1a":"#f0fdf4", borderRadius:16, padding:"20px 24px", border:`1.5px solid ${isDark?"#1e3a1e":"#bbf7d0"}`}}>
                  <div style={{fontSize:11, color:"#16a34a", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4}}>
                    {["food","food_beverage","beverage","restaurant","supplement"].includes(result.category) ? "Compare these next" : "Complete your routine"}
                  </div>
                  <div style={{fontSize:13, color:muted, marginBottom:14, lineHeight:1.5}}>
                    {["food","food_beverage","beverage","restaurant","supplement"].includes(result.category)
                      ? "See how these compare — scan to build your full picture."
                      : "People who scanned this also checked these — scan them to build your full exposure picture."}
                  </div>
                  <div style={{display:"flex", flexDirection:"column", gap:8}}>
                    {result.scan_next.map((item,i)=>(
                      <button key={i} onClick={()=>{setShowAlts(false); setResult(null); setQuery(item); analyze(item); track("Scan Next Click", {item, from: result.product_name, category: result.category});}}
                        style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, border:`1px solid ${isDark?"rgba(34,197,94,0.15)":"#bbf7d0"}`, background:isDark?"#0f2a18":"#fff", cursor:"pointer", textAlign:"left"}}>
                        <div style={{display:"flex", alignItems:"center", gap:10}}>
                          <div style={{width:32, height:32, borderRadius:8, background:isDark?"#1a2a1a":"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                            <IcoScan size={16}/>
                          </div>
                          <span style={{fontSize:13, fontWeight:500, color:text}}>{item}</span>
                        </div>
                        <span style={{fontSize:12, color:"#16a34a", fontWeight:700}}>Scan →</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback — "this score seems wrong" */}
              <FeedbackButton result={result} isDark={isDark} text={text} muted={muted} border={border} surface={surface} user={user}/>

              {/* Scan again CTA */}
              <button onClick={()=>{setShowAlts(false); reset();}}
                style={{width:"100%", padding:"14px", borderRadius:12, background:"#16a34a", color:"#fff", border:"none", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:15, cursor:"pointer"}}>
                Scan another product
              </button>
            </div>
          </div>
        )}
        </>
      )}

      {/* ── PERSISTENT MOBILE BOTTOM NAV + FLOATING SCAN ── */}
      {isMobile && (
        <>
          {/* Scan modal backdrop */}
          {showScanModal && (
            <div onClick={()=>setShowScanModal(false)} style={{position:"fixed", inset:0, zIndex:8998, background:"rgba(0,0,0,0.6)"}}/>
          )}

          {/* Scan input popover */}
          {showScanModal && (
            <div style={{position:"fixed", bottom:88, left:"50%", transform:"translateX(-50%)", zIndex:8999, width:"calc(100% - 32px)", maxWidth:360, background:"#0f2a18", border:"1px solid rgba(34,197,94,0.2)", borderRadius:20, padding:"16px 16px", boxShadow:"0 8px 40px rgba(0,0,0,0.5)"}}>
              <div style={{fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:800, color:"#6ee7b7", opacity:0.6, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10}}>Scan a product</div>
              <div style={{display:"flex", gap:8, marginBottom:10}}>
                <input
                  autoFocus
                  value={modalQuery}
                  onChange={e=>setModalQuery(e.target.value)}
                  onKeyDown={e=>{ if (e.key==="Enter" && modalQuery.trim()) { setShowScanModal(false); setQuery(modalQuery); analyze(modalQuery); }}}
                  placeholder="Type a product name..."
                  style={{flex:1, padding:"10px 14px", borderRadius:12, border:"1px solid rgba(34,197,94,0.2)", background:"#080f0a", color:"#f0fdf4", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif"}}/>
                <button
                  onClick={()=>{ if (modalQuery.trim()) { setShowScanModal(false); setQuery(modalQuery); analyze(modalQuery); }}}
                  style={{padding:"10px 16px", borderRadius:12, background:"#22c55e", color:"#052e16", border:"none", fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:14, cursor:"pointer"}}>Go</button>
              </div>
              {/* Camera option */}
              {isMobile ? (
                <div onClick={()=>{setShowScanModal(false); setShowBarcodeScanner(true);}}
                  style={{display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:12, cursor:"pointer"}}>
                  <div style={{width:32, height:32, borderRadius:8, background:"rgba(34,197,94,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:"#f0fdf4"}}>Scan barcode or photo</div>
                    <div style={{fontSize:11, color:"#6ee7b7", opacity:0.7}}>Point camera at a product</div>
                  </div>
                </div>
              ) : (
                <label style={{display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:12, cursor:"pointer"}}>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={async(e)=>{ const file=e.target.files?.[0]; if(!file)return; e.target.value=""; setShowScanModal(false); await handleImageScan(file);}}/>
                  <div style={{width:32, height:32, borderRadius:8, background:"rgba(34,197,94,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700, color:"#f0fdf4"}}>Upload photo</div>
                    <div style={{fontSize:11, color:"#6ee7b7", opacity:0.7}}>Scan a label image</div>
                  </div>
                </label>
              )}
            </div>
          )}

          {/* Floating Scan Another pill — only visible on results page */}
          {result && (
            <div
              onClick={()=>{setShowScanModal(true); setModalQuery(""); setFabOpen(false);}}
              style={{
                position:"fixed", bottom:88, left:"50%", transform:"translateX(-50%)",
                zIndex:8997,
                background:"linear-gradient(135deg,#22c55e,#16a34a)",
                borderRadius:50, padding:"12px 24px",
                display:"flex", alignItems:"center", gap:10,
                boxShadow:"0 4px 20px rgba(34,197,94,0.45), 0 0 0 3px rgba(34,197,94,0.12)",
                cursor:"pointer", whiteSpace:"nowrap",
                animation:"pulseScan 2.5s ease-in-out infinite",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span style={{fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:800, color:"white", letterSpacing:"0.02em"}}>Scan Another</span>
            </div>
          )}

          {/* Bottom Nav — always visible */}
          <div style={{
            position:"fixed", bottom:0, left:0, right:0, height:72,
            background:"rgba(5,46,22,0.97)", backdropFilter:"blur(16px)",
            borderTop:"1px solid rgba(34,197,94,0.15)",
            display:"flex", alignItems:"flex-start", paddingTop:10,
            zIndex:9000,
          }}>
            {[
              { label:"Home",    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>, action:()=>{reset(); setPage("home");},    active: page==="home" && !result },
              { label:"My Scans",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>, action:()=>{setPage("history"); setResult(null);}, active: page==="history" },
              { label:"Scan",    icon:null, action:()=>{setShowScanModal(o=>!o); setModalQuery("");}, active:false, isScan:true },
              { label:"Routine", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2"/><path d="M9 12l2 2 4-4"/></svg>, action:()=>{setPage("routine"); setResult(null);}, active: page==="routine" },
              { label:"Profile", icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, action:()=>{ user ? setPage("settings") : setShowAuth(true); }, active: page==="settings" },
            ].map((item,i) => (
              item.isScan ? (
                /* Center: floating scan button */
                <div key={i} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                  <div onClick={()=>{isMobile?setShowBarcodeScanner(true):document.getElementById("nav-file-input").click();}}
                    style={{width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#22c55e,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 4px 16px rgba(34,197,94,0.4), 0 0 0 3px rgba(34,197,94,0.1)", marginTop:-14, animation:"pulseScan 2.5s ease-in-out infinite"}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </div>
                  {!isMobile && <input id="nav-file-input" type="file" accept="image/*" style={{display:"none"}} onChange={async(e)=>{const f=e.target.files?.[0];if(!f)return;e.target.value="";await handleImageScan(f);}}/>}
                  <span style={{fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:600, color:"#22c55e", letterSpacing:"0.04em"}}>Scan</span>
                </div>
              ) : (
                <div key={i} onClick={item.action} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer", color: item.active ? "#22c55e" : "#6ee7b7", opacity: item.active ? 1 : 0.4, transition:"opacity 0.15s"}}>
                  {item.icon}
                  <span style={{fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:600, letterSpacing:"0.04em"}}>{item.label}</span>
                </div>
              )
            ))}
          </div>
        </>
      )}

      {/* BARCODE SCANNER — full screen, mobile only */}
      {showBarcodeScanner && (
        <BarcodeScannerView
          onClose={() => setShowBarcodeScanner(false)}
          onBarcode={async (barcode) => {
            setShowBarcodeScanner(false);
            setLoading(true);
            setQuery("Scanning barcode…");
            setRevealDone(false);
            setResult(null);
            try {
              const controller = new AbortController();
              const timeout = setTimeout(() => controller.abort(), 30000);
              const resp = await fetch(`${API_BASE}/barcode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ barcode, userId: user?.id || null }),
                signal: controller.signal,
              });
              clearTimeout(timeout);
              if (!resp.ok) throw new Error(`Server error ${resp.status}`);
              const data = await resp.json();
              // Barcode not in any product database — don't re-open scanner,
              // just close and let user scan the label as a photo or type the name
              if (data.fallback_required) {
                setLoading(false);
                setQuery("");
                setError("Barcode not recognised. Tap the camera button to photograph the label, or type the product name.");
                try { track("Barcode Fallback", {barcode, origin: data.origin_country || "unknown"}); } catch {}
                return;
              }
              setQuery(data.product_name || barcode);
              setResult(data);
              saveToHistory(data);
              if (!isSubscribed) {
                const newCount = scanCount + 1;
                setScanCount(newCount);
                try { localStorage.setItem("ps_scan_count", String(newCount)); } catch {}
                if (newCount >= FREE_LIMIT) {
                  if (!user) setShowLimitModal("account");
                  else       setShowLimitModal("paywall");
                }
              }
            } catch(err) {
              setError(err.name === "AbortError"
                ? "Scan timed out. Please try again."
                : "Barcode lookup failed. Try typing the product name instead.");
            } finally {
              setLoading(false);
            }
          }}
          onPhoto={async (file) => {
            setShowBarcodeScanner(false);
            await handleImageScan(file);
          }}
        />
      )}

      {/* FOOTER */}
      <footer style={{background:isDark?"#0d1117":"#111", color:"#888", padding:isMobile?"32px 16px":"48px 40px", textAlign:"center", fontSize:13, borderTop:"4px solid #052e16"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}>
          <svg width="32" height="32" viewBox="0 0 44 44">
            <rect x="0" y="0" width="44" height="44" rx="11" fill="#052e16"/>
            <rect x="20" y="29" width="4" height="11" rx="1.5" fill="#4ade80"/>
            <ellipse cx="22" cy="21" rx="11" ry="10" fill="#4ade80"/>
            <ellipse cx="22" cy="14" rx="8" ry="7" fill="#86efac"/>
            <circle cx="37" cy="8"  r="2.5" fill="#4ade80" opacity="0.8"/>
            <circle cx="39" cy="24" r="1.8" fill="#4ade80" opacity="0.5"/>
            <circle cx="5"  cy="14" r="2"   fill="#86efac" opacity="0.6"/>
            <circle cx="4"  cy="28" r="1.5" fill="#4ade80" opacity="0.45"/>
            <circle cx="28" cy="4"  r="1.8" fill="#86efac" opacity="0.55"/>
          </svg>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:20,color:"#fff",fontWeight:700}}>Partiqule</span>
        </div>
        <div style={{marginBottom:20, color:"#6ee7b7", maxWidth:400, margin:"0 auto 20px", lineHeight:1.6}}>Know what's in your products.<br/>Make choices that matter.</div>
        <div style={{display:"flex", justifyContent:"center", gap:24, marginBottom:20, flexWrap:"wrap"}}>
          {[
            {label:"About",           pg:"about",       path:"/about"},
            {label:"The Science",     pg:"science",     path:"/science"},
            {label:"My Scans",        pg:"history",     path:"/history"},
            {label:"How It Works",    pg:"methodology", path:"/methodology"},
            {label:"Privacy Policy",  pg:"privacy",     path:"/privacy"},
            {label:"Terms of Service",pg:"terms",       path:"/terms"},
          ].map(item=>(
            <span key={item.pg} onClick={()=>{setPage(item.pg); setResult(null); window.history.pushState({},"",item.path); window.scrollTo(0,0);}}
              style={{color:"#6ee7b7", cursor:"pointer", fontSize:13, transition:"color 0.15s"}}
              onMouseEnter={e=>e.target.style.color="#16a34a"}
              onMouseLeave={e=>e.target.style.color="#555"}>
              {item.label}
            </span>
          ))}
          <a href="https://instagram.com/partiquleapp" target="_blank" rel="noopener noreferrer"
            style={{color:"#6ee7b7", fontSize:13, textDecoration:"none", display:"flex", alignItems:"center", gap:5, transition:"color 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.color="#e1306c"}
            onMouseLeave={e=>e.currentTarget.style.color="#555"}>
            <IconInstagram size={14} color="currentColor"/> @partiquleapp
          </a>
        </div>
        <div style={{color:"#6ee7b7", borderTop:"1px solid #222", paddingTop:16, marginTop:8}}>
          <div style={{marginBottom:6}}>
            © 2026 Partiqule Ltd.
          </div>
          <div style={{marginBottom:8, fontSize:12, color:"#6ee7b7", lineHeight:1.6}}>
            As an Amazon Associate I earn from qualifying purchases. Affiliate links are always clearly labeled and never influence our scores.
          </div>
          <a href="mailto:paul@partiqule.com" onClick={e=>{e.preventDefault(); window.location.href="mailto:paul@partiqule.com";}} style={{color:"#6ee7b7", textDecoration:"none", fontSize:13, transition:"color 0.15s"}}
            onMouseEnter={e=>e.target.style.color="#4ade80"}
            onMouseLeave={e=>e.target.style.color="#555"}>
            paul@partiqule.com
          </a>
        </div>
      </footer>
    </div>
  );
}

// ── ERROR BOUNDARY ────────────────────────────────────────────
// Catches any runtime crash and shows a recovery screen instead of blank white
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error("Partiqule crash:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:"100vh", background:"#052e16", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:32, textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center"}}><IcoScan size={48}/></div>
          <div style={{fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:24, color:"#fff"}}>Something went wrong</div>
          <div style={{fontSize:14, color:"#86efac", maxWidth:320, lineHeight:1.6}}>Partiqule hit an unexpected error. Tap below to reload and try again.</div>
          <button onClick={()=>window.location.reload()} style={{padding:"12px 28px", borderRadius:10, border:"none", background:"#4ade80", color:"#052e16", fontWeight:700, fontSize:15, cursor:"pointer", marginTop:8}}>
            Reload Partiqule
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppWithBoundary = () => (
  <ErrorBoundary><App /></ErrorBoundary>
);

export { AppWithBoundary as default };
