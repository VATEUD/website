import React, { useEffect, useState } from 'react';

import s from './Events.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function Events({amount, presentAmount}){
  const [data, setData] = useState([]);
  let date = '000';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  function setDate(d){
    date = d;
  }
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+`/events/filter/${amount}`);
        const json = await result.json();
        json.splice(0,presentAmount);
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[amount]);

  return (
    isError ? (
      <div className = { 'row' }>
        <div className = { s.event_box, s.event_box_error }>An error ocurred fetching the events</div> 
      </div>
       
    ) : (  
      isLoading ? (
        <div className = { 'row col-10' }>
          <div className= { s.event_box, s.event_box_loading }>
            <p>Loading events ...</p>
          </div>
        </div>
      ) : (    
        data.map(item => (
          console.log(date+" , "+item.start_time.substring(0,10)),
           date !== item.start_time.substring(0,10) && (
            <div className = "row col-10 ">
              <h1>{ item.start_time.substring(0,10) }</h1>
            </div>     
          ),
            console.log('holaaaa'+item.start_time.substring(0,10)),
            setDate( item.start_time.substring(0,10)),
            <div className = { "col-3 col-md-10 col-sm-12" }>
              <div className = { s.event_box }>
                <a href={ item.link }>
                  <img src ={ item.banner } alt = ""></img>
                  <div className = { s.event_text }>
                    <h1>{ item.name }</h1>
                  </div>
                </a>
             </div>
            </div>
            
          
        ))
      )
    )
  );
}
