import styles from './Home.module.css'

export default function Home() {
  return (
    <section className={styles.hero}>
      <p className={styles.kicker}>Dashboard</p>
      <h1 className={styles.title}>Feel The Night</h1>
      <p className={styles.lede}>
        Community platform for fighting game players. Learn the fundamentals,
        read character guides and find people to run sets with.
      </p>
    </section>
  )
}
