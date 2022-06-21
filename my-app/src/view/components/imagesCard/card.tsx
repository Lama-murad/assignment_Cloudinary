import { AiFillTag } from 'react-icons/ai';
import './card.scss'
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
import ImgCard from '../tagsCard/tagsCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


interface cardProp {
    author: string;
    width:number;
    height:number;
    url: string;
}

function Card(prop: cardProp) {
    const [tags,setTags]=useState([{label:"",id:""}]);
    //the chosen tags for the images
    const [tagName, settagName] = React.useState<string[]>([]);


    const getData=()=>{
        axios.get('http://localhost:3004/tags').then(({data})=>setTags(data));
  
      //   setData(data);
    }

        // const [tag, setTag] = React.useState<string[]>([]);
      
        const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
          const {
            target: { value },
          } = event;
          settagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          
          );
          console.log({tagName});
        };

        function handleChoseTag(img:any,e:any){
          e.preventDefault();
          console.log(img,"imggg")
    
          // const newList = data.concat({label:form[0].value , color:form[1].value});
          // console.log(newList)
          // setData(newList);
        
          {tagName.map((t:any, index) => {
            console.log(t,"tttttttttt")
            // axios.patch(`http://localhost:3004/tags/${t}`,{'author':img.author, 'url':img.download_url,'height':img.height,'width':img.width}).
            // axios.patch(`http://localhost:3004/tags/${id}`,{ author:'best ever author'}).then(({data})=>console.log(data));
             // axios.patch('http://localhost:3004/posts/2', {readers:['Jame',"bob", 'alis']}).then(({data})=>console.log(data))
            axios.patch(`http://localhost:3004/tags/${t}`,{images:[img.url]}).
            // `"${e.download_url}"`
            then((response)=>console.log(response));
    alert("tag added successfully");
        })}

        }

        useEffect(()=>{
            getData()
          },[])
        
    return (
        <div className="MainDiv">
         <div className="MainCard">
            <img className='imgMainCard' src={prop.url}></img>
            <div className='imgMaintxt'>
            <p> author:  {prop.author}</p> 
    {/* <button onClick={handleTag}> <AiFillTag ></AiFillTag></button> */}
            <p className='formControl'>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">  <AiFillTag ></AiFillTag></InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          // onClick={(e) => { handleRemoveItem(info.id, e); } }
          onClose={(e)=> handleChoseTag(prop,e)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tags.map((t) => (
            <MenuItem key={t.label} value={t.id}>
              <Checkbox checked={tagName.indexOf(t.id) > -1} />
              <ListItemText primary={t.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </p>
        </div>
        </div>
    <div className='secCard'>
        {/* {tags.map((t:any, index) => {
    
       return (
          // <p style={{backgroundColor: t.color}}>{t.label}</p>
        <ImgCard key={index} tag={t} 
                   
                   img={t.images} ></ImgCard>
       )
                })} */}
   </div>
        </div>

    )
}
export default Card;