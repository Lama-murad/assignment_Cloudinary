import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import Card from '../../components/imagesCard/card';

import './images.scss'

//  this a functional Controller for Image - note: ES6 syntax
//  too few stuff to use a class Controller
function Image() {
  const [img, setImg] = useState("");
  const [apiImages, setAPI] = useState([]);
  const [tags, setTags] = useState([]);
  // const [photoTags, setPhotoTags] = useState(Array<String>);


  function getAPI() {
    return new Promise((resolve, reject) => {
      fetch(`https://picsum.photos/v2/list?limit=18`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function saveImages() {
    {
      apiImages.map((img: any, index: any) => {
        axios.post('http://localhost:3010/images', { "author": img.author, "url": img.download_url, "tagged": false }).
          then((response) => console.log(response));
      })
    }


  }

  useEffect(() => {

    getAPI().then((e: any) => {
      setAPI(e);
  
    });
    // saveImages();

    // saveImages(apiImages)

  }, []);



  return (

    <div className='images'>
      {
        apiImages.map((img: any, index) => {

          return <Card key={index} author={img.author} height={img.height}
            width={img.width}
            url={img.download_url} id={img.id} ></Card>
        })
      }

    </div>

  );

}

export default Image;