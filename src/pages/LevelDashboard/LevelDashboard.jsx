import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>VELOOP REWARDS</p>
        <h1>Level-Up Dashboard</h1>
        <p className={styles.description}>
          Your new rewards experience starts here.
        </p>
        <div className={styles.placeholder}>
          <span className={styles.dot} />
          <div>
            <strong>Project foundation is ready</strong>
            <p>Dashboard sections will be developed in the next phases.</p>
          </div>
        </div>
        <p className={styles.note}>Development scaffold · Demo environment</p>
      </div>
    </main>
  )
}