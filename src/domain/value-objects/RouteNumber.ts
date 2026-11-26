export class RouteNumber {
  readonly value: string;

  constructor(rawId: number | string | null | undefined) {
    const text = String(rawId ?? '').trim();
    const number = Number(text);

    if (text === '') {
      this.value = '?';
    } else if (Number.isInteger(number)) {
      // TRISTAR zapisuje prefiks operatora przed czterema cyframi numeru linii.
      this.value = String(number >= 10000 ? number % 10000 : number);
    } else {
      this.value = text.toUpperCase();
    }
  }

  isNightLine(): boolean {
    return this.value.startsWith('N');
  }

  equals(other: RouteNumber | null | undefined): boolean {
    return this.value === other?.value;
  }

  toString(): string {
    return this.value;
  }
}
