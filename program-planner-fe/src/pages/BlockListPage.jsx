import { BlockList } from "../components/BlockList";
import { useEffect, useState } from 'react';
import { getBlocks } from '../services/blockService';

function BlockListPage(props) {

  const [blocks, setBlocks] = useState([]);  

  useEffect(() => {
    getBlocks().then(
      (blocks) => setBlocks(blocks)
    ).catch((error) => {
      console.log(error.message);
      props.setError(error.message);
    });

    const fetchBlocksInterval = setInterval(() => {
        getBlocks().then(
          (blocks) => setBlocks(blocks)
        ).catch((error) => {
          console.log(error.message);
          props.setError(error.message);
        });
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
                  <div className="col-9">
                    Programové bloky:
                  </div>
                  <BlockList blocks={blocks}></BlockList> 
                </div>
            </div>


        </>
    );
}

export default BlockListPage;  