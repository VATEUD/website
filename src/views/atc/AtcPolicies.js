import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";


import s from './AtcPolicies.module.scss';

function mod(n, m) {
  let remain = n % m;
  let remain2 =  Math.floor(remain >= 0 ? remain : remain + m);
  if(remain2 === 0) return 1;
  else return remain2;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AtcPolicies() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(process.env.REACT_APP_API_URL+'/uploads/filter/1');
        const json = await result.json();
        console.log(json);
        setData(json.slice(0));
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError]);

  return(
    <section className={s.policies}>
      {isLoading ? (
          <div className = "loading"><p>Loading document</p></div>
      ):(
        isError ? ( 
          <div className = "error"><p>There was a problem fetching the ATC Polcies document</p></div>
        ) : (
          
            data.map(item => (
              <div>
                <Document
                file={item.download_url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
                className={s.policies__pdf}
                >
                <Page 
                  pageNumber={pageNumber}
                  height={600} />
              </Document>
              <div className={s.policies__paging}>
                <button onClick={()=>setPageNumber(mod(pageNumber-1,numPages+1))}>Previous</button>
                <p>Page {pageNumber} of {numPages}</p>
                <button onClick={()=>setPageNumber(mod(pageNumber+1,numPages+1))}>Next</button>
              </div>
              <a href ={item.download_url}>Download</a>
              </div>
            )
            ))
      )}    
    </section>  
  );
}
