const clock = document.querySelector("#utc-clock");
const year = document.querySelector("#year");
const terminalForm = document.querySelector("#terminal-form");
const terminalCommand = document.querySelector("#terminal-command");
const terminalOutput = document.querySelector("#terminal-output");
const contactForm = document.querySelector("#contact-form");
const toast = document.querySelector("#toast");
let themeToggle = document.querySelector("#theme-toggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const header = document.querySelector(".site-header");
const cursorDot = document.querySelector("#cursor-dot");
const cursorRing = document.querySelector("#cursor-ring");
const scrollProgress = document.querySelector("#scroll-progress");
const typedHeading = document.querySelector("#typed-heading");
const typingPhrases = [
  "I build intelligent systems.",
  "I design agentic AI workflows.",
  "I turn cloud data into decisions.",
];

function ensureInteractiveChrome() {
  if (!document.querySelector("#scroll-progress")) {
    const progress = document.createElement("div");
    progress.id = "scroll-progress";
    progress.className = "scroll-progress";
    document.body.prepend(progress);
  }

  if (!document.querySelector("#cursor-dot")) {
    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    dot.className = "cursor-dot";
    document.body.prepend(dot);
  }

  if (!document.querySelector("#cursor-ring")) {
    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    ring.className = "cursor-ring";
    document.body.prepend(ring);
  }

  ["ambient-one", "ambient-two", "ambient-three"].forEach((name) => {
    if (document.querySelector(`.${name}`)) return;
    const ambient = document.createElement("div");
    ambient.className = `ambient ${name}`;
    document.body.prepend(ambient);
  });

  document.querySelectorAll(".button.primary, .contact-form button").forEach((button) => {
    button.classList.add("ripple");
  });

  document.querySelector(".contact-form")?.classList.add("glass-panel");
  document.querySelector(".contact-form button")?.classList.add("pulse-cta");
  document.querySelector(".chips")?.classList.add("toolkit-strip");

  const projects = [...document.querySelectorAll(".project-card")];
  const extras = [
    ["Focus: FinOps intelligence, forecasting, and practical cloud recommendations.", "discuss this project"],
    ["Focus: live anomaly signals, explainable alerts, and human-in-the-loop review.", "build something similar"],
  ];
  projects.forEach((project, index) => {
    project.classList.add("expandable");
    if (project.querySelector(".project-extra")) return;
    const extra = document.createElement("div");
    extra.className = "project-extra";
    extra.innerHTML = `<div><p>${extras[index]?.[0] || "Click to explore this work in more detail."}</p><a href="#contact">${extras[index]?.[1] || "start a conversation"}</a></div>`;
    project.appendChild(extra);
  });

  const tooltipLabels = {
    "Agentic AI": "Autonomous workflows",
    "Multi-Agent Systems": "Coordinated AI agents",
    "Cloud Intelligence": "Cost and cloud insights",
    XAI: "Explainable AI",
    Python: "Primary build language",
    JavaScript: "Interactive web behavior",
    SQL: "Data querying",
    HTML: "Semantic structure",
    CSS: "Responsive UI",
    Pandas: "Data analysis",
    NumPy: "Numerical computing",
    "Scikit-learn": "Model building",
    AWS: "Cloud services",
    Azure: "Cloud services",
    Boto3: "AWS automation",
    Git: "Version control",
    GitHub: "Code hosting",
    "REST APIs": "System integration",
    Dashboards: "Product interfaces",
    "CLI Tools": "Developer tools",
  };
  document.querySelectorAll(".tool-tags span, .toolkit-strip span").forEach((tag) => {
    tag.dataset.tip ||= tooltipLabels[tag.textContent.trim()] || "Toolkit item";
  });
}

function ensureTypingTarget() {
  if (typedHeading) return typedHeading;
  const heroTitle = document.querySelector(".hero-copy h1");
  if (!heroTitle) return null;
  heroTitle.innerHTML = 'Hemashree.<br /><span id="typed-heading"></span>';
  return document.querySelector("#typed-heading");
}

function ensureMotionToggle() {
  if (themeToggle) return;
  const nav = document.querySelector(".nav-links");
  if (!nav) return;
  themeToggle = document.createElement("button");
  themeToggle.id = "theme-toggle";
  themeToggle.type = "button";
  themeToggle.textContent = "pulse:on";
  nav.appendChild(themeToggle);
}

function injectInteractiveStyles() {
  if (document.querySelector("#interactive-styles")) return;
  const style = document.createElement("style");
  style.id = "interactive-styles";
  style.textContent = `
    :root {
      --background: 222 38% 7%;
      --foreground: 150 28% 94%;
      --card: 220 28% 10%;
      --muted: 154 13% 67%;
      --border: 170 24% 100% / 0.12;
      --pink: 326 84% 72%;
      --glass: 220 26% 10% / 0.64;
    }
    body {
      overflow-x: hidden;
      background:
        radial-gradient(ellipse 85% 60% at 18% -10%, hsl(var(--green) / 0.14), transparent 58%),
        radial-gradient(ellipse 70% 55% at 94% 10%, hsl(var(--cyan) / 0.12), transparent 55%),
        linear-gradient(hsl(170 20% 100% / 0.035) 1px, transparent 1px),
        linear-gradient(90deg, hsl(170 20% 100% / 0.035) 1px, transparent 1px),
        hsl(var(--background));
      animation: page-load 800ms ease both;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(420px circle at var(--cursor-x, 50%) var(--cursor-y, 10%), hsl(var(--green) / 0.12), transparent 44%);
      transition: opacity 240ms ease;
    }
    body.motion-paused::before { opacity: 0.35; }
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: var(--scroll-progress, 0%);
      height: 3px;
      background: linear-gradient(90deg, hsl(var(--green)), hsl(var(--cyan)), hsl(var(--pink)));
      box-shadow: 0 0 22px hsl(var(--green) / 0.48);
    }
    .cursor-dot,
    .cursor-ring {
      position: fixed;
      z-index: 200;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 180ms ease, width 180ms ease, height 180ms ease, border-color 180ms ease;
    }
    .cursor-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: hsl(var(--green));
      box-shadow: 0 0 16px hsl(var(--green) / 0.78);
    }
    .cursor-ring {
      width: 34px;
      height: 34px;
      border: 1px solid hsl(var(--green) / 0.6);
      border-radius: 50%;
    }
    body.cursor-live .cursor-dot,
    body.cursor-live .cursor-ring { opacity: 1; }
    body.cursor-hover .cursor-ring {
      width: 52px;
      height: 52px;
      border-color: hsl(var(--cyan) / 0.72);
    }
    .ambient {
      position: fixed;
      z-index: -2;
      width: 30vw;
      max-width: 440px;
      aspect-ratio: 1;
      pointer-events: none;
      border-radius: 999px;
      filter: blur(44px);
      opacity: 0.16;
      animation: blob-drift 16s ease-in-out infinite alternate;
    }
    .ambient-one { top: 12%; left: -8%; background: hsl(var(--green)); }
    .ambient-two { top: 42%; right: -10%; background: hsl(var(--cyan)); animation-delay: -5s; }
    .ambient-three { bottom: 2%; left: 35%; background: hsl(var(--pink)); animation-delay: -9s; }
    .site-header {
      background: hsl(var(--background) / 0.58);
      border-bottom: 1px solid hsl(var(--border));
      backdrop-filter: blur(18px) saturate(130%);
      transition: padding 220ms ease, background 220ms ease, box-shadow 220ms ease;
    }
    .site-header.scrolled {
      padding-top: 11px;
      padding-bottom: 11px;
      background: hsl(var(--background) / 0.82);
      box-shadow: 0 14px 50px hsl(0 0% 0% / 0.22);
    }
    .nav-links { align-items: center; }
    .nav-links button {
      color: inherit;
      background: transparent;
      border: 0;
      padding: 0;
      font: inherit;
      transition: color 180ms ease, text-shadow 180ms ease;
    }
    .nav-links a.active,
    .nav-links button:hover {
      color: hsl(var(--green));
      text-shadow: 0 0 16px hsl(var(--green) / 0.35);
    }
    .brand-mark { animation: mark-float 4s ease-in-out infinite; }
    .hero-copy h1 { animation: rise-in 700ms ease both; }
    .hero-text { animation: rise-in 800ms ease both 120ms; }
    .hero-actions { animation: rise-in 800ms ease both 220ms; }
    .chips span,
    .tool-tags span {
      transition: color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
    }
    .chips span:hover,
    .tool-tags span:hover {
      color: hsl(var(--green));
      border-color: hsl(var(--green) / 0.65);
      transform: translateY(-2px);
      box-shadow: 0 0 24px hsl(var(--green) / 0.08);
    }
    .terminal {
      background: hsl(var(--glass));
      backdrop-filter: blur(18px) saturate(120%);
      animation: terminal-enter 900ms ease both 180ms;
      transform-style: preserve-3d;
    }
    .terminal::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(180deg, transparent, hsl(var(--green) / 0.06), transparent);
      opacity: 0.75;
      transform: translateY(-100%);
      animation: scan-line 5s linear infinite;
    }
    .terminal::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      box-shadow: inset 0 0 0 1px hsl(var(--green) / 0.05), inset 0 0 80px hsl(var(--green) / 0.03);
    }
    .window-dots span:nth-child(3) { animation: pulse 2s infinite; }
    article,
    .contact-form,
    .article-grid a {
      background: hsl(var(--glass));
      backdrop-filter: blur(16px) saturate(125%);
      transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
      transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
      will-change: transform;
    }
    article:hover,
    .contact-form:hover,
    .article-grid a:hover,
    .project-card:hover {
      box-shadow: 0 18px 60px hsl(0 0% 0% / 0.28), 0 0 34px hsl(var(--green) / 0.06);
      transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(1.018);
    }
    .project-extra {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition: grid-template-rows 320ms ease, opacity 320ms ease, margin-top 320ms ease;
    }
    .project-extra > * { overflow: hidden; }
    .project-card.open .project-extra,
    .project-card:hover .project-extra {
      grid-template-rows: 1fr;
      opacity: 1;
      margin-top: 18px;
    }
    .project-extra p {
      color: hsl(var(--muted));
      line-height: 1.65;
    }
    .project-extra a {
      display: inline-flex;
      width: max-content;
      margin-top: 10px;
      color: hsl(var(--green));
      font-size: 13px;
    }
    .ripple {
      position: relative;
      overflow: hidden;
    }
    .ripple::after {
      content: "";
      position: absolute;
      left: var(--ripple-x, 50%);
      top: var(--ripple-y, 50%);
      width: 0;
      height: 0;
      border-radius: 999px;
      background: hsl(0 0% 100% / 0.32);
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .ripple.rippling::after {
      animation: ripple 650ms ease;
    }
    .pulse-cta {
      animation: cta-pulse 2.8s ease-in-out infinite;
    }
    .tool-tags span,
    .toolkit-strip span { position: relative; }
    .tool-tags span::after,
    .toolkit-strip span::after {
      content: attr(data-tip);
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      padding: 7px 9px;
      color: hsl(var(--foreground));
      background: hsl(var(--background) / 0.92);
      border: 1px solid hsl(var(--border));
      border-radius: 6px;
      white-space: nowrap;
      font-size: 11px;
      opacity: 0;
      transform: translateX(-50%) translateY(6px);
      pointer-events: none;
      transition: opacity 180ms ease, transform 180ms ease;
    }
    .tool-tags span:hover::after,
    .toolkit-strip span:hover::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .glass-panel {
      box-shadow: inset 0 1px 0 hsl(0 0% 100% / 0.05), 0 24px 80px hsl(0 0% 0% / 0.25);
    }
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 650ms ease, transform 650ms ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    @keyframes rise-in {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes page-load {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes terminal-enter {
      from { opacity: 0; transform: translateY(22px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes scan-line {
      to { transform: translateY(100%); }
    }
    @keyframes mark-float {
      50% { transform: translateY(-2px); box-shadow: 0 0 40px hsl(var(--green) / 0.34); }
    }
    @keyframes blob-drift {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      100% { transform: translate3d(40px, -32px, 0) scale(1.16); }
    }
    @keyframes ripple {
      from { width: 0; height: 0; opacity: 0.45; }
      to { width: 420px; height: 420px; opacity: 0; }
    }
    @keyframes cta-pulse {
      50% { box-shadow: 0 0 50px hsl(var(--green) / 0.34); }
    }
    body.motion-paused *,
    body.motion-paused *::before,
    body.motion-paused *::after {
      animation-play-state: paused !important;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      .reveal { opacity: 1; transform: none; }
    }
  `;
  document.head.appendChild(style);
}

function setupTypingHero() {
  const target = ensureTypingTarget();
  if (!target) return;
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = typingPhrases[phraseIndex];
    target.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
      window.setTimeout(tick, 58);
      return;
    }

    if (!deleting) {
      deleting = true;
      window.setTimeout(tick, 1300);
      return;
    }

    if (charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tick, 28);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    window.setTimeout(tick, 220);
  };

  tick();
}

function setupScrollProgress() {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    document.body.style.setProperty("--scroll-progress", `${progress}%`);
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

const terminalResponses = {
  "/help": [
    ["yellow", "$ help"],
    ["", "Commands: /about, /work, /skills, /tools, /contact, /themes matrix, clear"],
  ],
  "/about": [
    ["cyan", "$ cat about.md"],
    ["", "Building agentic AI systems that think, decide, and act."],
    ["", "Focus: autonomous workflows, predictive analytics, anomaly detection, cloud intelligence."],
  ],
  "/work": [
    ["cyan", "$ open selected-work"],
    ["", "01 Cloud Cost Optimization System - AI-driven AWS and Azure cost intelligence."],
    ["", "02 Flight Anomaly Detection System - explainable risk signals for sensor streams."],
  ],
  "/skills": [
    ["cyan", "$ inspect capabilities"],
    ["", "AI: ML models, predictive analytics, XAI, multi-agent architectures."],
    ["", "Cloud: AWS, Azure, distributed systems, real-time pipelines."],
  ],
  "/tools": [
    ["cyan", "$ list stack"],
    ["", "Languages: Python, JavaScript, SQL, HTML, CSS."],
    ["", "AI/Data: Pandas, NumPy, Scikit-learn, XAI."],
    ["", "Cloud/Build: AWS, Azure, Boto3, Git, GitHub, REST APIs."],
  ],
  "/contact": [
    ["cyan", "$ cat contact.env"],
    ["", "EMAIL=hemashree280307@gmail.com"],
    ["", "LOCATION=Chennai, India"],
  ],
  "/themes matrix": [
    ["green", "$ theme set matrix"],
    ["", "Theme already active. Terminal glow nominal."],
  ],
};

function setupRevealAnimations() {
  const targets = [
    ...document.querySelectorAll(".section:not(.hero), article, .contact-form, .section-title"),
  ];
  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupActiveNavigation() {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupCursorGlow() {
  window.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.body.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.body.classList.add("cursor-live");
    if (cursorDot && cursorRing) {
      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;
      cursorRing.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 420, fill: "forwards", easing: "cubic-bezier(.16,1,.32,1)" }
      );
    }
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, input, textarea, .project-card, .tool-tags span, .chips span")) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, input, textarea, .project-card, .tool-tags span, .chips span")) {
      document.body.classList.remove("cursor-hover");
    }
  });
}

function setupCardTilt() {
  const cards = document.querySelectorAll("article, .contact-form, .terminal");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${y * -5}deg`);
      card.style.setProperty("--tilt-y", `${x * 5}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function setupMotionToggle() {
  if (!themeToggle) return;
  themeToggle.addEventListener("click", () => {
    const paused = document.body.classList.toggle("motion-paused");
    themeToggle.textContent = paused ? "pulse:off" : "pulse:on";
    showToast(paused ? "Animations paused." : "Animations resumed.");
  });
}

function setupRipples() {
  document.querySelectorAll(".ripple").forEach((element) => {
    element.addEventListener("pointerdown", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      element.classList.remove("rippling");
      void element.offsetWidth;
      element.classList.add("rippling");
      window.setTimeout(() => element.classList.remove("rippling"), 700);
    });
  });
}

function setupExpandableProjects() {
  document.querySelectorAll(".project-card.expandable").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      card.classList.toggle("open");
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("open");
      }
    });
  });
}

function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function appendTerminalLine(text, className = "") {
  const line = document.createElement("p");
  line.className = className;
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runTerminalCommand(command) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) return;

  if (normalized === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  appendTerminalLine(`$ ${command}`, "yellow");
  const response = terminalResponses[normalized] || [
    ["dim", "command not found. try /help"],
  ];

  response.forEach(([className, text]) => appendTerminalLine(text, className));
}

document.querySelectorAll(".terminal-hint button").forEach((button) => {
  button.addEventListener("click", () => {
    terminalCommand.value = button.textContent;
    terminalCommand.focus();
    runTerminalCommand(button.textContent);
    terminalCommand.value = "";
  });
});

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runTerminalCommand(terminalCommand.value);
  terminalCommand.value = "";
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !email || !message) {
    showToast("Please fill in name, email and message.");
    return;
  }

  contactForm.reset();
  showToast("Message queued - I'll reply within 24 hours.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.activeElement && contactForm.contains(document.activeElement)) {
    contactForm.reset();
    document.activeElement.blur();
  }
});

year.textContent = new Date().getFullYear();
ensureMotionToggle();
ensureInteractiveChrome();
injectInteractiveStyles();
updateClock();
window.setInterval(updateClock, 1000);
setupTypingHero();
setupScrollProgress();
setupRevealAnimations();
setupActiveNavigation();
setupCursorGlow();
setupCardTilt();
setupMotionToggle();
setupRipples();
setupExpandableProjects();
