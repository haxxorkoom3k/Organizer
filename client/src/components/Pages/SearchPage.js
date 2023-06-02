import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SearchPage = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ loading, setLoading ] = useState()
    let [ record, setRecord ] = useState([])

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const note = document.querySelector('#radio-1')
    const todo = document.querySelector('#radio-2')
    const spend = document.querySelector('#radio-3')

    const input_track = document.querySelector('#search_input')

    const SearchHandler = () => {

        if (input_track === '') {
            alert("Введён пустой запрос.")
        }

        if (note.checked) {
            setLoading(true)
            fetch(
                `/api/search/note/?search=${searchTerm}`,
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
                    setLoading(false)
                    setRecord(data.map(function(item) {
                        return  <div key={item.pk} className='card border-primary m-3'>
                                    <Link className='card-header noteTitle' to={`/user/note/${item.pk}`}>{item.title}</Link>
                                    <div className='card-body'>
                                      <h4 className='card-title'>{item.body}</h4>
                                      <h5>{item.tag}</h5>
                                    </div>
                                </div>
                }))})
        }
        
        if (todo.checked) {
            setLoading(true)
            fetch(
                `/api/search/todo/?search=${searchTerm}`,
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
                    setLoading(false)
                    setRecord(data.map(function(item) {
                        return  <div key={item.pk} className='card border-primary m-3'>
                                    <Link className='card-header noteTitle' to={`/user/todo/${item.pk}`}>{item.title}</Link>
                                    <div className='card-body'>
                                      <h4 className='card-title'>{item.body}</h4>
                                      <h5>{item.tag}</h5>
                                    </div>
                                </div>
                }))})
        }

        if (spend.checked) {
            setLoading(true)
            fetch(
                `/api/search/spend/?search=${searchTerm}`,
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
                    setLoading(false)
                    setRecord(data.map(function(item) {
                        return  <div key={item.pk} className='card border-primary m-3'>
                                    <Link className='card-header noteTitle' to={`/user/spend/${item.pk}`}>{item.title}</Link>
                                    <div className='card-body'>
                                      <h4 className='card-title'>{item.body}</h4>
                                      <h5>{item.tag}</h5>
                                    </div>
                                </div>
                }))})
            }
    }

  return (
    <div>
        <div className='search-wrapper'>
            <div className='searchForm alert m-3'>
                <div className='d-flex searchSelect'>
                    <div className='radio-btn-style'>
                        <input type="radio" name="radio" id='radio-1' />
                        <label htmlFor='radio-1'>Заметки</label>
                    </div>

                    <div className='radio-btn-style'>
                        <input type="radio" name="radio" id='radio-2' />
                        <label htmlFor='radio-2'>Задачи</label>
                    </div>

                    <div className='radio-btn-style'>
                        <input type="radio" name="radio" id='radio-3' />
                        <label htmlFor='radio-3'>Покупки</label>
                    </div>

                </div>
                <input type='text' id='search_input' className='searchInput' placeholder='Введите название или тег записи' value={searchTerm} onChange={handleSearchInput} />
                <button type='submit' className='searchButton' onClick={SearchHandler}>Поиск</button>
            </div>
        </div>
        {loading?
            <div>
                <h2>Загрузка..</h2>
            </div>
        :
            <div className='search-records-wrapper'>
                <div className='search-records'>
                    {record}
                </div>
            </div>
        }
    </div>
  )
}

export default SearchPage