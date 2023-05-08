import React, {useState, useEffect} from 'react'

const ToDoCreate = () => {

  const [ formTitle, setFormTitle ] = useState('')
  const [ cTag, setCTag ] = useState([])
  const [ todoTag, setToDoTag ] = useState('')
  const [ access ] = useState(localStorage.getItem('accessToken'))


  const completeFetch = async () => {
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
        setCTag(data)
      })
    }
        
    useEffect(() => {
      if (access) {
          completeFetch()
      }
    }, [access])
  
    let tagParse = cTag.map(function(item){
      return <option key={item.pk}>{item.title}</option>
    })
  
  const selectHandler = (e) => {
    setToDoTag(e.target.value)
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
        body: JSON.stringify({
          title: formTitle,
          tag: todoTag,
      })
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
            {tagParse}
          </select>
          <input className='w50p form-control' type="submit" name="submit" value="Создать ToDo" />
        </form>
    </div>
  )
}

export default ToDoCreate