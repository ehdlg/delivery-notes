import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <main className='mx-auto my-10 sm:max-w-4xl 2xl:max-w-[1700px]'>
      <Outlet />
    </main>
  );
}

export default Main;
