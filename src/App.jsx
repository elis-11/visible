import { useEffect, useState } from "react";
// import watchesJson from "./data/watches.json";
import "./App.css";

function App() {
  // const [watches, setWatches] = useState(watchesJson);
  const [watches, setWatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // LOADING
  const [watchName, setWatchName] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    fetch("https://639102970bf398c73a98b8ea.mockapi.io/watches")
      .then((response) => response.json())
      .then((json) => {
        setWatches(json);
        setIsLoading(false);  // LOADING
      });
  }, []);

  const onQuantityChange = (id, quantityNew) => {
    const updateWatches = watches.map((watch) =>
      watch._id === id ? { ...watch, quantity: Number(quantityNew) } : watch
    );
    setWatches(updateWatches);
  };

  // INPUTS
  let filteredWatches = watches;
  if (watchName) {
    filteredWatches = filteredWatches.filter((watch) =>
      watch.name.toLowerCase().includes(watchName.toLowerCase())
    );
  }
  if (priceMin) {
    filteredWatches = filteredWatches.filter((watch) => {
      return watch.price >= priceMin;
    });
  }
  if (priceMax) {
    filteredWatches = filteredWatches.filter((watch) => {
      return watch.price <= priceMax;
    });
  }

  // CHECKBOX -ALL
  const onCheckboxSelect = (e) => {
    if (e.target.checked) {
      setFilteredNames([...filteredNames, e.target.value]);
    } else {
      const newFilteredNames = filteredNames.filter((watch) => {
        return watch !== e.target.value;
      });
      setFilteredNames(newFilteredNames);
    }
  };
  if (filteredNames.length){
    filteredWatches = filteredWatches.filter((watch) => {
      return filteredNames.includes(watch.category)
    })
  }

  // CARTS
  const totalPrice = watches.reduce((total, watch) => {
    return total + watch.price * watch.quantity;
  }, 0);

  const totalQuantity = watches.reduce((total, watch) => {
    return total + watch.quantity;
  }, 0);
console.log(watches) 

  return (
    <div className="App">
      <h1>Watches App</h1>
      {isLoading && "Loading..."} 
      <div className="filter">
        <div className="inputs">
          <h2>Inputs:</h2>
          <div className="filterName">
            <label>Watch Name:</label>
            <input
              type="text"
              value={watchName}
              onChange={(e) => setWatchName(e.target.value)}
            />
          </div>
          <div className="priceMin">
            <label>Price Min:</label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
          </div>
          <div className="priceMax">
            <label>Price Max: </label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>

        <div className="filteredNames">
          <h2>Checkboxes:</h2>
          <div className="whiteinjelly">
            <input
              type="checkbox"
              name="WHITEINJELLY"
              value="WHITEINJELLY"
              onChange={onCheckboxSelect}
            />
            <label>WHITEINJELLY</label>
          </div>
          <div className="medusa">
            <input type="checkbox" name="MEDUSA" value="MEDUSA" onChange={onCheckboxSelect} />
            <label>MEDUSA</label>
          </div>
          <div className="apple">
            <input type="checkbox" name="APPLE" value="APPLE" onChange={onCheckboxSelect} />
            <label>APPLE</label>
          </div>
        </div>
      </div>


      <div className="watches">
        {filteredWatches.map((watch) => (
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
