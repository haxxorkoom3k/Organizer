import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('')

    const data = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
    }

    const submitHandler = (e) => {
        e.preventDefault()

        fetch(
            '/api/user/password-change/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify(data)
            }
        ).then(response => {
            if (response.ok) {
                return response.json(),
                console.log('fetch point ok')
            } else {
                throw Error(`${response.status} error`)
            }
        }).catch(error => {
            alert(`${error} error`)
        }).finally(console.log(data))
    }

  return (
    <div className='mt-3 p-2'>
        <form className='alert' onSubmit={submitHandler}>
            
            <div>
                <label htmlFor='old_password'>Старый пароль</label>
                <input className='form-control' type='password' required onChange={e => {setOldPassword(e.target.value)}}/>
            </div>

            <div>
                <label htmlFor='new_password'>Новый пароль</label>
                <input className='form-control' type='password' required onChange={e => {setNewPassword(e.target.value)}} />
            </div>

            <div>
                <label htmlFor='confirm_new_password'>Повторите новый пароль</label>
                <input className='form-control' type='password' required onChange={e => {setConfirmNewPassword(e.target.value)}}/>
            </div>

            <button type='submit' className='form-control'>Сменить пароль</button>
        
        </form>
    </div>
  )
}

export default ChangePassword