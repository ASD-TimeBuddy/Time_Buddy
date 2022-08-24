import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

const Layout = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />} />
  </Routes>
);

export default App;
