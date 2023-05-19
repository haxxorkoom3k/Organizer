import React, { useState } from 'react'

const CreateTag = () => {

    const [ titleLabel, setTitleLabel ] = useState('')
    const [ access ] = useState(localStorage.getItem('accessToken'))

    const submitHandler = (e) => {
        e.preventDefault()

        fetch(
            '/api/new-tag',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify({
                    title: titleLabel
                })
            }).then(response => {
            if (response.ok) {
                console.log('response point 1 ok')
            } else {
                alert(`ошибка ${response.status}`)
            }
        })
    }

  return (
    <div className='ItemCreateWrapper mt-2'>
        <form className='alert form-control create-tags' onSubmit={submitHandler}>
            <h2>Новый тег</h2>
            <input type='text' name='titleLabel' className='form-control m-1' onChange={e => setTitleLabel(e.target.value)} placeholder='Название тега' required />
            <input className='w50p form-control' type="submit" name="submit" value="Создать тег" />
        </form>
    </div>
  )
}

export default CreateTag