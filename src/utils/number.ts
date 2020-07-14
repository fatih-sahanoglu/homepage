export const minMax = (min: number, max: number, n: number): number =>
	Math.max(min, Math.min(max, n));
export const price = (n: number): string => `${n.toFixed(2)} €`;
export const toPhone = (phone: string) => phone.replace("+", "00").replace(/[\s+-]/g, "");
