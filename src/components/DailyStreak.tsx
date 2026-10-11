import { useEffect, useState } from "react"
import styles from "./DailyStreak.module.css"
import {
  getLocalDate,
  readWordCounts,
  WORD_COUNTS_UPDATED_EVENT,
  type WordCountEntry,
} from "../utils/wordCounts"

function getDailyStreak(entries: WordCountEntry[]) {
  const countsByDate = new Map(entries.map((entry) => [entry.date, entry.wordcount]))
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  if ((countsByDate.get(getLocalDate(currentDate)) ?? 0) <= 0) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  let streak = 0
  while ((countsByDate.get(getLocalDate(currentDate)) ?? 0) > 0) {
    streak += 1
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

export default function DailyStreak() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const refreshStreak = () => setStreak(getDailyStreak(readWordCounts()))

    refreshStreak()
    window.addEventListener(WORD_COUNTS_UPDATED_EVENT, refreshStreak)
    return () => window.removeEventListener(WORD_COUNTS_UPDATED_EVENT, refreshStreak)
  }, [])

  return (
    <section className={styles.streak} aria-labelledby="daily-streak-title">
      <svg
        className={styles.star}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="m12 2 2.95 6.13 6.77.99-4.9 4.78 1.16 6.75L12 17.46l-6.06 3.19 1.16-6.75-4.9-4.78 6.77-.99L12 2Z" />
      </svg>
      <div>
        <h2 className={styles.title} id="daily-streak-title">
          Daily Streak
        </h2>
        <p className={styles.count}>
          {streak} {streak === 1 ? "day" : "days"}
        </p>
        <p className={styles.caption}>in a row writing</p>
      </div>
    </section>
  )
}
