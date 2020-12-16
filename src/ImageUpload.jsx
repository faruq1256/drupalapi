import React, { useState } from 'react';
import Http from './api/Http';
import {BASE_URL} from './constants/Constants';

const ImageUpload = () => {
    const [image, setImage] = useState();

    const InputEvent = (event) => {
        console.log(event.target.files);
        
        setImage(event.target.files[0]);
    }
    const clickEvent = (event) => {
        event.preventDefault();
        const imgName = image.name;
        const formData = new FormData();
        
        // const handleFileRead = async (event) => {
            async function handleFileRead () {
            // const file = event.target.files[0]
            const base64 = await convertBase64(image);
            
            console.log("ENTER");
            console.log(base64);
            upoadImage(base64, formData);
          }
          handleFileRead();



        formData.append('myImage', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData);
        async function upoadImage(base64, formData) {
            const data = {
                "_links": {
                    "type": {
                        "href": ``${BASE_URL}/rest/type/file/image`
                    }
                },
                "filename": [
                    {
                        "value":imgName
                    }
                ],
                "data": [
                    {
                        "value": base64
                    }
                ]
            }
       await Http.post(`/entity/file?_format=hal_json`, data)
    .then((res) => {
 
      console.log("RESPONSE RECEIVED: ", res.data);

     })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
        }
        

    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
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