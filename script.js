// Mobile navigation toggle (site preview)
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

/* ------------------------------------------------------------------
   Instant Ballpark Estimator
   FINAL RANGES (blessed by Matthew Oct 30, 2026) — built LABOUR-FIRST from VERIFIED Carpenters' Union
   Local 27 collective agreement rates (Provincial Collective Agreement
   2025-2028, Schedule D, May 3, 2026 step: journeyperson package
   $74.13 / $74.38 all-in). Residential crew: 1 journeyperson + 1 senior
   apprentice at $1,100/crew-day itemized cost — packages plus WSIB at
   the firm's actual rate (10% of insurable earnings, stated by Matthew
   2026-10-30), capped CPP/EI per seat and a CGL allocation — charged
   out at $1,320/crew-day with Matthew's 20% profit on labour (decided
   2026-10-30; the 20% applies to the labour component only, each
   service's non-labour remainder unchanged), then grossed up by each
   service's labour share. Full builds, assumptions and published-guide
   cross-checks in Estimator-Ranges-DRAFT.md (goal files); rates and
   their verification in Local27-Rates-Reference.md. Bands blessed
   FINAL by Matthew Oct 30, 2026. Note: agreement steps up May 2, 2027 (JP package
   $76.00) — re-derive bands before quoting work past that date.
   Math: base band (mid-range finish) x size factor x finish multiplier.
   For per-sq-ft services the "size factor" is the band's midpoint sq ft.
------------------------------------------------------------------- */
(function () {
  var EST = {
    kitchen: {
      label: "Kitchen renovation", form: "Kitchen Renovations",
      base: [53500, 85500], perSqft: false,
      sizes: [
        ["Small — under 100 sq ft", 0.7],
        ["Medium — 100–150 sq ft", 1.0],
        ["Large — 150–200 sq ft", 1.25],
        ["Extra large — 200+ sq ft", 1.55]
      ],
      finishes: [
        ["Essential — refresh, layout kept", 0.55],
        ["Mid-range — new cabinets, counters & finishes", 1.0],
        ["Premium — layout changes, custom & high-end", 1.6]
      ]
    },
    bathroom: {
      label: "Bathroom renovation", form: "Bathroom Renovations",
      base: [22000, 36500], perSqft: false,
      sizes: [
        ["Powder room — under 30 sq ft", 0.55],
        ["Standard — 30–60 sq ft", 1.0],
        ["Large / ensuite — 60–100 sq ft", 1.35],
        ["Extra large — 100+ sq ft", 1.7]
      ],
      finishes: [
        ["Essential — fixtures & finishes refresh", 0.6],
        ["Mid-range — full renovation, quality tile & fixtures", 1.0],
        ["Premium — custom shower, heated floors, high-end", 1.9]
      ]
    },
    basement: {
      label: "Basement finishing", form: "Basement Finishing",
      base: [74, 105], perSqft: true,
      sizes: [
        ["Under 500 sq ft", 400],
        ["500–750 sq ft", 625],
        ["750–1,000 sq ft", 875],
        ["1,000–1,250 sq ft", 1125],
        ["Over 1,250 sq ft", 1400]
      ],
      finishes: [
        ["Essential — basic finish", 0.65],
        ["Mid-range — rec room plus bedroom/bath rough-ins", 1.0],
        ["Premium — kitchen or wet bar, premium finishes", 1.6]
      ]
    },
    fullhome: {
      label: "Full home renovation", form: "Full Home Renovations",
      base: [134, 186], perSqft: true,
      sizes: [
        ["Under 1,000 sq ft", 800],
        ["1,000–1,500 sq ft", 1200],
        ["1,500–2,000 sq ft", 1800],
        ["2,000–3,000 sq ft", 2400],
        ["Over 3,000 sq ft", 3200]
      ],
      finishes: [
        ["Essential — cosmetic throughout", 0.7],
        ["Mid-range — full renovation, quality finishes", 1.0],
        ["Premium — custom, high-end throughout", 2.0]
      ]
    },
    deck: {
      label: "Deck build", form: "Decks",
      base: [59, 93], perSqft: true,
      sizes: [
        ["Under 150 sq ft", 120],
        ["150–250 sq ft", 200],
        ["250–400 sq ft", 300],
        ["Over 400 sq ft", 450]
      ],
      finishes: [
        ["Essential — pressure-treated wood", 0.6],
        ["Mid-range — cedar or entry-level composite", 1.0],
        ["Premium — composite / PVC, custom features", 1.5]
      ]
    }
  };

  function round500(n) { return Math.round(n / 500) * 500; }
  function money(n) { return "$" + n.toLocaleString("en-CA"); }

  function fillOptions(sel, pairs) {
    sel.innerHTML = "";
    pairs.forEach(function (p, i) {
      var o = document.createElement("option");
      o.textContent = p[0];
      o.value = i;
      sel.appendChild(o);
    });
  }

  document.querySelectorAll("[data-estimator]").forEach(function (box) {
    var svc = box.querySelector(".est-service");
    var size = box.querySelector(".est-size");
    var fin = box.querySelector(".est-finish");
    var btn = box.querySelector(".est-calc");
    var result = box.querySelector(".est-result");
    var range = box.querySelector(".est-range");
    var forLine = box.querySelector(".est-for");
    var cta = box.querySelector(".est-cta");
    if (!svc || !size || !fin || !btn || !result) return;

    function refresh() {
      var cfg = EST[svc.value];
      fillOptions(size, cfg.sizes);
      fillOptions(fin, cfg.finishes);
      size.selectedIndex = cfg.perSqft ? 2 : 1; // sensible default band
      fin.selectedIndex = 1; // Mid-range
      result.hidden = true;
    }
    svc.addEventListener("change", refresh);
    refresh();

    btn.addEventListener("click", function () {
      var cfg = EST[svc.value];
      var sf = parseFloat(cfg.sizes[size.selectedIndex][1]);
      var fm = parseFloat(cfg.finishes[fin.selectedIndex][1]);
      var low = round500(cfg.base[0] * sf * fm);
      var high = round500(cfg.base[1] * sf * fm);
      range.textContent = money(low) + " – " + money(high);
      forLine.textContent = "Ballpark for: " + cfg.label + " · " +
        cfg.sizes[size.selectedIndex][0] + " · " + cfg.finishes[fin.selectedIndex][0].split(" — ")[0];
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    if (cta) {
      cta.addEventListener("click", function (e) {
        var formSel = document.querySelector('form.consultation select[name="service"]');
        if (!formSel) return; // no form on this page — follow the link to Contact
        e.preventDefault();
        var want = EST[svc.value].form;
        for (var i = 0; i < formSel.options.length; i++) {
          if (formSel.options[i].text === want) { formSel.selectedIndex = i; break; }
        }
        var form = formSel.closest("form");
        (form || formSel).scrollIntoView({ behavior: "smooth", block: "start" });
        var nameInput = document.querySelector('form.consultation input[name="name"]');
        if (nameInput) setTimeout(function () { nameInput.focus({ preventScroll: true }); }, 600);
      });
    }
  });
})();
