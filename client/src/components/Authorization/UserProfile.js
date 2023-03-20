import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    
       const [ access, setAccess ] = useState(localStorage.getItem('accessToken'))
       const [ refresh, setRefresh ] = useState(localStorage.getItem('refreshToken'))
       const [ refreshRequired, setRefreshRequired ] = useState(false)
       const [ loading, setLoading ] = useState()
       const [ formUsername, setFormUsername ] = useState()
       const [ formPassword, setFormPassword ] = useState() 
       const [ username, setUsername ] = useState('')
       const [ error, setError ] = useState()
       const [ dateJoined, setDateJoined] = useState('')

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
                  throw Error('refresh')
                }
                throw Error(`Something went wrong: code ${response.status}`)
               }
          })
           .catch(error => {
              if (error.message === 'refresh') {
                setRefreshRequired(true)
              } else {
                console.log(error)
                setError('Ошибка, подробности в консоли')
              }
           })
         }
       }, [access])

        useEffect(() => {
          if (refreshRequired) {
          fetch(
              '/api/token/refresh',
              {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ refresh })
            }
          )
            .then(response => {
              if (response.ok) {
                return response.json()
              } else {
                throw Error(`Something went wrong: code ${response.status}`)
              }
            })
            // .then(({data}) => {
            //   setUsername(data.username)
            //   setEmail(data.email)
            //   setDateJoined(data.date_joined)
            // })
            .then(({access, refresh}) => {
              localStorage.setItem('accessToken', access)
              setAccess(access)
              localStorage.setItem('refreshToken', refresh)
              setRefresh(refresh)
              setError(null)
            })
            .catch(error => {
              console.log(error)
              setError('Ошибка, подробности в консоли')
            })
          }
        }, [refreshRequired])

        const submitHandler = e => {
         e.preventDefault();
         setLoading(true);
         fetch(
            '/api/token/obtain',
           {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json;charset=utf-8',
             },
             body: JSON.stringify({
               username: formUsername,
               password: formPassword,
             })
           }
         )
           .then(response => {
             if (response.ok) {
               return response.json()
             } else {
               throw Error(`Something went wrong: code ${response.status}`)
             }
           })
             .then(({access, refresh}) => {
              localStorage.setItem('accessToken', access)
              setAccess(access)
              localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
           })
           .catch(error => {
             console.log(error)
             alert(`ошибка. ${error}`)
           })
           .finally(setLoading(false))
           }

    return (
    <div>
      {error? <p>{error}</p> : null}
      {!access?
            loading? "Загрузка..." :
            <div className='form-wrapper'>
              <form className="loginForm alert" onSubmit={submitHandler}>
                <h2>Авторизация</h2>
                <label htmlFor='username'>Имя пользователя: </label>
                <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username" required />
                <label htmlFor='password'>Пароль</label>
                <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password" required />
                <input type="submit" name="submit" value="Войти"/>
                <Link to='/user/register'>Нет аккаунта?</Link>
              </form>
            </div>
        :
            access?
            <div className="Profile">
              <p>тест</p>
              <h3>Аутентификация пройдена</h3>
              <h2>{username}</h2>
              <button onClick={Logout}>logout</button>
            </div>
            :
            null
        }
    </div>
  )
}

export default UserProfile