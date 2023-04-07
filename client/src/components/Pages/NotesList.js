import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NotesList = () => {
  
    const [ notes, setNotes ] = useState([])

  const [ access ] = useState(localStorage.getItem('accessToken'))
  
    const notesFetch = async () => {
            await fetch('/api/note',
            {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
              },
            }).then(response => {
                if (response.ok) {
                  return response.json()
                  } else {
                   throw Error(`Что-то пошло не так: код ${response.status}`)
                  }
            }).then(data => {
                setNotes(data)
            })
        }
        useEffect(() => {
            if (access) {
                notesFetch()
            }
        }, [access])

    console.log(notes)

    let NoteParse = notes.map(function(item) {
        return <div key={item.pk} className='card border-primary m-3'>
                <div className='card-header'>{item.title}</div>
                <div className='card-body'>
                  <h4 className='card-title'>{item.body}</h4>
                  <p className='card-text'>{item.owner}</p>
                </div>
            </div>

    })
    

    return (
        <div>
            {access?
            <div>
                <h2>У вас {notes.length} заметки <Link to='/user/create-note' >Добавить ещё</Link> </h2>
                <div className='d-flex'>
                    {NoteParse}
                </div>
            </div>
            :
            !access?
                <div>
                    а всё, ты не авторизован.
                </div>
            :
            null
            }
        </div>
  )
}

export default NotesList