import React, { useState, useEffect } from 'react'

const SearchPage = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ records, setRecords ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ loading, setLoading ] = useState()

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }

    const note = document.querySelector('#radio-1')
    const todo = document.querySelector('#radio-2')
    const spend = document.querySelector('#radio-3')

    const SearchHandler = () => {
        if (note.checked) {
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
                    setRecords(data)
            })
        }
        if (todo.checked) {
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
                    setRecords(data)
            })
        }
        if (spend.checked) {
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
                    setRecords(data)
            })
        }
    }

    

    let record = records.map(function(item) {
        return  <div key={item.pk} className='card border-primary m-3'>
                    <div className='card-header noteTitle'>{item.title}</div>
                    <div className='card-body'>
                      <h4 className='card-title'>{item.body}</h4>
                      <h5>{item.owner}</h5>
                    </div>
                </div>
    })

    console.log(records)
    console.log(searchTerm)


  return (
    <div>
        <div>
            <div className='alert m-3'>
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
                <input type='text' placeholder='Введите название или тэг записи' value={searchTerm} onChange={handleSearchInput} />
                <button type='submit' onClick={SearchHandler}>Поиск</button>
            </div>
        </div>
        <div>
            {record}
        </div>
    </div>
  )
}

export default SearchPage