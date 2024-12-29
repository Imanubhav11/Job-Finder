import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const changeEventHandler = (item) => {
    setInput({ ...input, [item.target.name]: item.target.value });
  };

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-100 rounded-md p-4 sm:p-6 lg:p-8 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl lg:text-2xl mb-5">
            Log <span className="text-blue-600">In</span>
          </h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="abc123@xyz.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
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
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  value="Recruiter"
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
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="mt-10 block text-center">
            Don&#39;t have an account?{' '}
            <Link className="text-blue-600 cursor-pointer" to="/signup">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
