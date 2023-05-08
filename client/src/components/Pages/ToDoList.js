import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const ToDoList = () => {

  const [ access ] = useState(localStorage.getItem('accessToken'))
  const [ toDo, setToDo ] = useState([])

  const ToDoFetch = async () => {
    await fetch(
      '/api/get-todolist',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${access}`,
        }
      }
    ).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(`Что-то не так: код ${response.status}`)
      }
    }).then(data => {{
      setToDo(data)
    }})
  }

  useEffect(() => {
    if (access) {
      ToDoFetch()
    }
  }, [access])

  let deleteToDo = (id) => {
    fetch(
      `/api/delete-todo/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${access}`,
        }}).then(response => {
          if (response.ok) {
            console.log(`Удаление ToDo с ${response.status}`)
            window.location.reload()
          } else {
            throw Error(`ошибка! ${response.status}`)
          }
        }).catch(error => {
          console.log(`ошибка ${error}`)
        })
  }

  let ToDoParse = toDo.map(function(item) {
    return  <div key={item.pk} className='card border-primary m-3'>
              <Link className='card-header noteTitle' to={`/user/todo/${item.pk}`}>{item.title}</Link>
              <div className='card-body'>
                <p className='card-text'>{item.tag}</p>
                <button className='button-submit-form' onClick={() => deleteToDo(item.pk)}>Удалить</button>
              </div>
            </div>
  })

  return (
    <div>
      {access?
        <div className='m-3'>
          <h2>Количество ToDo: {toDo.length} <Link className='myButton' to='/user/create-todo'>Создать ToDo</Link></h2>
          <div className='d-flex'>
            {ToDoParse}
          </div>
        </div>
      :
        <div>
          <h2 className='alert'>а всё, ты не авторизован.</h2> 
        </div>
      }
    </div>
  )
}

export default ToDoList