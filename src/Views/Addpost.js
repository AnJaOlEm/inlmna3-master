import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './css/Addpost.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context';
import { createPost, updatePost } from "../apiCalls";
import { Header } from "../components/Header";


export const Addpost = ({ title, content }) => {
    //Skapar States för de värden som ska ändras.
    const [postContent, setPostContent] = React.useState("");
    const [postTitle, setPostTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [ingress, setIngress] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [oldTitle, setOldTitle] = React.useState();


    const inputFileRef = React.useRef(null);



    const navigate = useNavigate();

    const { login, setCurrentUser, currentUser, currentPost, editing } = useContext(AuthContext);

    console.log(currentPost, " what here")
    const token = localStorage.getItem("jwt")


    useEffect(() => {
        console.log(currentPost, " This is current post in add post")
        setPostContent(currentPost?.content)
        setPostTitle(currentPost?.title)
        setOldTitle(currentPost?.title)


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

    const onChange = React.useCallback((content) => {
        setPostContent(content);
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
            <Header/>
            <Paper className="paper">

                <TextField
                    className="title"
                    variant="standard"
                    placeholder="Title..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    fullWidth
                />
                <SimpleMDE
                    className="editor"
                    value={postContent}
                    onChange={onChange}
                    options={options}
                />
                <div >
                    <Button className="button" size="large" variant="contained" onClick={() => { editing ? updatePost(oldTitle, postTitle, postContent, token) : createPost(postTitle, postContent, token); navigate("/") }}>
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