import { useEffect, useState } from "react"
import styles from "./WeeklyStats.module.css"
import {
  getLocalDate,
  readWordCounts,
  WORD_COUNTS_UPDATED_EVENT,
  type WordCountEntry,
} from "../utils/wordCounts"

type DayStat = {
  date: string
  label: string
  wordcount: number
}

function getLastSevenDays(entries: WordCountEntry[]): DayStat[] {
  const countsByDate = new Map(entries.map((entry) => [entry.date, entry.wordcount]))

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - index)
    const dateString = getLocalDate(date)

    return {
      date: dateString,
      label: date.toLocaleDateString(undefined, { weekday: "long" }),
      wordcount: countsByDate.get(dateString) ?? 0,
    }
  })
}

export default function WeeklyStats() {
  const [days, setDays] = useState<DayStat[]>([])

  useEffect(() => {
    const refreshStats = () => setDays(getLastSevenDays(readWordCounts()))

    refreshStats()
    window.addEventListener(WORD_COUNTS_UPDATED_EVENT, refreshStats)
    return () => window.removeEventListener(WORD_COUNTS_UPDATED_EVENT, refreshStats)
  }, [])

  const maxWordCount = Math.max(...days.map((day) => day.wordcount), 0)

  return (
    <section className={styles.stats}>
      <h2 className={styles.title}>weekly writing stats</h2>
      <div className={styles.chart} aria-label="Word counts for the last seven days">
        {days.map((day) => {
          const width = maxWordCount > 0 ? (day.wordcount / maxWordCount) * 100 : 0

          return (
            <div className={styles.row} key={day.date}>
              <span className={styles.day}>{day.label}</span>
              <div className={styles.barTrack}>
                <div className={styles.bar} style={{ width: `${width}%` }}>
                  <span className={styles.value}>{day.wordcount}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
