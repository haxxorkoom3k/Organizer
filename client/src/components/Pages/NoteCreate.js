import React, { useState } from 'react'

const NoteCreate = () => {

    const [ formTitle, setFormTitle ] = useState('')
    const [ formNote, setFormNote ] = useState("")
    const [ access ] = useState(localStorage.getItem('accessToken'))

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
          })
          }).then(response => {
              if (response.ok) {
                 console.log("reponse point 1 ok")
              }
          })
            .catch(error => {
             console.log(error)
             alert(`ошибка. ${error}`)
          })
    }
    

  return (
    <div className='NoteCreateWrapper'>
        <form className='NoteCreateForm alert' onSubmit={submitHandler}>
          <h2>Новая заметка</h2>
          <input className='form-control mb-1' type='text' name='title' onChange={e => setFormTitle(e.target.value)} placeholder='Название' required />
          <textarea className='form-control m-1' onChange={e => setFormNote(e.target.value)} placeholder='Текст заметки' rows={10} cols={20}/>
          <input className='w50p form-control' type="submit" name="submit" value="Сохранить заметку" />
        </form>
    </div>
  )
}

export default NoteCreate