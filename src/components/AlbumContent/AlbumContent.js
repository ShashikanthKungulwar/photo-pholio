import { useEffect, useState } from "react";
import AddField from "./AddField";
import Albums from "../Albums/Albums";
import { collection, onSnapshot, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import noImage from "../../images/no-image.png";
import edit from "../../images/edit.png";
import bin from "../../images/trash.png";
import { toast } from "react-toastify";
import toastComp from "../../ToastComp";
import styles from "./AlbumContent.module.css";
import back from "../../images/back.png";

export default function AlbumContent(props) {
    const [addBool, setAddBool] = useState(false);
    const [images, setImages] = useState([]);
    const [editData, setEditData] = useState({ data: { title: "", url: "" }, edit: false });
    const [show, setShow] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [slideIdx, setSlideIdx] = useState(-1);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        // Subscribe to changes in the Firestore collection
        const unsub = onSnapshot(collection(db, `albums/${props.id}/images`), (snapShot) => {
            // Extract image data from the Firestore snapshot
            const images = snapShot.docs.map((doc) => doc.data()).reverse();
            setImages(images);
        });
        
        return () => unsub(); // Unsubscribe when the component unmounts
    }, [props.id]);

    const handleAdd = () => {
        // Toggle the addBool state to show/hide the AddField component
        setAddBool(!addBool);
        // Reset editData to clear any previous editing data
        setEditData({ data: { title: "", url: "" }, edit: false });
    };

    const addImage = async (image) => {
        // Generate a unique ID for the new image
        const id = new Date().toISOString().trim();
        // Add the image to the Firestore collection
        await setDoc(doc(db, `albums/${props.id}/images`, id), {
            ...image,
            id: id,
        });
        // Display a success toast message
        toastComp("Photo added successfully");
    };

    const handleDelete = async (e,idx) => {
        e.stopPropagation()
        // Delete the selected image from the Firestore collection
        await deleteDoc(doc(db, `albums/${props.id}/images`, images[idx].id));
        // Display a success toast message
        toastComp("Photo deleted successfully");
    };

    const handleEdit = (e,idx) => {
        e.stopPropagation()
        // Enable edit mode and populate editData with the selected image data
        setAddBool(true);
        setEditData({ data: images[idx], edit: true });
    };

    const editDatabase = async (data) => {
        // Update the image data in the Firestore collection
        await setDoc(doc(db, `albums/${props.id}/images`, data.id), data);
        // Reset editData to exit edit mode
        setEditData({ data: { title: "", url: "" }, edit: false });
        // Display a success toast message
        toastComp("Photo updated successfully");
    };

    const handleClick = (idx) => {
        // Toggle the image showcase modal
        setShow(!show);

        if (idx !== null) {
            // Set the index and image data for the image being clicked
            setSlideIdx(idx);
            setImageData(images[idx]);
        }
    };

    const backward = () => {
        let idx = slideIdx;
        if (idx === 0) idx = images.length;
        // Move to the previous image in the showcase
        setSlideIdx(--idx);
        setImageData(images[idx]);
    };

    const forward = () => {
        // Move to the next image in the showcase (looping)
        const idx = (slideIdx + 1) % images.length;
        setSlideIdx(idx);
        setImageData(images[idx]);
    };

    return (
        <>
            {addBool ? (
                <AddField addImage={addImage} editData={editData} editDatabase={editDatabase} />
            ) : null}
            <div className={styles.head}>
                <img
                    src={back}
                    alt="backIcon"
                    onClick={() => {
                        props.setContent(<Albums setContent={props.setContent} bool={props.bool} />);
                    }}
                />
                <h1>{images.length ? `Images from ${props.title}` : `No images found in the album ${props.title}`}</h1>
                <button
                    onClick={handleAdd}
                    className={addBool ? styles.red : styles.blue}
                >
                    {addBool ? "Cancel" : "Add image"}
                </button>
            </div>

            <div className={styles.mainContainer}>
                {images.map((item, i) => (
                    <Card
                        key={i}
                        data={item}
                        idx={i}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleClick={handleClick}
                    />
                ))}
            </div>
            {show ? <ShowCase imageData={imageData} handleClick={handleClick} forward={forward} backward={backward} /> : null}
        </>
    );
}

function Card(props) {
    return (
        <div className={styles.image} onClick={() => props.handleClick(props.idx)}>
            <span className={styles.iconHolder}>
                <img
                    src={edit}
                    className={styles.iconButton}
                    onClick={(e) => props.handleEdit(e,props.idx)}
                />
                <img
                    src={bin}
                    className={styles.iconButton}
                    onClick={(e) => props.handleDelete(e,props.idx)}
                />
            </span>
            <img src={props.data.url} alt="url" onError={(e) => { e.target.src = noImage; }} />
            <span>{props.data.title}</span>
        </div>
    );
}

function ShowCase(props) {
    return (
        <div className={styles.slide}>
            <button className={`${styles.slideButton} ${styles.X}`} onClick={props.handleClick}>
                X
            </button>
            <button className={styles.slideButton} onClick={props.backward}>
                {"<"}
            </button>
            <img src={props.imageData.url} alt={props.imageData.title} />
            <button className={styles.slideButton} onClick={props.forward}>
                {">"}
            </button>
        </div>
    );
}
