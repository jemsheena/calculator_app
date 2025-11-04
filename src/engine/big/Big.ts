import Decimal from 'decimal.js';

// Configure decimal.js for high precision
Decimal.set({ precision: 24, rounding: Decimal.ROUND_HALF_UP });

export class Big {
  private value: Decimal;

  constructor(value: string | number | Big) {
    if (value instanceof Big) {
      this.value = value.value;
    } else {
      this.value = new Decimal(value);
    }
  }

  static from(value: string | number | Big): Big {
    return new Big(value);
  }

  add(other: Big): Big {
    return new Big(this.value.plus(other.value));
  }

  sub(other: Big): Big {
    return new Big(this.value.minus(other.value));
  }

  mul(other: Big): Big {
    return new Big(this.value.times(other.value));
  }

  div(other: Big): Big {
    if (other.value.isZero()) {
      throw new Error('Division by zero');
    }
    return new Big(this.value.div(other.value));
  }

  mod(other: Big): Big {
    return new Big(this.value.mod(other.value));
  }

  pow(other: Big): Big {
    return new Big(this.value.pow(other.value));
  }

  sqrt(): Big {
    if (this.value.isNegative()) {
      throw new Error('Square root of negative number');
    }
    return new Big(this.value.sqrt());
  }

  sin(): Big {
    return new Big(this.value.sin());
  }

  cos(): Big {
    return new Big(this.value.cos());
  }

  tan(): Big {
    return new Big(this.value.tan());
  }

  ln(): Big {
    if (this.value.lte(0)) {
      throw new Error('Natural log of non-positive number');
    }
    return new Big(this.value.ln());
  }

  log10(): Big {
    if (this.value.lte(0)) {
      throw new Error('Log10 of non-positive number');
    }
    return new Big(this.value.log(10));
  }

  neg(): Big {
    return new Big(this.value.neg());
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  isNaN(): boolean {
    return this.value.isNaN();
  }
}
