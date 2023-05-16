import React, { UseState, useEffect, useState } from 'react'

const SpendCreate = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))

    const [ title, setTitle ] = useState('')
    const [ amount, setAmount ] = useState()
    const [ tags, setTags ] = useState([])
    const [ tag, setTag ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        fetch(
            '/api/spend/create',
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access}`,
              },
              body: JSON.stringify({
                title: title,
                amount: amount,
                tag: tag
            })
            }).then(response => {
                if (response.ok) {
                   console.log("response point 2 ok")
                }
            }).catch(error => {
               console.log(error)
               alert(`ошибка. ${error}`)
            })
    }

    const tagFetch = async () => {
        await fetch(
          '/api/spend-tags',
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
          })
        }

    useEffect(() => {
        if (access) {
            tagFetch()
        }
    }, [access])

    const selectHandler = (e) => {
        setTag(e.target.value)
    }

    let tagParse = tags.map(function(item){
        return <option key={item.pk}>{item.title}</option>
      })

  return (
    <div className='alert'>
        <form className='NoteCreateForm alert m-3' onSubmit={submitHandler}>
          <h2>Новая запись</h2>
          <input className='form-control mb-1' type='text' name='title' onChange={e => setTitle(e.target.value)} placeholder='Название' required />
          <input className='form-control mb-1' type='number' name='amount' onChange={e => setAmount(e.target.value)} placeholder='Цена' required />
          <select className='form-select mb-2' onChange={selectHandler}>
            <option></option>
            {tagParse}
          </select>
          <input className='w50p form-control' type="submit" name="submit" value="Создать запись" />
        </form>
    </div>
  )
}

export default SpendCreate