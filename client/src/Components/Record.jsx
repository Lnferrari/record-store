import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { updateUser } from '../helpers/apiCalls';

const Record = ({ data }) => {
  const { user, setUser } = useContext(UserContext)

  const addToCart = async id => {
    let updatedCart = []
    const existRecord = user.cart.find(
      item => item.record._id === id
    )
    console.log('EXIST => ', existRecord);
    if (existRecord) {
      updatedCart = user.cart.map(
        item => item.record._id === id
        ? { ...item, qty: item.qty + 1 }
        : item
      )
    } else {
      updatedCart = [
        ...user.cart,
        { record: id, qty: 1 }
      ]
    }
    let res = await updateUser({
      ...user,
      cart: updatedCart
    })
    if (!res.error) {
      setUser({
        ...user,
        cart: res.cart
      });
    } else toast(`🦄 ${res.error.message}`)
  }

  return (
    <div className='record'>
      <img src={data.cover} alt={`${data.title} cover`} onError={(e) => e.target.parentNode.style.display = 'none'} />
      <div className='record-info'>
        <p>{data.title}</p>
        <small>{data.artist}</small>
      </div>
      <div
        className="add-button"
        onClick={() => addToCart(data._id)}
      >
        +
      </div>
    </div>
  )
}

export default Record
