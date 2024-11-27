import { Monitor, Setting2 } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const isSubmenuActive = (subPaths) => subPaths.some(path => pathname.startsWith(path));

  const toggleSubmenu = () => setSubmenuOpen(!isSubmenuOpen);

  return (
    <aside className="left-0 w-64 space-y-6 py-7">
      <div className="text-2xl font-bold text-center">
        <Link href="/">Alinbox</Link>
      </div>
      <nav>
        <ul className='p-0'>
          <li>
            <Link
              href="/app/dashboard"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/dashboard') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Monitor className="mr-3" color={`${
                isActive('/app/dashboard') ? '#06b6d4' : 'black'
              }`} size={25} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/app/settings"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/settings') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Setting2 className="mr-3" color={`${
                isActive('/app/settings') ? '#06b6d4' : '#333'
              }`} size={25} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
