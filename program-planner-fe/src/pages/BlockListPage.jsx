import { BlockList } from "../components/BlockList";
import { useEffect, useState } from 'react';
import { getBlocks } from '../services/blockService';

function BlockListPage({ props }) {

  const [blocks, setBlocks] = useState([]);  

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
        <>
            <div className="row">
                <div className="col-sm-2">
                    Filtre:
                </div>
                <div className="col">
                    Programové bloky:
                    <BlockList blocks={blocks}></BlockList> 
                </div>
            </div>


        </>
    );
}

export default BlockListPage;  