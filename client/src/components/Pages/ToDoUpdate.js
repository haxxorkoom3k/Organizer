import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ToDoUpdate = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ todo, setToDo ] = useState([])
    let [ title, setTitle ] = useState('')
    const [ tags, setTags ] = useState([])
    let [ todoTag, setToDoTag ] = useState('')
    let [ complete, setComplete ] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const getToDo = (id) => {
        fetch(
            `/api/todo/${id}`,
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
                throw Error(`ошибка! ${response.status}`)
            }
        }).then(data => {
            console.log(data)
            setToDo(data)
            setTitle(data.title)
            setToDoTag(data.tag)
        })
    }

    useEffect(() => {
        if (access) {
            getToDo(id)
        }
    }, [access])

    const tagsFetch = () => {
        fetch(
            '/api/get-todotags',
            {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
                }
            }
        ).then(response => {
            if (response.ok) {
               console.log("reponse point 1 ok")
               return response.json()
            } else {
              throw Error(`Что-то пошло не так: код ${response.status}`)
             }
        }).then(data => {
            console.log(data)
            setTags(data)
        })
    }

    useEffect(() => {
        if (access) {
            tagsFetch()
        }
    }, [access])

    let tagParse = tags.map(function(item) {
        return <option key={item.pk}>{item.title}</option>
    })
    
    const selectHandler = (e) => {
        setToDoTag(e.target.value)
    }

    const updatedData = {
        title: title,
        tag: todoTag,
        completed: complete
    }

    const submitHandler = (e) => {
        e.preventDefault()

        fetch(
            `/api/todo/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify(updatedData)
              }
          ).then(response => {
            if (response.ok) {
               console.log("response point 2 ok")
            }
        }).catch(error => {
           console.log(error)
           alert(`ошибка. ${error}`)
        }).finally(navigate(`/user/todo`))
    }

    const deleteToDo = (id) => {
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
            }).finally(navigate(`/user/todo`))
      }

      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          navigate("/user/todo")
        }
      })


  return (
    <div className='ItemCreateWrapper'>
        <form className='alert m-3' onSubmit={submitHandler}>
            <h2>Обновление ToDo</h2>
            <input className='form-control mb-1' defaultValue={title} onChange={e => setTitle(e.target.value)} type='text' name='title' placeholder='Название' />
            <select className='form-select mb-2' defaultValue={todo.tag} onChange={selectHandler}>
                <option>Выберите тег</option>
                {tagParse}
            </select>
            <select name='todo-complete' defaultValue={todo.complete} className='form-select mb-2' onChange={e => setComplete(e.target.value)}>
                <option value={''}>Выберите статус выполнения</option>
                <option value={'Да'}>Да</option>
                <option value={'Нет'}>Нет</option>
            </select>
            <button className='w50p btn btn-success' type="submit" name="submit">Обновить</button>
            <button className='w50p btn btn-danger' onClick={() => deleteToDo(id)}>Удалить</button>
        </form>
    </div>
  )
}

export default ToDoUpdate