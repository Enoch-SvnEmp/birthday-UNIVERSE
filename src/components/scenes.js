import { icons } from "./icons.js";

function sectionShell(id, className, label) {
  const section = document.createElement("section");
  section.id = id;
  section.className = `story-scene ${className}`;
  section.dataset.chapter = label;
  section.tabIndex = -1;
  return section;
}

export function IntroScene(content) {
  const section = sectionShell("scene-intro", "intro-scene", "Opening");
  section.innerHTML = `
    <div class="scene-inner intro-layout">
      <p class="micro-copy">An entire little universe, made for one person.</p>
      <h1>${content.personName}</h1>
      <div class="intro-lines" aria-label="Esther is star, fire, and sapphire">
        ${content.intro.lines.map((line) => `<span>${line}</span>`).join("")}
      </div>
      <p class="intro-invitation">${content.intro.invitation}</p>
      <button class="primary-action" type="button" data-next>
        <span>${content.intro.cta}</span>
        ${icons.arrow}
      </button>
    </div>
    <div class="orbital-crown" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  `;
  return section;
}

export function StarFireSapphireScene(content) {
  const section = sectionShell("scene-essence", "essence-scene", "Star Fire Sapphire");
  section.innerHTML = `
    <div class="scene-inner essence-layout">
      <div class="trinity-stage" aria-hidden="true">
        <div class="star-sigil">${icons.spark}</div>
        <div class="flame-sigil"><span></span></div>
        <div class="sapphire-sigil"><span></span></div>
      </div>
      <div class="essence-copy">
        <h2>Star. Fire. Sapphire.</h2>
        <div class="essence-list">
          ${content.essence
            .map(
              (item) => `
                <article>
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
  return section;
}

function photoMarkup(photo, index, active) {
  const media = photo.src
    ? `<img src="${photo.src}" alt="${photo.alt}" loading="lazy" />`
    : `<div class="photo-fallback" role="img" aria-label="${photo.alt}">
        <span>${photo.fallbackTitle || `Memory ${index + 1}`}</span>
      </div>`;

  return `
    <button class="memory-star ${active ? "is-active" : ""}" type="button" data-photo="${index}" aria-pressed="${active}">
      <span class="memory-media">${media}</span>
      <span class="memory-number">${String(index + 1).padStart(2, "0")}</span>
    </button>
  `;
}

export function MemoryConstellation(content) {
  const section = sectionShell("scene-memories", "memory-scene", "Memories");
  const activePhoto = content.photos[0];
  const activeMedia = activePhoto.src
    ? `<img src="${activePhoto.src}" alt="${activePhoto.alt}" />`
    : `<div class="photo-fallback large" role="img" aria-label="${activePhoto.alt}">
        <span>${activePhoto.fallbackTitle}</span>
      </div>`;

  section.innerHTML = `
    <div class="scene-inner memory-layout">
      <div class="memory-copy">
        <h2>Memory Constellation</h2>
        <p>Every photograph becomes a coordinate. Tap a light to open the moment.</p>
      </div>
      <div class="constellation" aria-label="Photo constellation">
        <div class="constellation-lines" aria-hidden="true"></div>
        ${content.photos.map((photo, index) => photoMarkup(photo, index, index === 0)).join("")}
      </div>
      <figure class="memory-feature" aria-live="polite">
        <div class="feature-media">${activeMedia}</div>
        <figcaption>${activePhoto.caption}</figcaption>
      </figure>
    </div>
  `;
  return section;
}

export function TributeScene(content) {
  const section = sectionShell("scene-tribute", "tribute-scene", "Tribute");
  section.innerHTML = `
    <div class="scene-inner tribute-layout">
      <h2>${content.tribute.title}</h2>
      <div class="tribute-text">
        ${content.tribute.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    </div>
  `;
  return section;
}

export function SecretMoments(content) {
  const section = sectionShell("scene-secrets", "secret-scene", "Secrets");
  section.innerHTML = `
    <div class="scene-inner secret-layout">
      <div>
        <h2>Secret Moments</h2>
        <p>Some birthday messages should be discovered, not announced.</p>
      </div>
      <div class="secret-orbit" aria-label="Hidden birthday messages">
        ${content.secrets
          .map(
            (secret, index) => `
              <button class="secret-key" type="button" data-secret="${index}" aria-expanded="false">
                <span>${secret.label}</span>
              </button>
            `,
          )
          .join("")}
      </div>
      <p class="secret-message" aria-live="polite">Choose a light.</p>
    </div>
  `;
  return section;
}

export function BirthdayCake(content) {
  const section = sectionShell("scene-cake", "cake-scene", "Wish");
  section.innerHTML = `
    <div class="scene-inner cake-layout">
      <div class="cake-copy">
        <h2>${content.cake.title}</h2>
        <p>${content.cake.instruction}</p>
      </div>
      <div class="cake-stage" aria-label="Interactive birthday cake">
        <div class="cake-plate" aria-hidden="true"></div>
        <div class="cake-body" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="candles">
          ${[0, 1, 2].map((item) => `
            <button class="candle" type="button" data-candle="${item}" aria-label="Light candle ${item + 1}">
              <span class="wick"></span>
              <span class="flame"></span>
            </button>
          `).join("")}
        </div>
      </div>
      <p class="cake-reveal" aria-live="polite">${content.cake.reveal}</p>
    </div>
  `;
  return section;
}

export function CelebrationScene(content) {
  const section = sectionShell("scene-celebration", "celebration-scene", "Celebration");
  section.innerHTML = `
    <div class="scene-inner celebration-layout">
      <p class="micro-copy">The sky opens.</p>
      <h2>For every year that made you, and every wonder still arriving.</h2>
      <button class="secondary-action" type="button" data-celebrate>Release the stars</button>
      <div class="celebration-field" aria-hidden="true"></div>
    </div>
  `;
  return section;
}

export function FinalMessage(content) {
  const section = sectionShell("scene-final", "final-scene", "Final Message");
  section.innerHTML = `
    <div class="scene-inner final-layout">
      <h2>${content.finalMessage.title}</h2>
      <p>${content.finalMessage.body}</p>
      <p class="signature">${content.finalMessage.signature}</p>
    </div>
  `;
  return section;
}
