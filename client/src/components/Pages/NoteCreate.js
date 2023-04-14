import React, { useState, useEffect } from 'react'

const NoteCreate = () => {

    const [ formTitle, setFormTitle ] = useState('')
    const [ formNote, setFormNote ] = useState("")
    const [ fTag, setFTag ] = useState([])
    const [ noteTag, setNoteTag ] = useState('')
    const [ access ] = useState(localStorage.getItem('accessToken'))
    
    const tagsFetch = async () => {
      await fetch(
        '/api/get-taglist',
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
          setFTag(data)
        })
  }

  useEffect(() => {
      if (access) {
          tagsFetch()
      }
  }, [access])
        
    useEffect(() => {
      if (access) {
          tagsFetch()
      }
    }, [access])

    let tagParse = fTag.map(function(item){
      return <option key={item.pk}>{item.title}</option>
    })
    
    const selectHandler = (e) => {
      setNoteTag(e.target.value)
    }

    const submitHandler = (e) => {
      e.preventDefault()

      fetch(
        '/api/note-create',
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`,
          },
          body: JSON.stringify({
            title: formTitle,
            body: formNote,
            tag: noteTag,
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
    <div className='NoteCreateWrapper'>
        <form className='NoteCreateForm alert m-3' onSubmit={submitHandler}>
          <h2>Новая заметка</h2>
          <input className='form-control mb-1' type='text' name='title' onChange={e => setFormTitle(e.target.value)} placeholder='Название' required />
          <textarea className='form-control m-1' onChange={e => setFormNote(e.target.value)} placeholder='Текст заметки' rows={10} cols={20}/>
          <select className='form-select mb-2' onChange={selectHandler}>
            {tagParse}
          </select>
          <input className='w50p form-control' type="submit" name="submit" value="Сохранить заметку" />
        </form>
    </div>
  )
}

export default NoteCreate