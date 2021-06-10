import { useState } from "react";
import { v4 } from "uuid";

const Edit = ({setData, submitData}:modifyProps) => {
  
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  function noteChange(e:React.ChangeEvent<HTMLInputElement>):void{
    setNote(e.target.value);
  }

  function dateChange(e:React.ChangeEvent<HTMLInputElement>):void{
    setDate(e.target.value);
  }

  function timeChange(e:React.ChangeEvent<HTMLInputElement>):void{
    setTime(e.target.value);
  }

  const addItem = () => {
    submitData.current = true;
    setData( (prev) => {
        return [
          {
            id: v4(),
            note: note,
            date: date,
            time: time
          },
          ...prev
        ];
      }
    );
  }

  return <div>
    <h1>備忘錄</h1>
    <p>記事：</p>
    <input type="text" onChange={noteChange}></input>
    <p>日期：</p>
    <input type="date" onChange={dateChange}></input>
    <p>時間：</p>
    <input type="time" onChange={timeChange}></input>
    <button className="add" onClick={addItem}>新增</button>
  </div>;
}

export default Edit;