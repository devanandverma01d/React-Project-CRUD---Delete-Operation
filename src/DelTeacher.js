import { useEffect, useState } from "react";

let ListItems = (props) =>{
  const {eachTeacher, deleteTeacher} = props
  const {id, name} = eachTeacher
  
  const [viewDetail, setViewDetail] = useState(false)


  const onViewDeta = ( ) =>{
    setViewDetail(!viewDetail)
  }

  const onDeleteTeacher = () =>{
    deleteTeacher(id)
    fetch(`http://localhost:1337/api/teachers/${id}`,{
      method:"DELETE"
    })
    .then()
    .then()
    .catch()
  }
  return(
    <li className="list-Items">
      <p>{name}</p>
      <div className="d-flex ">
        <button className="btn btn-primary" onClick={onViewDeta}>View</button><br />
        <button className="btn btn-warning">Edit</button>
        <button onClick={onDeleteTeacher} className="btn btn-danger">Delete</button>
        {
          viewDetail ? <div>Teacher is very good</div> : ""
        }
      </div>
    </li>
  )
}

let DelTeacher=()=>{
  //1. Hooks Area
  const[teacher, setTeacher]=useState([])
  //2. definition area
  useEffect(()=>{
    fetch(`http://localhost:1337/api/teachers`)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log(data.data)
      let newdata=data.data.map((cv)=>({
          id:cv.id,
          name:cv.attributes.name
        })
        )
      setTeacher(newdata)
    })

    .catch()
  },[])

  const deleteSelectedTeacher = id =>{
    console.log(id)
    let newTeacherList = teacher.filter(eachItem=>eachItem.id !== id)
    setTeacher(newTeacherList)
  }
  
  //console.log(teacher)
  //3. return Statement
  return (
    <>
      <div className="container">
        {
          teacher.length < 1 ? <h1>Nothing to show</h1>
          :
          (
            <ul className="list-catainer">
              {
                teacher.map((eachTeacher, idx)=>
                  <ListItems 
                    key={idx} 
                    eachTeacher={eachTeacher}
                    deleteTeacher={deleteSelectedTeacher}
                  />
                )
              }
            </ul>
          )
        }
      </div>
    </>
  );
}

export default DelTeacher;

