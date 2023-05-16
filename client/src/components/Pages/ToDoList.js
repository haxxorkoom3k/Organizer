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

  let completed = 0
  let completedTasks = toDo.map(function(item) {
    if (item.completed === 'Да') {
      completed += 1
      return  <div key={item.pk} className='card border-success m-3 grid-item'>
                <Link className='card-header noteTitle' to={`/user/todo/${item.pk}`}>{item.title}</Link>
                <div className='card-body'>
                  <p className='card-text'>{item.tag}</p>
                  <button className='button-submit-form' onClick={() => deleteToDo(item.pk)}>Удалить</button>
                </div>
              </div>
    }
  })

  let incomplete = 0
  let incompletedTasks = toDo.map(function(item) {
    if (item.completed === 'Нет') {
      incomplete += 1
      return  <div key={item.pk} className='card border-danger m-3 grid-item'>
                <Link className='card-header noteTitle' to={`/user/todo/${item.pk}`}>{item.title}</Link>
                <div className='card-body'>
                  <p className='card-text'>{item.tag}</p>
                  <button className='button-submit-form' onClick={() => deleteToDo(item.pk)}>Удалить</button>
                </div>
              </div>
    }
  })

  console.log(toDo)

  return (
    <div>
      {access?
        <div className='m-3'>
          <h2>Количество задач: {toDo.length} <Link className='myButton' to='/user/create-todo'>Добавить новую</Link></h2>
          <h3 className='mt-3'>Выполнено: {completed}</h3>
          <div className='grid'>
              {completedTasks}
          </div>
          <h3>В процессе: {incomplete}</h3>
          <div className='grid'>
            {incompletedTasks}
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