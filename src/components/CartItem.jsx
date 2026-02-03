import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "../redux/CartSlice.jsx";

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQty = useSelector(selectTotalQuantity);

  const [checkoutMsg, setCheckoutMsg] = useState("");

  const rows = useMemo(() => {
    return cartItems.map((it) => ({
      ...it,
      lineTotal: it.price * it.quantity,
      imgUrl: new URL(`../assets/${it.image}`, import.meta.url).toString(),
    }));
  }, [cartItems]);

  const computedTotal = useMemo(
    () => rows.reduce((sum, r) => sum + r.lineTotal, 0),
    [rows]
  );

  const inc = (id, current) =>
    dispatch(updateQuantity({ id, quantity: current + 1 }));

  const dec = (id, current) => {
    if (current <= 1) dispatch(removeItem(id)); // qty hits 0 => remove
    else dispatch(updateQuantity({ id, quantity: current - 1 }));
  };

  const handleCheckout = () => {
    alert("Coming soon!");
    setCheckoutMsg("Checkout: Coming soon ✨");
  };

  const empty = rows.length === 0;

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart <span className="cart-count">({totalQty})</span>
        </Link>
      </nav>

      <main className="page">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <div className="actions-row">
            <button className="secondary-btn" onClick={() => navigate("/plants")}>
              Continue Shopping
            </button>
            <button
              className="primary-btn"
              onClick={handleCheckout}
              disabled={empty}
            >
              Checkout
            </button>
          </div>
        </div>

        {checkoutMsg && <div className="toast">{checkoutMsg}</div>}

        {empty ? (
          <div className="toast">Your cart is empty.</div>
        ) : (
          <>
            <div className="cart-list">
              {rows.map((it) => (
                <div className="cart-row" key={it.id}>
                  <img className="thumb" src={it.imgUrl} alt={it.name} />
                  <div className="cart-info">
                    <h4>{it.name}</h4>
                    <div className="small">Unit: ${it.price.toFixed(2)}</div>
                    <div className="small">
                      Line total: <strong>${it.lineTotal.toFixed(2)}</strong>
                    </div>

                    <div className="qty-row">
                      <button onClick={() => dec(it.id, it.quantity)}>-</button>
                      <span className="qty">{it.quantity}</span>
                      <button onClick={() => inc(it.id, it.quantity)}>+</button>

                      <button
                        className="danger-btn"
                        onClick={() => dispatch(removeItem(it.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <div>Total amount: <strong>${computedTotal.toFixed(2)}</strong></div>
              <div className="small">(selector total: ${totalAmount.toFixed(2)})</div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
