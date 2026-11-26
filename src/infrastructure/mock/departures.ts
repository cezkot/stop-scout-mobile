export interface MockDeparture {
  id: string;
  routeId: number | string;
  headsign: string;
  theoreticalTime: string;
  delayInSeconds: number | null;
}

// Dane do ćwiczenia. Godziny nie są aktualnym rozkładem ZTM.
export const mockDepartures: MockDeparture[] = [
  { id: '1', routeId: 9, headsign: 'Strzyża PKM', theoreticalTime: '19:09', delayInSeconds: 12 },
  { id: '2', routeId: 2, headsign: 'Jelitkowo', theoreticalTime: '19:15', delayInSeconds: 0 },
  { id: '3', routeId: 12, headsign: 'Ujeścisko', theoreticalTime: '19:22', delayInSeconds: 150 },
  { id: '4', routeId: 6, headsign: 'Łostowice Świętokrzyska', theoreticalTime: '19:27', delayInSeconds: null },
  { id: '5', routeId: 8, headsign: 'Stogi Plaża', theoreticalTime: '19:31', delayInSeconds: 45 },
  { id: '6', routeId: 10177, headsign: 'Brętowo PKM', theoreticalTime: '19:36', delayInSeconds: 210 },
  { id: '7', routeId: 11, headsign: 'Lawendowe Wzgórze', theoreticalTime: '19:42', delayInSeconds: 0 },
  { id: '8', routeId: 5, headsign: 'Oliwa', theoreticalTime: '19:48', delayInSeconds: 85 },
  { id: '9', routeId: 199, headsign: 'Wały Piastowskie', theoreticalTime: '19:53', delayInSeconds: 130 },
];
