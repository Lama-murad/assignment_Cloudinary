import React, { useEffect } from "react";
import { useState } from "react";
import './tags.scss';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import { AiFillDelete } from "react-icons/ai";

function Tags(){
    const [list, updateList] = useState([{label:"",color:""}]);
    const [name, setName] = useState('');
    const [data,setData]=useState([{label:"",color:""}]);
    const [edit, setEdit] = useState(false);

    const getData=()=>{
          axios.get('http://localhost:3004/tags').then(({data})=>setData(data));
        //   setData(data);
      }
     

    const handleRemoveItem = (id:any,e:any) => {
        const label = e.target;
        //  updateList(data.filter(item => item.label !== label));
        console.log(e);
         axios.delete(`http://localhost:3004/tags/${id}`)
         .then(res => {  
            console.log(res);  
            console.log(res.data);  
        
            // const tags = data.filter(item => item.id !== id);  
            // setData({ tags });  
          })  
        //  .then(({data})=>console.log(data));
       };

       function handleEdit() {
        setEdit(!edit);
      }

       const handleEditItem = (id:any,e:any) => {
        e.preventDefault();
        const label = e.target.getAttribute("label")
      axios.patch(`http://localhost:3004/tags/${id}`,{ author:'best ever author'}).then(({data})=>console.log(data));
       };


       function handleChange(event:any) {
        setName(event.target.value);
        // track input field's state
      }
    
      function handleAdd(ev:any) {
        ev.preventDefault();
        const form = ev.target;
        console.log({form})
        // name: form[0].value, level: form[1].value
        const newList = data.concat({label:form[0].value , color:form[1].value});

        console.log(newList)
        setData(newList);
      
          axios.post('http://localhost:3004/tags',{'label':form[0].value, 'color':form[1].value}).
          then((response)=>console.log(response));
  alert("tag added successfully");
      }

      useEffect(()=>{
        getData()
      },[])

    return(
        <div className="tag">
{/* {edit? ( */}
             {/* <div className="addTag"> */}
                    <form className='formAddOffer' onSubmit={handleAdd}>
                        <input type="text" name="label" placeholder='insert tag"s label' />
                        <input type="text" name="color" placeholder='insert tags"s color' />
                        <Button className='addbtn' type="submit">Add</Button>
                    </form>

                {/* </div> */}
                <div className="tagsTable">
                            <table className="table table-striped">
                                <thead>
                                    {/* <tr className="mainTH">
                                        <th >available tags</th>

                                    </tr> */}
                                    <tr>
                                        <th>tag's label</th>
                                        <th>tag's color</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((info: any, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{info.label}</td>
                                                <td>{info.color} {info.id}</td>
                                                <td key={info.id}>
                                                    <ButtonGroup className='grpbtn' variant="contained" aria-label="outlined small button group">
                                                        {/* <AiFillDelete /> */}
                                                        <DeleteOutlinedIcon onClick={(e) => { handleRemoveItem(info.id, e); } } />
                                                        /
                                                        <EditIcon  onClick={(e) => { handleEditItem(info.id, e); }} />
                                                    </ButtonGroup>


                                                </td>
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



