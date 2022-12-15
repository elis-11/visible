import { useState } from "react";
import watchesJson from "./data/watches.json";
import "./App.css";

function App() {
  const [watches, setWatches] = useState(watchesJson);
  const [number, setNumber] = useState("");

  const onQuantityChange = (id, quantityNew) => {
    const updateWatches = watches.map((watch) =>
      watch._id === id ? { ...watch, quantity: quantityNew } : watch
    );
    setWatches(updateWatches);
  };

  const totalPrice = watches.reduce((total, watch) => {
    return total + watch.price * watch.quantity;
  }, 0);

  const totalQuantity = watches.reduce((total, watch) => {
    return total + watch.quantity;
  }, 0);

  return (
    <div className="App">
      <h1>Watches App</h1>
      <div className="watches">
        {watches.map((watch) => (
          <div key={watch._id} className="watch">
            <img src={watch.image} alt={watch.name} />
            <div className="data">
              <div className="name">{watch.name}</div>
              <div className="price">price: {watch.price} €</div>
              <div className="total">
                price for {watch.quantity} watches:
                {/* {priceForQuantityWatches} € */}
              </div>
              <div className="input">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={watch.quantity}
                  onChange={(e) => onQuantityChange(watch._id, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="input_feld">
        <div className="price_min">
          <h3>Minimum order value: 100 € </h3>
          <h3>
            Total price: 
            {/* for {totalQuantity} watches */}
          {" "}   {totalPrice} €
          </h3>
          {totalPrice >= 100 && <button>Checkout</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
