import { useDispatch } from 'react-redux'
import { ChevronUp, ChevronDown } from '../icons'
import {
  removeItem,
  increaseAmt,
  decreaseAmt,
} from '../features/cart/cartSlice'

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch()
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increaseAmt(id))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount == 1) {
              dispatch(removeItem(id))
              return
            }
            dispatch(decreaseAmt(id))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}
export default CartItem
