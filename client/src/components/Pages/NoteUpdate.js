import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const NoteUpdate = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState()
    const [ note, setNote ] = useState([])
    const [ noteTitle, setNoteTitle ] = useState('')
    const [ noteBody, setNoteBody ] = useState("")
    const [ noteTag, setNoteTag ] = useState('')
    const [ tags, setTags ] = useState([])
    const [ access ] = useState(localStorage.getItem('accessToken'))

    const noteDataFetch = (id) => {
      setLoading(true)
        fetch(
            `/api/note/${id}`,
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
            throw Error(`${response.status}`)
          }
        }).then(data => {
          setNote(data)
          setNoteTitle(data.title)
          setNoteBody(data.body)
          setNoteTag(data.tag)
        }).finally(
          setLoading(false)
        )
    }

    useEffect(() => {
      if (access) {
        noteDataFetch(id)
      }
    }, [access])

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
          setTags(data)
        }).catch(error => {
          console.log(error)
          alert(`ошибка. ${error}`)
        })
    }

    useEffect(() => {
        if (access) {
            tagsFetch()
        }
    }, [access])

    let tagParse = tags.map(function(item){
      return <option key={item.pk}>{item.title}</option>
    })

    const updatedData = {
      title: noteTitle,
      body: noteBody,
      tag: noteTag,
    }

    const updateNote = (id) => {
      fetch(
        `/api/note/${id}`,
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
    }).finally(navigate(`/user/note`))
  }

  let deleteNote = (id) => {
    fetch(
        `/api/note/${id}`,
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
      }).finally(navigate(`/user/note`))
    }

    const selectHandler = (e) => {
      setNoteTag(e.target.value)
    }

    const updatedNote = () => {
      updateNote(id)
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        navigate("/user/note")
      }
    })

  return (
    <div className='ItemCreateWrapper'>
        <form className='alert m-3' onSubmit={updatedNote}>
          <h2>Изменение заметки</h2>
          <input className='form-control mb-1' defaultValue={note.title} onChange={e => setNoteTitle(e.target.value)} type='text' name='title' placeholder='Название' />
          <textarea className='form-control mb-1' defaultValue={note.body} onChange={e => setNoteBody(e.target.value)} placeholder='Текст заметки' rows={10} cols={20}/>
          <select defaultValue={noteTag} className='form-select mb-2' onChange={selectHandler}>
            <option>Выберите тег</option>
            {tagParse}
          </select>
          <button className='w50p btn btn-success' type="submit" name="submit">Обновить</button>
          <button className='w50p btn btn-danger' onClick={() => deleteNote(id)}>Удалить</button>
        </form>
    </div>
  )
}

export default NoteUpdate