import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import List from '../../components/atc/List'
import { useParams } from 'react-router-dom';

import s from './Atc.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AtcList() {

  let { scope, dependency } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const loadingElements = {
    'divisionexaminers':'Division Examniers',
    'divisioninstructors':'Division Instructors',
    'vaccinstructors':'vACC Instructors'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(apiUrl+`/${scope}/${dependency}`);
        const json = await result.json();
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError, scope, dependency]);

  if(scope === undefined){
    return(
      <Redirect to ='/atc'></Redirect> 
    );
  }  

  return(
    <section className={s.atc}>
      {isError && <div className="row events-error"></div>}
      {isLoading ? (
        <div className="event-box event-box-loading">
          <p>Loading {loadingElements[scope+dependency]} ...</p>
        </div>  
      ) : (
          <List data = {data} />
      )}
    </section>
  );
}
