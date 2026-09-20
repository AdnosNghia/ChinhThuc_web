import { useMemo } from 'react';

type Application = { industry: string; description: string };
const parse = <T,>(value: string, fallback: T): T => { try { const parsed = JSON.parse(value || ''); return parsed as T; } catch { return fallback; } };

export function HighlightsEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const items = useMemo(() => parse<string[]>(value, []).filter(Boolean), [value]);
  const update = (next: string[]) => onChange(JSON.stringify(next));
  return <div className="metadata-editor"><b>Đặc điểm nổi bật</b>{items.length === 0 && <small>Chưa có đặc điểm nổi bật. Bấm “+ Thêm dòng”.</small>}{items.map((item, index) => <div className="metadata-row" key={index}><input aria-label={`Đặc điểm nổi bật ${index + 1}`} value={item} onChange={e => update(items.map((row, i) => i === index ? e.target.value : row))}/><button type="button" onClick={() => update(items.filter((_, i) => i !== index))}>Xóa</button></div>)}<button type="button" className="metadata-add" onClick={() => update([...items, ''])}>+ Thêm dòng</button></div>;
}

export function ApplicationsEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const items = useMemo(() => parse<Application[]>(value, []).filter(item => item && (item.industry || item.description)), [value]);
  const update = (next: Application[]) => onChange(JSON.stringify(next));
  return <div className="metadata-editor"><b>Ứng dụng theo ngành</b>{items.length === 0 && <small>Chưa có ứng dụng. Bấm “+ Thêm ngành”.</small>}{items.map((item, index) => <div className="application-edit-row" key={index}><input aria-label={`Ngành ${index + 1}`} placeholder="Ngành" value={item.industry} onChange={e => update(items.map((row, i) => i === index ? { ...row, industry: e.target.value } : row))}/><input aria-label={`Mô tả ứng dụng ${index + 1}`} placeholder="Mô tả ứng dụng" value={item.description} onChange={e => update(items.map((row, i) => i === index ? { ...row, description: e.target.value } : row))}/><button type="button" onClick={() => update(items.filter((_, i) => i !== index))}>Xóa</button></div>)}<button type="button" className="metadata-add" onClick={() => update([...items, { industry: '', description: '' }])}>+ Thêm ngành</button></div>;
}
