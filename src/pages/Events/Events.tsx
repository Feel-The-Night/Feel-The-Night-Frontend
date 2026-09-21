import Media from '../../components/ui/Media/Media'
import EventCard from './EventCard'
import {
  featuredEvent,
  pastEvents,
  statusLabels,
  upcomingEvents,
  weeklySchedule,
} from './events.data'
import styles from './Events.module.css'

export default function Events() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Events</h1>

      <section className={styles.featured} aria-labelledby="featured-title">
        <Media
          className={styles.featuredMedia}
          asset={featuredEvent.media}
          alt=""
          overlay="left"
          fill
        />
        <div className={styles.featuredBody}>
          <p className={styles.kicker}>
            Next up &middot; {statusLabels[featuredEvent.status]}
          </p>
          <h2 className={styles.featuredName} id="featured-title">
            {featuredEvent.name}
          </h2>
          <p className={styles.featuredWhen}>
            {featuredEvent.date} &middot; {featuredEvent.time} &middot;{' '}
            {featuredEvent.type}
          </p>
          <p className={styles.featuredText}>{featuredEvent.description}</p>
          <div className={styles.actions}>
            <button className={styles.primary} type="button">
              Register
            </button>
            <button className={styles.secondary} type="button">
              Details
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="upcoming-title">
        <h2 className={styles.sectionTitle} id="upcoming-title">
          Upcoming events
        </h2>
        <ul className={styles.upcoming}>
          {upcomingEvents.map((event) => (
            <li key={event.id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.columns}>
        <section aria-labelledby="week-title">
          <h2 className={styles.sectionTitle} id="week-title">
            This week
          </h2>
          <ul className={styles.schedule}>
            {weeklySchedule.map((entry) => (
              <li className={styles.scheduleRow} key={entry.id}>
                <span className={styles.scheduleDay}>{entry.day}</span>
                <span className={styles.scheduleName}>{entry.name}</span>
                <span className={styles.scheduleTime}>{entry.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="past-title">
          <h2 className={styles.sectionTitle} id="past-title">
            Past events
          </h2>
          <ul className={styles.past}>
            {pastEvents.map((event) => (
              <li className={styles.pastRow} key={event.id}>
                <Media className={styles.pastThumb} asset={event.media} alt="" />
                <div className={styles.pastBody}>
                  <h3 className={styles.pastName}>{event.name}</h3>
                  <p className={styles.pastDate}>{event.date}</p>
                </div>
                <div className={styles.pastActions}>
                  {event.actions.map((action) => (
                    <button className={styles.ghost} key={action} type="button">
                      {action}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
