import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './css/Addpost.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context';
import { createPost } from "../apiCalls";


export const Addpost = ({ titles, content }) => {
    //Skapar States för de värden som ska ändras.
    const [value, setValue] = React.useState("");
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [ingress, setIngress] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const inputFileRef = React.useRef(null);



    const navigate = useNavigate();

    const { login, setCurrentUser, currentUser, currentPost } = useContext(AuthContext);

    console.log(currentPost, " what here")
    const token = localStorage.getItem("jwt")

    useEffect(() => {
        if (currentPost) {
            setValue(currentPost.title)
            setTitle(currentPost.title)
        }
    }, [])



    const handleChangeFile = async () => {
        try {
            const formData = new FormData();
            const file = Event.target.files[0];
            formData.append('image', file);
            const { data } = await ('');

            setImageUrl(data.url);

        } catch (err) {
            console.warn(err);
            alert('Error');
        }
    };
    const onClickRemoveImage = () => { };

    const onChange = React.useCallback((value) => {
        setValue(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "50vh",
            autofocus: true,
            placeholder: "Skriv text...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    return (
        <div className="add-post-page">
            <Paper className="paper">

                <TextField
                    className="title"
                    variant="standard"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <SimpleMDE
                    className="editor"
                    value={value}
                    onChange={onChange}
                    options={options}
                />
                <div >
                    <Button className="button" size="large" variant="contained" onClick={() => { createPost(title, value); navigate("/") }}>
                        Publicera
                    </Button>
                    <Button size="large">Ta bort</Button>
                    <input type="button" value="Cancel" className="btn btn-secondary"
                        id="buttonCancel" onClick={() => { navigate("/") }} />
                </div>
            </Paper>
        </div>
    );
};
export default Addpost;