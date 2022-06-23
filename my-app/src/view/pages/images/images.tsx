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
      fetch(`https://picsum.photos/v2/list?limit=4`)
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

  function saveImages(images:any)
  {
    {
      images.map((img: any, index:any) => {
        axios.post('http://localhost:4000/images',{"author":img.author,"url":img.download_url,"tagged":false}).
        then((response)=>console.log(response));
      })
    }
    //  {
//         images.map((img: any, index:any) => {
// console.log(img)
//         })
//       }
//     axios.post('http://localhost:4000/images',{img}).
//     then((response)=>console.log(response));


  }

  useEffect(() => {

    getAPI().then((e: any) => {
      setAPI(e);
      console.log(e,"eeeeeeee")
      saveImages(e)
      // axios.post('http://localhost:4000/images',{img}).
      // then((response)=>console.log(response));
    });

    // saveImages(apiImages)

  }, []);



  return (

      <div className='images'>
        {
        apiImages.map((img: any, index) => {
     
          return <Card key={index} author={img.author} height={img.height}
            width={img.width}
            url={img.download_url} ></Card>
        })
      }
       
        
   

      </div>

  );



}

export default Image;