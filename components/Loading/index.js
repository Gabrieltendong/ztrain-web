import HashLoader from "react-spinners/HashLoader";
import styles from "./style.module.scss"

const Loading = () => {
    return(
        <div id={styles.container}>
            <HashLoader />
        </div>
    )
}

export default Loading