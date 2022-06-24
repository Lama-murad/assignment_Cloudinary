import React, { useEffect } from "react";
import { useState } from "react";
import './tags.scss';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import { TurnLeftTwoTone } from "@mui/icons-material";

function Tags() {
    const [name, setName] = useState('');
    const [data, setData] = useState([{ label: "", color: "", images: [] }]);
    const [edit, setEdit] = useState(true);
    const [id, setId] = useState(0);

    const getData = () => {
        axios.get('http://localhost:3010/tags').then(({ data }) => setData(data));
        //   setData(data);
    }


    const handleRemoveItem = (id: any, e: any) => {
        const label = e.target;
        //  updateList(data.filter(item => item.label !== label));
        console.log(e);
        axios.delete(`http://localhost:3010/tags/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("tag removed successfully");
                window.location.reload();
                // const tags = data.filter(item => item.id !== id);  
                // setData({ tags });  
            })
        //  .then(({data})=>console.log(data));
    };

    function handleEdit() {
        setEdit(!edit);
    }

    const handleEditItem = (id: any, e: any) => {
        // e.preventDefault();
        const label = e.target[0].value;
if(label){
        console.log(label, "aaaa")
        axios.patch(`http://localhost:3010/tags/${id}`, { label: label }).then(({ data }) => {
            console.log(data)
            alert("tag's name edited successfully")
        });
    }
    else{
        alert("no data!! try again");
    }

    };


    function handleChange(event: any) {
        setName(event.target.value);
        // track input field's state
    }
  

    function handleAdd(ev: any) {
        // ev.preventDefault();
        const form = ev.target;
        if (form[0].value) {
            console.log({ form })
            var randomColor = Math.random().toString(16).substr(-6);

            axios.post('http://localhost:3010/tags', { 'label': form[0].value, 'color': "#" + randomColor, "images": [] }).
                then((response) => console.log(response));
            alert("tag added successfully");
        }
        else {
            alert("no data!! try again");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="tag">
            <form className='formAddTag' onSubmit={handleAdd}>
                <input type="text" name="label" placeholder='add new tag' />
                <Button className='addbtn' type="submit">Add</Button>
            </form>
            <div className="tags">
                <h3>available tags</h3>
                <p>     <EditIcon onClick={handleEdit} />
                <CloseIcon onClick={handleEdit}></CloseIcon></p>
           
                {data.map((info: any, index: number) => {
                     let tagId=info.id;
                    // console.log(info.id,"tagidddd");
                    return (
                        <div key={info.id} className="info" style={{ backgroundColor: info.color }}>
                             {/* && checkIfSame(tagId,id) */}
                         {edit?  (
                                <><p>{info.label}  </p>
                                    <ButtonGroup className='grpbtn' variant="contained" aria-label="outlined small button group">

                                        <DeleteOutlinedIcon onClick={(e) => { handleRemoveItem(info.id, e); }} />
                                        
                                   
                                    </ButtonGroup></>
                            ) : (
                                <form className="info" onSubmit={(e) => { handleEditItem(info.id,e); }} id={info.id}>
                                    <input type="text" className="input" placeholder="edit tag's name" name="name" />
                                    <button className="btn" type="submit"><DoneIcon /></button>
                                </form>
                            )}

                        </div>
                    )
                })}

            </div>
        </div>
    )

}
export default Tags;







function  checkIfSame(id1: any, id2: number) {
    if(id1===id2) return true;
    else return false;
}
