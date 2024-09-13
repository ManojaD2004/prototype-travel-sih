import Image from 'next/image'
import Link from 'next/link'
import { Search, User } from 'lucide-react'
import logo from "./assets/assets/logo.png"

export default function NavBar() {
    return (
        <nav className="flex flex-col md:flex-row items-center justify-between gap-20 mb-8">
            {/* Left Container */}
            <div className="flex flex-grow items-center justify-start gap-20">
                <div className="flex-shrink-0">
                    <Image src={logo} alt="logo" width={70} height={70} />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-grow items-center justify-around">
                    <ul className="flex items-center gap-8">
                        <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                            <Link href="#">Home</Link>
                        </li>
                        <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                            <Link href="#">Destinations</Link>
                        </li>
                        <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                            <Link href="#">Contact Us</Link>
                        </li>
                        <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                            <Link href="#">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Container */}
            <div className="flex flex-shrink-0 items-center gap-4">
                <div className="hidden md:flex items-center gap-9 bg-white rounded-full px-4 py-2 max-w-[500px] transition duration-300">
                    <input type="text" placeholder="Search" className="w-full text-base text-teal-800 outline-none border-none placeholder-teal-600" />
                    <span className="text-2xl text-teal-800"><i className="ri-search-line"></i></span>
                </div>

                <div className="hidden md:flex items-center gap-4 bg-teal-600 text-white font-semibold px-4 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-teal-500">
                    <span className="p-[5px] text-2xl text-teal-800 bg-white rounded-full">
                        <i className="ri-user-3-fill"></i>
                    </span> Log In
                </div>
                <div className="hidden md:flex items-center gap-4 bg-teal-600 text-white font-semibold px-4 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-teal-500">
                    <span className="p-[5px] text-2xl text-teal-800 bg-white rounded-full">
                        <i className="ri-user-3-fill"></i>
                    </span> Sign In
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden flex items-center gap-2 text-white bg-teal-600 px-4 py-2 rounded-full transition duration-300 hover:bg-teal-500">
                <i className="ri-menu-line text-2xl"></i>
            </button>

            {/* Mobile Menu */}
            <div className="md:hidden w-full flex flex-col items-center mt-4">
                <ul className="flex flex-col items-center gap-4 w-full">
                    <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                        <Link href="#">Home</Link>
                    </li>
                    <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                        <Link href="#">Destinations</Link>
                    </li>
                    <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                        <Link href="#">Contact Us</Link>
                    </li>
                    <li className="font-semibold text-xl text-white hover:text-gray-500 transition-colors duration-300">
                        <Link href="#">Blog</Link>
                    </li>
                </ul>

                <div className="mt-4 flex items-center gap-4 bg-white rounded-full px-4 py-2 w-full transition duration-300">
                    <input type="text" placeholder="Search" className="w-full text-base text-teal-800 outline-none border-none placeholder-teal-600" />
                    <span className="text-2xl text-teal-800"><i className="ri-search-line"></i></span>
                </div>

                <div className="mt-4 flex items-center gap-4 bg-teal-600 text-white font-semibold px-4 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-teal-500">
                    <span className="p-[5px] text-2xl text-teal-800 bg-white rounded-full">
                        <i className="ri-user-3-fill"></i>
                    </span> Log In
                </div>
            </div>
        </nav>
    )
}
