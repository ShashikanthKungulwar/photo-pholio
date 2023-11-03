import styles from "./Albums.module.css"
import tumbnail from "../../images/tumbnail.png"
import { useEffect, useState } from "react"
import AddField from "./AddField";
import AlbumContent from "../AlbumContent/AlbumContent";
import { db } from "../../firebaseInit";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
import toastComp from "../../ToastComp";
import Spinner from 'react-spinner-material';


export default function Albums(props) {
    const [addBool, setAddBool] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);


    function handleAdd() {
        setAddBool(!addBool)
    }

    async function addAlbum(album) {
        const id = new Date().toISOString().trim();
        await setDoc(doc(db, 'albums', id), { ...album, id: id });
        toastComp("album added succesfully")
    }

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
            const albums = snapShot.docs.map((doc) => {
                return doc.data();
            }).reverse();
            setAlbums([...albums]);
        })
        setAddBool(props.bool)
        setLoading(false);
        return () => { unsub() };
    }, []);


    return (
        <>{
            loading ? <Spinner radius={120} color={"blue"} stroke={5} visible={true} style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}/> :
                <>
                    {addBool ? <AddField addAlbum={addAlbum} /> : null}
                    <div className={styles.head}>

                        <h1>Your album</h1>
                        <button
                            onClick={handleAdd}
                            className={addBool ? styles.red : styles.blue}>

                            {addBool ? "Cancel" : "Add album"}

                        </button>
                    </div>
                    <div className={styles.mainContainer}>
                        {/* {console.log(props.albums)} */}
                        {albums.map((item, i) => (
                            <Card key={i} data={item} setContent={props.setContent} bool={addBool} />
                        ))}
                    </div>
                </>
        }
        </>
    )
}
    
function Card(props) {
    function openFolder() {
        props.setContent(<AlbumContent id={props.data.id} title={props.data.title} setContent={props.setContent} bool={props.bool} />);
    }
    return (
        <div className={styles.album} onClick={() => { openFolder() }}>
            <div>
                <img src={tumbnail} alt="icon" width={50} height={50} />
                <span>{props.data.title}</span>
            </div>
        </div>
    )
}