# Adada & Kabbani — Company Profile · Expansion Brief
## For Claude Design · v2 "The Measured Page"

**Task:** Extend the existing 24-sheet A&K company profile with six additions, all authored
in the v2 "Measured Page" system. This is an **extension, not a redesign** — match the
existing sheets exactly (grid, devices, type, restraint) and drive colour/type/spacing from
the design tokens, never hardcoded values.

**Base document:** `A&K Company Profile.html` (root of the A&K Design System project) /
`company-profile/CompanyProfile.html` in git.
**Content source of truth:** `uploads/AK_Company_Profile.md` (the client profile). Where this
brief says "reproduce in full," pull the content **verbatim** from that file — do not
paraphrase, drop, or reorder rows.
**System reference:** `readme.md`, `SKILL.md`, `templates/measured-page/`, and the project
brief `company-profile/BRIEF.md`.

---

## 0 · LOCKED — do not change (applies to every new sheet)

- **Optima only**, four registers (Display XL / Display L / Body ≤42ch / tracked-caps "data voice"). Display is **light**, never bold.
- **Three brand colours:** bone `#F4F1EA` · charcoal `#49413E` (text + all linework) · oxblood `#922133` (rare accent). Linework = charcoal tints only.
- **Logos untouched**; sharp corners (`radius:0`); sentence case; never justify; **no icons** (use tracked-caps labels, hairlines, and 1px line-diagrams); no shadow on the `.page`.
- **Devices per sheet:** registration marks (4 corners), one datum line + coordinate, persistent footer (running title left · monogram + plate tag right), plate tag `PL. n / N`. Grain line optional, one per page max, **never** on any schedule/ledger page.
- **Cedilla caution:** Optima mis-renders "ç" under `text-transform:uppercase` (façade → "FA3ADES"). Spell tracked-caps labels **without** the cedilla ("FACADES").
- **Sheet spec:** fixed `794 × 1123px`, `break-after:page`, no `vh`/`vw`, no outer scroll.

---

## 1 · Scope & running-order placement

| Item | New sheets (est.) | Insert after | Page type / device |
|---|---|---|---|
| A · Mission & Vision (revamped) | 1 | Foreword (02) | Statement / pull-quote pair |
| B · Full org chart | 2 | Leadership (08) | Line-diagram org tree (LEDGER-adjacent) |
| C · Design & Engineering | 1 | Quality/QMS cluster | Editorial (distilled) |
| D · Honor List — full | ~6 (expand from 2) | current Project Record (20–21) | LEDGER, multi-page |
| E · Client Letters of Appreciation | 2 | after Honor List | Editorial / quote cards |
| F · Full machinery register (57) | 3 | Manufacturing (10) or as appendix | Technical SCHEDULE |

**Net effect:** ~+15 sheets → target a final count that is a **multiple of 4** for print
imposition (e.g., 40). Renumber every plate tag `PL. n / N` and every footer to the new total.
If the count lands off a multiple of 4, absorb or add one divider/section sheet — do not ship
a broken imposition.

---

## A · Mission & Vision — revamped

Give this its own sheet, front-half, after the Foreword. One statement per idea; italic Optima
oxblood for the lead lines, body beneath, on a faint 12-col reveal. Datum coordinate: `Purpose`.

**Use this revamped copy (for client approval):**

> **Vision**
> *To be the standard by which luxury woodwork is measured in the Kingdom — the house
> specified when an interior must be exact.*
> Bespoke kitchens, closets and architectural woodwork for the projects that define a place.

> **Mission**
> *To deliver custom woodwork and fit-out to a single measure of precision — resolved on
> the bench, not corrected on site.*
> We pair six decades of craft with the engineering modern architecture demands, and manage
> every stage from concept to installation.

Keep both to the ≤42ch measure. Do not restore the old long-form wording; these replace it.
Flag as "for approval" only if the client has not signed off.

---

## B · Full org chart — new version

A drawn org **tree**, not a table and not boxes-with-shadows. Build it as a 1px charcoal
line-diagram: thin connector rules, roles/names in Optima, functions as tracked-caps labels,
oxblood used only for the single top node or the spine. Two sheets: **B1** the executive +
function heads (the shape), **B2** the departmental detail (reports under each head). No icons.

**Hierarchy — reproduce in full from `AK_Company_Profile.md` §03 "Organizational Structure".**
Top of chart:

- **Board (IKK Group):** Hassan I. Alkabbani — Chairman · Amr M. Alkabbani — CEO
- **General Manager, A&K — Tarek M. Adada** *(the profile's org section labels him "CEO";
  use **General Manager** to match the corrected leadership page, and flag the discrepancy
  to the client).*

Function heads reporting to the GM (with their reports per §03):
- Head of Operations — Faysal Alkabbani
- Head of Finance — Ismat Abukarroun *(Accounts Mgr Muhammad Othman; Cost Controller Sayed Qasem)*
- Projects Director — Georges Michael *(Project Managers; Site Architect Mgr Ahmad Solaiman; Site Engineers; Site Supervisors)*
- Head of Procurement *(Sourcing & Vendor Specialist; Purchasing Raja Khayaat; Material Planning Neena Sathish; Compliance & Documentation Officer)*
- Factory Manager — Ahmad Muhankar *(Production Mgr Sayed Khadir; Warehouse Mgr Yosef Ouf; Maintenance Mgr Manik Mia; Panel Processing / Packing & Delivery / Assembly & Finishing / Carpentry / Metal & Wrought Iron supervisors; Production & Capacity Planning Eng Rajeev Nair)*
- IT Manager — Ziyad Adada *(System Analyst & ERP Developer Abdulwasie Mushtaq; IT Officers Jawad Abdulwahid, Salman AlQandeel)*
- Commercial Manager — Issam AlSayed *(Asst Commercial Mgr Thomas George; Quantity Surveyor Talha Taj)*
- Marketing Manager *(Graphic Designer Ola AlMojadidi; Photographer Amro Qari; AI Marketing Specialist Omar Adada)*
- Strategic Planning & Development Manager — Waseem Solmon
- Head of Sales — Suhaib Nassar *(Joinery & Cabinetry Estimator Abdo Feghali; Sales Engineers)*
- Head of Design & Engineering *(Design Mgr Albert Rausa — Sr Interior Designer Rahaf Bokhari, Junior Interior Designers, Architect Adonis Perez, Draftsman Stanly Daniel, 3D Visualizer, Digital Construction Mgr, BIM team; Technical Mgr Mohammad Suroor — Sr/Technical Engineers)*
- Head of QHSE — Motasem Alherani *(QMS Mgr Mohammad Othman; QA/QC Mgr Ryan Magallanes; HSE Mgr Mamoun; QC Engineers; Safety Officers; Environmental & HSE Engineers)*
- HR — Sr HR Supervisor Hasan Al Bisisi *(HR Officers; Legal — Mansour AlSulami)*
- Executive Secretary — John Gabato

Design notes: hold names to one weight; use tracked-caps for titles; let the connectors do the
work; keep generous whitespace; if the full tree is dense, split executive layer (B1) from the
departmental fan-out (B2). Spans the Makkah factory, projects, and the Riyadh office.

---

## C · Design & Engineering — judgement call

**My call: consolidate, don't reproduce.** The old profile carries three long paragraphs
(Technical R&D, Technical Engineering, Design & Customization). Verbatim they are too dense
for v2 (one statement per sheet, ≤42ch). **Build one editorial sheet, "Design & engineering,"**
with three tight stacked statements — R&D, technical engineering, in-house design — one short
sentence each, plus one mounted image or a 1px line-diagram of the concept→production flow.
Datum coordinate: `Design & engineering`.

**Use this distilled copy:**
- **Research & development** — *We test materials and methods ahead of the brief, so a new idea arrives already resolved.*
- **Technical engineering** — *Our engineers turn a concept into a buildable set — structure, tolerance and detail settled before the floor.*
- **In-house design** — *From interior fit-out to exterior joinery, the design is drawn, adapted and owned under one roof.*

(If the client insists on the full paragraphs, keep this sheet and add the long-form text as a
second "Design & engineering — detail" sheet; otherwise this single sheet stands.)

---

## D · Honor List — full, multi-page ledger

Replace the current 2-sheet curated ledger (plates 20–21) with the **complete** Honor List.
**Reproduce every row in full from `AK_Company_Profile.md` §05 "Honor List"** — all nine
sector tables, every project, client, nature and year, nothing dropped.

Sectors, in this order (as in the source): Hospitals & Medical Centers · Resorts & Beach Houses ·
Compounds & Complexes · Hotels & Restaurants · Governmental & Special Projects · Schools &
Universities · Private Residences & Villas · Palaces · Offices & Commercial Towers.

Layout: keep the existing ledger grammar — charcoal top rule, `#` / Project / Client / Nature /
Year columns, hairline rows, tracked-caps sector headers with oxblood numerals. To fit ~150
rows, use a **denser row rhythm** (≈9–10px padding) and, where a page would otherwise break a
sector awkwardly, a **two-column** ledger per sheet. Estimate **~6 sheets**. Header each
continued sheet "Project record — continued." Keep a running "Ledger · n of N" datum coordinate.
Do not truncate; if a "Nature" cell is long, allow it to wrap rather than clip.

---

## E · Client Letters of Appreciation

New editorial spread(s) after the Honor List. **Reproduce the letters listed in
`AK_Company_Profile.md` §06 "Client Letters of Appreciation" in full** (7 entries). Treat each
as a drawing-set annotation, not a scan wall:

- A short oxblood italic pull-line or the appreciation summary, with a tracked-caps
  attribution beneath (client · date · project/ref). Group by client where one client sent
  several (e.g. Saudi Binladin Group – ABCD; Saudi Oger).
- Two sheets: **E1** the marquee letters (Saudi Oger multi-project; Saudi Binladin – ABCD;
  Al-Hashemiah / ANB Tower; Saudi ABV / Al Salama SAR 4.5M); **E2** the remainder (Emaar /
  KAEC; Freyssinet / IMC). Datum coordinate: `Client letters`.
- If actual letter scans are provided later, they drop into bone-chip frames with a hairline;
  until then, set the text treatment above (no empty frames).

---

## F · Full machinery register (57)

New technical **schedule**, appendix-style, after Manufacturing (or grouped with it). Purely
clinical: **no grain line.** **Reproduce all rows from `AK_Company_Profile.md` §04
"Machinery Register" in full** — No. / Machine Name / Main Function / Key Technical Data.

- Preserve the source numbering exactly, including its quirks (there is **no #19**; entries run
  to **57**; some machines legitimately repeat, e.g. multiple Biesse Selco / Akron units). Do
  not renumber or de-duplicate.
- Columns: `No.` (oxblood, narrow) · `Machine` (Optima) · `Function` (tracked-caps label) ·
  `Key technical data` (body, small; allow wrap). Charcoal top rule; hairline rows.
- Rows with "—" for key data (source has several) render as a clean em-dash, not a placeholder.
- ~19 rows/sheet → **3 sheets**. Header continued sheets "Machinery register — continued";
  datum coordinate `Register · n of 3`. Close with the source's note: *"A&K also maintains
  global brand partnerships across its machinery and materials supply chain."*

---

## 2 · Content locks & judgement summary

- **Only client-supplied facts.** Everything above is sourced from `AK_Company_Profile.md`.
  Do not invent figures, names, dates, or tolerances.
- **FSC** remains attributed to the supply partner **Custom Timber Industries** (SCS-COC-009275),
  never to A&K.
- **Titles:** Chairman = Hassan I. Alkabbani (IKK Group); CEO = Amr M. Alkabbani (IKK Group);
  General Manager = Tarek M. Adada (A&K). Reconcile the org section's "CEO — Tareq Adada" to
  **General Manager** and flag.
- **Two area figures** stay distinct: 12,000 m² total workspace vs 9,216 m² factory.

## 3 · Handoff / deliverable

1. Extend the existing HTML with the new sheets in the placements above; renumber all plate
   tags and footers to the new total; confirm a multiple-of-4 page count.
2. Keep every sheet export-ready (Chrome Save as PDF @ 100%, A4, background graphics on).
3. Re-push `A&K Company Profile.html` to the A&K Design System project root and update
   `company-profile/BRIEF.md`'s running-order table.
4. Proof each new sheet at full size before finalising; verify contrast on tracked-caps labels
   (use `--label-quiet`, never a lighter grey), and that no ledger row clips.

*Governing concept: the measured page — same house, same materials, drawn with the lines showing.*
