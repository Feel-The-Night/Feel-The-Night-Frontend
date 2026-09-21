/**
 * Sample community events. Names reuse the content already present in the
 * project (Rachão da UNIBR, Summer Workshop, Training Grounds Nº2, Celestial
 * Rumble); dates, times and statuses are placeholder metadata for the UI.
 */

import { eventsMedia, type MediaAsset } from '../../assets/media'

export type EventStatus = 'open' | 'soon' | 'closed'

export type EventMode = 'online' | 'offline'

export type CommunityEvent = {
  id: string
  name: string
  date: string
  time: string
  type: string
  mode: EventMode
  status: EventStatus
  description?: string
  media: MediaAsset
}

export type PastEvent = {
  id: string
  name: string
  date: string
  actions: string[]
  media: MediaAsset
}

export type ScheduleEntry = {
  id: string
  day: string
  name: string
  time: string
}

export const featuredEvent: CommunityEvent = {
  id: 'rachao-da-unibr',
  name: 'Rachão da UNIBR',
  date: 'Saturday, 26 September',
  time: '20:00 BRT',
  type: 'Community tournament',
  mode: 'online',
  status: 'open',
  media: eventsMedia.featured,
  description:
    'Open bracket for every skill level. Bring a character, run your sets and stay for the after-hours lobbies.',
}

export const upcomingEvents: CommunityEvent[] = [
  {
    id: 'summer-workshop',
    name: 'Summer Workshop',
    date: '29 September',
    time: '19:00 BRT',
    type: 'Workshop',
    mode: 'online',
    status: 'open',
    media: eventsMedia.summerWorkshop,
  },
  {
    id: 'training-grounds',
    name: 'Training Grounds Nº2',
    date: '02 October',
    time: '20:30 BRT',
    type: 'Training',
    mode: 'online',
    status: 'soon',
    media: eventsMedia.trainingGrounds,
  },
  {
    id: 'celestial-rumble',
    name: 'Celestial Rumble',
    date: '11 October',
    time: '15:00 BRT',
    type: 'Tournament',
    mode: 'offline',
    status: 'soon',
    media: eventsMedia.celestialRumble,
  },
  {
    id: 'matchup-lab',
    name: 'Matchup Lab',
    date: '18 October',
    time: '19:00 BRT',
    type: 'Lab session',
    mode: 'online',
    status: 'closed',
    media: eventsMedia.matchupLab,
  },
]

export const weeklySchedule: ScheduleEntry[] = [
  { id: 'tue', day: 'Tue', name: 'Beginner Night', time: '19:00' },
  { id: 'thu', day: 'Thu', name: 'Training Grounds', time: '20:30' },
  { id: 'sat', day: 'Sat', name: 'Rachão da UNIBR', time: '20:00' },
  { id: 'sun', day: 'Sun', name: 'Summer Workshop', time: '17:00' },
]

export const pastEvents: PastEvent[] = [
  {
    id: 'beginner-night-04',
    name: 'Beginner Night #04',
    date: '12 September',
    actions: ['Results', 'VOD'],
    media: eventsMedia.matchupLab,
  },
  {
    id: 'celestial-rumble-arena',
    name: 'Celestial Rumble Arena',
    date: '30 August',
    actions: ['Results', 'Gallery'],
    media: eventsMedia.matchupLab,
  },
  {
    id: 'training-grounds-01',
    name: 'Training Grounds Nº1',
    date: '21 August',
    actions: ['VOD'],
    media: eventsMedia.matchupLab,
  },
]

export const statusLabels: Record<EventStatus, string> = {
  open: 'Open',
  soon: 'Soon',
  closed: 'Closed',
}
