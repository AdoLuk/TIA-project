import { BlockList } from "../components/BlockList";

function BlockListPage({ blocks }) {
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