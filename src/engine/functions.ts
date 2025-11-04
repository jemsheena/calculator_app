import { Big } from './big/Big';
import { AngleMode } from './index';

export function sin(x: Big, angleMode: AngleMode): Big {
  const radians = angleMode === 'DEG' ? degToRad(x) : x;
  return radians.sin();
}

export function cos(x: Big, angleMode: AngleMode): Big {
  const radians = angleMode === 'DEG' ? degToRad(x) : x;
  return radians.cos();
}

export function tan(x: Big, angleMode: AngleMode): Big {
  const radians = angleMode === 'DEG' ? degToRad(x) : x;
  return radians.tan();
}

function degToRad(deg: Big): Big {
  // π/180
  const PI = Big.from('3.1415926535897932384626433832795');
  const ONE_EIGHTY = Big.from('180');
  return deg.mul(PI).div(ONE_EIGHTY);
}

export function ln(x: Big): Big {
  return x.ln();
}

export function log10(x: Big): Big {
  return x.log10();
}

export function sqrt(x: Big): Big {
  return x.sqrt();
}

export function pow(base: Big, exponent: Big): Big {
  return base.pow(exponent);
} 