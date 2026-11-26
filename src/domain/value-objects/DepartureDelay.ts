export type DelaySeverity = 'ON_TIME' | 'MINOR' | 'MAJOR';

export class DepartureDelay {
  readonly seconds: number;
  readonly severity: DelaySeverity;
  readonly formattedText: string;

  constructor(seconds: number | null | undefined) {
    this.seconds = seconds ?? 0;

    if (this.seconds <= 0) {
      this.severity = 'ON_TIME';
      this.formattedText = 'Na czas';
    } else if (this.seconds < 120) {
      this.severity = 'MINOR';
      this.formattedText = `+${this.seconds}s`;
    } else {
      this.severity = 'MAJOR';
      this.formattedText = `+${Math.floor(this.seconds / 60)} min`;
    }
  }

  get shouldAnimate(): boolean {
    return this.severity === 'MAJOR';
  }

  isDelayed(): boolean {
    return this.seconds > 0;
  }

  equals(other: DepartureDelay | null | undefined): boolean {
    return this.seconds === other?.seconds;
  }
}
