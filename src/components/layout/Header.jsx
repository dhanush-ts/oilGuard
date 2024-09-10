import logo from '@/components/asserts/logo.jpg';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { Separator } from "../ui/separator";

export const Header = () => {

  const [dark, SetDark] = useState(true);

  useEffect(() => {
  if (dark) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
}, [dark]);

  return (
    <div className="border-b mx-5 py-4 flex justify-between">
        <div className="flex">
            <img src={logo} alt="" className="w-10 rounded-full mx-4" />
            <strong className="my-auto text-2xl">OilGuard<i class="bi bi-droplet-half"></i></strong>
        </div>
        <nav className="flex">
            <NavLink to='/' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto hover:pb-2 hover:transition-all duration-500 mx-2 dark:text-gray-500 "}>Home</NavLink>
            <Separator orientation="vertical" />
            <NavLink to='/dashboard' className={(a)=>a.isActive?"my-auto mx-2 hover:pb-2 hover:transition-all duration-500  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 dark:text-gray-500 hover:pb-2 hover:transition-all duration-500"}>Dashboard</NavLink>
            <Separator orientation="vertical" />
            <NavLink to='/portal' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 dark:text-gray-500 hover:pb-2 hover:transition-all duration-500"}>Spill Detection</NavLink>
            {/* <Separator orientation="vertical" />
            <NavLink to='/place' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 dark:text-gray-500 hover:pb-2 hover:transition-all duration-500"}>Place</NavLink>
            <Separator orientation="vertical" />
            <NavLink to='/user' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 dark:text-gray-500 hover:pb-2 hover:transition-all duration-500"}>User</NavLink> */}
        </nav>
        <div className="mx-5 flex">
          <i onClick={() => SetDark(!dark)} className={dark?"text-2xl bi bi-brightness-low border my-auto p-1 px-2 rounded-lg":"text-2xl rounded-lg bi bi-brightness-low-fill p-1 px-2 my-auto border"}></i>
          <img src="https://github.com/shadcn.png" alt="" className="w-10 rounded-full mx-4" />
          <p className="my-auto font-bold">Dhanush</p>
        </div>
    </div>
  )
}
