import axios from "axios";
import { useEffect, useState } from "react";
import TagsCard from "../../components/tagsCard/tagsCard";
import './imageTags.scss'


function ImageTags() {
  const [data, setData] = useState([{ label: "", color: "", images: [] }]);

  //getting the tags from the json db
  const getData = () => {
    axios.get('http://localhost:3010/tags').then(({ data }) => setData(data));
  }


  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 3000);

  }, [])


  return (

    <div className="imageTags">
      {data.map((t: any, index) => {

        return (
          <TagsCard key={index} tag={t}

          ></TagsCard>
        )
      })}
    </div>

  )


}

export default ImageTags;