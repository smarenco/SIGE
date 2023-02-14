import React from 'react'
import './loading.css'

const Loading = ({ loading = true, message = '', size = 20}) => {
  return (
    <>
      <div className='loader' style={{display: loading ? 'block' : 'none', width: size, height: size}}>
        <img width={size} src={require('../../../assets/logo1.png')} alt='logo-urusige' />
      </div>
      <h3 className='loader-message'>{message}</h3>
    </>
  )
}

export default Loading