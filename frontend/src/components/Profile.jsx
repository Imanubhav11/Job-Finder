import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Edit, Mail } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { Separator } from './ui/separator';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/UseGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      {/* Profile Header Section */}
      <div className="max-w-7xl mx-auto bg-white-border bg-gray-200 rounded-2xl my-5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-bold text-xl mt-2 sm:mt-9">{user?.fullName}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Edit className="mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Details Section */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-800">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-800">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-bold text-lg">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-4">
          <Label className="font-bold">Resume Upload </Label>
          {isResume ? (
            <a
              className="cursor-pointer text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-600">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 sm:p-8 my-5">
        <h1 className="font-bold text-lg text-center sm:text-left">Applied Jobs</h1>
        <Separator className="my-4" />
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
