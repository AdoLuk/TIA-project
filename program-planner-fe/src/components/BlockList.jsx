import Block from "./Block";

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
    let blockList = blocks.map((block) => <Block key={block.block_id} block={block}></Block>);
    let emptyBlockList =  <EmptyBlockList></EmptyBlockList>;  
  
    return blockList.length>0 ? blockList : emptyBlockList;
  }

export { BlockList };