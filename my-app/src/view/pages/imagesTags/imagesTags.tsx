import axios from "axios";
import { useEffect, useState } from "react";
import TagsCard from "../../components/tagsCard/tagsCard";
import './imageTags.scss'


function ImageTags() {
  const [img, setImg] = useState("");
  const [data, setData] = useState([{ label: "", color: "", images: [] }]);

  const getData = () => {
    axios.get('http://localhost:4000/tags').then(({ data }) => setData(data));
    //   setData(data);
  }


  useEffect(() => {
    getData()
  }, [])


  return (

    <div className="imageTags">
      {data.map((t: any, index) => {

        return (
          // <p style={{backgroundColor: t.color}}>{t.label}</p>
          <TagsCard key={index} tag={t}

          //    prop.tag.img={t.images} 
          ></TagsCard>
        )
      })}
    </div>

  )


}

export default ImageTags;