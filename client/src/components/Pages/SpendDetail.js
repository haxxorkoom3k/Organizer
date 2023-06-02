import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SpendDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [ spendData, setSpendData ] = useState([])
    const [ access ] = useState(localStorage.getItem('accessToken'))
    let [ spendTitle, setSpendTitle ] = useState('')
    let [ spendAmount, setSpendAmount ] = useState('')
    const [ tags, setTags ] = useState([])
    let [ spendTag, setSpendTag ] = useState('')

    const spendDataFetch = (id) => {
        fetch(
            `/api/spend/${id}`,
            {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
                }
            }
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`ошибка! ${response.status}`)
            }
        }).then(data => {
            setSpendData(data)
            setSpendTitle(data.title)
            setSpendAmount(data.amount)
        })
    }

    const tagsFetch = () => {
        fetch(
            '/api/spend-tags',
            {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
                }
            }
        ).then(response => {
            if (response.ok) {
               console.log("reponse point 1 ok")
               return response.json()
            } else {
              throw Error(`Что-то пошло не так: код ${response.status}`)
             }
        }).then(data => {
            console.log(data)
            setTags(data)
        })
    }

    let tagParse = tags.map(function(item) {
        return <option key={item.pk}>{item.title}</option>
    })

    useEffect(() => {
        if (access) {
            spendDataFetch(id)
            tagsFetch()
        }
    }, [access])

    const updatedData = {
        title: spendTitle,
        amount: spendAmount,
        tag: spendTag
    }

    const spendDataUpdate = (id) => {
        fetch(
            `/api/spend/${id}`,
            {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify(updatedData)
          }
        ).then(response => {
            if (response.ok) {
                console.log("response point 2 ok")
            }
        }).catch(error => {
           console.log(error)
           alert(`ошибка. ${error}`)
        }).finally(navigate(`/user/spend`))
    }

    const spendDataDelete = (id) => {
        fetch(
            `/api/spend/${id}`,
            {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${access}`,
                }
            }
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`ошибка! ${response.status}`)
            }
        }).then(data => {
            setSpendData(data)
        }).finally(navigate(`/user/spend`))
    }

    const patchSpend = () => {
        spendDataUpdate(id)
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          navigate("/user/spend")
        }
      })

    console.log(spendData)

  return (
    <div className='ItemCreateWrapper'>
        <form className='alert m-3' onSubmit={patchSpend}>
            <h2>Детали о покупке</h2>
            <input className='form-control mb-1' type='text' defaultValue={spendData.title} onChange={e => setSpendTitle(e.target.value)} />
            <input className='form-control mb-1' type='number' defaultValue={spendData.amount} onChange={e => setSpendAmount(e.target.value)} />
            <select className='form-select mb-2' onChange={e => setSpendTag(e.target.value)}>
                <option>Выберите тег</option>
                {tagParse}
            </select>
            <button className='w50p btn btn-success'>Сохранить</button>
            <button className='w50p btn btn-danger' onClick={() => spendDataDelete(id)}>Удалить</button>
        </form>
    </div>
  )
}

export default SpendDetail