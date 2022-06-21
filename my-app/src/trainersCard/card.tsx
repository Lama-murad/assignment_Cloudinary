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
    const [tags,setTags]=useState([{label:""}]);
    const [tagName, settagName] = React.useState<string[]>([]);

    function handleTag(){
       
            axios.get('http://localhost:3004/tags').then(({data})=>setTags(data));
          //   setData(data);
         

    }

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

        useEffect(()=>{
            getData()
          },[])
        
    return (
        <div className="MainCard">
            <img className='imgMainCard' src={prop.url}></img>
            <div className='imgMaintxt'>
            <p> author:  {prop.author}</p> 
    {/* <button onClick={handleTag}> <AiFillTag ></AiFillTag></button> */}
           
        
            <div className='formControl'>
      <FormControl sx={{ m: 1, width: 100 }}>
        <InputLabel id="demo-multiple-checkbox-label">  <AiFillTag ></AiFillTag></InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tags.map((t) => (
            <MenuItem key={t.label} value={t.label}>
              <Checkbox checked={tagName.indexOf(t.label) > -1} />
              <ListItemText primary={t.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
        </div>
        </div>

    )
}
export default Card;