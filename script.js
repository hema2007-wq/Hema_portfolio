const clock = document.querySelector("#utc-clock");
const year = document.querySelector("#year");
const terminalForm = document.querySelector("#terminal-form");
const terminalCommand = document.querySelector("#terminal-command");
const terminalOutput = document.querySelector("#terminal-output");
const contactForm = document.querySelector("#contact-form");
const toast = document.querySelector("#toast");

const terminalResponses = {
  "/help": [
    ["yellow", "$ help"],
    ["", "Commands: /work, /skills, /contact, /themes matrix, clear"],
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
updateClock();
window.setInterval(updateClock, 1000);
