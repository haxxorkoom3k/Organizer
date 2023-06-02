import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as StarSVG } from '../UI/Icons/star.svg'

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

    let pinNote = (id) => {
        fetch(
          `/api/note/${id}`,
            {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access}`,
              },
              body: JSON.stringify({is_pinned: true})
            }
        ).then(response => {
          if (response.ok) {
            console.log("response point 2 ok")
            window.location.reload()
          }
      }).catch(error => {
        console.log(error)
        alert(`хуйня 1. ${error}`)
      })
    }

    let unPinNote = (id) => {
        fetch(
          `/api/note/${id}`,
            {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access}`,
              },
              body: JSON.stringify({is_pinned: false})
            }
        ).then(response => {
          if (response.ok) {
            console.log("response point 2 ok")
            window.location.reload()
          }
      }).catch(error => {
         console.log(error)
         alert(`хуйня 2. ${error}`)
      })
    }

    let notePinnedParse = notes.map(function(item) {
        if (item.is_pinned == true) {
        return <div key={item.pk} className='card border-primary m-3 grid-item'>
                <Link className='card-header noteTitle' to={`/user/note/${item.pk}`}>{item.title}</Link>
                <div className='card-body'>
                  <h4 className='card-title'>{item.body}</h4>
                  <p className='card-text'>{item.tag}</p>
                  <button className='button-pin-form ssvg' onClick={() => unPinNote(item.pk)}><StarSVG /></button>
                </div>
            </div>
        }
    })

    let noteUnpinnedParse = notes.map(function(item) {
        if (item.is_pinned == false) {
        return <div key={item.pk} className='card border-primary m-3 grid-item'>
                <Link className='card-header noteTitle' to={`/user/note/${item.pk}`}>{item.title}</Link>
                <div className='card-body'>
                  <h4 className='card-title'>{item.body}</h4>
                  <p className='card-text'>{item.tag}</p>
                  <button className='button-pin-form' onClick={() => pinNote(item.pk)}><StarSVG /></button>
                </div>
            </div>
        }
    })
    
    return (
        <div>
            {access?
            <div className='list'>
                <h2 className='mobile-info'>Количество заметок: {notes.length} <Link className='myButton' to='/user/create-note'>Добавить ещё</Link></h2>
                <div className='grid'>
                    {notePinnedParse}
                </div>
                <hr />
                <div className='grid'>
                    {noteUnpinnedParse}
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