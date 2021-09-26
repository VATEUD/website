import React, { useEffect, useState  } from "react";
import ReactLoading from 'react-loading';

import s from './SubDivisions.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;


export default function SubDivisions() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(apiUrl+'/subdivisions');
        const json = await result.json();
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError]);

  return(
    isLoading ? (
        <ReactLoading type={'bubbles'} color={'black'} height={'20%'} width={'20%'} />
    ) : (
      isError ? (<div>Something went wrong ...</div>) : (
      <>
          <div className = {s.staff}>
            <div className = {s.staff__grid}>
              {data.map(item => (
                  <div className = {`col-3 col-md-12 col-sm-12 ${s.staff__departament}`}>
                        <h1>{item.name}</h1>
                        <hr></hr>
                        <div className={s.staff__departament__table}>
                            <div className={s.staff__departament__table__cell}>
                                <h4>vACC Website</h4>
                                <a href = {item.website_url}>{item.website_url}</a>
                            </div>
                            <div className={s.staff__departament__table__cell}>
                                <h4>vACC Discord</h4>
                                {!item.discord_server_url ? (
                                    <p>N/a</p>
                                ) : (
                                    <a href = {item.discord_server_url}>{item.discord_server_url}</a>
                                )}
                            </div>
                        </div>
                  </div>
              ))}
            </div>
          </div>
        </>
      )));
}