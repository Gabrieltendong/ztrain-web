import styles from './style.module.scss'

const Toast = ({text}) => {
    return(
        <div id={styles.container}>
            <div >
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Toast