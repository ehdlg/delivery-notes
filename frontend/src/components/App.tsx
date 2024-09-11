import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedRoute from './ProtectedRoute';
import NoteList from './NoteList';
import EditNote from './EditNote';
import CreateNote from './CreateNote';
import Login from './Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <h1>No encontrado</h1>,
    children: [
      {
        path: '/',
        element: <NoteList />
      },
      {
        path: '/:id',
        element: <EditNote />
      },
      {
        path: '/nueva',
        element: <CreateNote />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster closeButton richColors position='top-right' expand />
    </>
  );
}

export default App;
