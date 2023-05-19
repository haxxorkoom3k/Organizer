import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SpendDetail = () => {

    const { id } = useParams()
    const [ spendData, setSpendData ] = useState([])
    const [ access ] = useState(localStorage.getItem('accessToken'))
    let [ spendTitle, setSpendTitle ] = useState('')
    let [ spendAmount, setSpendAmount ] = useState('')

    var notification = document.querySelector('#forAlert')

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

    useEffect(() => {
        if (access) {
            spendDataFetch(id)
        }
    }, [access])

    const updatedData = {
        title: spendTitle,
        amount: spendAmount
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
                notification.value = 'Обновлено'
            }
        }).catch(error => {
           console.log(error)
           alert(`ошибка. ${error}`)
        })
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
        })
    }

    const patchSpend = () => {
        spendDataUpdate(id)
    }

    console.log(spendData)

  return (
    <div>
        <form className='NoteCreateForm alert m-3' onSubmit={patchSpend}>
            <h2>Детали о покупке</h2>
            <input className='form-control mb-1' type='text' defaultValue={spendData.title} onChange={e => setSpendTitle(e.target.value)} />
            <input className='form-control mb-1' type='number' defaultValue={spendData.amount} onChange={e => setSpendAmount(e.target.value)} />
            <button className='w50p btn btn-success'>Сохранить</button>
            <button id='forAlert' className='w50p btn btn-danger' onClick={() => spendDataDelete(id)}>Удалить</button>
        </form>
    </div>
  )
}

export default SpendDetail