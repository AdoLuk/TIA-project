import { deleteBlock } from "../services/blockService";
import Block from "./Block";
import { useEffect, useState } from "react";

function EmptyBlockList() {
    return <div className="row">
            <div className="col">
              <div className="py-3">
                  Nenašli sa žiadne bloky.
              </div>
            </div>
          </div>;
  }


function BlockList({blocks, eventLeader, update, setUpdate}) {
  // console.log(blocks)
  const [blockList, setBlockList] = useState(blocks.map((block) => <Block key={block.block_id} block={block}></Block>));
  useEffect(() => {
    // console.log(blocks[0])
    setBlockList(blocks.map((block) => 
      <div key={block.block_id} className="row">
        <div className="col">
          <Block key={block.block_id} block={block}></Block>
        </div>
        {eventLeader ?
        <div className="col-md-2">
          <button key={block.block_id} className="btn btn-secondary rounded"
              onClick={(e) => {deleteBlock(block.block_id); setUpdate(!update)}}
          >X odstrániť</button>
        </div>
        : null}
      </div>
    ));
  }, [blocks])
  let emptyBlockList =  <EmptyBlockList></EmptyBlockList>;  

  return blockList.length>0 ? blockList : emptyBlockList;
}

export { BlockList };