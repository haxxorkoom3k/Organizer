import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Notes = ({match, history}) => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    let NoteID = useParams()
    let [ note, setNote ] = useState('')

    useEffect(() => {
        getNote()
    }, [NoteID])

    let getNote = async () => {
        if (NoteID === 'new') return
        await fetch(`/api/notes/${NoteID}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok){
                return response.json()
            } else {
                console.log(`${response.status}`)
            }
        }).then(data => {
            setNote(data)
        })
    }

    let createNote = async () => {
        fetch(`/api/note/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let updateNote = async () => {
        fetch(`/api/note/${NoteID}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let deleteNote = async () => {
        fetch(`/api/note/${NoteID}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    const submitHandler = () => {
        if (NoteID !== 'new' && note.body === '') {
            deleteNote()
        } else if (NoteID !== 'new') {
            updateNote()
        } else if (NoteID === 'new' && note.body !== null) {
            createNote()
        }
        history.push('/')
    }

    let changeHandler = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log(`Изменён: ${note}`)
    }

    return (
    <div>
        <div className="note-header">
            {NoteID !== 'new' ? (
                <button onClick={submitHandler}>Удалить</button>
            ) : (
                <button onClick={submitHandler}>Готово</button>
            )}
        </div>
        <textarea onChange={e => changeHandler(e.target.value) } value={note?.body}></textarea>
    </div>
  )
}

export default Notes