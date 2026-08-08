export function ProgressIndicator(scenes) {
  const nav = document.createElement("nav");
  nav.className = "progress-indicator";
  nav.setAttribute("aria-label", "Story progress");

  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "progress-dot";
    button.dataset.target = scene.id;
    button.setAttribute("aria-label", `Go to chapter ${index + 1}: ${scene.label}`);
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>`;
    nav.appendChild(button);
  });

  return nav;
}

export function updateProgress(activeIndex) {
  document.querySelectorAll(".progress-dot").forEach((button, index) => {
    const active = index === activeIndex;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });
}
