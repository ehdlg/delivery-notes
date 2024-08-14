import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import Root from './Root';
import NoteList from './NoteList';
import EditNote from './EditNote';
import CreateNote from './CreateNote';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
