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
    setCTag(e.target.value)
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
          completed: todoTag,
      })
      }).then(response => {
          if (response.ok) {
             console.log("response point 1 ok")
          }
      }).catch(error => {
         console.log(error)
         alert(`ошибка. ${error}`)
    })
  }

  return (
    <div>
        скоро здесь будет todo
    </div>
  )
}

export default ToDoCreate
