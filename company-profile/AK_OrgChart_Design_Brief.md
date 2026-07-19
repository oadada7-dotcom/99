# Adada & Kabbani — Organization Chart
## Design Brief for Claude Design (definitive)

**Goal:** Recreate the A&K organization chart **in full** inside the company profile — every
element (person/role) present, and every **reports-to** relationship drawn as a connected
hierarchy. Author it in the v2 "Measured Page" system, matching the existing profile sheets.

*This is the definitive org-chart brief; it consolidates and replaces `AK_OrgChart_Brief.md`.*
**Content source of truth:** `uploads/AK_Company_Profile.md` §03. Reproduce names/titles exactly.
**Placement:** immediately after the Leadership sheet; renumber all plate tags/footers; keep the
profile's total page count a multiple of 4.

---

## 1 · Element inventory (all elements — nothing omitted)

Names in _(italics)_ are unnamed in the source → show the role, leave the name blank, flag to confirm.

**Governance — IKK Group (top tier)**
- Hassan I. Alkabbani — Chairman
- Amr M. Alkabbani — CEO

**Company lead**
- Tarek M. Adada — General Manager, A&K

**Function heads (14)**
- Faysal Alkabbani — Head of Operations
- Ismat Abukarroun — Head of Finance
- Georges Michael — Projects Director
- _(unnamed)_ — Head of Procurement
- Ahmad Muhankar — Factory Manager
- Ziyad Adada — IT Manager
- Issam AlSayed — Commercial Manager
- _(unnamed)_ — Marketing Manager
- Waseem Solmon — Strategic Planning & Development Manager
- Suhaib Nassar — Head of Sales
- _(unnamed)_ — Head of Design & Engineering
- Motasem Alherani — Head of QHSE
- Hasan Al Bisisi — Head of HR _(Senior HR Supervisor)_
- John Gabato — Executive Secretary

**Department members**
- Finance: Muhammad Othman (Accounts Manager) · Sayed Qasem (Cost Controller)
- Projects: Ahmad Solaiman (Site Architect Manager) · Project Managers · Site Engineers · Site Supervisors
- Procurement: Raja Khayaat (Purchasing & Buying) · Neena Sathish (Material Planning & Control Engineer) · Sourcing & Vendor Specialist · Compliance & Documentation Officer
- Factory: Sayed Khadir (Production Manager) · Yosef Ouf (Warehouse Manager) · Manik Mia (Maintenance Manager) · Rajeev Nair (Production & Capacity Planning Engineer) · Line Supervisors — Panel Processing, Packing & Delivery, Assembly & Finishing, Carpentry, Metal Sheets & Wrought Irons
- IT: Abdulwasie Mushtaq (System Analyst & ERP Developer) · Jawad Abdulwahid (IT Officer) · Salman AlQandeel (IT Officer)
- Commercial: Thomas George (Assistant Commercial Manager) · Talha Taj (Quantity Surveyor)
- Marketing: Ola AlMojadidi (Graphic Designer) · Amro Qari (Photographer) · Omar Adada (AI Marketing Specialist)
- Sales: Abdo Feghali (Joinery & Cabinetry Estimator) · Sales Engineers
- Design & Engineering: Albert Rausa (Design Manager) · Mohammad Suroor (Technical Manager)
  - Under Design Manager: Rahaf Bokhari (Senior Interior Designer) · Junior Interior Designers · Adonis Perez (Architect) · Stanly Daniel (Draftsman) · 3D Visualizer · Digital Construction Manager · BIM Team
  - Under Technical Manager: Senior / Technical Engineers
- QHSE: Mohammad Othman (QMS Manager) · Ryan Magallanes (QA/QC Manager) · Mamoun (HSE Manager) · QC Engineers · Safety Officers · Environmental & HSE Engineers
- HR: HR Officers · Mansour AlSulami (Legal)

> **Flag:** "Muhammad Othman" appears twice in the source — Accounts Manager (Finance) **and**
> QMS Manager (QHSE). Treat as two roles/people unless the client confirms otherwise.

---

## 2 · Reports-to map (draw exactly these connections)

Each element connects to its manager by a drawn connector. This is the complete edge set.

| Element | Reports to |
|---|---|
| Chairman — Hassan I. Alkabbani | Board / IKK Group (top) |
| CEO — Amr M. Alkabbani | Board / IKK Group (top) |
| **General Manager — Tarek M. Adada** | Board (IKK Group) |
| Head of Operations — Faysal Alkabbani | General Manager |
| Head of Finance — Ismat Abukarroun | General Manager |
| Projects Director — Georges Michael | General Manager |
| Head of Procurement | General Manager |
| Factory Manager — Ahmad Muhankar | General Manager |
| IT Manager — Ziyad Adada | General Manager |
| Commercial Manager — Issam AlSayed | General Manager |
| Marketing Manager | General Manager |
| Strategic Planning & Development Manager — Waseem Solmon | General Manager |
| Head of Sales — Suhaib Nassar | General Manager |
| Head of Design & Engineering | General Manager |
| Head of QHSE — Motasem Alherani | General Manager |
| Head of HR — Hasan Al Bisisi | General Manager |
| Executive Secretary — John Gabato | General Manager |
| Accounts Manager — Muhammad Othman | Head of Finance |
| Cost Controller — Sayed Qasem | Head of Finance |
| Site Architect Manager — Ahmad Solaiman | Projects Director |
| Project Managers · Site Engineers · Site Supervisors | Projects Director |
| Purchasing — Raja Khayaat | Head of Procurement |
| Material Planning Engineer — Neena Sathish | Head of Procurement |
| Sourcing & Vendor Specialist · Compliance & Documentation Officer | Head of Procurement |
| Production Manager — Sayed Khadir | Factory Manager |
| Warehouse Manager — Yosef Ouf | Factory Manager |
| Maintenance Manager — Manik Mia | Factory Manager |
| Production & Capacity Planning Engineer — Rajeev Nair | Factory Manager |
| Line Supervisors (Panel / Packing / Assembly / Carpentry / Metal) | Factory Manager |
| ERP Developer — Abdulwasie Mushtaq | IT Manager |
| IT Officers — Jawad Abdulwahid · Salman AlQandeel | IT Manager |
| Assistant Commercial Manager — Thomas George | Commercial Manager |
| Quantity Surveyor — Talha Taj | Commercial Manager |
| Graphic Designer — Ola AlMojadidi | Marketing Manager |
| Photographer — Amro Qari | Marketing Manager |
| AI Marketing Specialist — Omar Adada | Marketing Manager |
| Estimator — Abdo Feghali · Sales Engineers | Head of Sales |
| Design Manager — Albert Rausa | Head of Design & Engineering |
| Technical Manager — Mohammad Suroor | Head of Design & Engineering |
| Sr Interior Designer — Rahaf Bokhari · Jr Interior Designers · Architect Adonis Perez · Draftsman Stanly Daniel · 3D Visualizer · Digital Construction Manager · BIM Team | Design Manager |
| Senior / Technical Engineers | Technical Manager |
| QMS Manager — Mohammad Othman | Head of QHSE |
| QA/QC Manager — Ryan Magallanes | Head of QHSE |
| HSE Manager — Mamoun | Head of QHSE |
| QC Engineers · Safety Officers · Environmental & HSE Engineers | Head of QHSE |
| HR Officers | Head of HR |
| Legal — Mansour AlSulami | Head of HR |

---

## 3 · Visual language (v2 — match the profile)

- **Optima only.** Node name ~13.5px charcoal; title in tracked-caps ~9px `--label-quiet`
  (AA-safe, never a lighter grey).
- **Three colours.** Bone ground; **charcoal** for all node rules and connectors; **oxblood**
  once only — the GM node keyline (or the single board→GM drop).
- **Nodes.** Bone fill, **1px charcoal hairline**, **sharp corners**, equal widths per tier,
  name over title. No icons, photos, shadows, tints, or rounded corners.
- **Connectors.** 1px, **orthogonal only** (vertical drop → horizontal bus → vertical drops to
  children); never diagonal; no crossing lines (reorder siblings to avoid). One weight throughout.
- **Sheet furniture.** Registration marks (4 corners), one datum line + coordinate
  (`Organization`), persistent footer, plate tag. **No grain line** (structural sheet).

---

## 4 · Layout (two sheets)

Fourteen heads cannot sit legibly in one row on A4 portrait — split the chart:

- **Sheet 1 — Executive structure:** paired Governance node (Chairman + CEO, "IKK Group")
  → single emphasised drop → **GM** (centred) → one horizontal bus → the 14 heads, arranged in
  four grid-aligned **visual zones** (grouping for legibility only; all still report to the GM):
  Delivery (Projects · Factory · Operations · Procurement) · Design & Quality (Design & Eng · QHSE)
  · Commercial (Sales · Commercial · Marketing) · Corporate & Support (Finance · IT · HR ·
  Strategic Planning · Executive Secretary).
- **Sheet 2 — Departmental detail:** each head repeated small at the top of its column, with an
  indented sub-tree of its reports beneath (short vertical spine + connector per report). Align
  columns to the 12-col grid and align report baselines across columns. Show the Design &
  Engineering **two-manager branch** (Design Manager / Technical Manager) before their reports.

**Aesthetic rules:** equal gutters on the 8px scale, symmetry where possible, generous
whitespace, top-anchored below the header, nodes never touching a rule or the margin.

---

## 5 · Accuracy & handoff

- Reproduce every element and every reports-to edge exactly as above; reorder siblings only for
  visual clarity, never change a reporting relationship.
- GM title = **General Manager** (source §03 says "CEO" — reconcile and flag).
- Unnamed heads (Procurement, Marketing, Design & Engineering) → role shown, name blank, flag.
- Proof both sheets at full `794 × 1123px`: every line traces cleanly to its manager, no
  crossings, no clipped labels, AA contrast on all labels. Re-push `A&K Company Profile.html`
  to the A&K Design System project root and update the running-order table in `BRIEF.md`.

*Governing concept: the measured page — the structure is drawn, connected, and measured, in A&K's own hand.*
