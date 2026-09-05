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
      card: "assets/opening-bg.jpg",
      heartLabel: "Good Samaritan",
      verse: "“But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him.”",
      verseRef: "Luke 10:33",
      closeTitle: "The heart is full",
      closeBody: "Glow was never a prize. It was the trail of a kind choice. You helped. You shared. You did not wait the hurt away.",
      stages: [
        {
          type: "path",
          title: "The road",
          subtitle: "Tap the glowing crumb. Follow it out of town.",
          crumbs: [
            { x: 35, y: 75 },
            { x: 39, y: 79 },
            { x: 43, y: 84 },
            { x: 46, y: 88 }
          ],
          decoys: [
            { x: 65, y: 85 },
            { x: 20, y: 82 }
          ],
          scene: "samaritan"
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
          scene: "samaritan",
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
          crumbs: [
            { x: 39, y: 79 },
            { x: 43, y: 84 },
            { x: 46, y: 88 },
            { x: 48, y: 92 },
            { x: 50, y: 96 }
          ],
          decoys: [
            { x: 68, y: 90 },
            { x: 20, y: 88 }
          ],
          scene: "samaritan"
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
          scene: "samaritan",
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
      card: "assets/ui/scene-richfool.jpg",
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
          crumbs: [
            { x: 32, y: 80 },
            { x: 38, y: 84 },
            { x: 44, y: 88 },
            { x: 50, y: 91 }
          ],
          decoys: [
            { x: 70, y: 85 },
            { x: 18, y: 83 }
          ],
          scene: "richfool"
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
          scene: "richfool",
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
          crumbs: [
            { x: 38, y: 84 },
            { x: 44, y: 88 },
            { x: 50, y: 91 },
            { x: 55, y: 95 },
            { x: 60, y: 98 }
          ],
          decoys: [
            { x: 72, y: 90 },
            { x: 20, y: 92 }
          ],
          scene: "richfool"
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
          scene: "richfool",
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
      card: "assets/ui/pigs-scene.jpg",
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
          crumbs: [
            { x: 50, y: 62 },
            { x: 56, y: 55 },
            { x: 62, y: 48 },
            { x: 68, y: 42 }
          ],
          decoys: [
            { x: 25, y: 48 },
            { x: 82, y: 42 }
          ],
          scene: "prodigal"
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
          scene: "prodigal",
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
          crumbs: [
            { x: 56, y: 55 },
            { x: 62, y: 48 },
            { x: 68, y: 42 },
            { x: 74, y: 36 },
            { x: 79, y: 30 }
          ],
          decoys: [
            { x: 30, y: 38 },
            { x: 85, y: 33 }
          ],
          scene: "prodigal"
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
          scene: "prodigal",
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
    },
    {
      id: "virgins",
      title: "The Ten Virgins",
      blurb: "Ten lamps wait for the bridegroom - only some are ready.",
      card: "assets/ui/lantern-scene.jpg",
      heartLabel: "Watching and Ready",
      verse: "“Watch therefore, for ye know neither the day nor the hour wherein the Son of man cometh.”",
      verseRef: "Matthew 25:13",
      closeTitle: "The heart is full",
      closeBody: "Glow was never about the waiting itself. It was the trail of a ready choice. You kept oil in the lamp. You stayed watching. You were ready when the call came.",
      stages: [
        {
          type: "path",
          title: "Going to meet him",
          subtitle: "Tap the glowing crumb. Follow the road to the wedding.",
          crumbs: [
            { x: 35, y: 70 },
            { x: 44, y: 63 },
            { x: 53, y: 57 },
            { x: 62, y: 52 }
          ],
          decoys: [
            { x: 20, y: 55 },
            { x: 85, y: 45 }
          ],
          scene: "virgins"
        },
        {
          type: "match",
          title: "Filling the lamps",
          subtitle: "Watch the oil marks. Tap them back in order.",
          length: 3
        },
        {
          type: "fork",
          title: "Keeping watch",
          subtitle: "The bridegroom is delayed. The night is getting long.",
          scene: "virgins",
          eyebrow: "The wait grows long",
          heading: "The oil is low",
          body: "It's taking longer than anyone thought. Some lamps nearby are already flickering.",
          choices: [
            { word: "Refill now", flavor: "Top off the lamp before it runs dry. Better ready too early than too late.", glow: "You didn't wait for the warning sign. The lamp glows steady." },
            { word: "Trim the wick", flavor: "Keep it burning clean and bright while there's still time.", glow: "Small, steady care. The lamp glows steady." },
            { word: "It'll probably be fine", flavor: "The oil will probably last. No need to worry yet.", redirect: "Probably isn't the same as ready. The lamp is still low." }
          ]
        },
        {
          type: "path",
          title: "The midnight cry",
          subtitle: "The crumbs glow toward the doors. Stay with the glow.",
          crumbs: [
            { x: 44, y: 63 },
            { x: 53, y: 57 },
            { x: 62, y: 52 },
            { x: 71, y: 47 },
            { x: 80, y: 42 }
          ],
          decoys: [
            { x: 22, y: 60 },
            { x: 88, y: 50 }
          ],
          scene: "virgins"
        },
        {
          type: "match",
          title: "The doorpost mark",
          subtitle: "Match the doorpost's crumb mark before the doors close.",
          length: 4
        },
        {
          type: "fork",
          title: "The door is closing",
          subtitle: "Someone nearby has run out of oil.",
          scene: "virgins",
          eyebrow: "One lamp going dark",
          heading: "Can I have some oil?",
          body: "A voice calls out beside you - their lamp just went dark, and the door is about to shut.",
          choices: [
            { word: "Point them onward", flavor: "Send them to the sellers now. There's still barely time, if they hurry.", glow: "Kind and honest both. Your lamp stays lit, and so can theirs." },
            { word: "Go in when called", flavor: "Keep walking. The door is open now - don't miss your own moment waiting on someone else's lamp.", glow: "You didn't miss the door. It opens for you." },
            { word: "Give them your oil", flavor: "Pour half your oil into their lamp. Surely there's enough for both.", redirect: "Split it and neither lamp makes it to morning. There isn't enough for two - point them onward instead." }
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
  // Each story now has exactly one photographic backdrop, used behind every
  // one of its path/fork stages - a single consistent "place" for the whole
  // story instead of a different flat drawing per stage. .trail-scene
  // img.backdrop (in style.css) positions whichever one of these renders.
  const STORY_SCENES = {
    samaritan: "assets/opening-bg.jpg",
    richfool: "assets/ui/scene-richfool.jpg",
    prodigal: "assets/ui/pigs-scene.jpg",
    virgins: "assets/ui/lantern-scene.jpg"
  };
  function sceneSvg(kind) {
    const src = STORY_SCENES[kind] || STORY_SCENES.samaritan;
    return `<img class="backdrop scene-${kind}" src="${src}" alt="">`;
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
        showToast("That one's gone moldy - not part of the path. Tap the crumb that's glowing.");
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
          showToast("Good crumb, wrong turn - tap the one that's glowing first.");
          return;
        }
        inputLock = true;
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
      btn.innerHTML = '<span class="level-btn-heading"><strong>' + story.title + "</strong><span>" + story.blurb + "</span></span>" +
        (story.card ? '<img class="level-btn-bg level-btn-bg--' + story.id + '" src="' + story.card + '" alt="">' : "");
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
