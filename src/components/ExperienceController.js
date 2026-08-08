import { updateProgress } from "./ProgressIndicator.js";

export class ExperienceController {
  constructor(root, scenes, content) {
    this.root = root;
    this.scenes = scenes;
    this.content = content;
    this.activeIndex = 0;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.observer = null;
  }

  init() {
    this.observeScenes();
    this.bindProgress();
    this.bindNextButtons();
    this.bindKeyboard();
    this.bindPhotos();
    this.bindSecrets();
    this.bindCake();
    this.bindCelebration();
    this.revealOnScroll();
    updateProgress(0);
  }

  observeScenes() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = this.scenes.findIndex((scene) => scene.id === entry.target.id);
          if (index >= 0) {
            this.activeIndex = index;
            updateProgress(index);
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.52 },
    );

    this.scenes.forEach((scene) => this.observer.observe(scene.element));
  }

  bindProgress() {
    document.querySelectorAll(".progress-dot").forEach((button) => {
      button.addEventListener("click", () => this.goToScene(button.dataset.target));
    });
  }

  bindNextButtons() {
    this.root.querySelectorAll("[data-next]").forEach((button) => {
      button.addEventListener("click", () => this.goToIndex(this.activeIndex + 1));
    });
  }

  bindKeyboard() {
    window.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const tagName = document.activeElement?.tagName;
      const typing = tagName === "INPUT" || tagName === "TEXTAREA" || document.activeElement?.isContentEditable;
      if (typing) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        this.goToIndex(this.activeIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        this.goToIndex(this.activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        this.goToIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        this.goToIndex(this.scenes.length - 1);
      }
    });
  }

  bindPhotos() {
    const scene = this.root.querySelector(".memory-scene");
    if (!scene) return;
    const feature = scene.querySelector(".memory-feature");

    scene.querySelectorAll(".memory-star").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.photo);
        const photo = this.content.photos[index];
        scene.querySelectorAll(".memory-star").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        const media = photo.src
          ? `<img src="${photo.src}" alt="${photo.alt}" />`
          : `<div class="photo-fallback large" role="img" aria-label="${photo.alt}">
              <span>${photo.fallbackTitle || `Memory ${index + 1}`}</span>
            </div>`;
        feature.innerHTML = `<div class="feature-media">${media}</div><figcaption>${photo.caption}</figcaption>`;
      });
    });
  }

  bindSecrets() {
    const scene = this.root.querySelector(".secret-scene");
    if (!scene) return;
    const output = scene.querySelector(".secret-message");

    scene.querySelectorAll(".secret-key").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.secret);
        const secret = this.content.secrets[index];
        scene.querySelectorAll(".secret-key").forEach((item) => {
          item.classList.toggle("is-active", item === button);
          item.setAttribute("aria-expanded", String(item === button));
        });
        output.textContent = secret.message;
      });
    });
  }

  bindCake() {
    const scene = this.root.querySelector(".cake-scene");
    if (!scene) return;
    const reveal = scene.querySelector(".cake-reveal");

    scene.querySelectorAll(".candle").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("is-lit");
        const allLit = [...scene.querySelectorAll(".candle")].every((candle) => candle.classList.contains("is-lit"));
        reveal.classList.toggle("is-visible", allLit);
        if (allLit) scene.classList.add("wish-complete");
      });
    });
  }

  bindCelebration() {
    const scene = this.root.querySelector(".celebration-scene");
    if (!scene) return;
    const button = scene.querySelector("[data-celebrate]");
    const field = scene.querySelector(".celebration-field");
    const colors = ["#f9d97a", "#31a7ff", "#f26f3d", "#f7f7ff", "#5dd5c7"];

    button.addEventListener("click", () => {
      field.replaceChildren();
      const count = this.reducedMotion ? 16 : window.innerWidth < 760 ? 42 : 82;
      for (let index = 0; index < count; index += 1) {
        const star = document.createElement("span");
        star.style.setProperty("--x", `${Math.random() * 100}%`);
        star.style.setProperty("--delay", `${Math.random() * 0.9}s`);
        star.style.setProperty("--spin", `${Math.random() * 180 - 90}deg`);
        star.style.background = colors[index % colors.length];
        field.appendChild(star);
      }
      scene.classList.add("is-celebrating");
      window.setTimeout(() => scene.classList.remove("is-celebrating"), 3200);
    });
  }

  revealOnScroll() {
    if (this.reducedMotion) {
      this.root.querySelectorAll(".story-scene").forEach((scene) => scene.classList.add("is-visible"));
    }
  }

  goToScene(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth", block: "start" });
  }

  goToIndex(index) {
    const clampedIndex = Math.max(0, Math.min(index, this.scenes.length - 1));
    this.goToScene(this.scenes[clampedIndex].id);
  }
}
