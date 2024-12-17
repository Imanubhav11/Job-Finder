import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);  // State for toggling menu

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white mt-5'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-5'>
                <div className='text-2xl font-bold text-black'>
                    <h1>Job <span className='text-blue-900'>Finder</span></h1>
                </div>
                <div className='flex items-center gap-5 md:gap-8'>
                    {/* Navigation Links for Desktop and Larger Screens */}
                    <ul className='hidden md:flex font-medium items-center gap-5'>
                        {user && user.role === 'Recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="transition-all duration-300 ease-in-out">
                                    <Link 
                                        to="/" 
                                        className="px-2 py-1 hover:bg-black hover:text-white rounded-md"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="transition-all duration-300 ease-in-out">
                                    <Link 
                                        to="/jobs" 
                                        className="px-2 py-1 hover:bg-black hover:text-white rounded-md"
                                    >
                                        Jobs
                                    </Link>
                                </li>
                                <li className="transition-all duration-300 ease-in-out">
                                    <Link 
                                        to="/browse" 
                                        className="px-2 py-1 hover:bg-black hover:text-white rounded-md"
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Mobile Hamburger Menu for Smaller Screens */}
                    <div className='md:hidden'>
                        <Button variant="outline" onClick={() => setMenuOpen(!menuOpen)}>Menu</Button>
                    </div>

                    {/* User Authentication and Profile */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"> <Button className="bg-blue-600 hover:bg-blue-700">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover className="cursor-pointer">
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium mt-2 ml-4'>{user?.fullName}</h4>
                                        <p className='text-sm text-muted-foreground ml-3'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    {user && user.role === 'Jobseeker' && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant='link'><Link to="/profile">View Profile </Link></Button>
                                        </div>
                                    )}
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant='link'>Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Menu Links */}
            {menuOpen && (
                <div className='md:hidden flex flex-col items-center justify-center gap-4 mt-4 px-5'>
                    {user && user.role === 'Recruiter' ? (
                        <>
                             <Link 
                                to="/admin/companies" 
                                className="text-lg block w-full px-2 py-2 hover:bg-black hover:text-white rounded-md text-center"
                            >
                                Companies
                            </Link>
                            <Link 
                                to="/admin/jobs" 
                                className="text-lg block w-full px-2 py-2 hover:bg-black hover:text-white rounded-md text-center"
                            >
                                Jobs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/" 
                                className="text-lg block w-full px-2 py-2 hover:bg-black hover:text-white rounded-md text-center"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/jobs" 
                                className="text-lg block w-full px-2 py-2 hover:bg-black hover:text-white rounded-md text-center"
                            >
                                Jobs
                            </Link>
                            <Link 
                                to="/browse" 
                                className="text-lg block w-full px-2 py-2 hover:bg-black hover:text-white rounded-md text-center"
                            >
                                Browse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar;
