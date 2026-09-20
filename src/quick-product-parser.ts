export type ParsedQuickProduct = { description: string; highlights: string[]; applications: Array<{ industry: string; description: string }>; specs: Array<{ model: string; values: Record<string, string> }>; categorySuggestion: string };
const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
const bullet = /^\s*[-–•]\s*(.+)$/;
const field = /^\s*(?:[-–]\s+)?([^:]{1,80}):\s*(.+)$/;
const application = /^\s*(?:[-–•]\s*)?Ngành\s+([^:]+):\s*(.+)$/i;
export function suggestCategory(value: string, categories: string[]) { const input = normalize(value); if (!input) return ''; let best = { name: '', score: 0 }; for (const name of categories) { const target = normalize(name); const tokens = input.split(/\s+/).filter(Boolean); const score = tokens.filter(token => target.includes(token)).length / Math.max(tokens.length, 1); if (score > best.score) best = { name, score }; } return best.score >= 0.5 ? best.name : ''; }
export function parseQuickProductText(text: string, categories: string[] = []): ParsedQuickProduct {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean); const highlights: string[] = []; const applications: Array<{ industry: string; description: string }> = []; const values: Record<string, string> = {}; const descriptionLines: string[] = []; let inHighlights = false; let inSpecs = false; let lastStandalone = '';
  for (const line of lines) {
    if (/^đặc điểm nổi bật\s*:??$/i.test(line)) { inHighlights = true; inSpecs = false; continue; }
    if (/^(thông số kỹ thuật|thông số|specifications?)\s*:??$/i.test(line)) { inSpecs = true; inHighlights = false; continue; }
    const app = line.match(application); if (app) { applications.push({ industry: app[1].trim(), description: app[2].trim() }); inHighlights = false; continue; }
    const item = line.match(bullet);
    if (inHighlights) { if (item) { highlights.push(item[1].trim()); continue; } if (!line.includes(':')) { inHighlights = false; continue; } }
    if (item && !line.includes(':')) { highlights.push(item[1].trim()); continue; }
    const pair = line.match(field);
    if (pair && inSpecs) { const key = pair[1].trim(); const value = pair[2].trim(); if (!/^giới thiệu$/i.test(key) && !Object.entries(values).some(([existingKey, existingValue]) => existingValue === value && /vật liệu|chất liệu/i.test(existingKey) && /vật liệu|chất liệu/i.test(key))) values[key] = value; continue; }
    if (pair && /^[-–]\s+/.test(line)) { const key = pair[1].trim(); const value = pair[2].trim(); if (!/^giới thiệu$/i.test(key)) values[key] = value; continue; }
    if (pair && !inSpecs) { if (!descriptionLines.length && !line.includes('Giới thiệu')) descriptionLines.push(line); continue; }
    if (!line.includes(':') && !item) { if (!descriptionLines.length) descriptionLines.push(line); else lastStandalone = line; }
  }
  return { description: descriptionLines.join(' ').trim(), highlights, applications, specs: Object.keys(values).length ? [{ model: 'Mặc định', values }] : [], categorySuggestion: suggestCategory(lastStandalone, categories) };
}
