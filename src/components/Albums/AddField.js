
import { useRef } from "react"
import styles from "./AddField.module.css"
export default function AddField(props) {
    const inputRef=useRef("");
    return (
        <div className={styles.container}>
            <form onSubmit={(e)=>{e.preventDefault();props.addAlbum({title:inputRef.current.value});inputRef.current.value="";inputRef.current.focus()}}>
                <div><h1>Create an album</h1></div>
                <div>
                    <input required placeholder="Album Name" ref={inputRef}/>
                    <button type="button" className={styles.red} onClick={()=>{inputRef.current.value=""}}>Clear</button>
                    <button className={styles.blue}>Create</button>
                </div>
            </form>
        </div>
    )
}