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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



interface cardProp {
  tag: {
    label: string;
    color: string;
    images: [];

  }
}

function TagsCard(prop: cardProp) {
  const [tags, setTags] = useState([{ label: "", color: "", images: [] }]);


  const getData = () => {
    axios.get('http://localhost:3010/tags').then(({ data }) => setTags(data));
  }

  //removing the chosen image from the tag's list
  const handleRemoveItem = (imageUrl: any, tag: any) => {
    tags.filter((t: any) => {
      if (t.label === tag.label) {
        tag.images = tag.images.filter((img: any) => {
          return img != imageUrl;
        })
        axios.patch(`http://localhost:3010/tags/${tag.id}`, { "images": tag.images }).then((response) => {
          alert("image removed successfully from the tag!");
        })

      }
    })
  }


  useEffect(() => {

    getData()
  }, [])

  //displaying the tag with images that were assigned to it.
  return (
    <div className="tagsCard">
      <p className="tagName" style={{ backgroundColor: prop.tag.color }}>{prop.tag.label}</p>

      {prop.tag.images.length ? (
        // array exists and is not empty:
        <p className='taggedImages'>
          <p >
            {prop.tag.images.map((i) => (
              <><img className='image' src={i}></img>
                <DeleteOutlinedIcon onClick={(e) => { handleRemoveItem(i, prop.tag); }} /></>
            ))}
          </p>
        </p>
      ) : (
        <p></p>
      )
      }


      {/* </div> */}


    </div>

  )
}
export default TagsCard;