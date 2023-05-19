import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Spend = () => {

    const [ spendData, setSpendData ] = useState([])
    const [ spendMoney, setSpendMoney ] = useState([])
    const [ access ] = useState(localStorage.getItem('accessToken'))

    const spendDataFetch = () => {
        fetch(
            '/api/spend',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
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

    const spendedMoneyFetch = () => {
        fetch(
            '/api/spended-money',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            }
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`ошибка! ${response.status}`)
            }
        }).then(data => {
            setSpendMoney(data)
        })
    }

    useEffect(() => {
        if (access) {
            spendDataFetch()
            spendedMoneyFetch()
        }
    }, [access])

    console.log(spendData)
    console.log(spendMoney)

    let spendList = spendData.map(function(item) {
        return <div key={item.pk} className="card border-secondary m-3 grid-item">
                    <Link className="card-header noteTitle" to={`/user/spend/${item.pk}`}>{item.title}</Link>
                    <div className="card-body">
                      <h4 className="card-title">{item.amount} &#x20bd;</h4>
                      <p className="card-text">{item.tag}</p>
                    </div>
                </div>
    })

  return (
    <div>
        {access?
        <div className='notelist'>
            <h2 className='mobile-info'>Потрачено: {spendMoney.total_spent} &#x20bd; <Link className='myButton' to={'/user/spend/create'}>Добавить запись</Link></h2>
            <div className='grid'>
                {spendList}
            </div>
        </div>
        :
        !access?
        <div>
            <h2 className='alert'>а всё, ты не авторизован.</h2>
        </div>
        :
        null
        }
    </div>
  )
}

export default Spend