import { useState, type FormEvent } from "react"
import styles from "./WordCountInput.module.css"

export default function WordCountInput() {
  const [wordCount, setWordCount] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(Number(wordCount))
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
