import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Registation = () => {

    const [ formUsername, setFormUsername ] = useState()
    const [ formPassword, setFormPassword ] = useState()
    const [ formEmail, setFormEmail ] = useState()
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const Navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch(
            '/api/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: formUsername,
                    password: formPassword,
                    email: formEmail,
                })
            }).then(response => {
                if (response.ok) {
                    return response.json(),
                    console.log("response point ok")
                } else {
                    throw Error(`Возникла ошибка ${response.status}`)
                }
            })
              .catch(error => {
               console.log(error)
               alert(`ошибка. ${error}`)
             }).finally(Navigate("/user/login"))

    }

    return (
    <div>
        {error? <p>{error}</p> : null}
        <div className='form-wrapper'>
            <form className="registerForm alert" onSubmit={submitHandler}>
                <h2>Регистрация</h2>
                <hr />
                <label htmlFor='username'>Логин: </label>
                <input className='rlstyle' type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username" requred/>
                
                <label htmlFor='email'>Email: </label>
                <input className='rlstyle' type="email" name="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="Email" requred/>
                
                <label htmlFor='password'>Пароль</label>
                <input className='rlstyle' type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password" requred/>

                <input  type="submit" name="submit" value="Регистрация"/>
                <Link to='/user/login'>Есть аккаунт?</Link>
            </form>
        </div>
    </div>
  )
}

export default Registation