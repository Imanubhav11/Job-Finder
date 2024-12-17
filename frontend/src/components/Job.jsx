import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongoDBTime) => {
    const createdAt = new Date(mongoDBTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className='p-5 rounded-md shadow-xl bg-gray-90 border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
    >
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg-2'>{job?.title}</h1>
        <p
          style={{
            maxHeight: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3', // Limit to 3 lines
            WebkitBoxOrient: 'vertical',
          }}
          className="text-sm text-gray-600"
        >
          {job?.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-cyan-600 font-bold' variant='ghost'>
          {job?.position} openings
        </Badge>
        <Badge className='text-green-600 font-bold' variant='ghost'>
          {job?.jobType}
        </Badge>
        <Badge className='text-violet-600 font-bold' variant='ghost'>
          {job?.salary} LPA
        </Badge>
      </div>
      <div className='flex gap-4 mt-3 items-center'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button className="bg-blue-900">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
