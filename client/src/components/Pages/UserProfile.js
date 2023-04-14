import React from 'react'
import { useEffect, useState } from 'react'

const UserProfile = () => {
    
       const [ access ] = useState(localStorage.getItem('accessToken'))
       const [ username, setUsername ] = useState('')
       const [ error, setError ] = useState()
       const [ dateJoined, setDateJoined] = useState('')
       const [ email, setEmail ] = useState('')

       const Logout = () => {
        localStorage.clear()
        window.location.reload()
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
      )
        .then(response => {
          if (response.ok) {
            return response.json()
            } else {
             if (response.status === 401) {
               throw Error('refresh'),
               alert("Сессия истекла, перезайдите.")
             }
             throw Error(`Something went wrong: code ${response.status}`)
            }
       })
       .then(({data}) => {
         setUsername(data.username)
         setEmail(data.email)
         setDateJoined(data.date_joined)
       })
      }
    }, [access])

        
    return (
    <div>
      {error? <p>{error}</p> : null}
      {access?
        <div className='userprof-wrapper'>
          <div className='alert m-3'>
            <h1>Добро пожаловать, {username}!</h1>
            <h3>Инфо:</h3>
            <p>Дата регистрации {dateJoined}</p>
            <p>Email: {email}</p>
            <button onClick={Logout}>Тестовый выход</button>
          </div>
        </div>
            :
            null
        }
    </div>
  )
}

export default UserProfile