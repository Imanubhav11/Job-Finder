import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { USER_API_ENDPOINT } from '@/utils/constant';

const Signup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',
    });

    const changeEventHandler = (item) => {
        setInput({ ...input, [item.target.name]: item.target.value });
    };

    const changeFileHandler = (item) => {
        setInput({ ...input, file: item.target.files?.[0] });
    };

    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const submitHandler = async (event) => {
        event.preventDefault();

        const emailRegex = /^(?=.*\d)[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(input.email)) {
            toast.error("Invalid email. It must contain a number and '@'.");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(input.phoneNumber)) {
            toast.error('Invalid phone number. It must be exactly 10 digits.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(input.password)) {
            toast.error(
                'Invalid password. It must contain at least 8 characters, including at least one letter and one number.'
            );
            return;
        }

        const formData = new FormData();
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-lg border-gray-500 bg-gray-100 rounded-md p-4 sm:p-6 lg:p-8 my-10 shadow-md"
                >
                    <h1 className="font-bold text-xl lg:text-2xl mb-5">
                        Sign <span className="text-blue-600">Up</span>
                    </h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder="Enter Your name e.g: Robin"
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abc123@xyz.com"
                        />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="9857392094"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter the password"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">
                        <RadioGroup className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Jobseeker"
                                    checked={input.role === 'Jobseeker'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Jobseeker</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label className="text-sm">Profile Photo</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Sign Up
                        </Button>
                    )}
                    <span className="mt-10 block text-center">
                        Already have an account?{' '}
                        <Link className="text-blue-600 cursor-pointer" to="/login">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
