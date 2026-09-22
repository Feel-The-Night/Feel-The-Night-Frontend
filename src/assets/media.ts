/**
 * Central registry for the artwork the interface expects.
 *
 * The files do not exist yet. Each entry describes the slot so components can
 * render an intentional placeholder now and the real image later without any
 * layout change: add the import and set `src`.
 *
 *   import dashboardPromo from './images/dashboard-promo.png'
 *   promo: { ...promo, src: dashboardPromo }
 *
 * `alt` is the accessible name. An empty string marks the image as
 * decorative, which is correct when a nearby heading already names it.
 */

export type ObjectFit = 'cover' | 'contain'

/** CSS object-position value, e.g. 'center', 'top', '50% 20%'. */
export type ObjectPosition = string

export type MediaAsset = {
  /** Imported file. Undefined while the artwork is missing. */
  src?: string
  alt: string
  /** Intrinsic size the slot is designed for, in CSS pixels. */
  width: number
  height: number
  fit?: ObjectFit
  /** Keeps the important subject in frame when the slot is cropped. */
  position?: ObjectPosition
}

function slot(
  alt: string,
  width: number,
  height: number,
  position: ObjectPosition = 'center',
  fit: ObjectFit = 'cover',
): MediaAsset {
  return { alt, width, height, position, fit }
}

export const dashboardMedia = {
  background: slot('', 1920, 1080, 'center top'),
  promo: slot('Under Night In-Birth key art', 735, 800, 'center top'),
  newsRachao: slot('', 502, 564, 'center'),
  newsSummerWorkshop: slot('Summer Workshop', 367, 97, 'center'),
  newsZate: slot('Zate', 367, 97, 'center'),
  newsTrainingGrounds: slot('Training Grounds Nº2', 367, 97, 'center'),
  newsCelestialRumble: slot('Celestial Rumble Arena', 367, 97, 'center'),
} as const

export const startMedia = {
  selectYourCharacter: slot('', 880, 340, 'center 35%'),
  understandYourPower: slot('', 880, 340, 'center 40%'),
  defenceIsAnOffence: slot('', 880, 340, 'center 45%'),
  getOutOfJail: slot('', 880, 340, 'center 40%'),
} as const

export const communityMedia = {
  background: slot('', 1920, 1080, 'center'),
  discordUnderNightBrasil: slot('', 128, 128),
  discordUwuseChile: slot('', 128, 128),
  discordGuardThrusters: slot('', 128, 128),
  discordPlayerHub: slot('', 128, 128),
  socialUnderNightBrasil: slot('', 480, 270, 'center top'),
  socialZate: slot('', 480, 270, 'center top'),
  socialUniOfficial: slot('', 480, 270, 'center top'),
  socialUniCl: slot('', 480, 270, 'center top'),
} as const

export const charactersMedia = {
  background: slot('', 1920, 1080, 'center'),
  /** One portrait per roster slot; keyed by character id once the roster exists. */
  portrait: slot('', 130, 250, 'center top'),
} as const

export const guidesMedia = {
  /** Character thumbnail on a guide row. */
  thumbnail: slot('', 68, 96, 'center top'),
} as const

export const registerMedia = {
  background: slot('', 1920, 1080, 'center'),
} as const

export const eventsMedia = {
  featured: slot('', 1600, 600, 'center 30%'),
  summerWorkshop: dashboardMedia.newsSummerWorkshop,
  trainingGrounds: dashboardMedia.newsTrainingGrounds,
  celestialRumble: dashboardMedia.newsCelestialRumble,
  matchupLab: slot('', 480, 270, 'center'),
} as const
