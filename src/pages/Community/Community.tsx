import CommunityCard, { type CommunityEntry } from './CommunityCard'
import styles from './Community.module.css'

/* Server and account names come from the approved Community screen. Member
   counts and handles are the ones printed in that design. */
const servers: CommunityEntry[] = [
  { id: 'under-night-brasil', name: 'Under Night Brasil', meta: '269 online · 1.5k members' },
  { id: 'uwuse-chile', name: 'UwUse [sys: CL] Chile', meta: '121 online · 894 members' },
  { id: 'guard-thrusters', name: 'Guard Thrusters', meta: '1 online · 2 members' },
  {
    id: 'uni-player-hub',
    name: 'Under Night In-Birth Player Hub',
    meta: '9.673 online · 20.030 members',
  },
]

const social: CommunityEntry[] = [
  { id: 'x-under-night-brasil', name: 'Under Night Brasil', meta: '@UnderNightBr' },
  { id: 'x-zate', name: 'AdK | Zate', meta: '@zatezz' },
  { id: 'x-uni-official', name: 'Under Night In-Birth (公式)', meta: '@UNIB_official' },
  { id: 'x-uni-cl', name: 'Under Night In-Birth CL', meta: '@UnderNightCL' },
]

export default function Community() {
  return (
    <div className={styles.page}>
      <h1 className={styles.srOnly}>Community</h1>

      <div className={styles.columns}>
        <section className={styles.panel} aria-labelledby="discord-title">
          <h2 className={styles.panelTitle} id="discord-title">
            Join us on Discord!
          </h2>
          <ul className={styles.list}>
            {servers.map((entry) => (
              <li key={entry.id}>
                <CommunityCard {...entry} />
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="social-title">
          <h2 className={styles.panelTitle} id="social-title">
            Follow us on our social media!
          </h2>
          <ul className={styles.socialGrid}>
            {social.map((entry) => (
              <li key={entry.id}>
                <CommunityCard {...entry} variant="social" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
