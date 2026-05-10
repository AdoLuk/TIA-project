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


function BlockList({blocks}) {
  const [blockList, setBlockList] = useState(blocks.map((block) => <Block key={block.block_id} block={block}></Block>));
  useEffect(() => {
    setBlockList(blocks.map((block) => <Block key={block.block_id} block={block}></Block>));
  }, [blocks])
  let emptyBlockList =  <EmptyBlockList></EmptyBlockList>;  

  return blockList.length>0 ? blockList : emptyBlockList;
}

export { BlockList };