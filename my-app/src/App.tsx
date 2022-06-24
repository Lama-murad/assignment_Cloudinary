import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { useEffect, useState } from "react";
import Tags from './view/pages/tags/tags';
import Image from './view/pages/images/images';
import ImageTags from './view/pages/imagesTags/imagesTags';


function App() {
  const imageUrl = "https://picsum.photos/v2/list?limit=100";

  const [image, setImg] = useState([]);

  return (
    <div className="App">
      <div className='firstComponent'>
        <Tags />
      </div>


      <div className='secComponent'>
        <Image />

        <ImageTags />
      </div>


    </div>
  );
}

export default App;
