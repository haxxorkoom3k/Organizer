import React, { useState, useEffect } from 'react'

const TagsList = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ tags, setTags ] = useState([])

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
    
    let deleteTag = (id) => {
      fetch(
          `/api/delete-notetag/${id}`,
          {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
              }
          }
      ).then((response) => {
          if (response.ok) {
              console.log(`удаление тега todo с ${response.status}`)
              window.location.reload()
          } else {
              throw Error(`ошибка! ${response.status}`)
          }
      }).catch(error => {
          console.log(`ошибка! ${error}`)
      })
  }

    let tagsParse = tags.map(function(item) {
      return  <div key={item.pk} className='card border-primary m-3'>
                  <div className='card-header'>{item.title}</div>
                  <div className='card-body'>
                    <button className='button-submit-form' onClick={() => deleteTag(item.pk)}>Удалить</button>
                  </div>
              </div>
    })

  return (
    <div>
        {access?
        <div>
            <h2>Ваши теги</h2>
            <div className='d-flex'>
                {tagsParse}
            </div>
        </div>
        :
        !access?
            <div>
                <h1>перезайдите (401)</h1>
            </div>
        :
        null
        }
    </div>
  )
}

export default TagsList