import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_ENDPOINT } from '@/utils/constant';


const UpdateProfileDialog = ({open, setOpen}) => {
    const [loading, setLoading ] = useState(false);
    const {user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const dispatch = useDispatch();

    //item is the attribute that is to be edited and ...input is the attribute that is fetched from DB using backend
    const changeEventHandler = (item) => {
        setInput({...input, [item.target.name]:item.target.value});
    }

    const fileChangeHandler = (item) => {
        const file = item.target.files?.[0];
        setInput({...input,file});

    }

    const submitHandler = async(item) => {
        // isko nahi kia to page referesh ho jaayega new fields with no inputs will show up
        item.preventDefault();
        
        const formData = new FormData();
        formData.append("fullName",input.fullName);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills", input.skills);
        if(input.file){
            formData.append("file",input.file);
        }

        try{
             setLoading(true);
             const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false);
        }
        setOpen(false);
      
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[450px]" onInteractOutside = {()=> setOpen(false)}>
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div className='grid gap-4 py-4'>

                    <div className='grid grid-cols-4 items-center'>
                        <Label htmlFor="name" className="ml-10">Name</Label>
                        <Input 
                            id="name" 
                            type="text"
                            value={input.fullName} 
                            name="name" 
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>

                    <div className='grid grid-cols-4 items-center'>
                        <Label htmlFor="email" className="ml-10">Email</Label>
                        <Input 
                            id="email" 
                            type="email"
                            value={input.email} 
                            name="email" 
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>
                    
                    <div className='grid grid-cols-4 items-center'>
                        <Label htmlFor="number" className="ml-10">Ph No.</Label>
                        <Input 
                            id="number" 
                            type="number"
                            value={input.phoneNumber} 
                            name="number" 
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>

                    <div className='grid grid-cols-4 items-center'>
                        <Label htmlFor="bio" className="ml-10">Bio</Label>
                        <Input 
                            id="bio" 
                            type="text"
                            value={input.bio} 
                            name="bio" 
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="skills" className="text-right">Skills</Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="col-span-3"
                        />
                    </div>

                    <div className='grid grid-cols-4 items-center'>
                        <Label htmlFor="file" className="ml-10">Resume</Label>
                        <Input 
                            id="file" 
                            name="file" 
                            type="file" 
                            accept="application/pdf" 
                            onChange={fileChangeHandler}
                            className="col-span-3"
                        />
                    </div>

                </div>
                <DialogFooter>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }
                    <DialogClose asChild className='mt-4'>
                        <Button onClick={() => setOpen(false)} type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog;
