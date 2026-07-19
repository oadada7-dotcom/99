# Adada & Kabbani — Company Profile Revamp
## Full Project Brief

**Client:** Adada & Kabbani (A&K), a member of the Isam Khairi Kabbani (IKK) Group
**Deliverable:** New company profile — print / PDF brochure, A4 portrait, 24 sheets
**Design system:** A&K Editorial System **v2 — "The Measured Page"**
**Prepared:** 2026-07-19 · Version 1.0
**Source file:** `company-profile/CompanyProfile.html` (self-contained) → live in the *A&K Design System* project as `A&K Company Profile.html`

---

## 1 · Goal

A full A–Z revamp of the A&K company profile, rebuilt from the old profile onto a new
running order and expressed entirely in the v2 "Measured Page" system. The profile must
read as one measured document — senior, precise, restrained — and export cleanly to a
print-ready PDF. Real A&K imagery, real figures, real project record; nothing invented.

---

## 2 · Design system — locked fundamentals (never change)

Driven from the A&K design tokens; no values hardcoded by eye.

- **Typeface — Optima only.** One family, four registers differentiated by size, case,
  weight and tracking:
  - *Display XL* — cover / hero word (~96–120px, light, tracking −0.02em)
  - *Display L* — section / page heading (~44–52px, tracking −0.01em)
  - *Body* — running text (~15.5px, line-height 1.6, measure ≤ 42ch)
  - *Technical label* — the "data voice": uppercase, ~10.5px, tracking 0.20em
  - Italic Optima = pull-quote / tagline voice, oxblood, sparing. Display is set **light**, never bold.
- **Palette — exactly three brand values.** Bone `#F4F1EA` (ground) · Charcoal `#49413E`
  (body text **and all linework**) · Oxblood `#922133` (logo + rare accent). All hairlines
  and the faint grid are charcoal at reduced opacity — no new hue. `--oak` is texture only.
- **Logos — the existing marks, untouched.** The "adada & kabbani" block lockup and the
  "ak" monogram; only placement follows the grid.
- **Sharp corners** everywhere (`border-radius: 0`). Sentence case; never justify; no emoji;
  no icons (typographic labels, hairlines and 1px line-diagrams instead); no shadows on the page.

### The v2 device system (used throughout)
1. **Datum Line** *(signature)* — one charcoal hairline spine per sheet, end ticks + a
   tracked-caps coordinate. The single bold move; everything else stays quiet.
2. **Plate Tag** — `PL. 03 / 24` boxed in a fixed corner.
3. **Registration Marks** — crop marks at all four corners; every page reads as a measured sheet.
4. **Column Reveal** — the 12-col grid as near-subliminal hairlines (used sparingly).
5. **Callout Leader** — oxblood dot → thin leader → tracked-caps label (drawing-set annotation).
6. **Specimen Labels** — material/finish/role tags in bone chips with a hairline.
7. **Grain Line** — a whisper of 3–5 fine veneer hairlines; one per page max; never on the Schedule.

---

## 3 · Deliverable spec

- **Format:** A4 portrait sheets, fixed `794 × 1123px`, `break-after: page`. No `vh`/`vw`,
  no outer scroll containers. 24 sheets (multiple of 4 for imposition).
- **Output path:** authored as one self-contained HTML (embedded CSS, Optima `@font-face`,
  images by project-relative path). Target Chrome **Save as PDF @ 100%**, background graphics
  on, no margins — or "Send to Adobe Express" for an editable doc.
- **Where it lives:** at the root of the *A&K Design System* Claude Design project, so
  `uploads/`, `assets/` and `fonts/` references resolve to the real photos, marks and Optima
  on render. Mirrored in git at `company-profile/CompanyProfile.html`.

---

## 4 · Running order (24 sheets)

| # | Sheet | Type / device | Content |
|---|---|---|---|
| 01 | Front cover | PLATE (full-bleed) | Signature-interior hero; white lockup; "Enabling luxury since 1959"; IKK endorsement; datum + plate tag |
| 02 | Foreword — Chairman's message | MANIFESTO / pull-quote | Hassan I. Alkabbani portrait; italic statement. **Flagged: pending Chairman's office approval** |
| 03 | Heritage — 1959 | Editorial | Founder story (Mahmoud Youssef Adada, Makkah); era photo; grain line |
| 04 | Timeline I | Datum spread | 1959 · 1970s · 1990s (IKK JV) |
| 05 | Timeline II | Datum spread | 2010s · 2020 · 2026 |
| 06 | By the numbers | Stat cells + bar charts | 60+ yrs · 200+ projects · 9 sectors · 12,000 m² · 9,216 m² · 33.74% + footprint & workforce charts |
| 07 | IKK Group | Section opener | JV narrative + group affiliation lockup |
| 08 | Leadership | Editorial (3 portraits) | Hassan I. Alkabbani (Chairman · IKK) · Amr M. Alkabbani (CEO · IKK) · Tarek M. Adada (GM · A&K) |
| 09 | Our people / workforce | Stat cells | 400+ employees · 148+ skilled · 100+ engineers |
| 10 | Manufacturing / factory | Full-bleed + schedule | Makkah factory; facility breakdown; machinery brands; production capacity |
| 11 | Quality management (QMS) | Editorial + schedule | ISO 9001/14001/45001; Bureau Veritas recert; certified scope |
| 12 | Sustainability & safety | Editorial + list | LEED/FSC suppliers; HSE approach; certified-timber detail |
| 13 | Certifications & registrations | SCHEDULE (clinical) | Full cert schedule with real numbers/dates; on-file scans; FSC = supplier |
| 14 | Capabilities | GALLERY divider (full-bleed) | "What we make" |
| 15 | Capabilities I | 2×2 gallery | Timber facades · Signature interiors · Interior joinery · Bespoke woodwork |
| 16 | Capabilities II | gallery | Bespoke kitchens · Stainless (Metal & Inox) · Complete fit-out · Dressing rooms · Clinical casework |
| 17 | Selected works | PLATE opener | "A selection from more than two hundred delivered projects…" |
| 18 | Selected works I | Editorial / gallery | Al Salama Hospital (healthcare) · Umm Al-Qura (public sector) |
| 19 | Selected works II | Gallery | Hospitality · Private residence (bar + kitchen) |
| 20 | Project record I | LEDGER | Palaces · Governmental · Hospitals · Hotels |
| 21 | Project record II | LEDGER | Schools · Compounds · Resorts · Offices · Private residences |
| 22 | Partners & affiliations | Logo wall | Group companies, material/finish partners, selected clients |
| 23 | Showroom & branches | Editorial / locations | Makkah HQ+factory · Jeddah showroom · Riyadh sales |
| 24 | Contact / back cover | PLATE | Logo, tagline, contact details, plate tag |

---

## 5 · Content sources & verified facts

Copy drawn from the client profile (`AK_Company_Profile.md`) and the structure brief.
Facts used, all client-supplied:

- Founded **1959**, Makkah, by **Mahmoud Youssef Adada** (metal cabinets, office furniture, fitted kitchens).
- Joint venture with the **Isam Khairi Kabbani Group** in the 1990s → the name "Adada & Kabbani".
- **Leadership:** Hassan I. Alkabbani (Chairman, IKK Group) · Amr M. Alkabbani (CEO, IKK Group)
  · Tarek M. Adada (General Manager, A&K). *(The prior Hassan/Amr title swap is corrected.)*
- **Facility:** total workspace **12,000 m²**; factory **9,216 m²** (raw materials 1,960 m²,
  finished goods 1,516 m²). These two area figures are kept distinct throughout.
- **Workforce:** 400+ total · 100+ engineers & key personnel · 148+ skilled labour.
- **Annual production capacity:** decorative woodwork & cladding 50,000 m²; cabinetry
  35,000 LM; steel casework 400 t; other joinery 250 t. **57-machine** floor (Holzher, Biesse,
  Weinig, SCM, Emmegi, Orma/Ital presses, Giardina, etc.).
- **Certifications:** ISO 9001/14001/45001 (ARS certs; Bureau Veritas recert recommended, Jun 2026);
  Local Content **33.74%** (FY2024, expires 31 Jul 2026); Saudization Nitaqat **High Green (34%)**;
  AWI manufacturer member since 2010; Industrial License (Min. of Industry, since 1970, to 2029);
  Commercial Registration (Unified No. 7000913058, since 1994); Chamber of Commerce Makkah;
  VAT · Zakat · GOSI · Monsha'at SME; Environmental permit to 2028.
  **FSC Chain-of-Custody is held by the supply partner Custom Timber Industries (SCS-COC-009275) — not by A&K.**
- **Project record:** 200+ named projects, 1988–2020, across nine sectors (Palaces,
  Governmental, Hospitals, Hotels, Schools, Compounds, Resorts, Offices, Private Residences).
  The ledger shows a marquee selection; the full list is available.
- **Contacts:** Makkah — head office & factory (Oumra St., Industrial Area; factory@adada-kabbani.com);
  Jeddah — showroom (Rawdah St.; jeddah@adada-kabbani.com); Riyadh — sales
  (Al Takhassousi St.; info@adada-kabbani.com; +966 50 219 8196). Tagline: **"Enabling luxury since 1959."**

---

## 6 · Imagery

Real A&K assets, referenced by project path and resolved on in-project render:
- Heroes per section from the six asset kits (signature interiors, timber facade, joinery,
  kitchens, stainless, fit-out, dressing rooms, clinical casework, factory machine hall, QA).
- Sector cases: Al Salama Hospital (healthcare), Umm Al-Qura (public), hospitality, private
  residence (bar + kitchen).
- Leadership portraits: Mr Hassan / Mr Amr / Mr Tarek.
- Partner-logo wall (30 marks available); IKK Group lockup; certificate scans.
- **Excluded per instruction:** Design Studio/Rendering and Production Workshop Wide slots (removed, no empty frames).
- **Al Jokhadar House:** low-res — small-format placement only, never hero/full-bleed.
- **Clinical casework / Al Salama** share source frames — different frames selected in each to avoid repetition.

Where a real image is absent locally it shows the system's labelled placeholder frame; the
real photograph fills the same frame in the Design project.

---

## 7 · Key decisions & rationale

- **Timeline as a two-page datum spread** (not an accordion) — the centrepiece; sparse,
  precise, milestones above a bleeding spine.
- **Graphs as A&K line-diagrams** (hairline axis, charcoal bars, oxblood accent, tracked
  labels) — the brand has no icon system.
- **Production capacity as a schedule, not a chart** — mixed units (m² / LM / t) read
  honestly as a table.
- **Certifications page stays clinical** (no grain line), per the system.
- **Partners placed after Selected Works** as a credibility close (can move to the front,
  after IKK Group, if preferred). Adds a page — page count kept at 24 (multiple of 4).
- **Only verifiable facts typeset.** No invented figures; the one earlier sample tolerance
  ("±0.3 mm") was removed as unverified.

---

## 8 · Open items / pending

- [ ] **Chairman's foreword** — currently a holding draft, flagged *pending Chairman's office
      approval*. Supply the Chairman's words to finalise.
- [ ] **Image crops** — confirm focal points on the hero frames (cover, factory hall,
      portraits) once viewed with real photography in the project.
- [ ] **Partner-wall captions** — optional; add brand/client names under the logos if wanted.
- [ ] **Ledger depth** — currently a curated marquee selection; expand to more entries per
      sector if a fuller record is preferred (would add pages — re-check ×4 imposition).
- [ ] **Website domain** shown as `adada-kabbani.com` (from the profile emails) — confirm.

---

## 9 · Production & export notes

- Open `A&K Company Profile.html` in the *A&K Design System* project for the real-image render.
- Export PDF via Chrome **Save as PDF**, A4, 100%, no margins, background graphics on
  (fixed `.page` blocks paginate 1:1 → 24 pages). Or "Send to Adobe Express" for an editable doc.
- Fonts (Optima) are embedded/linked; sharp corners preserved; screen-only preview shadow does not print.

---

## 10 · Files

- `company-profile/CompanyProfile.html` — the profile (source of truth).
- `company-profile/tokens/`, `styles.css`, `fonts/` — A&K design tokens + Optima.
- `company-profile/assets/` — logo lockups, monograms, grain motifs.
- `company-profile/PLAN.md` — working build plan.
- `company-profile/BRIEF.md` — this brief.
- Live: `A&K Company Profile.html` at the root of the A&K Design System project.

*Governing concept: the measured page — same house, same materials, drawn with the lines showing.*
