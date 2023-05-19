import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ToDoUpdate = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ todo, setToDo ] = useState([])
    let [ title, setTitle ] = useState('')
    const [ tags, setTags ] = useState([])
    let [ todoTag, setToDoTag ] = useState('')
    let [ complete, setComplete ] = useState('')
    const { id } = useParams()

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
        })
    }

  return (
    <div>
        <form className='alert m-3' onSubmit={submitHandler}>
            <h2>Обновление ToDo</h2>
            <input className='form-control mb-1' defaultValue={title} onChange={e => setTitle(e.target.value)} type='text' name='title' placeholder='Название' />
            <select className='form-select mb-2' defaultValue={todo.tag} onChange={selectHandler}>
                <option></option>
                {tagParse}
            </select>
            <select name='todo-complete' defaultValue={todo.complete} className='form-select mb-2' onChange={e => setComplete(e.target.value)}>
                <option value={''}>Выберите статус выполнения</option>
                <option value={'Да'}>Да</option>
                <option value={'Нет'}>Нет</option>
            </select>
            <button className='w50p btn btn-success' type="submit" name="submit">Обновить</button>
        </form>
    </div>
  )
}

export default ToDoUpdate