(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const systems = {
    "a5-6r": ["A5", 148, 210, "6 rings · 3 + 3", 6], "personal-6r": ["Personal", 95, 171, "6 rings · 3 + 3", 6, true],
    "pocket-6r": ["Pocket", 81, 120, "6 rings · 3 + 3", 6, true], "mini-5r": ["Mini", 67, 105, "5 rings", 5, true],
    "a5-20h": ["A5", 148, 210, "20 holes", 20, true], "b5-26h": ["JIS B5", 182, 257, "26 holes", 26, true],
    "a4-30h": ["A4", 210, 297, "30 holes", 30, true], "a4-2r": ["A4", 210, 297, "2 rings", 2],
    "a4-4r": ["A4", 210, 297, "4 rings", 4], "letter-3r": ["US Letter", 215.9, 279.4, "3 rings", 3],
    custom: ["Custom", 148, 210, "Custom system", 6, true]
  };
  const form = $("binderConfigurator"), inquiry = $("binderInquiry"), svg = $("binderSvg"), ns = "http://www.w3.org/2000/svg";
  const state = { view: "front", artUrl: "", artData: "", artName: "", artX: 0, artY: 0, surfaceData: "",
    cover: { hex: "#FFFFFF", name: "White translucent" }, ring: { hex: "#D7DDE2", name: "Nickel" }, snap: { hex: "#D7DDE2", name: "Nickel" } };
  const draftKey = "ldyz_binder_config_v1";
  const n = (id, fallback) => { const x = Number($(id).value); return Number.isFinite(x) && x > 0 ? x : fallback; };
  const f = (x) => Number(Number(x).toFixed(1)).toString();
  const safe = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));

  function config() {
    const key = $("binderFormat").value, p = systems[key] || systems["a5-6r"], custom = key === "custom";
    const count = custom ? Number($("customSystem").value) : p[4], mechanismCount = Number($("mechanismType").value);
    const paperW = custom ? n("paperWidth", 148) : p[1], paperH = custom ? n("paperHeight", 210) : p[2];
    const dia = $("ringDiameter").value === "custom" ? n("customRingDiameter", 25) : Number($("ringDiameter").value);
    const snapCount = Number($("snapCount").value), snapSpacing = n("snapSpacing", 95), finishedH = n("finishedHeight", 235);
    const finish = $("coverFinish").value, material = $("coverMaterial").value;
    // No supplier drawings are bundled with this page, so no hardware/material combination is represented as factory-approved.
    const requiresCheck = true;
    return {
      product: "Custom ring binder", productCode: `LDYZ-${custom ? "CUSTOM" : p[0].toUpperCase().replace(/\s/g, "")}-${mechanismCount}${mechanismCount >= 20 ? "H" : "R"}`,
      paper: { format: p[0], widthMm: paperW, heightMm: paperH, system: custom ? `${count}${count >= 20 ? " holes" : " rings"}` : p[3] },
      finished: { widthMm: n("finishedWidth", 170), heightMm: finishedH, closedSpineDepthMm: n("spineDepth", 30) },
      mechanism: { count: mechanismCount, display: `${mechanismCount}${mechanismCount >= 20 ? " holes" : " rings"}`, ringInnerDiameterMm: dia, material: $("mechanismMaterial").value, color: state.ring.name, colorHex: state.ring.hex },
      cover: { material, finish, thicknessMm: Number($("coverThickness").value), color: state.cover.name, colorHex: state.cover.hex, artworkName: state.artName || null, artworkZoomPercent: Number($("artworkZoom").value), artworkPosition: { x: Math.round(state.artX), y: Math.round(state.artY) } },
      closure: { snapMaterial: $("snapMaterial").value, count: snapCount, capDiameterMm: n("snapDiameter", 12), centreSpacingMm: snapSpacing, strapWidthMm: n("strapWidth", 35), strapSide: $("strapPosition").value, color: state.snap.name, colorHex: state.snap.hex },
      project: { quantity: $("inquiryQuantity").value.trim(), targetMarket: $("targetMarket").value.trim() },
      factoryConfirmationRequired: requiresCheck || (finish === "printed" && !state.artName),
      disclaimer: "Illustrative browser preview only. Confirm material, colour, dimensions, hole pitch and hardware fit with factory drawings and an approved sample. Not a production drawing."
    };
  }

  function frame(c) {
    const s = Math.min(388 / c.finished.heightMm, 328 / c.finished.widthMm);
    const w = c.finished.widthMm * s, h = c.finished.heightMm * s;
    return { x: (720 - w) / 2, y: 91 + (392 - h) / 2, w, h, s };
  }

  function front(c) {
    const d = frame(c), count = c.mechanism.count, holes = count >= 20, r = Math.max(7, c.mechanism.ringInnerDiameterMm * d.s * .57);
    // Mechanism face width is independent from the closed spine depth (a different axis).
    const plateW = Math.max(16, Math.min(d.w * .16, 18 * d.s));
    const plateX = d.x + plateW * .12, ringX = d.x + plateW * .75;
    const y0 = d.y + Math.max(22, d.h * .085), y1 = d.y + d.h - Math.max(22, d.h * .085);
    let ys;
    if (count === 1) ys = [(y0 + y1) / 2];
    else if (count === 5 || count === 6) {
      const steps = count - 1, extra = .42, total = steps + extra;
      ys = Array.from({ length: count }, (_, i) => y0 + (y1 - y0) * (i + (i >= Math.ceil(steps / 2) ? extra : 0)) / total);
    } else ys = Array.from({ length: count }, (_, i) => y0 + i * (y1 - y0) / (count - 1));
    const strapW = Math.max(14, c.closure.strapWidthMm * d.s), topStrap = c.closure.strapSide === "top";
    const strapX = topStrap ? d.x + d.w * .08 : d.x + d.w - strapW * .7;
    const strapY = topStrap ? d.y + 3 : d.y + 4;
    const snapR = Math.max(6, c.closure.capDiameterMm * d.s / 2);
    const centerX = topStrap ? d.x + d.w / 2 : strapX + strapW * .55, centerY = topStrap ? strapY + strapW * .45 : d.y + d.h / 2;
    const half = c.closure.centreSpacingMm * d.s / 2;
    const snapPoints = c.closure.count === 1 ? [[centerX, centerY]] : topStrap ? [[centerX - half, centerY], [centerX + half, centerY]] : [[centerX, centerY - half], [centerX, centerY + half]];
    let hardware = `<rect x="${plateX}" y="${d.y + 5}" width="${plateW}" height="${d.h - 10}" rx="${Math.min(plateW / 2, 9)}" fill="${safe(c.mechanism.colorHex)}" fill-opacity=".92" stroke="#77848d" stroke-width="1.4"/>`;
    hardware += holes ? ys.map((y) => `<circle cx="${ringX}" cy="${y}" r="${Math.max(2.5, d.s * 2)}" fill="#53616b"/><circle cx="${ringX}" cy="${y}" r="${Math.max(1.3, d.s)}" fill="#e3e8eb"/>`).join("") : ys.map((y) => `<path d="M ${ringX + r * .48} ${y - r} A ${r} ${r} 0 1 0 ${ringX + r * .48} ${y + r}" fill="none" stroke="${safe(c.mechanism.colorHex)}" stroke-width="${Math.max(5, d.s * 3.6)}" stroke-linecap="round"/><path d="M ${ringX + r * .48} ${y - r} A ${r} ${r} 0 1 0 ${ringX + r * .48} ${y + r}" fill="none" stroke="url(#metalGloss)" stroke-width="1.2"/>`).join("");
    const snaps = snapPoints.map(([sx, sy]) => {
      const ok = sx > d.x + snapR && sx < d.x + d.w - snapR && sy > d.y + snapR && sy < d.y + d.h - snapR;
      const cx = Math.max(d.x + snapR, Math.min(d.x + d.w - snapR, sx)), cy = Math.max(d.y + snapR, Math.min(d.y + d.h - snapR, sy));
      return `<g><ellipse cx="${cx}" cy="${cy + snapR * .4}" rx="${snapR * 1.5}" ry="${snapR * .7}" fill="#344" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${snapR + 2}" fill="#606b73"/><circle cx="${cx}" cy="${cy}" r="${snapR}" fill="${safe(c.closure.colorHex)}" stroke="#606b73" stroke-width="1.5"/><ellipse cx="${cx - snapR * .2}" cy="${cy - snapR * .35}" rx="${snapR * .48}" ry="${snapR * .2}" fill="#fff" opacity=".55"/>${ok ? "" : `<circle cx="${cx}" cy="${cy}" r="${snapR + 5}" fill="none" stroke="#d95555" stroke-dasharray="3 3"/>`}</g>`;
    }).join("");
    const opacity = c.cover.finish === "clear" ? .28 : .48;
    const image = state.artUrl ? `<image id="artworkImage" href="${safe(state.artUrl)}" x="${d.x + 18 + state.artX}" y="${d.y + 18 + state.artY}" width="${Math.max(15, d.w - 36) * Number($("artworkZoom").value) / 100}" height="${Math.max(15, d.h - 36) * Number($("artworkZoom").value) / 100}" preserveAspectRatio="xMidYMid slice" clip-path="url(#coverClip)" opacity=".9" style="cursor:move"/>` : "";
    const materialSample = `<svg x="${d.x + 3}" y="${d.y + 3}" width="${d.w - 6}" height="${d.h - 6}" viewBox="245 92 265 620" preserveAspectRatio="none" overflow="hidden"><image id="coverMaterialSample" href="website-images/Codex输出图片/办公及文具用品/活页本/transparent-six-ring-binder-main-thumb.jpg" x="0" y="0" width="800" height="800" opacity=".34" loading="lazy"/></svg>`;
    const texture = materialSample + (c.cover.finish === "frosted" ? `<rect x="${d.x + 2}" y="${d.y + 2}" width="${d.w - 4}" height="${d.h - 4}" rx="7" fill="url(#frostTexture)" opacity=".65"/>` : c.cover.finish === "holographic" ? `<rect x="${d.x + 2}" y="${d.y + 2}" width="${d.w - 4}" height="${d.h - 4}" rx="7" fill="url(#holoTexture)" opacity=".65"/>` : "");
    const labelsY = d.y + d.h + 28;
    const strap = topStrap
      ? `<rect x="${strapX}" y="${strapY}" width="${d.w * .84}" height="${strapW}" rx="8" fill="${safe(c.cover.colorHex)}" fill-opacity=".34" stroke="#76858e" stroke-opacity=".6" stroke-width="1.5"/>`
      : `<rect x="${strapX}" y="${d.y + 4}" width="${strapW}" height="${d.h - 8}" rx="8" fill="${safe(c.cover.colorHex)}" fill-opacity=".34" stroke="#76858e" stroke-opacity=".6" stroke-width="1.5"/>`;
    return `<g><rect x="${d.x + 7}" y="${d.y + 9}" width="${d.w}" height="${d.h}" rx="10" fill="#74808a" opacity=".2"/><rect x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="8" fill="${safe(c.cover.colorHex)}" fill-opacity="${opacity}" stroke="#75848d" stroke-opacity=".8" stroke-width="2.2"/><rect x="${d.x + 4}" y="${d.y + 4}" width="${d.w - 8}" height="${d.h - 8}" rx="6" fill="url(#coverGloss)" stroke="#fff" stroke-opacity=".65" stroke-width="1.2"/>${texture}${image}<rect x="${d.x + 1}" y="${d.y + 1}" width="${Math.max(20, d.w * .12)}" height="${d.h - 2}" rx="7" fill="${safe(c.cover.colorHex)}" fill-opacity=".56" stroke="#fff" stroke-opacity=".45"/>${strap}${snaps}${hardware}<g fill="none" stroke="#597080" stroke-width="1.2"><path d="M ${d.x} ${labelsY - 10} V ${labelsY + 4} M ${d.x + d.w} ${labelsY - 10} V ${labelsY + 4} M ${d.x} ${labelsY} H ${d.x + d.w}"/><path d="M ${d.x - 23} ${d.y} H ${d.x - 9} M ${d.x - 23} ${d.y + d.h} H ${d.x - 9} M ${d.x - 18} ${d.y} V ${d.y + d.h}"/></g><g fill="#41596a" font-family="Arial,sans-serif" font-size="13"><text x="360" y="${labelsY + 19}" text-anchor="middle">${tr("Finished width")} · ${f(c.finished.widthMm)} mm</text><text x="${d.x - 24}" y="${d.y + d.h / 2}" transform="rotate(-90 ${d.x - 24} ${d.y + d.h / 2})" text-anchor="middle">${f(c.finished.heightMm)} mm</text><text x="360" y="42" text-anchor="middle" font-weight="700">${tr("Front")} · ${safe(tr(c.mechanism.display))} · ${f(c.mechanism.ringInnerDiameterMm)} mm ${tr("ID")}</text></g></g>`;
  }

  function side(c) {
    const depth = c.finished.closedSpineDepthMm, scale = Math.min(3.1, 370 / Math.max(depth + c.mechanism.ringInnerDiameterMm + 24, 60));
    const x = 237, w = 246, mid = 330, h = Math.max(8, depth * scale), y = mid - h / 2, t = Math.max(1.2, c.cover.thicknessMm * 2.8);
    const ring = Math.max(20, c.mechanism.ringInnerDiameterMm * scale * .72), cap = Math.max(5, c.closure.capDiameterMm * scale * .43);
    const strap = c.closure.strapSide === "right" ? `<path d="M ${x + w - 14} ${mid} H ${x + w + 56}" stroke="${safe(c.cover.colorHex)}" stroke-opacity=".75" stroke-width="${Math.max(5, c.closure.strapWidthMm * scale * .48)}"/><circle cx="${x + w + 50}" cy="${mid}" r="${cap}" fill="${safe(c.closure.colorHex)}" stroke="#56636b" stroke-width="2"/>` : `<path d="M ${mid} ${y + h} V ${y + h + 48}" stroke="${safe(c.cover.colorHex)}" stroke-opacity=".75" stroke-width="${Math.max(5, c.closure.strapWidthMm * scale * .48)}"/><circle cx="${mid}" cy="${y + h + 43}" r="${cap}" fill="${safe(c.closure.colorHex)}" stroke="#56636b" stroke-width="2"/>`;
    const mechanism = c.mechanism.count >= 20 ? `<path d="M ${mid - 55} ${y} V ${y - ring}" stroke="${safe(c.mechanism.colorHex)}" stroke-width="7" stroke-linecap="round"/>` : `<path d="M ${mid - 68} ${y + 1} Q ${mid - 60} ${y - ring} ${mid} ${y - ring} Q ${mid + 60} ${y - ring} ${mid + 68} ${y + 1}" fill="none" stroke="${safe(c.mechanism.colorHex)}" stroke-width="7" stroke-linecap="round"/>`;
    return `<g><text x="360" y="60" text-anchor="middle" fill="#41596a" font-family="Arial,sans-serif" font-size="15" font-weight="700">${tr("Side structure · sheet thickness exaggerated to remain visible")}</text><rect x="${x + 8}" y="${y + 8}" width="${w}" height="${h}" rx="7" fill="#667783" opacity=".16"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${safe(c.cover.colorHex)}" fill-opacity=".28" stroke="#6b7c87" stroke-width="2"/><path d="M ${x + 4} ${y + t} H ${x + w - 4}" stroke="#fff" stroke-width="${t}"/>${mechanism}${strap}<g fill="#41596a" font-family="Arial,sans-serif" font-size="14"><text x="360" y="${y + h + 94}" text-anchor="middle">${tr("Closed spine depth")} · ${f(depth)} mm</text><text x="360" y="${y + h + 116}" text-anchor="middle">${tr("Cover material")} · ${f(c.cover.thicknessMm)} mm</text><text x="360" y="${y + h + 138}" text-anchor="middle">${tr("Ring inner diameter")} · ${f(c.mechanism.ringInnerDiameterMm)} mm</text></g></g>`;
  }

  function render() {
    const c = config(), custom = $("binderFormat").value === "custom";
    $("customPaperFields").hidden = !custom; $("customRingDiameter").hidden = $("ringDiameter").value !== "custom";
    $("printUpload").hidden = $("coverFinish").value !== "printed";
    $("thicknessOutput").textContent = f(c.cover.thicknessMm) + " mm"; $("zoomOutput").textContent = $("artworkZoom").value + "%";
    $("coverColourLabel").textContent = state.cover.name;
    $("summaryCode").textContent = c.productCode;
    $("summaryFormat").textContent = `${c.paper.format} · ${f(c.paper.widthMm)} × ${f(c.paper.heightMm)} mm · ${tr(c.paper.system)}`;
    $("summaryFinished").textContent = `${f(c.finished.widthMm)} × ${f(c.finished.heightMm)} mm · ${f(c.finished.closedSpineDepthMm)} mm ${tr("depth")}`;
    $("summaryRingSystem").textContent = `${tr(c.mechanism.display)} · ${f(c.mechanism.ringInnerDiameterMm)} mm ${tr("ID")} · ${tr(c.mechanism.material)} · ${tr(c.mechanism.color)}`;
    $("summaryCover").textContent = `${tr(c.cover.material)} · ${tr(c.cover.finish)} · ${f(c.cover.thicknessMm)} mm · ${tr(c.cover.color)}`;
    $("summaryClosure").textContent = `${tr(c.closure.count === 2 ? "Double" : "Single")} ${tr(c.closure.snapMaterial)} ${tr("snaps")} · ${f(c.closure.capDiameterMm)} mm ${tr("cap")} · ${f(c.closure.centreSpacingMm)} mm ${tr("centres")} · ${f(c.closure.strapWidthMm)} mm ${tr("strap")} · ${tr(c.closure.color)}`;
    $("summaryProject").textContent = `${c.project.quantity || tr("Quantity not entered")} · ${c.project.targetMarket || tr("Market not entered")}`;
    const mismatch = c.mechanism.count !== (custom ? Number($("customSystem").value) : systems[$("binderFormat").value][4]);
    const spacingLimit = c.closure.strapSide === "top" ? c.finished.widthMm - 20 : c.finished.heightMm - 20;
    const badSpacing = c.closure.count === 2 && c.closure.centreSpacingMm > spacingLimit;
    const warn = c.factoryConfirmationRequired || mismatch || badSpacing;
    const note = tr("Factory confirmation required: standard paper size does not guarantee mechanism compatibility; confirm cover allowances, ring / hole pitch, snap placement, material and final drawings.");
    $("platformStatus").textContent = warn ? note : tr("Paper format dimensions are references only. Confirm binder construction and mechanism fit with the factory before sampling.");
    $("engineeringStatus").textContent = warn ? note + " " + tr("This visual is not a production drawing.") : tr("Visual proportions only; approve final supplier drawing and physical sample before production.");
    $("previewStatus").textContent = warn ? tr("Illustrative · factory review required") : tr("Illustrative · not production artwork");
    $("previewSizeText").textContent = `${tr("Cover")} ${f(c.finished.widthMm)} × ${f(c.finished.heightMm)} mm · ${tr("spine")} ${f(c.finished.closedSpineDepthMm)} mm`;
    $("previewMaterialText").textContent = `${tr(c.cover.material)} · ${f(c.cover.thicknessMm)} mm · ${tr(c.cover.color)} · ${tr(c.cover.finish)}`;
    $("previewHardwareText").textContent = `${tr(c.mechanism.display)} · ${f(c.mechanism.ringInnerDiameterMm)} mm ${tr("inner diameter")} · ${c.closure.count} ${tr(c.closure.count === 1 ? "snap" : "snaps")} · ${f(c.closure.capDiameterMm)} mm ${tr("cap")}`;
    svg.querySelector("#frontView").innerHTML = state.view === "front" ? front(c) : "";
    svg.querySelector("#sideView").innerHTML = state.view === "side" ? side(c) : "";
    svg.querySelector("#frontView").setAttribute("display", state.view === "front" ? "inline" : "none");
    svg.querySelector("#sideView").setAttribute("display", state.view === "side" ? "inline" : "none");
    const d = frame(c), clip = svg.querySelector("#coverClipRect");
    clip.setAttribute("x", d.x); clip.setAttribute("y", d.y); clip.setAttribute("width", d.w); clip.setAttribute("height", d.h);
    $("visualDimensions").textContent = state.view === "front" ? `${tr("Paper")} ${f(c.paper.widthMm)} × ${f(c.paper.heightMm)} mm → ${tr("cover")} ${f(c.finished.widthMm)} × ${f(c.finished.heightMm)} mm` : `${tr("Spine")} ${f(c.finished.closedSpineDepthMm)} mm · ${tr("sheet")} ${f(c.cover.thicknessMm)} mm · ${tr("ring ID")} ${f(c.mechanism.ringInnerDiameterMm)} mm`;
    $("printDragHint").hidden = !(state.view === "front" && state.artUrl && $("coverFinish").value === "printed");
    return c;
  }

  function svgBlob() {
    const clone = svg.cloneNode(true), image = clone.querySelector("#artworkImage");
    if (image && state.artData) image.setAttribute("href", state.artData);
    const material = clone.querySelector("#coverMaterialSample");
    if (material && state.surfaceData) material.setAttribute("href", state.surfaceData);
    return new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" });
  }
  function briefData() { return { configuration: render(), contact: Object.fromEntries(new FormData(inquiry).entries()), preview: "binder-configuration-preview.svg", attachedArtwork: state.artName || null }; }
  function download(name, blob) { const url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1200); }
  function crc32(bytes) {
    let crc = -1;
    for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0); }
    return (crc ^ -1) >>> 0;
  }
  function xlsxBlob(files) {
    const encoder = new TextEncoder(), entries = Object.entries(files).map(([name, content]) => {
      const path = encoder.encode(name), data = encoder.encode(content);
      return { path, data, crc: crc32(data) };
    });
    let offset = 0;
    const local = [], central = [];
    const u16 = (v) => [v & 255, (v >>> 8) & 255], u32 = (v) => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
    for (const entry of entries) {
      const { path, data, crc } = entry, start = offset;
      const header = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(path.length), ...u16(0), ...path, ...data]);
      local.push(header); offset += header.length;
      const directory = new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(path.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(start), ...path]);
      central.push(directory);
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(entries.length), ...u16(entries.length), ...u32(centralSize), ...u32(offset), ...u16(0)]);
    return new Blob([...local, ...central, end], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }
  function configurationWorkbook(c, contact) {
    const rows = [], add = (label, value) => rows.push({ label: tr(label), value: String(value == null || value === "" ? "—" : value) });
    const section = (title) => rows.push({ section: tr(title) });
    const mm = (value) => `${f(value)} mm`;
    const systemName = (value) => tr(value).replace(/rings?/gi, tr("rings")).replace(/holes?/gi, tr("holes"));
    const pageLanguage = window.getStationeryLanguage ? window.getStationeryLanguage() : (document.documentElement.lang || "en");
    const dateLocale = ({ en: "en-US", "en-US": "en-US", "zh-CN": "zh-CN", zh: "zh-CN", "zh-TW": "zh-TW", "zh_tw": "zh-TW", ja: "ja-JP", ko: "ko-KR", fr: "fr-FR" })[pageLanguage] || "en-US";
    rows.push({ title: tr("BINDER CONFIGURATION BRIEF") }, { subtitle: `${tr("Prepared for factory review")} · ${new Date().toLocaleDateString(dateLocale)}` });
    section("PRODUCT SPECIFICATIONS"); add("Product", tr("Custom ring binder")); add("Product code", c.productCode);
    section("Paper / system"); add("Paper format", tr(c.paper.format)); add("Insert size", `${mm(c.paper.widthMm)} × ${mm(c.paper.heightMm)}`); add("Paper / ring-hole system", systemName(c.paper.system));
    section("Finished size / spine"); add("Finished cover size", `${mm(c.finished.widthMm)} × ${mm(c.finished.heightMm)}`); add("Closed spine depth", mm(c.finished.closedSpineDepthMm));
    section("Rings / hardware"); add("Mechanism", `${systemName(c.mechanism.display)} · ${tr(c.mechanism.material)}`); add("Ring inner diameter", mm(c.mechanism.ringInnerDiameterMm)); add("Mechanism colour", `${tr(c.mechanism.color)} (${c.mechanism.colorHex})`);
    section("Cover"); add("Cover material", tr(c.cover.material)); add("Surface finish", tr(c.cover.finish)); add("Material thickness", mm(c.cover.thicknessMm)); add("Cover colour", `${tr(c.cover.color)} (${c.cover.colorHex})`); add("Artwork", c.cover.artworkName || tr("Not provided")); add("Reference file", $("referenceFile").files[0]?.name || tr("Not provided"));
    section("Closure"); add("Snap material", tr(c.closure.snapMaterial)); add("Snap count", tr(c.closure.count === 2 ? "Double" : "Single")); add("Snap cap diameter", mm(c.closure.capDiameterMm)); if (c.closure.count === 2) add("Double snap centre spacing", mm(c.closure.centreSpacingMm)); add("Strap width", mm(c.closure.strapWidthMm)); add("Strap side", tr(c.closure.strapSide)); add("Snap colour", `${tr(c.closure.color)} (${c.closure.colorHex})`);
    section("Project details"); add("Estimated quantity", c.project.quantity); add("Target market", c.project.targetMarket);
    if (contact.name || contact.company || contact.email || contact.contact_method) { section("Contact"); add("Contact name", contact.name); add("Company", contact.company); add("Business email", contact.email); add("Preferred contact", contact.contact_method); }
    section("Important note"); add("Factory confirmation", tr("Illustrative browser preview only. Confirm material, colour, dimensions, hole pitch and hardware fit with factory drawings and an approved sample. Not a production drawing."));
    const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
    const cell = (ref, text, style) => `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`;
    const xmlRows = rows.map((row, index) => {
      const nrow = index + 1;
      if (row.title) return `<row r="${nrow}" ht="30" customHeight="1">${cell(`A${nrow}`, row.title, 1)}</row>`;
      if (row.subtitle) return `<row r="${nrow}" ht="24" customHeight="1">${cell(`A${nrow}`, row.subtitle, 2)}</row>`;
      if (row.section) return `<row r="${nrow}" ht="23" customHeight="1">${cell(`A${nrow}`, row.section, 3)}</row>`;
      return `<row r="${nrow}" ht="30" customHeight="1">${cell(`A${nrow}`, row.label, 4)}${cell(`B${nrow}`, row.value, 5)}</row>`;
    }).join("");
    const merges = rows.map((r, i) => r.title || r.subtitle || r.section ? `<mergeCell ref="A${i + 1}:B${i + 1}"/>` : "").join("");
    const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><cols><col min="1" max="1" width="32" customWidth="1"/><col min="2" max="2" width="88" customWidth="1"/></cols><sheetData>${xmlRows}</sheetData><mergeCells count="${rows.filter((r) => r.title || r.subtitle || r.section).length}">${merges}</mergeCells><pageMargins left="0.35" right="0.35" top="0.5" bottom="0.5" header="0.2" footer="0.2"/></worksheet>`;
    const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="4"><font><sz val="11"/><name val="Aptos"/><family val="2"/></font><font><b/><sz val="18"/><color rgb="FF173653"/><name val="Aptos Display"/></font><font><sz val="10"/><color rgb="FF66788A"/><name val="Aptos"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF173653"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE8EFF6"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left/><right/><top/><bottom style="thin"><color rgb="FFDCE3E8"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="6"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
    return xlsxBlob({
      "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
      "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
      "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${esc(tr("Configuration brief"))}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
      "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
      "xl/worksheets/sheet1.xml": sheet, "xl/styles.xml": styles
    });
  }
  function saveDraft() {
    const copy = briefData();
    copy.contact.inquiryQuantity = $("inquiryQuantity").value;
    copy.contact.targetMarket = $("targetMarket").value;
    try { localStorage.setItem(draftKey, JSON.stringify(copy)); $("submissionStatus").textContent = tr("Draft saved in this browser. Browsers do not retain file selections; keep artwork files separately."); }
    catch (_) { $("submissionStatus").textContent = tr("Could not save in this browser. Use Download brief to keep a copy."); }
  }
  function loadDraft() {
    try {
      const d = JSON.parse(localStorage.getItem(draftKey) || "null"), c = d && d.configuration;
      if (!c) return;
      const key = Object.keys(systems).find((k) => systems[k][0] === c.paper.format && systems[k][1] === c.paper.widthMm && systems[k][2] === c.paper.heightMm);
      if (key) $("binderFormat").value = key;
      $("paperWidth").value = c.paper.widthMm; $("paperHeight").value = c.paper.heightMm;
      $("finishedWidth").value = c.finished.widthMm; $("finishedHeight").value = c.finished.heightMm; $("spineDepth").value = c.finished.closedSpineDepthMm;
      $("coverMaterial").value = c.cover.material; $("coverFinish").value = c.cover.finish; $("coverThickness").value = c.cover.thicknessMm;
      state.cover = { hex: c.cover.colorHex, name: c.cover.color }; $("coverColourPicker").value = c.cover.colorHex; $("coverColourCode").value = c.cover.colorHex;
      $("mechanismType").value = c.mechanism.count; $("mechanismMaterial").value = c.mechanism.material;
      $("ringDiameter").value = [15, 20, 25, 30, 35].includes(Number(c.mechanism.ringInnerDiameterMm)) ? String(c.mechanism.ringInnerDiameterMm) : "custom";
      $("customRingDiameter").value = c.mechanism.ringInnerDiameterMm; state.ring = { hex: c.mechanism.colorHex, name: c.mechanism.color };
      $("snapMaterial").value = c.closure.snapMaterial; $("snapCount").value = c.closure.count; $("snapDiameter").value = c.closure.capDiameterMm;
      $("snapSpacing").value = c.closure.centreSpacingMm; $("strapWidth").value = c.closure.strapWidthMm; $("strapPosition").value = c.closure.strapSide;
      state.snap = { hex: c.closure.colorHex, name: c.closure.color };
      ["name", "company", "email", "contact_method", "message"].forEach((k) => { if (d.contact[k]) inquiry.elements.namedItem(k).value = d.contact[k]; });
      $("inquiryQuantity").value = d.contact.inquiryQuantity || ""; $("targetMarket").value = d.contact.targetMarket || "";
      $("submissionStatus").textContent = tr("Draft restored. Please re-select any artwork or reference files.");
    } catch (_) { /* Corrupt local drafts must not disable the configurator. */ }
  }

  async function sendInquiry() {
    const c = render(), status = $("submissionStatus"), button = $("submitBinderInquiry");
    if (!inquiry.reportValidity()) return;
    if (c.cover.finish === "printed" && !state.artName) { status.textContent = tr("Please add artwork for the printed-cover preview, or choose another surface."); $("printFile").focus(); return; }
    const files = [$("printFile").files[0], $("referenceFile").files[0]].filter(Boolean);
    const previewBlob = svgBlob();
    const total = files.reduce((sum, file) => sum + file.size, previewBlob.size);
    if (total > 15 * 1024 * 1024) { status.textContent = tr("Attachments must be 15 MB or smaller in total. Remove a file and try again."); return; }
    const payload = new FormData(inquiry);
    payload.set("category", "Stationery & Office Products");
    payload.set("product", "Custom ring binder · " + c.productCode);
    payload.set("inquiryQuantity", $("inquiryQuantity").value.trim());
    payload.set("targetMarket", $("targetMarket").value.trim());
    payload.set("lang", document.documentElement.lang || "en");
    payload.set("binder_configuration", JSON.stringify(c));
    payload.set("preview_file", new File([previewBlob], "binder-configuration-preview.svg", { type: "image/svg+xml" }));
    const artwork = $("printFile").files[0], reference = $("referenceFile").files[0];
    if (artwork) payload.set("print_artwork", artwork);
    if (reference) payload.set("reference_file", reference);
    button.disabled = true; status.textContent = tr("Sending your inquiry and attachments…");
    try {
      const response = await fetch("send_mail.php", { method: "POST", body: payload, headers: { Accept: "application/json" } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true || result.email_sent !== true) throw new Error(result.msg || "delivery failed");
      status.textContent = tr("Your inquiry was accepted by the mail server. Our team will reply within one working day.");
      ["name", "company", "email", "contact_method", "message"].forEach((key) => { const field = inquiry.elements.namedItem(key); if (field) field.value = ""; });
      inquiry.elements.namedItem("consent").checked = false;
    } catch (error) {
      status.textContent = tr("We could not confirm email delivery. Your entries and selected files are still here—please try again later or email sales@longdeyizhi.com directly.");
    } finally { button.disabled = false; }
  }
  const tr = (text) => window.stationeryT ? window.stationeryT(text) : text;

  $("binderFormat").addEventListener("change", () => {
    const p = systems[$("binderFormat").value];
    if ($("binderFormat").value !== "custom") {
      $("paperWidth").value = p[1]; $("paperHeight").value = p[2];
      $("finishedWidth").value = Math.round(p[1] + (p[1] === 148 ? 22 : 24)); $("finishedHeight").value = Math.round(p[2] + (p[2] === 210 ? 25 : 26));
      $("mechanismType").value = String(p[4]);
    }
    render();
  });
  $("customSystem").addEventListener("change", () => { $("mechanismType").value = $("customSystem").value; render(); });
  form.addEventListener("input", render); form.addEventListener("change", render);
  ["inquiryQuantity", "targetMarket"].forEach((id) => $(id).addEventListener("input", render));
  document.querySelectorAll(".binder-view-tabs [data-view]").forEach((b) => b.addEventListener("click", () => {
    state.view = b.dataset.view;
    document.querySelectorAll(".binder-view-tabs [data-view]").forEach((x) => { const on = x === b; x.classList.toggle("is-active", on); x.setAttribute("aria-selected", String(on)); });
    render();
  }));
  document.querySelectorAll(".swatches .swatch").forEach((b) => b.addEventListener("click", () => {
    const group = b.parentElement.dataset.target; state[group] = { hex: b.dataset.hex, name: b.dataset.name };
    b.parentElement.querySelectorAll(".swatch").forEach((x) => x.classList.toggle("active", x === b));
    if (group === "cover") { $("coverColourPicker").value = state.cover.hex; $("coverColourCode").value = state.cover.hex; }
    render();
  }));
  $("coverColourPicker").addEventListener("input", () => {
    state.cover = { hex: $("coverColourPicker").value.toUpperCase(), name: $("coverColourPicker").value.toUpperCase() };
    $("coverColourCode").value = state.cover.hex; document.querySelectorAll('.swatches[data-target="cover"] .swatch').forEach((b) => b.classList.remove("active")); render();
  });
  $("applyCoverColour").addEventListener("click", () => {
    const code = $("coverColourCode").value.trim();
    if (!/^#[0-9a-f]{6}$/i.test(code)) { $("coverColourCode").setCustomValidity("Enter a six-digit HEX code, e.g. #A8C7B5."); $("coverColourCode").reportValidity(); return; }
    $("coverColourCode").setCustomValidity(""); state.cover = { hex: code.toUpperCase(), name: code.toUpperCase() }; $("coverColourPicker").value = code; render();
  });
  $("coverFinish").addEventListener("change", () => { if ($("coverFinish").value === "printed" && !$("printFile").files[0]) $("printFile").click(); render(); });
  $("printFile").addEventListener("change", (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (!file.type.startsWith("image/")) { $("submissionStatus").textContent = tr("For the live preview choose a PNG, JPG or WebP image."); return; }
    if (state.artUrl) URL.revokeObjectURL(state.artUrl); state.artUrl = URL.createObjectURL(file); state.artName = file.name; state.artX = 0; state.artY = 0;
    const reader = new FileReader(); reader.onload = () => { state.artData = reader.result; render(); }; reader.readAsDataURL(file); render();
  });
  $("referenceFile").addEventListener("change", () => { const file = $("referenceFile").files[0]; $("attachmentStatus").textContent = file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB · ${tr("attached to inquiry")}` : tr("Reference drawings and artwork are attached to your inquiry email. Maximum total attachment size: 15 MB."); });
  $("artworkZoom").addEventListener("input", render);
  $("centerArtwork").addEventListener("click", () => { state.artX = 0; state.artY = 0; render(); });
  $("removeArtwork").addEventListener("click", () => { if (state.artUrl) URL.revokeObjectURL(state.artUrl); state.artUrl = ""; state.artData = ""; state.artName = ""; $("printFile").value = ""; render(); });
  $("binderControlsToggle").addEventListener("click", () => {
    const opened = form.classList.toggle("is-open"); $("binderControlsToggle").setAttribute("aria-expanded", String(opened)); $("binderControlsToggle").textContent = tr(opened ? "Close configuration options" : "Edit configuration");
  });
  $("saveDraft").addEventListener("click", saveDraft);
  $("downloadBrief").addEventListener("click", () => {
    const c = render(), contact = Object.fromEntries(new FormData(inquiry).entries());
    download(`${c.productCode.toLowerCase()}-configuration.xlsx`, configurationWorkbook(c, contact));
  });
  $("recommendEntry").addEventListener("click", () => {
    $("submissionStatus").textContent = tr("Add a reference file in the configuration options above, then complete your contact details. The file and current brief will be included in the inquiry.");
    $("referenceFile").closest(".field").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  inquiry.addEventListener("submit", (e) => { e.preventDefault(); sendInquiry(); });
  window.addEventListener("stationery:language", () => { render(); });
  let drag = null;
  svg.addEventListener("pointerdown", (e) => {
    if (!e.target.closest("#artworkImage") || state.view !== "front") return;
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    svg.setPointerCapture(e.pointerId); drag = { x: p.x, y: p.y, ox: state.artX, oy: state.artY };
  });
  svg.addEventListener("pointermove", (e) => {
    if (!drag) return; const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    state.artX = drag.ox + p.x - drag.x; state.artY = drag.oy + p.y - drag.y; render();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((event) => svg.addEventListener(event, () => { drag = null; }));
  function lightbox() {
    const box = $("stationeryLightbox"), image = $("stationeryLightboxImage");
    document.querySelectorAll(".bath-gallery .bath-card").forEach((card) => card.addEventListener("click", () => { image.src = card.dataset.image; image.alt = card.querySelector("img").alt; box.hidden = false; }));
    box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".bath-lightbox-close")) box.hidden = true; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") box.hidden = true; });
  }
  lightbox();
  try { const saved = JSON.parse(localStorage.getItem(draftKey) || "null"); if (saved && saved.configuration) {
    const c = saved.configuration, opt = Object.keys(systems).find((k) => systems[k][0] === c.paper.format && systems[k][1] === c.paper.widthMm && systems[k][2] === c.paper.heightMm);
    if (opt) $("binderFormat").value = opt;
    $("paperWidth").value = c.paper.widthMm; $("paperHeight").value = c.paper.heightMm; $("finishedWidth").value = c.finished.widthMm; $("finishedHeight").value = c.finished.heightMm; $("spineDepth").value = c.finished.closedSpineDepthMm;
    $("coverMaterial").value = c.cover.material; $("coverFinish").value = c.cover.finish; $("coverThickness").value = c.cover.thicknessMm; state.cover = { hex: c.cover.colorHex, name: c.cover.color };
    $("coverColourPicker").value = c.cover.colorHex; $("coverColourCode").value = c.cover.colorHex; $("mechanismType").value = c.mechanism.count; $("mechanismMaterial").value = c.mechanism.material;
    $("ringDiameter").value = [15,20,25,30,35].includes(Number(c.mechanism.ringInnerDiameterMm)) ? String(c.mechanism.ringInnerDiameterMm) : "custom"; $("customRingDiameter").value = c.mechanism.ringInnerDiameterMm; state.ring = { hex: c.mechanism.colorHex, name: c.mechanism.color };
    $("snapMaterial").value = c.closure.snapMaterial; $("snapCount").value = c.closure.count; $("snapDiameter").value = c.closure.capDiameterMm; $("snapSpacing").value = c.closure.centreSpacingMm; $("strapWidth").value = c.closure.strapWidthMm; $("strapPosition").value = c.closure.strapSide; state.snap = { hex: c.closure.colorHex, name: c.closure.color };
    ["name", "company", "email", "contact_method", "message"].forEach((k) => { if (saved.contact && saved.contact[k]) inquiry.elements.namedItem(k).value = saved.contact[k]; });
    $("inquiryQuantity").value = saved.contact && saved.contact.inquiryQuantity || ""; $("targetMarket").value = saved.contact && saved.contact.targetMarket || "";
    $("submissionStatus").textContent = tr("Previous draft restored. Please re-select any artwork or reference files.");
  } } catch (_) { /* Ignore unusable local state. */ }
  render();
  fetch("website-images/Codex输出图片/办公及文具用品/活页本/transparent-six-ring-binder-main-thumb.jpg", { cache: "force-cache" })
    .then((response) => response.ok ? response.blob() : null)
    .then((blob) => { if (!blob) return; const reader = new FileReader(); reader.onload = () => { state.surfaceData = reader.result; }; reader.readAsDataURL(blob); })
    .catch(() => { /* Local file previews can block fetch; the browser can still display the relative SVG image. */ });
}());
