import { useEffect, useState } from "react";
// import watchesJson from "./data/watches.json";
import "./App.css";

function App() {
  // const [watches, setWatches] = useState(watchesJson);
  const [watches, setWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://639102970bf398c73a98b8ea.mockapi.io/watches")
      .then((response) => response.json())
      .then((json) => {
        setWatches(json);
        setIsLoading(false);
      });
  }, []);

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
      {isLoading && "Loading..."}
      <div className="watches">
        {watches.map((watch) => (
          <div key={watch._id} className="watch">
            <img src={watch.image} alt={watch.name} />
            <div className="data">
              <div className="name">{watch.name}</div>

              <div className="item_price">
                <div className="watch_price">price: {watch.price} €</div>
                {watch.quantity > 0 && (
                  <div className="count_price">
                    {" "}
                    🛒 {watch.quantity}{" "}
                    {watch.quantity == 1 ? "watch" : "watches"}:{" "}
                    {`${watch.price * watch.quantity}`} €
                  </div>
                )}
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
      {/* TOTAL PRICE */}
      <div className="input_feld">
        <div className="price_min">
          <h3>Minimum order value: 100 € </h3>
          <h3>Total quantity: {totalQuantity}</h3>
          {totalPrice > 0 && <h3>Total price: {totalPrice} €</h3>}

          {totalPrice >= 100 && <button>Checkout</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
