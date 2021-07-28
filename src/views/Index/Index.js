import React, { useState, useEffect } from "react";
import ReactLoading from 'react-loading';

import {Events} from '../../components/events/Events';

import s from './Index.module.scss';


const apiUrl = process.env.REACT_APP_API_URL;


export default function Index() {

  const [noEvents, setNoEvents] = useState(false);
  const [events, setEvents] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function lessEvents(e){
    setEvents(events.splice(0, events.length-1));
  }

  function moreEvents(e){
    if(events.length)
    setEvents([...events, events[events.length-1]+1]);
  }
 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+`/events/filter/0`);
        if(await result.json() !== null || events.length > 1){
          setEvents([1])
          setNoEvents(false);
        } else{
          setNoEvents(true);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[noEvents, events.length]);

  return (
    <>

{/* FIRST SECTION */}
      <section className={`${s.one} row`}>
        <div className={`${s.one__grid} grid`}>
          <div className={`${s.one__content} col-6 col-md-10 col-sm-12`}>
            <div className={s.one__title}><h1>Welcome to</h1><h1>{process.env.REACT_APP_DIVISION_CODE}<p>.</p></h1></div>
            {/** 
            <div className="text">
            <p>
                VATEUD one of the largest and most active areas within the VATSIM network. It covers the European continent excluding the United Kingdom area (in VATSIM known as <a
                href="https://www.vatsim.uk">
                VATUK
              </a>) and the Russian speaking area (incorporated in <a
                href="https://vatrus.info">
                  VATRUS
              </a>).
              </p>
            </div>
            */}
            <button>
                SEE MORE
            </button>
          </div>
        </div>  
      </section>

{/* SECOND SECTION */}

      <section className={`${s.two}`}>
        <div className={`${s.two__title}`}>
          <h1>What do we do?</h1>
        </div>
        <div className="grid">
          <div className="row">
            <div className={`${s.two__box} ${s.two__left} col-5 col-md-10 col-sm-12`}>
              <img src = {require("../../assets/img/aboutus.png").default} alt = ""></img>
                <p> VATEUD one of the largest and most active division within the VATSIM network. It covers the European continent excluding the United Kingdom (in VATSIM known as <a
                href="https://www.vatsim.uk">
                VATUK
              </a>) and the countries in the Russian division (incorporated in <a
                href="https://vatrus.info">
                  VATRUS
              </a>).</p>
            </div>
            <div className={`${s.two__box} col-3 col-md-10 col-sm-12`}>
              <h2>Organise and coordinate all VATSIM pilots and virtual Air Traffic Control Centers within Europe.</h2>
              <h2>Monitor and manage membership issues as well as ATC and Pilot Training across the area.</h2>
            </div>
            <div className={`${s.two__box} col-3 col-md-10 col-sm-12`}>
              <h2>Ensure that the service provided across our Divisions is as seamless and consistent as possible.</h2>
              <h2>Ensure our organisations and members provide you with all the necessary training you need.</h2>
            </div>
          </div>
        </div>
      </section>

{/* THIRD SECTION */}

      <section className={s.three}>
        <div className={s.three__title}>
          <h1>Events</h1>
        </div>
        { events.length > 1 &&
        <div className={`${s.three__event__day} row`}>
          <button value="3" onClick={lessEvents}>less</button>
          </div>
        }
        <div className ={`${s.three__event__pool} grid`}>
          {isLoading ? (
            <div  className={`${s.three__event__day} row`}>
            <ReactLoading type={'bubbles'} color={'black'} height={'20%'} width={'20%'} />
          </div>
            
          ):(
            isError ? (
              <div  className={`${s.three__event__day} row`}>
                <p>An error ocurred while fetching the events</p>
                  
                </div>
              
            ) : (
              
              noEvents ? (
                <>
                <div  className={`${s.three__event__day} row`}>
                  <p>There aren't any more events today. Press more to check tomrrow's events.</p>
                </div>
                {events.length < 5 && 
                  <div className={`${s.three__event__day} row`}>
                    <button onClick={moreEvents}>More</button>
                  </div>   
                }
               </>
              ):(
                <>
                {events.map(i => <Events day={i} />)}
                {events.length < 5 && 
                <div className={`${s.three__event__day} row`}>
                  <button onClick={moreEvents}>More</button>
                </div>   
              }
                </> 
              ) 
            )
          )}
        </div>
      </section>
    </>
  );
}
