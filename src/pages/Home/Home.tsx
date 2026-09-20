import NewsCard from './NewsCard'
import styles from './Home.module.css'

const featuredNews = { name: 'Rachão' }

const secondaryNews = [
  { name: 'Summer Workshop' },
  { name: 'Zate' },
  { name: 'Training Grounds' },
  { name: 'Celestial Rumble' },
]

export default function Home() {
  return (
    <div className={styles.dashboard}>
      <section className={styles.promo} aria-label="Featured">
        <div className={styles.promoArt} />
      </section>

      <section className={styles.news}>
        <h1 className={styles.newsTitle}>Community news</h1>

        <div className={styles.newsGrid}>
          <NewsCard name={featuredNews.name} variant="featured" />

          <ul className={styles.newsList}>
            {secondaryNews.map((item) => (
              <li key={item.name}>
                <NewsCard name={item.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
