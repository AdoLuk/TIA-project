import { BlockList } from "../components/BlockList";
import { useEffect, useState } from 'react';
import { getBlocks } from '../services/blockService';
import { BlockFilters } from "../components/BlockFilters";

function BlockListPage(props) {

  const [blocks, setBlocks] = useState([]); 
  const [filteredBlocks, setFilteredBlocks] = useState([]); 

  useEffect(() => {
    getBlocks().then(
      (blocks) => {
        setFilteredBlocks(blocks);
    }).catch((error) => {
      console.log(error.message);
      props.setError(error.message);
    });

    const fetchBlocksInterval = setInterval(() => {
        getBlocks().then((blocks) => {
          setBlocks(blocks);
        }).catch((error) => {
          console.log(error.message);
          props.setError(error.message);
        });
      }, 10000);
    return () => clearInterval(fetchBlocksInterval);
  }, []);

  const onFilterChange = (filters) => {
    setFilteredBlocks(() => {
      if (!filters) return [...blocks];
      const now = new Date()
      return blocks.filter(b => {
        if (filters.ongoing && now > new Date(b.date)) return false
        if (filters.typeIds.length > 0 && !filters.typeIds.includes(b.block_type_id)) return false
        if (filters.mine && !b.isMyBlock) return false
        return true
      })
    });
  }
 
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                  Filtre:
                  <BlockFilters blocks={blocks} setError={props.setError} onFilterChange={onFilterChange}></BlockFilters>
                </div>
                <div className="col">
                  <div className="">
                    Programové bloky:
                  </div>
                  <BlockList blocks={filteredBlocks} eventLeader={false}></BlockList> 
                </div>
            </div>


        </>
    );
}

export default BlockListPage;  