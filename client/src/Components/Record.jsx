import React from 'react'

const Record = ({ data }) => {
  // const cover = data.image[3]['#text'] || data.image[0]['#text']

  return (
    <div className='record'>
      <img src={data.cover} alt={`${data.title} cover`} onError={(e) => e.target.parentNode.style.display = 'none'} />
      <p>{data.title}</p>
      <small>{data.artist}</small>
    </div>
  )
}

export default Record
