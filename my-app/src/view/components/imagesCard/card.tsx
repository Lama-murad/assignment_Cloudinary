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
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 150,
   
    },
  },
};


interface cardProp {
  author: string;
  width: number;
  height: number;
  url: string;
}

function Card(prop: cardProp) {
  const [tags, setTags] = useState([{ label: "", id: "" }]);
  //the chosen tags for the images
  const [tagName, settagName] = React.useState<string[]>([]);
  const [tagData, setTagData] = useState({ label: "", id: "", images: [] });
  const [tagImages, setTagImages] = useState<string[]>([]);
  const getData = () => {
    axios.get('http://localhost:4000/tags').then(({ data }) => setTags(data));

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
    console.log({ tagName });
  };

  function handleChoseTag(img: any, e: any) {
    // e.preventDefault();
    console.log(img, "imggg")

    {
      tagName.map((t: any, index) => {
        console.log(t, "tttttttttt")

        let arr: any[] = [];
        axios.get(`http://localhost:4000/tags/${t}`).
          then((response) => {
            setTagImages([...tagImages, img.url])
            arr = [...tagImages, img.url]
            console.log(response.data.images, "hhhhhhhh", arr)

            axios.patch(`http://localhost:4000/tags/${t}`, { "images": [...response.data.images, img.url] }).
              then((response) => console.log(response));
            alert("tag added successfully");
          });
      })
    }


  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="MainCard">
        <img className='imgMainCard' src={prop.url}></img>
        <div className='imgMaintxt'>
          <p className='formControl'>
          <p> author:  {prop.author}</p>
            <FormControl  sx={{ m: 1,height:50,width:100,top:0}} size="small" >
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
                  <MenuItem key={t.label} value={t.id}>
                    <Checkbox checked={tagName.indexOf(t.id) > -1} />
                    <ListItemText primary={t.label} />
                  </MenuItem>
                ))}
                <button onClick={(e) => handleChoseTag(prop, e)}>apply</button>
              </Select>

            </FormControl>
          </p>
        </div>
    </div>

  )
}
export default Card;