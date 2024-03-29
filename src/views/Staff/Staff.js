import React, { useEffect, useState  } from "react";
import { useHistory } from 'react-router-dom';


import s from './Staff.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;


export default function Staff() {

  const ANIMATION_CLASSES = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out'
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const [animationClass, setAnimationClass] = useState(ANIMATION_CLASSES.fadeDownAndIn);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(apiUrl+'/staff');
        const json = await result.json();
        console.log(json);
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError]);


  useEffect(() => {
    return history.listen((location) => { 
      console.log(location);
      setAnimationClass(ANIMATION_CLASSES.fadeIn);
    }) 
 },[history, ANIMATION_CLASSES.fadeIn]);

  return(
    isLoading ? (
      <p>Loading Staff ...</p>
    ) : (
      isError ? (<div>Something went wrong ...</div>) : (
      <>
          <div className = {s.staff}>
            <div className = {s.staff__grid}>
              {data.map(item => (
                
                  <div id = {item.name.substring(0,3)}  className={` col-5 col-md-10 col-sm-11 ${animationClass}`}>
                    <div className = {s.staff__departament}>
                    <div class ="linktwo" name ={item.name.substring(0,3) }></div>
                    <h1>{item.name}</h1>
                    <p >{item.description}</p>
                    <a href ={"mailto:"+item.email}>{item.email}</a>
                    <table className="table">
                      <tr>
                        <th>Name</th>
                        <th>Callsign</th>
                      </tr>
                      {item.members.map(item2 => (
                        <tr>
                          <th>
                            {item2.name}
                          </th>
                          <th>
                            {item2.callsign}
                          </th>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
                
              ))}
            </div>
          </div>
        </>
      )
  ));
}
