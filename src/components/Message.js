import styles from './Message.module.css'
export const Message = ({message}) => {
  return (
    <div className= {styles.messageContainer}>
        <span>👋🏾👋🏾 {message} </span> 
    </div>
  )
}
