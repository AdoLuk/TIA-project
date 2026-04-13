import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BlockListPage from './pages/BlockListPage';
import LoginPage from './pages/LoginPage';

function App() {

  const [authStatus, setAuthStatus] = useState(false);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setAuthStatus={setAuthStatus} />}
          />
          <Route
            path="/blocks"
            element={<BlockListPage setAuthStatus={setAuthStatus} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )


}

export default App;
