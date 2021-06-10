const Item = ({id, note, date, time, setData, submitData}: dataProps & modifyProps) => {

  const deleteData = () => {
    submitData.current = true;
    setData((prev) => {
      return prev.filter(
        (item) => {return item.id !== id}
      );
    });
  }

  return <div className="item">
    <div>
      <p>{note}</p>
      <p>{date} {time}</p>
    </div>
    <button className="remove" onClick={deleteData}>
      刪除
    </button>
  </div>
}

export default Item