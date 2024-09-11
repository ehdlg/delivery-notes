import useToken from '../hooks/useToken';
import Navbar from './Navbar';
import Main from './Main';
import { Navigate } from 'react-router-dom';

function ProtectedRoute() {
  const { isLoggedIn } = useToken();

  if (!isLoggedIn) return <Navigate to='/login' replace={true} />;

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default ProtectedRoute;
