import { dashboardMedia } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import NewsCard, { type NewsItem } from './NewsCard'
import styles from './Home.module.css'

const featured: NewsItem = {
  id: 'rachao-da-unibr',
  name: 'Rachão da UNIBR',
  media: dashboardMedia.newsRachao,
  tagline: "What's the color of your soul?",
  date: 'Sábado - 06/04',
  time: '19:00',
  channel: 'twitch.tv/undernightbr',
}

const news: NewsItem[] = [
  {
    id: 'summer-workshop',
    name: 'Summer Workshop',
    media: dashboardMedia.newsSummerWorkshop,
  },
  { id: 'zate', name: 'Zate', media: dashboardMedia.newsZate },
  {
    id: 'training-grounds',
    name: 'Training Grounds Nº2',
    media: dashboardMedia.newsTrainingGrounds,
  },
  {
    id: 'celestial-rumble',
    name: 'Celestial Rumble Arena',
    media: dashboardMedia.newsCelestialRumble,
  },
]

export default function Home() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.srOnly}>Feel The Night</h1>

      <section className={styles.promo} aria-label="Under Night In-Birth">
        <Media
          className={styles.promoMedia}
          asset={dashboardMedia.promo}
          overlay="bottom"
          fill
        />
        <p className={styles.promoFooter}>
          <span className={styles.buy}>Buy now!</span>
        </p>
      </section>

      <section className={styles.news} aria-labelledby="news-title">
        <h2 className={styles.newsTitle} id="news-title">
          Community news
        </h2>

        <div className={styles.newsGrid}>
          <NewsCard {...featured} variant="featured" />

          <ul className={styles.newsList}>
            {news.map((item) => (
              <li key={item.id}>
                <NewsCard {...item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
