import React, {useState, useEffect} from 'react'

const ToDoCreate = () => {

  const [ formTitle, setFormTitle ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ todoTag, setToDoTag ] = useState('')
  const [ access ] = useState(localStorage.getItem('accessToken'))


  const tagFetch = async () => {
    await fetch(
      '/api/get-todotags',
      {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        },
      }
    ).then(response => {
      if (response.ok) {
         console.log("reponse point 1 ok")
         return response.json()
      } else {
        throw Error(`Что-то пошло не так: код ${response.status}`)
       }
      }).then(data => {
        setTags(data)
      })
    }
        
    useEffect(() => {
      if (access) {
          tagFetch()
      }
    }, [access])
  
    let tagParse = tags.map(function(item){
      return <option key={item.pk}>{item.title}</option>
    })
  
  const selectHandler = (e) => {
    setToDoTag(e.target.value)
  }

  const new_data = {
    title: formTitle,
    tag: todoTag,
  }

  const submitHandler = (e) => {
    e.preventDefault()

    fetch(
      '/api/new-todo',
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify(new_data)
      }).then(response => {
          if (response.ok) {
             console.log("response point 2 ok")
          }
      }).catch(error => {
         console.log(error)
         alert(`ошибка. ${error}`)
    })
  }

  return (
    <div className='alert'>
        <form className='NoteCreateForm alert m-3' onSubmit={submitHandler}>
          <h2>Новый ToDo</h2>
          <input className='form-control mb-1' type='text' name='title' onChange={e => setFormTitle(e.target.value)} placeholder='Название' required />
          <select className='form-select mb-2' onChange={selectHandler}>
            <option> </option>
            {tagParse}
          </select>
          <input className='w50p form-control' type="submit" name="submit" value="Создать ToDo" />
        </form>
    </div>
  )
}

export default ToDoCreate