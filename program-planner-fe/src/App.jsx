import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BlockListPage from './pages/BlockListPage';
import LoginPage from './pages/LoginPage';
import EditBlockPage from './pages/EditBlockPage';
import Header from './components/Header';

function App() {
  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <div className="container">
      <BrowserRouter>
        <Header authStatus={authStatus} setAuthStatus={setAuthStatus} 
                error={error} setError={setError} />
        <Routes>
          <Route
            path="/"
            element={<LoginPage setAuthStatus={setAuthStatus} 
                                error={error} setError={setError} />}
          />
          <Route
            path="/blocks"
            element={<BlockListPage setAuthStatus={setAuthStatus}
                                    error={error} setError={setError} />}
          />
          <Route
            path="/blocks/edit"
            element={<EditBlockPage setAuthStatus={setAuthStatus} 
                                    error={error} setError={setError} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )


}

export default App;
