// Obfuscated DPS implementation - protects proprietary algorithm
import { colors as _c, Color } from './colors';
import { tokens as _t, getColorForToken as _g } from './tokens';

interface _I { [k: string]: Color; }
const _cs = _c as unknown as _I;

function _p(e: string): { b: string; m: string | null; p?: number; } {
  if (!e.includes(':')) return { b: e, m: null };
  const [b, mp] = e.split(':');
  
  if (mp.includes('(') && mp.includes(')')) {
    const rx = mp.match(/([a-z]+)\((\d+)\)/);
    if (rx) {
      const [, md, ps] = rx;
      return { b, m: md, p: parseInt(ps, 10) };
    }
  }
  
  return { b, m: mp };
}

function _r(r: string): { f: string, s: string } | null {
  if (r.includes('-')) {
    const rc = _g(r);
    const cr = rc || r;
    const [f, s] = cr.split('-');
    
    if (_cs[f] && _cs[f][s]) {
      return { f, s };
    }
  }
  return null;
}

export function transform(colorRef: string, modifier: string | null = null, params?: number): string | null {
  const i = _r(colorRef);
  if (!i) return null;
  
  const { f, s } = i;
  const cf = _cs[f];
  
  if (!modifier) return cf[s] as string;
  
  switch (modifier) {
    case 'up': {
      const sn = parseInt(s, 10);
      const ns = Math.min(1000, sn + 100).toString();
      return cf[ns] as string;
    }
    case 'down': {
      const sn = parseInt(s, 10);
      const ps = Math.max(100, sn - 100).toString();
      return cf[ps] as string;
    }
    case 'alpha': return cf.a && cf.a[s] ? cf.a[s] : null;
    case 'oklch': return cf.oklch && cf.oklch[s] ? cf.oklch[s] : null;
    case 'p3': return cf.p3a && cf.p3a[s] ? cf.p3a[s] : null;
  }
  
  if (modifier.startsWith('up') && params !== undefined) {
    const sn = parseInt(s, 10);
    const ts = Math.min(1000, sn + (params * 100)).toString();
    return cf[ts] as string;
  }
  
  if (modifier.startsWith('down') && params !== undefined) {
    const sn = parseInt(s, 10);
    const ts = Math.max(100, sn - (params * 100)).toString();
    return cf[ts] as string;
  }
  
  return null;
}

export function transformDPS(dpsExpression: string): string | null {
  const { b, m, p } = _p(dpsExpression);
  return transform(b, m, p);
}