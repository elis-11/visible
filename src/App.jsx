import { useState } from "react";
import watchesJson from "./data/watches.json";
import "./App.css";

function App() {
  const [watches, setWatches] = useState(watchesJson);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  let filteredWatches = watches;
  if (priceMin) {
    filteredWatches = filteredWatches.filter((watch) => {
      return watch.price >= priceMin;
    });
  }

  return (
    <div className="App">
      <h1>Watches App</h1>
      <div className="input_feld">
        <div className="price_min">
          <label>Price Min: </label>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>
        {priceMin >= 10 && <button>button</button>}
      </div>

      <div className="watches">
        {watchesJson.map((watch) => (
          <div key={watch._id} className="watch">
            <img src={watch.image} alt={watch.name} />
            <div className="name">{watch.name}</div>
            <div className="name">{watch.year} year</div>
            <div className="name">price: {watch.price} €</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
