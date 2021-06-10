import React, { createContext, useEffect, useRef, useState } from 'react';
import './index.css';
import Edit from './components/Edit'
import { API_GET_DATA } from '../../global/constants'
import Item from './components/Item';

async function fetchData(setData:React.Dispatch<React.SetStateAction<dataProps[]>>) {
  const results = await fetch(API_GET_DATA);
  const { data } = await results.json();
  setData(data);
}

async function fetchSetData(data:dataProps[]) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {data} )
  })
}

declare global {
  type dataProps = {
    id: string,
    note: string, 
    date: string,
    time: string
  };

  type modifyProps = {
    setData: React.Dispatch<React.SetStateAction<dataProps[]>>,
    submitData: React.MutableRefObject<boolean>
  }
}

const Home = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const submitData = useRef(false);

  useEffect(() => {
    if (!submitData.current){
      return;
    }
    fetchSetData(data).then(_ => {submitData.current = false})
  }, [data])

  useEffect(() => {
    fetchData(setData);
  }, [])

  return <div className="app">
    <Edit setData={setData} submitData={submitData} />
    <div className="list">
      {
        data.map((item) => {
          const { id, note, date, time } = item;
          return <Item 
            key={id}
            id={id}
            note={note}
            date={date}
            time={time}
            setData={setData}
            submitData={submitData}
          />
        })
      }
    </div>
  </div>
}

export default Home;