import React, { useState } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState();

    const InputEvent = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }
    const clickEvent = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('myImage', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData);

    }
    return(
        <>
        <form onSubmit={clickEvent}   >
            <input type="file" name='img' onChange={InputEvent} />
            <button>Upload</button>
        </form>
        </>
    );

}

export default ImageUpload