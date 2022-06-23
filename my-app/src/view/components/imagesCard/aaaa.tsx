import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './PhotosList.scss';

function PhotosList() {
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [photoTags, setPhotoTags] = useState(Array<String>);
    const [url, setUrl] = useState("");
    const [id, setId] = useState(0);
    const open = Boolean(anchorEl);

    const handleClick = (event: any, photo:any) => {
        //setPhotoTags([]);
        setId(photo.id);
        setUrl(photo.url);
        getPhotoTags(photo.id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPhotoTags([]);
    };

    useEffect(() => {
        getPhotos();
        getTags();
    },[]);

    async function getPhotoTags(id:any){
        try {
            const response = await axios.get(`http://localhost:4000/images/${id}`);
            if(response){
                setPhotoTags(response.data.tags);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getPhotos() {
        try {
            const response = await axios.get(`http://localhost:4000/images`);
            if (response) {
                setPhotos(response.data);
                //console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

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

    function handleAddTag(tagName: any) {
        if (!photoTags.includes(tagName)) {
            setPhotoTags([...photoTags, tagName]);
            //console.log(photoTags);
        }
    }

    async function handleApply() {
        tags.map(async (tag: any) => {
            if (photoTags.includes(tag.name) && !tag.photos.includes(url)) {
                try {
                    const response = await axios.patch(`http://localhost:4000/tags/${tag.id}`, { 'photos': [...tag.photos, url] });
                    //console.log(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        })
        try {
            const response = await axios.patch(`http://localhost:4000/images/${id}`, {'tags': photoTags});
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='PhotosList'>
            {photos.map((photo: any, index: number) => {
                return (
                    <div key={index} className='photo'>
                        <img src={photo.url} alt="hi" aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(ev:any)=> handleClick(ev, photo)} />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ height: '400px', overflowY: 'scroll' }}
                        >
                            {tags.map((tag: any, index: number) => {
                                return (
                                    <MenuItem key={index} sx={{ 'backgroundColor': photoTags.includes(tag.name) ? `${'#' + tag.color}` : 'white' }}
                                        onClick={() => handleAddTag(tag.name)}>
                                        {tag.name}
                                    </MenuItem>
                                );
                            })}
                            <button style={{marginLeft:'23%'}} onClick={() => { handleClose(); handleApply() }}>Apply</button>
                        </Menu>
                    </div>
                );
            })}
        </div>
    );
}

