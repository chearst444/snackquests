/* =========================================================================
   Crumb Trail, a Daily Bread parable walk
   Follow crumbs, match a trail pattern, choose your word at the fork.
   Kindness gets a soft glow. One choice per fork only gives a gentle
   redirect - never a fill, never a scolding. No ads.

   Multiple stories share this same engine (path / match / fork stage
   types, the crumb + heart mechanics). Each story is just data: see
   STORIES below. Adding another parable means adding another entry
   there, not new code.
   ========================================================================= */

(function () {
  const STORIES = [
    {
      id: "samaritan",
      title: "The Good Samaritan",
      blurb: "Stop for a stranger on the road to Jericho.",
      heartLabel: "Good Samaritan",
      verse: "“But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him.”",
      verseRef: "Luke 10:33",
      closeTitle: "The heart is full",
      closeBody: "Glow was never a prize. It was the trail of a kind choice. You helped. You shared. You did not wait the hurt away.",
      stages: [
        {
          type: "path",
          title: "The road",
          subtitle: "Tap the glowing crumb. Follow it out of the city.",
          start: { x: 12, y: 86 },
          crumbs: [
            { x: 22, y: 74 },
            { x: 40, y: 66 },
            { x: 58, y: 54 },
            { x: 76, y: 44 }
          ],
          decoys: [
            { x: 30, y: 50 },
            { x: 62, y: 78 }
          ],
          scene: "city"
        },
        {
          type: "match",
          title: "Trail marks",
          subtitle: "Watch the crumb pattern. Tap it back in order.",
          length: 3
        },
        {
          type: "fork",
          title: "By the stones",
          subtitle: "A traveler cannot walk. The road waits on your word.",
          scene: "city",
          eyebrow: "A fork in the road",
          heading: "Someone is hurt",
          body: "A traveler lies by the stones. Dust on their cloak. They cannot walk on their own.",
          choices: [
            { word: "Help", flavor: "Kneel. Wash the wounds. Lift them up.", glow: "You stopped. The path glows a little warmer." },
            { word: "Share", flavor: "Pour oil and wine. Tear a strip of your own cloth.", glow: "You gave what you had. The path glows a little warmer." },
            { word: "Wait", flavor: "Maybe someone else will stop.", redirect: "Waiting leaves them on the road. The crumbs still wait for you." }
          ]
        },
        {
          type: "path",
          title: "Carry them on",
          subtitle: "The crumbs glow toward the inn. Stay with the glow.",
          start: { x: 16, y: 80 },
          crumbs: [
            { x: 28, y: 68 },
            { x: 44, y: 60 },
            { x: 52, y: 46 },
            { x: 68, y: 38 },
            { x: 82, y: 28 }
          ],
          decoys: [
            { x: 18, y: 42 },
            { x: 72, y: 64 }
          ],
          scene: "inn"
        },
        {
          type: "match",
          title: "The inn sign",
          subtitle: "Match the innkeeper's crumb mark so you find the door.",
          length: 4
        },
        {
          type: "fork",
          title: "A room for rest",
          subtitle: "The inn is open. They still need a bed.",
          scene: "inn",
          eyebrow: "The last fork",
          heading: "The inn",
          body: "The innkeeper waits at the door. The traveler needs a bed, a meal, and a promise to return.",
          choices: [
            { word: "Help", flavor: "Pay for the room. Promise to settle the rest.", glow: "You made a place for them. The heart fills." },
            { word: "Share", flavor: "Give the coins you still carry. Stay until morning.", glow: "You stayed. The heart fills." },
            { word: "Wait", flavor: "Leave them at the step and walk on.", redirect: "The door is open. They still need you." }
          ]
        }
      ]
    },
    {
      id: "richfool",
      title: "The Rich Fool",
      blurb: "A bumper harvest, and a choice about what it's for.",
      heartLabel: "Rich Toward God",
      verse: "“So is he that layeth up treasure for himself, and is not rich toward God.”",
      verseRef: "Luke 12:21",
      closeTitle: "The heart is full",
      closeBody: "Glow was never about the barns. It was the trail of a generous choice. You shared. You gave thanks. You did not store the harvest away from the ones who needed it.",
      stages: [
        {
          type: "path",
          title: "The harvest field",
          subtitle: "Tap the glowing crumb. Follow the grain trail home.",
          start: { x: 12, y: 86 },
          crumbs: [
            { x: 22, y: 74 },
            { x: 40, y: 66 },
            { x: 58, y: 54 },
            { x: 76, y: 44 }
          ],
          decoys: [
            { x: 30, y: 50 },
            { x: 62, y: 78 }
          ],
          scene: "field"
        },
        {
          type: "match",
          title: "Counting the sheaves",
          subtitle: "Watch the harvest marks. Tap them back in order.",
          length: 3
        },
        {
          type: "fork",
          title: "The full barns",
          subtitle: "The barns are full. The ground still gives more.",
          scene: "field",
          eyebrow: "A rich harvest",
          heading: "What now?",
          body: "The crop came in heavy this year - more than the barns can hold. The extra grain waits in the field for a decision.",
          choices: [
            { word: "Share", flavor: "Send the extra grain to the neighbors whose fields failed.", glow: "You gave from your plenty. The barns are lighter, the heart is fuller." },
            { word: "Give thanks", flavor: "Keep enough for the season, and thank God for the rest.", glow: "You remembered where the harvest came from. The path glows warmer." },
            { word: "Store it all", flavor: "Tear down the barns. Build bigger ones. Keep it all, just in case.", redirect: "Bigger barns still can't hold a life. There's still a choice to make here." }
          ]
        },
        {
          type: "path",
          title: "Down to town",
          subtitle: "The crumbs glow toward town. Stay with the glow.",
          start: { x: 16, y: 80 },
          crumbs: [
            { x: 28, y: 68 },
            { x: 44, y: 60 },
            { x: 52, y: 46 },
            { x: 68, y: 38 },
            { x: 82, y: 28 }
          ],
          decoys: [
            { x: 18, y: 42 },
            { x: 72, y: 64 }
          ],
          scene: "barn"
        },
        {
          type: "match",
          title: "The market mark",
          subtitle: "Match the market's crumb mark to find the stall.",
          length: 4
        },
        {
          type: "fork",
          title: "An empty stall",
          subtitle: "A neighbor's table is bare tonight.",
          scene: "barn",
          eyebrow: "One more chance",
          heading: "A bare table",
          body: "A family in town has nothing set aside for winter. The wagon behind you is still half full.",
          choices: [
            { word: "Share", flavor: "Unload the wagon. Fill their stores before your own.", glow: "Enough was already enough. The heart is full." },
            { word: "Give thanks", flavor: "Sell them grain at a fair price, no more.", glow: "Fair and kind together. The heart is full." },
            { word: "Store it all", flavor: "Keep the wagon shut. It might be a hard winter.", redirect: "The wagon stays heavy, and so does the walk home." }
          ]
        }
      ]
    },
    {
      id: "prodigal",
      title: "The Prodigal Son",
      blurb: "A son comes to his senses, far from home.",
      heartLabel: "Welcomed Home",
      verse: "“But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.”",
      verseRef: "Luke 15:20",
      closeTitle: "The heart is full",
      closeBody: "Glow was never about earning it back. It was the trail of a homeward choice. You got up. You went home. You let yourself be welcomed.",
      stages: [
        {
          type: "path",
          title: "Leaving home",
          subtitle: "Tap the glowing crumb. Follow the road away.",
          start: { x: 12, y: 86 },
          crumbs: [
            { x: 22, y: 74 },
            { x: 40, y: 66 },
            { x: 58, y: 54 },
            { x: 76, y: 44 }
          ],
          decoys: [
            { x: 30, y: 50 },
            { x: 62, y: 78 }
          ],
          scene: "city"
        },
        {
          type: "match",
          title: "Counting the coins",
          subtitle: "Watch the coin marks. Tap them back in order.",
          length: 3
        },
        {
          type: "fork",
          title: "Feeding the pigs",
          subtitle: "The money is gone. The famine is real.",
          scene: "pigs",
          eyebrow: "Far from home",
          heading: "Nothing left",
          body: "The inheritance is spent. The fields are dry. Even the pig's food starts to look good.",
          choices: [
            { word: "Go home", flavor: "Get up now. Go home and say it plainly: I have sinned.", glow: "You turned around. The road home glows warmer." },
            { word: "Practice the words", flavor: "Rehearse it on the way: I am no longer worthy to be called your son.", glow: "Honest words, ready to say. The path glows warmer." },
            { word: "Stay one more day", flavor: "Maybe things will turn around here first.", redirect: "One more day here is still one more day away. The road home is still waiting." }
          ]
        },
        {
          type: "path",
          title: "The road home",
          subtitle: "The crumbs glow toward home. Stay with the glow.",
          start: { x: 16, y: 80 },
          crumbs: [
            { x: 28, y: 68 },
            { x: 44, y: 60 },
            { x: 52, y: 46 },
            { x: 68, y: 38 },
            { x: 82, y: 28 }
          ],
          decoys: [
            { x: 18, y: 42 },
            { x: 72, y: 64 }
          ],
          scene: "field"
        },
        {
          type: "match",
          title: "The gate mark",
          subtitle: "Match the gatepost's crumb mark to find the way in.",
          length: 4
        },
        {
          type: "fork",
          title: "Running to meet him",
          subtitle: "Someone is running down the road.",
          scene: "field",
          eyebrow: "The father runs",
          heading: "Welcomed home",
          body: "The father is running toward you, arms open, before you've said a word.",
          choices: [
            { word: "Receive it", flavor: "Let him embrace you. Accept the robe, the ring, the feast.", glow: "You let yourself be loved well. The heart is full." },
            { word: "Join the feast", flavor: "Go in. Sit at the table. Let the celebration be for you too.", glow: "Grace welcomed all the way in. The heart is full." },
            { word: "Stay by the gate", flavor: "Surely you should wait outside until you've earned it back.", redirect: "The father is already running. There is nothing left to earn." }
          ]
        }
      ]
    }
  ];

  const CRUMB_KINDS = ["round", "sesame", "twist", "heart"];

  const stageWrap = document.getElementById("stageWrap");
  const stageTitle = document.getElementById("stageTitle");
  const stageSubtitle = document.getElementById("stageSubtitle");
  const stageDots = document.getElementById("stageDots");
  const toastEl = document.getElementById("toast");
  const heartMeter = document.getElementById("heartMeter");
  const heartLabelEl = document.getElementById("heartLabel");
  const heartIcons = [document.getElementById("heart1"), document.getElementById("heart2")];
  const app = document.getElementById("app");

  const forkOverlay = document.getElementById("forkOverlay");
  const glowOverlay = document.getElementById("glowOverlay");
  const closeOverlay = document.getElementById("closeOverlay");

  let currentStory = null;
  let current = 0;
  let kindness = 0;
  let toastTimer = 0;
  let inputLock = false;

  function loafSvg() {
    return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <ellipse cx="32" cy="42" rx="22" ry="14" fill="#E8A838"/>
      <ellipse cx="32" cy="34" rx="20" ry="16" fill="#F4B942"/>
      <ellipse cx="32" cy="28" rx="14" ry="8" fill="#FFE4B5"/>
      <circle cx="25" cy="34" r="2.4" fill="#3B2A1A"/>
      <circle cx="39" cy="34" r="2.4" fill="#3B2A1A"/>
      <path d="M26 41c3 3.2 9 3.2 12 0" fill="none" stroke="#3B2A1A" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`;
  }

  // Each trail mark kind now renders as one of the farmstead icons instead
  // of a hand-drawn shape - the kind keys (and the Simon-says logic that
  // shuffles and compares them) are untouched, only the glyph changed.
  const KIND_ICONS = {
    round: "sun",
    sesame: "wheat",
    twist: "well",
    heart: "sheep"
  };
  function kindSvg(kind) {
    const icon = KIND_ICONS[kind] || "sun";
    return `<img src="assets/ui/icon-${icon}.png" alt="">`;
  }

  // Flat vector backdrops for each stage's scene, in the same simple
  // sky+ground+silhouette style throughout. "city" and "inn" carry the
  // Good Samaritan road; "field" and "barn" carry the harvest story.
  function sceneSvg(kind) {
    if (kind === "pigs") {
      // The one photographic scene among these - reserved for the Prodigal
      // Son's lowest point, so it reads as a real change of place rather
      // than another flat backdrop. .trail-scene img.backdrop mirrors the
      // svg.backdrop positioning rule below.
      return `<img class="backdrop" src="assets/ui/pigs-scene.jpg" alt="">`;
    }
    if (kind === "inn") {
      return `<svg class="backdrop" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="500" fill="#7EB8D4"/>
        <rect y="300" width="400" height="200" fill="#C4783A"/>
        <path d="M0 330 C90 300 160 360 250 320 C320 290 360 330 400 310 L400 500 L0 500 Z" fill="#8B4E1F"/>
        <path d="M40 500 C120 360 200 340 280 300 C330 276 360 250 400 230" fill="none" stroke="#F4B942" stroke-width="10" stroke-linecap="round" stroke-dasharray="6 16" opacity="0.9"/>
        <g transform="translate(250 70)">
          <rect x="18" y="70" width="110" height="90" fill="#FFF1DC" stroke="#3B2A1A" stroke-width="4"/>
          <path d="M10 74 L73 18 L136 74 Z" fill="#D64545" stroke="#3B2A1A" stroke-width="4" stroke-linejoin="round"/>
          <rect x="58" y="108" width="30" height="48" fill="#8B4E1F"/>
          <rect x="32" y="92" width="22" height="22" fill="#7EB8D4" stroke="#3B2A1A" stroke-width="3"/>
          <rect x="92" y="92" width="22" height="22" fill="#7EB8D4" stroke="#3B2A1A" stroke-width="3"/>
        </g>
        <ellipse cx="310" cy="88" rx="28" ry="28" fill="#FFF6EB" opacity="0.8"/>
      </svg>`;
    }
    if (kind === "field") {
      return `<svg class="backdrop" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="500" fill="#7EB8D4"/>
        <rect y="300" width="400" height="200" fill="#E8A838"/>
        <path d="M0 320 C120 280 180 350 270 310 C330 284 370 320 400 300 L400 500 L0 500 Z" fill="#C4783A"/>
        <path d="M20 500 C110 380 190 350 270 320 C330 298 360 270 400 250" fill="none" stroke="#FFF1DC" stroke-width="10" stroke-linecap="round" stroke-dasharray="6 16" opacity="0.9"/>
        <g transform="translate(28 330)" stroke="#8B4E1F" stroke-width="3" fill="#F4B942">
          <path d="M8 90 L2 40 L14 40 Z"/>
          <path d="M24 90 L18 34 L32 34 Z"/>
          <path d="M42 90 L36 40 L50 40 Z"/>
          <rect x="0" y="88" width="52" height="10" fill="#C4783A" stroke="none"/>
        </g>
        <g transform="translate(94 344)" stroke="#8B4E1F" stroke-width="3" fill="#FFE4B5">
          <path d="M8 76 L2 32 L14 32 Z"/>
          <path d="M24 76 L18 26 L32 26 Z"/>
          <path d="M42 76 L36 32 L50 32 Z"/>
          <rect x="0" y="74" width="52" height="8" fill="#C4783A" stroke="none"/>
        </g>
        <ellipse cx="320" cy="90" rx="32" ry="32" fill="#FFF6EB" opacity="0.85"/>
      </svg>`;
    }
    if (kind === "barn") {
      return `<svg class="backdrop" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="500" fill="#7EB8D4"/>
        <rect y="300" width="400" height="200" fill="#E8A838"/>
        <path d="M0 330 C100 300 170 360 260 320 C320 296 360 330 400 312 L400 500 L0 500 Z" fill="#C4783A"/>
        <path d="M30 500 C110 370 190 350 270 314 C330 288 360 260 400 240" fill="none" stroke="#FFF1DC" stroke-width="10" stroke-linecap="round" stroke-dasharray="6 16" opacity="0.9"/>
        <g transform="translate(230 120)">
          <rect x="0" y="60" width="130" height="100" fill="#D64545" stroke="#3B2A1A" stroke-width="4"/>
          <path d="M-8 64 L65 8 L138 64 Z" fill="#8B4E1F" stroke="#3B2A1A" stroke-width="4" stroke-linejoin="round"/>
          <rect x="56" y="100" width="18" height="60" fill="#3B2A1A" opacity="0.7"/>
          <path d="M65 8 L65 160" stroke="#FFE4B5" stroke-width="3"/>
        </g>
        <image href="assets/ui/silo.png" x="8" y="130" width="112" height="124" preserveAspectRatio="xMidYMax meet"/>
        <ellipse cx="330" cy="86" rx="30" ry="30" fill="#FFF6EB" opacity="0.85"/>
      </svg>`;
    }
    return `<svg class="backdrop" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#7EB8D4"/>
      <rect y="300" width="400" height="200" fill="#C4783A"/>
      <path d="M0 340 C110 290 170 370 270 330 C340 300 370 340 400 328 L400 500 L0 500 Z" fill="#8B4E1F"/>
      <path d="M20 500 C110 380 190 350 270 320 C330 298 360 270 400 250" fill="none" stroke="#F4B942" stroke-width="10" stroke-linecap="round" stroke-dasharray="6 16" opacity="0.9"/>
      <g transform="translate(20 150)">
        <rect x="10" y="70" width="70" height="80" fill="#FFF1DC" stroke="#3B2A1A" stroke-width="4"/>
        <rect x="50" y="40" width="48" height="110" fill="#E8A838" stroke="#3B2A1A" stroke-width="4"/>
        <rect x="22" y="88" width="18" height="18" fill="#7EB8D4" stroke="#3B2A1A" stroke-width="3"/>
        <rect x="64" y="70" width="18" height="18" fill="#7EB8D4" stroke="#3B2A1A" stroke-width="3"/>
      </g>
      <ellipse cx="320" cy="90" rx="32" ry="32" fill="#FFF6EB" opacity="0.85"/>
    </svg>`;
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.hidden = true;
    }, 2400);
  }

  function setHeart() {
    const max = heartIcons.length; // 2, unchanged - still two kind choices to earn
    const filled = Math.min(kindness, max);
    heartIcons.forEach(function (img, i) {
      img.classList.toggle("is-filled", i < filled);
    });
    const label = currentStory ? currentStory.heartLabel : "Good Samaritan";
    const state = kindness <= 0 ? "empty" : kindness >= max ? "full" : "filling";
    heartMeter.setAttribute("aria-label", label + " heart, " + state);
    heartMeter.classList.toggle("is-lit", kindness >= max);
  }

  function buildDots() {
    stageDots.innerHTML = "";
    if (!currentStory) return;
    currentStory.stages.forEach(function (_, i) {
      const li = document.createElement("li");
      if (i < current) li.className = "is-done";
      else if (i === current) li.className = "is-now";
      stageDots.appendChild(li);
    });
  }

  function startStage(index) {
    current = index;
    inputLock = false;
    const stage = currentStory.stages[index];
    stageTitle.textContent = stage.title;
    stageSubtitle.textContent = stage.subtitle;
    buildDots();
    app.classList.remove("is-glowing");
    if (stage.type === "path") buildPathStage(stage);
    else if (stage.type === "match") buildMatchStage(stage);
    else buildForkStage(stage);
  }

  function advance() {
    if (current >= currentStory.stages.length - 1) {
      kindness = Math.max(kindness, 2);
      setHeart();
      app.classList.add("is-glowing");
      document.getElementById("closeTitle").textContent = currentStory.closeTitle;
      document.getElementById("closeVerse").textContent = currentStory.verse;
      document.getElementById("closeRef").textContent = currentStory.verseRef;
      document.getElementById("closeBody").textContent = currentStory.closeBody;
      closeOverlay.hidden = false;
      return;
    }
    startStage(current + 1);
  }

  function buildPathStage(stage) {
    stageWrap.innerHTML = "";
    const scene = document.createElement("div");
    scene.className = "trail-scene";
    scene.setAttribute("role", "group");
    scene.setAttribute("aria-label", "Crumb path");
    scene.innerHTML = sceneSvg(stage.scene);

    const loaf = document.createElement("div");
    loaf.className = "loaf";
    loaf.innerHTML = loafSvg();
    loaf.style.left = stage.start.x + "%";
    loaf.style.top = stage.start.y + "%";
    scene.appendChild(loaf);

    let next = 0;
    const crumbs = stage.crumbs.map(function (spot, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "crumb";
      btn.style.left = spot.x + "%";
      btn.style.top = spot.y + "%";
      btn.setAttribute("aria-label", "Crumb " + (i + 1));
      scene.appendChild(btn);
      return btn;
    });
    stage.decoys.forEach(function (spot, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "crumb is-decoy";
      btn.style.left = spot.x + "%";
      btn.style.top = spot.y + "%";
      btn.setAttribute("aria-label", "Off path crumb " + (i + 1));
      btn.addEventListener("click", function () {
        if (inputLock) return;
        btn.classList.remove("is-shake");
        void btn.offsetWidth;
        btn.classList.add("is-shake");
        showToast("That crumb turns away. Come back to the glow.");
      });
      scene.appendChild(btn);
    });

    function lightNext() {
      crumbs.forEach(function (btn, i) {
        btn.classList.toggle("is-glow", i === next);
        btn.classList.toggle("is-done", i < next);
      });
    }

    crumbs.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        if (inputLock) return;
        if (i !== next) {
          btn.classList.remove("is-shake");
          void btn.offsetWidth;
          btn.classList.add("is-shake");
          showToast("Gentle redirect. The glow is still waiting on the true crumb.");
          return;
        }
        inputLock = true;
        loaf.style.left = stage.crumbs[i].x + "%";
        loaf.style.top = stage.crumbs[i].y + "%";
        next += 1;
        lightNext();
        const done = next >= crumbs.length;
        setTimeout(function () {
          inputLock = false;
          if (done) {
            app.classList.add("is-glowing");
            setTimeout(advance, 500);
          }
        }, 430);
      });
    });

    lightNext();
    stageWrap.appendChild(scene);
  }

  function buildMatchStage(stage) {
    stageWrap.innerHTML = "";
    const sequence = [];
    for (let i = 0; i < stage.length; i++) {
      sequence.push(CRUMB_KINDS[Math.floor(Math.random() * CRUMB_KINDS.length)]);
    }

    const board = document.createElement("div");
    board.className = "match-board";
    const preview = document.createElement("div");
    preview.className = "match-preview";
    preview.setAttribute("aria-hidden", "true");
    const status = document.createElement("p");
    status.className = "match-status";
    status.textContent = "Watch the pattern.";
    const pads = document.createElement("div");
    pads.className = "match-pads";

    const padEls = {};
    CRUMB_KINDS.forEach(function (kind) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-pad";
      btn.dataset.kind = kind;
      btn.innerHTML = kindSvg(kind);
      btn.setAttribute("aria-label", kind + " crumb");
      btn.disabled = true;
      pads.appendChild(btn);
      padEls[kind] = btn;
    });

    board.appendChild(preview);
    board.appendChild(status);
    board.appendChild(pads);
    stageWrap.appendChild(board);

    let playerIndex = 0;
    let watching = true;

    function flash(kind, on) {
      padEls[kind].classList.toggle("is-glow", on);
    }

    function renderPreview(revealCount) {
      preview.innerHTML = "";
      sequence.forEach(function (kind, i) {
        const chip = document.createElement("span");
        chip.className = "match-chip" + (i < revealCount ? "" : " is-empty");
        if (i < revealCount) chip.innerHTML = kindSvg(kind);
        preview.appendChild(chip);
      });
    }

    function playSequence() {
      watching = true;
      playerIndex = 0;
      status.textContent = "Watch the pattern.";
      Object.keys(padEls).forEach(function (k) { padEls[k].disabled = true; });
      renderPreview(sequence.length);
      let step = 0;
      function beat() {
        if (step >= sequence.length) {
          Object.keys(padEls).forEach(function (k) { padEls[k].classList.remove("is-glow"); });
          watching = false;
          renderPreview(0);
          status.textContent = "Your turn. Tap the pattern.";
          Object.keys(padEls).forEach(function (k) { padEls[k].disabled = false; });
          return;
        }
        const kind = sequence[step];
        flash(kind, true);
        setTimeout(function () {
          flash(kind, false);
          step += 1;
          setTimeout(beat, 220);
        }, 520);
      }
      setTimeout(beat, 400);
    }

    Object.keys(padEls).forEach(function (kind) {
      padEls[kind].addEventListener("click", function () {
        if (watching || inputLock) return;
        if (kind !== sequence[playerIndex]) {
          padEls[kind].classList.remove("is-shake");
          void padEls[kind].offsetWidth;
          padEls[kind].classList.add("is-shake");
          showToast("Almost. Watch the pattern once more.");
          playSequence();
          return;
        }
        flash(kind, true);
        setTimeout(function () { flash(kind, false); }, 280);
        playerIndex += 1;
        renderPreview(playerIndex);
        if (playerIndex >= sequence.length) {
          inputLock = true;
          status.textContent = "The mark matches.";
          app.classList.add("is-glowing");
          setTimeout(advance, 700);
        }
      });
    });

    playSequence();
  }

  function buildForkStage(stage) {
    stageWrap.innerHTML = "";
    const scene = document.createElement("div");
    scene.className = "trail-scene";
    scene.innerHTML = sceneSvg(stage.scene);
    const loaf = document.createElement("div");
    loaf.className = "loaf";
    loaf.innerHTML = loafSvg();
    loaf.style.left = "46%";
    loaf.style.top = "62%";
    scene.appendChild(loaf);
    const traveler = document.createElement("div");
    traveler.className = "loaf";
    traveler.style.left = "68%";
    traveler.style.top = "70%";
    traveler.style.opacity = "0.85";
    traveler.innerHTML = `<svg viewBox="0 0 64 40" aria-hidden="true"><ellipse cx="32" cy="28" rx="24" ry="8" fill="#5c4633" opacity="0.25"/><ellipse cx="34" cy="22" rx="18" ry="10" fill="#C4783A"/><circle cx="50" cy="16" r="7" fill="#F4B942"/><circle cx="48" cy="15" r="1.4" fill="#3B2A1A"/><circle cx="53" cy="15" r="1.4" fill="#3B2A1A"/></svg>`;
    scene.appendChild(traveler);
    stageWrap.appendChild(scene);

    document.getElementById("forkEyebrow").textContent = stage.eyebrow;
    document.getElementById("forkTitle").textContent = stage.heading;
    document.getElementById("forkBody").textContent = stage.body;
    const box = document.getElementById("forkChoices");
    box.innerHTML = "";

    // Exactly one choice per fork is the redirect (doesn't advance); the
    // rest are kind/wise choices that fill the heart and move the story
    // on. Which word is which varies by story, so the role - not the
    // literal word - decides both behavior and color here.
    let glowSeen = 0;
    stage.choices.forEach(function (choice) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fork-btn";
      btn.classList.add(choice.redirect ? "fork-btn--redirect" : (glowSeen++ % 2 === 0 ? "fork-btn--glow-a" : "fork-btn--glow-b"));
      btn.innerHTML = "<strong>" + choice.word + "</strong><span>" + choice.flavor + "</span>";
      btn.addEventListener("click", function () {
        if (inputLock) return;
        if (choice.redirect) {
          showToast(choice.redirect);
          return;
        }
        inputLock = true;
        kindness += 1;
        setHeart();
        forkOverlay.hidden = true;
        document.getElementById("glowTitle").textContent = "A soft glow";
        document.getElementById("glowBody").textContent = choice.glow;
        app.classList.add("is-glowing");
        glowOverlay.hidden = false;
      });
      box.appendChild(btn);
    });
    forkOverlay.hidden = false;
  }

  document.getElementById("glowContinue").addEventListener("click", function () {
    glowOverlay.hidden = true;
    inputLock = false;
    advance();
  });

  document.getElementById("restartBtn").addEventListener("click", function () {
    closeOverlay.hidden = true;
    kindness = 0;
    setHeart();
    app.classList.remove("is-glowing");
    startStage(0);
  });

  // ---------------------------- Story selection ---------------------------
  function startStory(story) {
    currentStory = story;
    heartLabelEl.textContent = story.heartLabel;
    kindness = 0;
    setHeart();
    app.classList.remove("is-glowing");
    startStage(0);
  }

  function buildLevelList() {
    const list = document.getElementById("levelList");
    list.innerHTML = "";
    STORIES.forEach(function (story) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn";
      btn.innerHTML = "<strong>" + story.title + "</strong><span>" + story.blurb + "</span>";
      btn.addEventListener("click", function () {
        const overlay = document.getElementById("sq-open");
        overlay.classList.add("is-off");
        overlay.setAttribute("aria-hidden", "true");
        startStory(story);
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  document.getElementById("chooseStoryBtn").addEventListener("click", function () {
    closeOverlay.hidden = true;
    const overlay = document.getElementById("sq-open");
    overlay.classList.remove("is-off");
    overlay.classList.remove("is-howto");
    overlay.classList.add("is-levels");
    overlay.removeAttribute("aria-hidden");
  });

  function bootOpening() {
    const overlay = document.getElementById("sq-open");
    const cont = document.getElementById("sq-continue");
    const btn = document.getElementById("sq-play");
    const stage = overlay && overlay.querySelector(".sq-stage");
    if (!overlay) return;
    function goHowto(e) {
      if (overlay.classList.contains("is-howto") || overlay.classList.contains("is-off")) return;
      if (e) { e.preventDefault(); e.stopPropagation(); }
      overlay.classList.add("is-howto");
    }
    function goLevels(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      overlay.classList.remove("is-howto");
      overlay.classList.add("is-levels");
    }
    if (cont) cont.addEventListener("click", goHowto);
    if (stage) stage.addEventListener("click", goHowto);
    if (btn) btn.addEventListener("click", goLevels);
    window.addEventListener("keydown", function (e) {
      if (overlay.classList.contains("is-off")) return;
      if (e.code === "Enter" || e.code === "Space") {
        if (overlay.classList.contains("is-levels")) return;
        if (overlay.classList.contains("is-howto")) goLevels(e);
        else goHowto(e);
      }
    }, true);
  }

  buildLevelList();
  setHeart();
  bootOpening();
})();
