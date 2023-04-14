import React from 'react'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
  return (
    <div className='settings-wrapper'>
      <div className='settings-tags alert m-2'>
        <h2>Раздел тегов</h2>
        <p className='text-muted'>Здесь вы можете просмотреть и создать теги</p>
        <div className='st pt-4'>
          <Link className='myButton' to='/user/create-tag'>Новый тег</Link>
          <Link className='myButton' to='/user/tagslist'>Список тегов</Link>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage