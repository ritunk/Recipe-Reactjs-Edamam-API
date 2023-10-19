import React,{useEffect,useState} from "react";
import { BsSearch } from "react-icons/bs";
import {fetchData} from "../service";

const RecipeLists = (props) => {
  const [searchedTearm,setSearchedTearm] = useState('')
  const [query,setQuery] = useState('pizza')
  const [data,setData] = useState('')

  const searchrecipe=(searchQuery)=>{
      fetchData(searchedTearm).then((response)=>{
        setData(response)
        props.setLoader(false)
       // console.log(data);

      })
      
  }

    useEffect(()=>{
            fetchData(query).then((response)=>{
              setData(response)
              props.setLoader(false)
            })
    },[])

   

  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input onChange={(e)=> setSearchedTearm(e.target.value)}  value = {searchedTearm} type="text"  placeholder='Search Your recipe' />
          <button onClick={()=> (searchrecipe(searchrecipe) , props.setLoader(true))}>
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
       { 
        data && data.hits.map((item,index)=> (

          <div key={index} className="flexItem">
          <div className="img-wrapper">
            <img
              src={item.recipe.image}
              alt={item.recipe.label}
            />
          </div>
          <p>{item.recipe.label}</p>
         </div>

        ))
       }
       
        
       
      
      </div>
    </div>
  );
};

export default RecipeLists;
