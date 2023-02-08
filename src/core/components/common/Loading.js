import React from 'react'
import './loading.css'

const Loading = ({ message }) => {
  return (
    <>
      <div className='loader'>
        <img width={70} src={require('../../../assets/logo1.png')} alt='logo-urusige' />
      </div>
      <h3 className='loader-message'>{message}</h3>
    </>
  )
}

export default Loading