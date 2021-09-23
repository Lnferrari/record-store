import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext'
import { createOrder, updateUser } from '../helpers/apiCalls';

const Cart = () => {
  const { user, setUser } = useContext(UserContext)

  const placeOrder = async () => {
    const order = {
      userId: user._id,
      records: user.cart.map(item => 
        ({
          qty: item.qty,
          record: item.record._id
        })  
      ) 
    }

    console.log('I AM THE ORDER PAYLOAD', order);

    const res = await createOrder(order)

    if (!res.error) {
      toast(`🦄 Your order has been placed!`);
      // Since the order was successfull, we empty out the user.cart
      let updatedUser = await updateUser({
        ...user,
        cart: []
      });
      if (!updatedUser.error) setUser({
        ...user,
        cart: []
      })
      else toast(`🦄 ${updatedUser.error.message}`)

    } else {
      toast(`🦄 ${res.error.message}`)
    }  
  }

  const cartItems = user?.cart.map(
    item => (
      <div className="cart-record" key={item}>
        <div className="record-cover">
          <img src={item.record.cover} alt="cover" />
        </div>
        <div className="record-info">
          <p>{item.record.artist}</p>
          <p>{item.record.title}</p>
          <p>$ {item.record.price}</p>
          <p>{item.qty}</p>
        </div>
      </div>
    )
  )

  return (
    <section className='page-wrapper' id='cart'>
      <h2>CART</h2>
      {
        user?.cart.length > 0
        ? (<>
          <div className="cart-container">
            <div className="cart-items">
              {cartItems}
            </div>
            <button onClick={placeOrder}>
              PLACE ORDER
            </button>
          </div>
        </>)
        : <small>Cart is empty</small>
      }
    </section>
  )
}

export default Cart
