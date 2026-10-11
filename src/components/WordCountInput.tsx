import { useState, type FormEvent } from "react"
import styles from "./WordCountInput.module.css"
import { saveWordCount, WORD_COUNTS_UPDATED_EVENT } from "../utils/wordCounts"

export default function WordCountInput() {
  const [wordCount, setWordCount] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const submittedWordCount = Number(wordCount)
    saveWordCount(submittedWordCount)
    window.dispatchEvent(new Event(WORD_COUNTS_UPDATED_EVENT))
    console.log(submittedWordCount)
    setWordCount("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="word-count">
        How many words have you written today?
      </label>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          id="word-count"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={wordCount}
          onChange={(event) => setWordCount(event.target.value)}
          required
        />
        <button className={styles.submitButton} type="submit">
          Log words
        </button>
      </div>
    </form>
  )
}
