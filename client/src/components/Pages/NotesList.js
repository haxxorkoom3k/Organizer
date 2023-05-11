import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const NotesList = () => {
  
    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ notes, setNotes ] = useState([])
  
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

    let deleteNote = (id) => {
        fetch(
            `/api/delete-note/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${access}`,
                }
            }
        ).then((response) => {
            if (response.ok) {
                console.log(`удаление заметки с ${response.status}`)
                window.location.reload()
            } else {
                throw Error(`ошибка! ${response.status}`)
            }
        }).catch(error => {
            console.log(`ошибка! ${error}`)
        })
    }

    let NoteParse = notes.map(function(item) {
        return <div key={item.pk} className='card border-primary m-3'>
                <Link className='card-header noteTitle' to={`/user/note/${item.pk}`}>{item.title}</Link>
                <div className='card-body'>
                  <h4 className='card-title'>{item.body}</h4>
                  <p className='card-text'>{item.tag}</p>
                  <button className='button-submit-form' onClick={() => deleteNote(item.pk)}>Удалить заметку</button>
                </div>
            </div>
    })
    
    return (
        <div>
            {access?
            <div className='notelist'>
                <h2>Количество заметок: {notes.length} <Link className='myButton' to='/user/create-note'>Добавить ещё</Link></h2>
                <div className='displayRecords'>
                    {NoteParse}
                </div>
            </div>
            :
            !access?
                <div>
                    <h2 className='alert'>а всё, ты не авторизован.</h2>
                </div>
            :
            null
            }
        </div>
  )
}

export default NotesList