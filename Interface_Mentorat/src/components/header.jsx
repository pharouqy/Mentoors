import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { useSelector } from 'react-redux';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <header>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        <>
                            <li><button onClick={() => navigate('/profil')}>Profile</button></li>
                            <li><button onClick={() => navigate('/signup')}>Sign Up</button></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><button onClick={() => navigate('/signin')}>Sign In</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
