import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import Card from '../trainersCard/card';
import './images.scss'

//  this a functional Controller for Image - note: ES6 syntax
//  too few stuff to use a class Controller
function Image(){
  const [img, setImg] = useState("");
  const [api, setAPI] = useState([]);
  const imageUrl = "https://picsum.photos/id/237/200/300";
  // https://picsum.photos/v2/list?limit=10
  //https://picsum.photos/id/237/200/300


  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);

  };
  // axios.get('http://localhost:3004/tags').then(({data})=>setData(data));
  // axios.post('http://localhost:3004/tags',{'label':form[0].value, 'color':form[1].value}).
  // then((response)=>console.log(response));
  function getAPI() {
    return new Promise((resolve, reject) => {
      fetch(`https://picsum.photos/v2/list?limit=10`)
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
    fetchImage();

    getAPI().then((e: any) => {
      setAPI(e);
      // axios.post('http://localhost:3004/images',{e}).then((response)=>console.log(response));
      console.log(e);
    });
  }, []);

  return (
  <div>

      {/* <img src={img} alt="icons" /> */}
   
<div className='images'>
{api.map((trainer:any, index) => {
                    return <Card key={index} author={trainer.author} height={trainer.height}
                    width={trainer.width}
                    url={trainer.download_url} ></Card>
                })}
      {/* {
      api.map((e: any,index) => {
    
        // console.log(e.url);
        let imgURL=`"${e.download_url}"`;
        console.log(imgURL,"hhhhhhhhhhh")
          return (<>
        
          <img src={imgURL}></img>
          <p>{e.id}</p>
          <p>{e.author}</p>
          <p>{e.height}</p>
          <p>{e.width}</p>
          <p>"{e.url}"</p>
          </>
          )
          
        })} */}
        </div>
{/* <img src="https://picsum.photos/id/0/5616/3744" alt="bb" /> */}
        {/* <img src="https://unsplash.com/photos/6-jTZysYY_U"></img> */}
        {/* <img src="https://unsplash.com/photos/tBtuxtLvAZs" alt="aaaa" /> */}
        </div>
  
  );

 

}

export default Image;