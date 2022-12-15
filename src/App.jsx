import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0)

  return (
    <div className="App">
      <h1>Watches App</h1>
      <div className="input_feld">
        <div className="price_min">
          <label>Number: </label>
          <input
            type="number"
            value={number}
            onChange={e=>setNumber(e.target.value)}
          />
          {number >=10 && 
          <button>button</button>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
