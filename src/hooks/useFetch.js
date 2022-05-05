import { useState, useEffect } from "react";


export const useFetch = url => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    if(method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      setMethod(method)
    }else if(method === "DELETE") {
      setConfig({
        method, 
        headers: {
          "Content-Type": "application/json"
        }
      })
      setMethod(method)
      setItemId(data)
    }
  }
  // GET

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, [url, callFetch])

  // POST

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      if(method === "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
      } else if(method === "DELETE") {
        let deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config)
        json = await res.json()
      }
      setCallFetch(json)
    } 
    httpRequest();
  }, [config, method, url, itemId])


  return { data, httpConfig }

}