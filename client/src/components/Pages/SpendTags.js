import React, { useState, useEffect } from 'react'

const SpendTags = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ tags, setTags ] = useState([])

    const SpendTagsFetch = () => {
        fetch(
            '/api/spend-tags',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                }
            }
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`код ошибки: ${response.status}`)
            }
        }).then(data => {
            setTags(data)
        })
    }

    useEffect(() => {
        if (access) {
            SpendTagsFetch()
        }
    }, [access])

    let deleteTag = (id) => {
        fetch(
            `api/spend-tags/${id}/delete`,
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
        return <div key={item.pk} className='card border-primary grid-item m-3'>
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
            <h2>Ваши теги для покупок</h2>
            <div className='grid'>
                {tagsParse}
            </div>
        </div>
    :
    !access?
        <div>
            <h1>Перезайдите (401)</h1>
        </div>
    :
    null
    }
</div>
  )
}

export default SpendTags