import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  /**
   * Used to convertDecimal when writing to the database.
   */
  to(decimal?: Decimal): string {
    return decimal?.toString();
  }
  /**
   * Used to convert Decimal when reading from the database.
   */
  from(decimal?: string): Decimal | null {
    return decimal ? new Decimal(decimal) : null;
  }
}

export const DecimalToString = (decimals = 2) => {
  return ({ value }) => {
    return value?.toFixed?.(decimals) || value;
  };
};
