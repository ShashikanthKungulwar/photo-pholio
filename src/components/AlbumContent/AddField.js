import { useRef } from "react";
import styles from "./AddField.module.css";
import { db } from "../../firebaseInit";
import { collection, setDoc, doc } from "firebase/firestore";

export default function AddField(props) {
    // Refs for input fields
    const titleRef = useRef("");
    const urlRef = useRef("");

    // Function to add a new image
    async function handleAddImage(title, url) {
        // Call the parent component's addImage function with the new image data
        props.addImage({ title: titleRef.current.value, url: urlRef.current.value });

        // Clear the input fields after adding
        titleRef.current.value = "";
        urlRef.current.value = "";
    }

    // Function to edit an existing image
    function handleEditImage(title, url) {
        // Call the parent component's editDatabase function with updated image data
        props.editDatabase({
            title: titleRef.current.value,
            url: urlRef.current.value,
            id: props.editData.data.id,
        });

        // Clear the input fields after editing
        titleRef.current.value = "";
        urlRef.current.value = "";
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.editData.edit
                        ? handleEditImage(titleRef.current.value, urlRef.current.value)
                        : handleAddImage(titleRef.current.value, urlRef.current.value);
                }}
            >
                <div style={{ display: "block" }}>
                    <h1>Add an image to foldername{"need to do"}</h1>
                </div>
                <div>
                    <input
                        required
                        placeholder="Title"
                        ref={titleRef}
                        defaultValue={props.editData.data.title}
                    />
                    <input
                        required
                        placeholder="Image URL"
                        ref={urlRef}
                        defaultValue={props.editData.data.url}
                    />
                    <div style={{ display: "block" }}>
                        <button
                            type="button"
                            className={styles.red}
                            onClick={() => {
                                // Clear input fields when "Clear" button is clicked
                                titleRef.current.value = "";
                                urlRef.current.value = "";
                            }}
                        >
                            Clear
                        </button>
                        <button className={styles.blue}>
                            {props.editData.edit ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
