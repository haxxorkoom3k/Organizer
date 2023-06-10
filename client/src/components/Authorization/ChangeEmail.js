import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangeEmail = () => {

    const [ access ] = useState(localStorage.getItem('accessToken'))
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const navigate = useNavigate()

    const data = {
        password: password,
        new_email: email
    }

    const submitHandler = (e) => {
        e.preventDefault

        fetch(
            'api/user/change-email',
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
                console.log(`fetch point ok`)
            } else {
                throw Error(`${response.status} error`)
            }
        }).catch(error => {
            alert(`${error} error`)
        }).finally(
            alert('Запись создана'),
            navigate(`/user/profile`)
        )
    }

    return (
        <div>ChangeEmail</div>
    )
}

export default ChangeEmail