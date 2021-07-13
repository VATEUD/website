import React from "react";

import './List.scss';

export default function List({ data }) {

  return(
    <div className = "listins grid">
      {data.map(item => (
        (item.instructors && item.instructors.length > 0) ? (
          <div className = "country">
            <h1>{ item.name }</h1>
            <ul>
              {item.instructors.map(item => (
                <li>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="country">
            <h1>{item.name}</h1>
          </div>
        )
      ))}
    </div>
  )
}
