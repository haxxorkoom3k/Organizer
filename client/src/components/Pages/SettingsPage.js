import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SettingsPage = () => {

  const [ access ] = useState(localStorage.getItem('accessToken'))

  return (
    <div>
      {access?
      <div className='settings-wrapper'>
        <div className='settings-tags alert m-2'>
          <h2>Раздел тегов (Заметки)</h2>
          <p className='text-muted'>Здесь вы можете просмотреть и создать теги</p>
          <div className='st pt-4'>
            <Link className='myButton' to='/user/create-notetag'>Новый тег</Link>
            <Link className='myButton' to='/user/note-tagslist'>Список тегов</Link>
          </div>
        </div>
        <div className='settings-tags alert m-2'>
          <h2>Раздел тегов (Задачи)</h2>
          <p className='text-muted'>Здесь вы можете просмотреть и создать теги</p>
          <div className='st pt-4'>
            <Link className='myButton' to='/user/create-todotag'>Новый тег</Link>
            <Link className='myButton' to='/user/todo-tagslist'>Список тегов</Link>
          </div>
        </div>
        <div className='settings-tags alert m-2'>
          <h2>Раздел тегов (Траты)</h2>
          <p className='text-muted'>Здесь вы можете просмотреть и создать теги</p>
          <div className='st pt-4'>
            <Link className='myButton' to='/user/spend-tag/create'>Новый тег</Link>
            <Link className='myButton' to='/user/spend-tags'>Список тегов</Link>
          </div>
        </div>
      </div>
      
      :
      <div>ты не авторизован.</div>
      }
    </div>
  )
}

export default SettingsPage