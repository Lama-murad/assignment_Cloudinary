import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import Card from '../../components/imagesCard/card';

import './images.scss'


function Image() {
  const [apiImages, setAPI] = useState([]);

  // Retrieve a list of photos
  function getAPI() {
    return new Promise((resolve, reject) => {
      fetch(`https://picsum.photos/v2/list?limit=12`)
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

  useEffect(() => {

    getAPI().then((e: any) => {
      setAPI(e);

    });


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