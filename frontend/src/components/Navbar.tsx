import Search from './Search';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <div className='sticky top-0 h-12 border-b border-gray-200 bg-white p-2 opacity-90 shadow-sm'>
      <nav className='mx-auto flex h-full items-center justify-around'>
        <Link to={'/'}>
          <img
            src={logo}
            alt='Logo Talleres Electromecanicos Lupiañez'
            className='h-4 w-fit'
          />
        </Link>
        <Search />
        <Link to='/nueva'>
          <PlusCircleIcon className='size-8 rounded-full text-gray-700 transition ease-in hover:bg-gray-700 hover:text-white' />
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
