import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-gray-85 border border-gray-200 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'
      style={{ height: '250px' }}
    >
      <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
      <p className='text-sm'>{job?.location}</p>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p
          className='text-sm text-gray-600'
          style={{
            maxHeight: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3', // Limit to 3 lines
            WebkitBoxOrient: 'vertical',
          }}
        >
          {job?.company?.description}
        </p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
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
    </div>

  );
};

export default LatestJobCards;
