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
  id: string;
}

function Card(prop: cardProp) {
  const [tags, setTags] = useState([{ label: "", id: "" }]);
  //the chosen tags for the images
  const [tagName, settagName] = React.useState<string[]>([]);
  const [tagData, setTagData] = useState({ label: "", id: "", images: [] });
  const [tagImages, setTagImages] = useState<string[]>([]);

  const getData = () => {
    axios.get('http://localhost:3010/tags').then(({ data }) => setTags(data));

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
    e.preventDefault();

    {
      tagName.map((t: any, index) => {
        console.log(t, "tttttttttt")

        let arr: any[] = [];
        axios.get(`http://localhost:3010/tags/${t}`).
          then((response) => {
            console.log(response.data.images,"response")
            setTagImages([...tagImages, img.url])
            arr = [response.data.images]
            console.log("arr",arr[0])

            
            if(!arr[0].includes(img.url)){
            axios.patch(`http://localhost:3010/tags/${t}`, { "images": [...response.data.images, img.url] }).
              then((response) => console.log(response));
              alert("image added successfully to "+response.data.label  );
            }
            else{
              alert("image already exists in "+ response.data.label+ "!");
            }



          });
     
        // window.location.reload();


      })
    }


  }

  useEffect(() => {
    // getData()
    const interval = setInterval(() => {
      getData()
    }, 3000);
  }, [])

  return (
    <div className="MainCard">
      <img className='imgMainCard' src={prop.url}></img>
      <div className='txt'>
        <p className='formControl'>
          {/* <p> author:  {prop.author}</p> */}
          <FormControl sx={{ m: 1, height: 50, width: 80, top: 0, fontSize: 'xx-small' }} size="small" >
            <InputLabel id="demo-multiple-checkbox-label">  <AiFillTag ></AiFillTag></InputLabel>
            <Select
              size="small"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={tagName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(tagName) => tagName.join(', ')}
              MenuProps={MenuProps}
            >
              {tags.map((t) => (
                <MenuItem key={t.label} value={t.id}>
                  <Checkbox size="small" checked={tagName.indexOf(t.id) > -1} />
                  <ListItemText primary={t.label} sx={{ m: 1, height: 50,fontSize: 'xxx-small' }} />
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