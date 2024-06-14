import "./MakePlaylist.css";
import JSZip from 'jszip';
import { useState, useEffect } from 'react';
import GetCookie from "./GetCookie.jsx"

export default function MakePlaylist(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState(null);

    const MAX_TITLE_LENGTH = 50;

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        if (event.target.value.length <= MAX_TITLE_LENGTH) {
            setTitle(event.target.value);
        }
    };

    const handleUpload = async () => {
        if (selectedFile && title != null && title != "") {
            const csrfToken = GetCookie('csrftoken');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', selectedFile);
    
            const res = await fetch('/create_playlist/', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });
        } else {
            if(title == null || title == ""){
                console.log("Please enter title")
            }
            else{
                console.log("No uploaded file")
            }
        }
    };

    return (
        <div>
            <h2>Upload your music!</h2>
                <div id="name-container">
                    <label>Playlist Name: </label>
                    <input id="playlist-name" type="text" onChange={handleTitleChange} />
                </div>
                <div id="file-container">
                    <h3>Upload a zip file containing your mp3 files</h3>
                    <input id="file" name="file" type="file" onChange={handleFileChange} />
                    <button id="submit" onClick={handleUpload}>Upload</button>
                </div>
        </div>
    );
}