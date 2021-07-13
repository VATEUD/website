import React, { useState, useEffect } from "react";

import {Events} from '../components/events/Events';

import '../assets/styles/main.scss';
import '../assets/styles/grid.scss';

const apiUrl = process.env.REACT_APP_API_URL;


export default function Index() {

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
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+`/events/filter/0`);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError]);

  return (
    <>

{/* FIRST SECTION */}
      <section className="one row">
        <div className="grid">
          <div className="content col-6 col-md-10 col-sm-12">
            <div className="title"><h1>Welcome to</h1><h1>{process.env.REACT_APP_DIVISION_CODE}<p>.</p></h1></div>
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
            <div className="Hero-button">
              <a href ="#two" className="button">
                SEE MORE
              </a>
            </div>
          </div>
        </div>  
      </section>

{/* SECOND SECTION */}

      <section className="two">
      <a class ="linktwo" id ="two"></a>
        <div className="title">
          <h1>What do we do?</h1>
        </div>
        <div className="boxes grid">
          <div className="row">
            <div className="box left col-5 col-md-10 col-sm-12">
              <img src = {require("../assets/img/aboutus.png").default} alt = ""></img>
                <p> VATEUD one of the largest and most active division within the VATSIM network. It covers the European continent excluding the United Kingdom (in VATSIM known as <a
                href="https://www.vatsim.uk">
                VATUK
              </a>) and the countries in the Russian division (incorporated in <a
                href="https://vatrus.info">
                  VATRUS
              </a>).</p>
            </div>
            <div className="box col-3 col-md-10 col-sm-12">
              <h2>Organise and coordinate all VATSIM pilots and virtual Air Traffic Control Centers within Europe.</h2>
              <h2>Monitor and manage membership issues as well as ATC and Pilot Training across the area.</h2>
            </div>
            <div className="box col-3 col-md-10 col-sm-12">
              <h2>Ensure that the service provided across our Divisions is as seamless and consistent as possible.</h2>
              <h2>Ensure our organisations and members provide you with all the necessary training you need.</h2>
            </div>
          </div>
        </div>
      </section>

{/* THIRD SECTION */}

      <section className="three">
        <div className="title">
          <h1>Events</h1>
        </div>
        { events.length > 1 &&
        <div className="row event-day">
          <button value="3" onClick={lessEvents}>less</button>
          </div>
        }
        <div className ="grid event-pool">
          {isLoading ? (
            <p>Loading</p>
          ):(
            isError? (
              <div>There aren't any more events today. Press more to check tomrrow's events.</div>
            ):(
              events.map(i => <Events amount={i} presentAmount={i-1} />)
            )
          )}
        </div>
        { events.length < 5 &&
        <div className="row event-day">
          <button onClick={moreEvents}>More</button>
          </div>
         }
      </section>
    </>
  );
}
