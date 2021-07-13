import React, { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export default function HealthBar(){
  const [healthy, isHealthy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(apiUrl+`/healthCheck`);
        const json = await result.json();
        for(let i = 0; i<json.Websites.length(); i++){
          if(!json.Websites[i].Healthy){
            isHealthy(false)
          }
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[healthy]);

  return(
    
    !isHealthy &&  (
      <div className = "health">
        <p>Not Healthy</p>
        <a href = "#"> More info</a>
      </div>
    )  
  );
}
