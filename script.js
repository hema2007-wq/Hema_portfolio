const clock = document.querySelector("#utc-clock");
const year = document.querySelector("#year");
const terminalForm = document.querySelector("#terminal-form");
const terminalCommand = document.querySelector("#terminal-command");
const terminalOutput = document.querySelector("#terminal-output");
const contactForm = document.querySelector("#contact-form");
const toast = document.querySelector("#toast");
let themeToggle = document.querySelector("#theme-toggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];

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
    body { overflow-x: hidden; }
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
      transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
      transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
      will-change: transform;
    }
    article:hover,
    .contact-form:hover,
    .article-grid a:hover {
      box-shadow: 0 18px 60px hsl(0 0% 0% / 0.28), 0 0 34px hsl(var(--green) / 0.06);
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
injectInteractiveStyles();
updateClock();
window.setInterval(updateClock, 1000);
setupRevealAnimations();
setupActiveNavigation();
setupCursorGlow();
setupCardTilt();
setupMotionToggle();
