import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as NoteSVG } from './Icons/Note.svg'
import { ReactComponent as WalletSVG } from './Icons/wallet.svg'
import { ReactComponent as ToDoSVG } from './Icons/to-do.svg'
import { ReactComponent as LoginSVG } from './Icons/login.svg'
import { ReactComponent as SettingsSVG } from './Icons/Settings.svg'
import { ReactComponent as AccountSVG } from './Icons/Account.svg'
import { ReactComponent as SearchSVG } from './Icons/search.svg'

const NavBar = () => {
  
  const [ access ] = useState(localStorage.getItem('accessToken'))
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ username, setUsername ] = useState('')

  useEffect( () => {
    
    try {
      if (access) {
        setIsAuthenticated(true)
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
         .then(({data}) => {
           setUsername(data.username)
          }
        )
      }
    }
    catch(error) {
      alert(`Произошла ошибка: ${error}`)
    }
  }, [access])

  return (
    
    <div>
      {!isAuthenticated?
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid m-1">
            <h2><Link to='/' className="navbar-brand myFontSize">Monokuro</Link></h2>
            <div className='navLinksStyle'>
            <Link to='/user/login'><LoginSVG />Авторизация</Link>
            </div>
          </div>
        </nav>
        :
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid m-1">
            <h2><Link to='/' className="navbar-brand myFontSize">Monokuro</Link></h2>
            <div className='navLinksStyle'>
              <Link to='user/search'><SearchSVG />Поиск</Link>
              <Link to='user/note'><NoteSVG />Заметки</Link>
              <Link to='user/spend'><WalletSVG />Покупки</Link>
              <Link to='user/todo-list'><ToDoSVG />Задачи</Link>
              <Link to='/user/profile'><AccountSVG /> Привет, {username}</Link>
              <Link to='user/settings' ><SettingsSVG />Настройки</Link>
            </div>
          </div>
        </nav>
    }
    </div>
  )
}

export default NavBar