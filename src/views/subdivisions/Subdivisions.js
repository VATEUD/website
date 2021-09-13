import React, { useEffect, useState  } from "react";
import { useHistory } from 'react-router-dom';

import s from './Subdivisions.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;


export default function Subdivisions() {

  const ANIMATION_CLASSES = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out'
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const [animationClass, setAnimationClass] = useState(ANIMATION_CLASSES.fadeDownAndIn);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+'/subdivisions');
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
      <p>Loading Subdivisions ...</p>
    ) : (
      isError ? (<div>Something went wrong ...</div>) : (
      <>
          <div className = {s.staff}>
            <div className = {s.staff__grid}>
              {data.map(item => (
                  <div className = {s.staff__departament}>
                    <div class ="linktwo" name ={item.code }></div>
                    <h1>{item.name}</h1>
                    <table className="table">
                      <tr>
                        <th>Website URL</th>
                        <th>Discord Server URL</th>
                      </tr>
                    
                        <tr>
                          <th>
                            {item.website_url}
                          </th>
                          <th>
                            {item.discord_server_url}
                          </th>
                        </tr>
                    </table>
                  </div>
              ))}
            </div>
          </div>
        </>
      )));
}
