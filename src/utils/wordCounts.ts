export type WordCountEntry = {
  date: string
  wordcount: number
}

export const WORD_COUNTS_STORAGE_KEY = "wordCounts"
export const WORD_COUNTS_UPDATED_EVENT = "wordCountsUpdated"

export function getLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function readWordCounts(): WordCountEntry[] {
  const storedWordCounts = localStorage.getItem(WORD_COUNTS_STORAGE_KEY)

  if (storedWordCounts === null) {
    return []
  }

  const parsed: unknown = JSON.parse(storedWordCounts)
  if (
    !Array.isArray(parsed) ||
    !parsed.every(
      (entry): entry is WordCountEntry =>
        typeof entry === "object" &&
        entry !== null &&
        "date" in entry &&
        typeof entry.date === "string" &&
        "wordcount" in entry &&
        typeof entry.wordcount === "number" &&
        Number.isFinite(entry.wordcount),
    )
  ) {
    throw new Error(
      `Stored word counts in "${WORD_COUNTS_STORAGE_KEY}" have an invalid format.`,
    )
  }

  return parsed
}

export function saveWordCount(wordcount: number, date = new Date()) {
  const dateString = getLocalDate(date)
  const entries = readWordCounts()
  const existingEntry = entries.find((entry) => entry.date === dateString)

  if (existingEntry) {
    existingEntry.wordcount = wordcount
  } else {
    entries.push({ date: dateString, wordcount })
  }

  localStorage.setItem(WORD_COUNTS_STORAGE_KEY, JSON.stringify(entries))
}
