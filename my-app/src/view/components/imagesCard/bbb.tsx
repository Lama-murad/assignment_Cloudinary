import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './AssignedPhotos.scss';

function AssignedPhotos() {
    const [tags, setTags] = useState([]);
    //const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getTags();
    }, [tags]);

    async function getTags() {
        try {
            const response = await axios.get('http://localhost:4000/tags');
            if (response) {
                setTags(response.data);
                //console.log(response);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handlePhotoRemove(photoUrl:any, tagName:any) {
        console.log(photoUrl + " " + tagName);
        try {
            tags.filter(async (tag:any) => {
                if(tag.name === tagName){
                    let newPhotos = tag.photos;
                    newPhotos = newPhotos.filter((photo:any) => {
                        return photo != photoUrl; 
                    })
                    const response = await axios.patch(`http://localhost:4000/tags/${tag.id}`, {"photos": newPhotos});
                }
            })
        } catch (error) {
            console.log(error);
        }
        try {
            let response = await axios.get('http://localhost:4000/images');
            let photos = response.data;
            //console.log(photos);
            let photoInfo = photos.filter((photo:any) => {
                if(photo.url === photoUrl){
                    return photo;
                }
            });
            let tags = photoInfo[0].tags.filter((tag:any) => {
                if(tag != tagName){
                    return tag;
                }
            })
            console.log(tags);
            try {
                const response = await axios.patch(`http://localhost:4000/images/${photoInfo[0].id}`, {'tags' : tags});
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='AssignedPhotos'>
            {tags.map((tag: any, index: number) => {
                return (
                    <div key={index} className='tagBox'>
                        <div className='tagName' style={{ "backgroundColor": `${"#" + tag.color}` }}>
                            <p>{tag.name}</p>
                        </div>
                        <div className='tagPhotos'>
                            {tag.photos.map((photo: any, index_: number) => {
                                return (
                                    <div key={index_} className='photo'>
                                        <img src={photo} alt="" />
                                        <DeleteIcon sx={{ fontSize: 30, color: '#b5739d' }} onClick={() => handlePhotoRemove(photo, tag.name)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AssignedPhotos;