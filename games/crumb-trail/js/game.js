/* =========================================================================
   Crumb Trail, a Daily Bread parable walk
   Follow crumbs, match a trail pattern, choose Help / Share / Wait.
   Kindness gets a soft glow. A miss gets a gentle redirect. No ads.
   ========================================================================= */

(function () {
  const STAGES = [
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
      eyebrow: "A fork in the road",
      heading: "Someone is hurt",
      body: "A traveler lies by the stones. Dust on their cloak. They cannot walk on their own.",
      help: { flavor: "Kneel. Wash the wounds. Lift them up.", glow: "You stopped. The path glows a little warmer." },
      share: { flavor: "Pour oil and wine. Tear a strip of your own cloth.", glow: "You gave what you had. The path glows a little warmer." },
      wait: { flavor: "Maybe someone else will stop.", redirect: "Waiting leaves them on the road. The crumbs still wait for you." }
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
      eyebrow: "The last fork",
      heading: "The inn",
      body: "The innkeeper waits at the door. The traveler needs a bed, a meal, and a promise to return.",
      help: { flavor: "Pay for the room. Promise to settle the rest.", glow: "You made a place for them. The heart fills." },
      share: { flavor: "Give the coins you still carry. Stay until morning.", glow: "You stayed. The heart fills." },
      wait: { flavor: "Leave them at the step and walk on.", redirect: "The door is open. They still need you." }
    }
  ];

  const CRUMB_KINDS = ["round", "sesame", "twist", "heart"];

  const stageWrap = document.getElementById("stageWrap");
  const stageTitle = document.getElementById("stageTitle");
  const stageSubtitle = document.getElementById("stageSubtitle");
  const stageDots = document.getElementById("stageDots");
  const toastEl = document.getElementById("toast");
  const heartMeter = document.getElementById("heartMeter");
  const heartFill = document.getElementById("heartFill");
  const app = document.getElementById("app");

  const forkOverlay = document.getElementById("forkOverlay");
  const glowOverlay = document.getElementById("glowOverlay");
  const closeOverlay = document.getElementById("closeOverlay");

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

  function kindSvg(kind) {
    if (kind === "sesame") {
      return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#E8A838" stroke="#8B4E1F" stroke-width="3"/><circle cx="24" cy="26" r="3" fill="#3B2A1A"/><circle cx="38" cy="24" r="2.5" fill="#3B2A1A"/><circle cx="32" cy="34" r="3" fill="#3B2A1A"/><circle cx="22" cy="38" r="2.4" fill="#3B2A1A"/><circle cx="42" cy="36" r="2.6" fill="#3B2A1A"/></svg>`;
    }
    if (kind === "twist") {
      return `<svg viewBox="0 0 64 64"><path d="M18 40c8-16 20-16 28 0" fill="none" stroke="#C4783A" stroke-width="10" stroke-linecap="round"/><path d="M18 28c8 16 20 16 28 0" fill="none" stroke="#F4B942" stroke-width="10" stroke-linecap="round"/></svg>`;
    }
    if (kind === "heart") {
      return `<svg viewBox="0 0 64 64"><path d="M32 50 L12 30 C6 24 6 14 14 10 C22 6 28 10 32 18 C36 10 42 6 50 10 C58 14 58 24 52 30 Z" fill="#D64545" stroke="#3B2A1A" stroke-width="3" stroke-linejoin="round"/></svg>`;
    }
    return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#F4B942" stroke="#8B4E1F" stroke-width="3"/><ellipse cx="26" cy="26" rx="7" ry="4" fill="#FFE4B5" opacity="0.8"/></svg>`;
  }

  function sceneSvg(kind) {
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
    const max = 2;
    const ratio = Math.min(kindness, max) / max;
    const height = 56 * ratio;
    const y = 56 - height;
    heartFill.setAttribute("y", String(y));
    heartFill.setAttribute("height", String(height));
    const label = kindness <= 0
      ? "Good Samaritan heart, empty"
      : kindness >= max
        ? "Good Samaritan heart, full"
        : "Good Samaritan heart, filling";
    heartMeter.setAttribute("aria-label", label);
    heartMeter.classList.toggle("is-lit", kindness >= max);
  }

  function buildDots() {
    stageDots.innerHTML = "";
    STAGES.forEach(function (_, i) {
      const li = document.createElement("li");
      if (i < current) li.className = "is-done";
      else if (i === current) li.className = "is-now";
      stageDots.appendChild(li);
    });
  }

  function startStage(index) {
    current = index;
    inputLock = false;
    const stage = STAGES[index];
    stageTitle.textContent = stage.title;
    stageSubtitle.textContent = stage.subtitle;
    buildDots();
    app.classList.remove("is-glowing");
    if (stage.type === "path") buildPathStage(stage);
    else if (stage.type === "match") buildMatchStage(stage);
    else buildForkStage(stage);
  }

  function advance() {
    if (current >= STAGES.length - 1) {
      kindness = Math.max(kindness, 2);
      setHeart();
      app.classList.add("is-glowing");
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
    scene.innerHTML = sceneSvg(current === STAGES.length - 1 ? "inn" : "city");
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

    function addChoice(word, data) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fork-btn";
      btn.dataset.word = word;
      btn.innerHTML = "<strong>" + word + "</strong><span>" + data.flavor + "</span>";
      btn.addEventListener("click", function () {
        if (inputLock) return;
        if (word === "Wait") {
          showToast(data.redirect);
          return;
        }
        inputLock = true;
        kindness += 1;
        setHeart();
        forkOverlay.hidden = true;
        document.getElementById("glowTitle").textContent = word === "Help" ? "A soft glow" : "A shared glow";
        document.getElementById("glowBody").textContent = data.glow;
        app.classList.add("is-glowing");
        glowOverlay.hidden = false;
      });
      box.appendChild(btn);
    }

    addChoice("Help", stage.help);
    addChoice("Share", stage.share);
    addChoice("Wait", stage.wait);
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
    function start(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      overlay.classList.add("is-off");
      overlay.setAttribute("aria-hidden", "true");
      startStage(0);
    }
    if (cont) cont.addEventListener("click", goHowto);
    if (stage) stage.addEventListener("click", goHowto);
    if (btn) btn.addEventListener("click", start);
    window.addEventListener("keydown", function (e) {
      if (overlay.classList.contains("is-off")) return;
      if (e.code === "Enter" || e.code === "Space") {
        if (overlay.classList.contains("is-howto")) start(e);
        else goHowto(e);
      }
    }, true);
  }

  setHeart();
  buildDots();
  bootOpening();
})();
