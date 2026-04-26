import { logout } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate();

    function handleLogout() {
        logout()
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
            })
            .finally(() => {
                props.setAuthStatus(false);
                navigate('/');
            });
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-5 text-start">
                    <div className="h3 py-2">Plánovač programu</div>
                </div>
                <div className="col-sm" />
                <div className="col-sm-3 py-2">
                    {props.authStatus && 
                    <button
                        className="btn btn-primary"
                        onClick={handleLogout}>
                        Odhlásiť
                    </button>}

                    {!props.authStatus && 
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); props.setError(''); navigate('/'); }}>
                        Prihlásiť sa!
                    </a>}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 py-2">
                    {props.error && <p className="text-danger">{props.error}</p>}
                </div>
            </div>
        </>


    )
}

export default Header;