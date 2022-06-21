import { AiFillTag } from 'react-icons/ai';
import './tagsCard.scss'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';



interface cardProp {
    tag:{
        label:string;
        color:string;
        
        }
img:{
    author:string;
    url:string;

}
}

function ImgCard(prop: cardProp) {
    const [tags,setTags]=useState([{label:"",color:""}]);
    const [tagsImages,setTagsImages]=useState([{author:"",url:""}]);


    const getData=()=>{
        axios.get('http://localhost:3004/tags').then(({data})=>setTags(data));
        axios.get('http://localhost:3004/imagesTags').then(({data})=>setTagsImages(data))
  
      //   setData(data);
    }

      

        useEffect(()=>{
            getData()
          },[])
        
    return (
        <div className="MainCard1">
          <p style={{backgroundColor: prop.tag.color}}>{prop.tag.label}</p>
  
            <div className='imgMaintxt1'>
            {/* {tags.map((t) => (
              <img className='imgMainCard' src={prop.img.url}></img>
          ))} */}
     

        </div>

    
        </div>

    )
}
export default ImgCard;