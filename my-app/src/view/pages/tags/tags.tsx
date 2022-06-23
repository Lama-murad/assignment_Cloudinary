import React, { useEffect } from "react";
import { useState } from "react";
import './tags.scss';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import { AiFillDelete } from "react-icons/ai";

function Tags() {
    const [name, setName] = useState('');
    const [data, setData] = useState([{ label: "", color: "", images: [] }]);
    const [edit, setEdit] = useState(false);

    const getData = () => {
        axios.get('http://localhost:4000/tags').then(({ data }) => setData(data));
        //   setData(data);
    }


    const handleRemoveItem = (id: any, e: any) => {
        const label = e.target;
        //  updateList(data.filter(item => item.label !== label));
        console.log(e);
        axios.delete(`http://localhost:4000/tags/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("tag removed successfully");

                // const tags = data.filter(item => item.id !== id);  
                // setData({ tags });  
            })
        //  .then(({data})=>console.log(data));
    };

    function handleEdit() {
        setEdit(!edit);
    }

    const handleEditItem = (id:any,e:any) => {
        // e.preventDefault();
        const label = e.target[0].value;

        console.log(label, "aaaa" )
        axios.patch(`http://localhost:4000/tags/${id}`, { label: label }).then(({ data }) =>{
            console.log(data)
            alert("tag's name edited successfully")
        } );

       
    };


    function handleChange(event: any) {
        setName(event.target.value);
        // track input field's state
    }

    function handleAdd(ev: any) {
        // ev.preventDefault();
        const form = ev.target;
        if(form[0].value){
        console.log({ form })
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        axios.post('http://localhost:4000/tags', { 'label': form[0].value, 'color': "#" + randomColor, "images": [] }).
            then((response) => console.log(response));
        alert("tag added successfully");
        }
        else{
            alert("no data!! try again");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="tag">
            <form className='formAddTag' onSubmit={handleAdd}>
                <input type="text" name="label" placeholder='insert tag"s label' />
                <Button className='addbtn' type="submit">Add</Button>
            </form>
            <div className="table">
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>tag's label</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((info: any, index) => {
                            return (
                                <tr key={info.id} style={{ backgroundColor: info.color }}>
                                    {edit ? ( 
                                     <><td> 
                                         <form onSubmit={(e) => { handleEditItem(info.id,e); }} id={info.id}>
                                            <input type="text" placeholder="edit tag's name" name="name" />
                                <button  type="submit">Update</button>
                                </form></td></>
                                
                                 
                                    ) : (
                                        <><td>{info.label}</td><td key={info.id}>
                                        <ButtonGroup className='grpbtn' variant="contained" aria-label="outlined small button group">

                                            <DeleteOutlinedIcon onClick={(e) => { handleRemoveItem(info.id, e); } } />
                                            /
                                            <EditIcon onClick={handleEdit} />
                                        </ButtonGroup>


                                    </td></>
                                
                                    )}
                                </tr>
                            );
                        }

                        )}

                    </tbody>
                </table>


            </div>

            {/* )} */}
        </div>
    )

}
export default Tags;



