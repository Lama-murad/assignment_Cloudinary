import axios from "axios";
import { useEffect, useState } from "react";
import ImgCard from "../../components/tagsCard/tagsCard";


function ImageTags(){
    const [img, setImg] = useState("");
    const [data,setData]=useState([{label:"",color:"",imgURL:""}]);

    const getData=()=>{
        axios.get('http://localhost:3004/tags').then(({data})=>setData(data));
      //   setData(data);
    }

    
    useEffect(()=>{
        getData()
      },[])


      return(
         
         <div className="imageTags">
               {data.map((t:any, index) => {
    
       return (
          // <p style={{backgroundColor: t.color}}>{t.label}</p>
        <ImgCard key={index} tag={t} 
                   
                   img={t.images} ></ImgCard>
       )
                })}
         </div>

      )


}

export default ImageTags;