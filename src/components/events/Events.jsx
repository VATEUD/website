import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import s from './Events.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function Events({day}){
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

 
  useEffect(() => {
    const fetchData = async () => {
      console.log(day);
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+`/events/filter/${day}`);
        const json = await result.json();
        console.log(json);
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[day]);

  return (
    isLoading ? (
      <div className = { `${s.event} row` }>
            <ReactLoading type={'bubbles'} color={'black'} height={'20%'} width={'20%'} />
      </div>       
    ) : (  
      isError ? (
        <div className = { `${s.event} row` }>
          An error ocurred fetching the events
        </div> 
      ) : (    
        <div>
          <div className = "row col-10 ">
            <h1>{ data[0].start_time.substring(0,10) }</h1>
          </div>  
          <div className = { s.events }> 
          {data.map(item => (
              <div className = {`${s.event_box} col-3 col-md-10 col-sm-12 `}>
                <a href={ item.link }>
                  <img src ={ item.banner } alt = ""></img>
                  <div className = { s.event_text }>
                    <h1>{ item.name }</h1>
                  </div>
                </a>
             </div>
          ))}
          </div>
        </div>      
      )
    )
  );
}
