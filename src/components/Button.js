import styles from './Button.module.css'
export const Button = ({children, onClick, type}) => {
  return (
    <button onClick = {onClick} className={`${styles.button} ${styles[type]}`}>{children}</button>
  )
}
