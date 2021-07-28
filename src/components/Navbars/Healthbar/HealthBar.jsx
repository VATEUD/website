import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export default function HealthBar(){
  const [healthy, isHealthy] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(apiUrl+`/healthCheck`);
        const json = await result.json();
        for(let i = 0; i<json.Websites.length; i++){
          if(!json.Websites[i].Healthy){
            isHealthy(false)
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[healthy]);

  return(
    
    !isHealthy &&  (
      <div className = "health">
        <p>Not Healthy</p>
      </div>
    )  
  );
}
