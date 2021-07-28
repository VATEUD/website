import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Document, Page, pdfjs } from "react-pdf";

import s from './Policies.module.scss';

function mod(n, m) {
  let remain = n % m;
  let remain2 =  Math.floor(remain >= 0 ? remain : remain + m);
  if(remain2 === 0) return 1;
  else return remain2;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Policies() {
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
      setIsLoading(true);
      try {
        const result = await fetch(process.env.REACT_APP_API_URL+'/minio/uploads');
        const json = await result.json();
        console.log(json);
        setData(json);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  },[isError]);

  return(
    <section className={s.policies}>
      {isError ? ( <div className = "error"><p>Unfortunatelly there was an error while fetching the policies. Please try again later.</p></div> 
      ) : (
        isLoading ? (
          <div className = "loading">
            <ReactLoading type={'bubbles'} color={'black'} height={'20%'} width={'20%'} />
          </div>
        ) : (
          <div>
            <Document
              file={data[0].download_url}
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
            <a href ={data[0].download_url}>Download</a>
          </div>
        )
      )}
    	</section>  
  );
}