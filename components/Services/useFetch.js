import React, { useEffect, useContext, useState } from "react";
import { min } from "react-native-reanimated";

export const useFetch = (postURL, raw, reTrigger) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)

  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(raw),
  };


  useEffect(() => {
    console.log('fetch')
    const fetchData = async () => {
      await fetch(postURL, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data !== null) {
            setData(data)
          }
        })
        .finally(() => {

        })
    }
    fetchData();

  }, [postURL, reTrigger]);

  return { data, loading }
}