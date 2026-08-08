import { birthdayContent } from "./config/content.js";
import { createParticleBackground } from "./components/ParticleBackground.js";
import { ProgressIndicator } from "./components/ProgressIndicator.js";
import { MusicController } from "./components/MusicController.js";
import { ExperienceController } from "./components/ExperienceController.js";
import {
  BirthdayCake,
  CelebrationScene,
  FinalMessage,
  IntroScene,
  MemoryConstellation,
  SecretMoments,
  StarFireSapphireScene,
  TributeScene,
} from "./components/scenes.js";

const app = document.querySelector("#app");

const sceneFactories = [
  { id: "scene-intro", label: "Opening", factory: IntroScene },
  { id: "scene-essence", label: "Star Fire Sapphire", factory: StarFireSapphireScene },
  { id: "scene-memories", label: "Memory Constellation", factory: MemoryConstellation },
  { id: "scene-tribute", label: "Tribute", factory: TributeScene },
  { id: "scene-secrets", label: "Secret Moments", factory: SecretMoments },
  { id: "scene-cake", label: "Wish", factory: BirthdayCake },
  { id: "scene-celebration", label: "Celebration", factory: CelebrationScene },
  { id: "scene-final", label: "Final Message", factory: FinalMessage },
];

function App(content) {
  const shell = document.createElement("div");
  shell.className = "experience-shell";

  createParticleBackground(shell);
  shell.appendChild(ProgressIndicator(sceneFactories));
  shell.appendChild(MusicController(content));

  const main = document.createElement("main");
  main.className = "story";

  const scenes = sceneFactories.map((scene) => {
    const element = scene.factory(content);
    main.appendChild(element);
    return { ...scene, element };
  });

  shell.appendChild(main);
  app.appendChild(shell);

  const controller = new ExperienceController(shell, scenes, content);
  controller.init();
}

App(birthdayContent);
