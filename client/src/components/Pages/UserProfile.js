import React from 'react'
import { useEffect, useState } from 'react'
import { ReactComponent as NoteSVG } from '../UI/Icons/Note.svg'
import { ReactComponent as WalletSVG } from '../UI/Icons/wallet.svg'
import { ReactComponent as ToDoSVG } from '../UI/Icons/to-do.svg'


const UserProfile = () => {
    
      const [ access ] = useState(localStorage.getItem('accessToken'))
      const [ username, setUsername ] = useState('')
      const [ error, setError ] = useState()
      const [ dateJoined, setDateJoined] = useState('')
      const [ email, setEmail ] = useState('')

      const [ notes, setNotes ] = useState([])
      const [ todos, setTodos ] = useState([])
      const [ spends, setSpends ] = useState([])

      const handleLogout = () => {
        fetch('/api/user/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          }
        })
        .then(() => {
          window.location.href = '/';
          localStorage.clear()
        })
        .catch(error => console.log(error));
      }

     useEffect(() => { 
      if (access) {
      fetch(
          '/api/user/login',
          {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${access}`,
          },
        }
      ).then(response => {
          if (response.ok) {
            return response.json()
            } else {
             if (response.status === 401) {
               throw Error('refresh')
             }
             throw Error(`Something went wrong: code ${response.status}`)
            }
       }).then(({data}) => {
         setUsername(data.username)
         setEmail(data.email)
         setDateJoined(data.date_joined)
         console.log(data)
         localStorage.setItem('uid', data.id)
       })
      }
    }, [access])

    useEffect(() => {
      if (access) {
        fetch(
          '/api/note',
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${access}`,
            },
          }
        ).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error(`ошибка! ${response.status}`)
          }
        }).then(data => {
          setNotes(data)
        })
      }
    }, [access])

    useEffect(() => {
      if (access) {
        fetch(
          '/api/get-todolist',
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${access}`,
            },
          }
        ).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error(`ошибка! ${response.status}`)
          }
        }).then(data => {
          setTodos(data)
        })
      }
    }, [access])

    useEffect(() => {
      if (access) {
        fetch(
          '/api/spend',
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${access}`,
            },
          }
        ).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw Error(`ошибка! ${response.status}`)
          }
        }).then(data => {
          setSpends(data)
        })
      }
    }, [access])

    return (
    <div>
      {error? <p>{error}</p> : null}
      {access?
        <div className='userprof-wrapper'>
          <div className='alert m-3 infoblock'>
            <div>
            <h1>Добро пожаловать, {username}!</h1>
            <p>Дата регистрации {dateJoined}</p>
            <p>Email: {email}</p>
            <button className='formButton' onClick={handleLogout}>Выход</button>
            </div>
            <div>
              <h5><NoteSVG/> Количество заметок: {notes.length}</h5>
              <h5><ToDoSVG /> Количество заданий: {todos.length}</h5>
              <h5><WalletSVG /> Количество покупок: {spends.length}</h5>
            </div>
          </div>
        </div>
        :
         null
        }
    </div>
  )
}

export default UserProfile