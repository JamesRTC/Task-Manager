import styles from './Header.module.css'
export const Header = () => {
  return (
    <div className= {styles.headerWrapper}>
      <h1 className={styles.appTitle}>TASK MANAGER</h1>
      <h3 className={styles.appDescription}> Keep track of your daily activities</h3>
    </div>
  )
}
