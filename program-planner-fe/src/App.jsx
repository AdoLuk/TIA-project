import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import './App.css'
import Header from './components/Header';
import { getBlocks } from './services/blockService';
import BlockListPage from './pages/BlockListPage';

function App() {

  const [blocks, setBlocks] = useState([]);  

  // periodically refresh (timer)
  useEffect(() => {
    getBlocks().then(
      (blocks) => setBlocks(blocks)
    );

    const fetchBlocksInterval = setInterval(() => {
        getBlocks().then(
          (blocks) => setBlocks(blocks)
        );
      }, 10000);
    return () => clearInterval(fetchBlocksInterval);
  }, []);
 
  return (
    <div className="container">
      <Header blocks={blocks} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<BlockListPage blocks={blocks} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )


}

export default App;
