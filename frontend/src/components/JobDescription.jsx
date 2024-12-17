import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setSearchedQuery } from '@/redux/jobSlice';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?.id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const handleNavigate = (query) => {
    // Set the query in the Redux store
    dispatch(setSearchedQuery(query));
    // Navigate to the browse page
    navigate("/browse");
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Title and Apply Button */}
      <h1 className="font-bold text-2xl text-center sm:text-left">{singleJob?.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
        <div className="flex flex-wrap gap-4">
          <Badge variant="ghost" className="text-violet-700">
            {singleJob?.position} Openings
          </Badge>
          <Badge variant="ghost" className="text-cyan-600">
            {singleJob?.jobType}
          </Badge>
          <Badge variant="ghost" className="text-yellow-600">
            {singleJob?.salary} LPA
          </Badge>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 sm:mt-0 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600'}`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Job Details */}
      <h1 className="border-b-2 border-b-gray-300 font-bold text-lg py-4 mt-6">
        Job Description
      </h1>
      <div className="my-4 space-y-3">
        <h1 className="font-bold">
          Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold">
          Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span>
        </h1>
        <h1 className="font-bold">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold">
          Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold">
          Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split('T')[0]}</span>
        </h1>
      </div>

      {/* Related Jobs */}
      <div className="border-t-2 border-t-gray-300 mt-8 pt-6">
        <h1 className="font-bold text-lg mb-4">Similar Jobs You May Like</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Frontend Developer", location: "Bangalore", salary: "12 LPA" },
            { title: "Backend Engineer", location: "Mumbai", salary: "15 LPA" },
            { title: "UI/UX Designer", location: "Hyderabad", salary: "10 LPA" },
          ].map((job, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(job.title)}
              className="p-4 rounded-md shadow-lg bg-white cursor-pointer transform hover:scale-105 hover:rotate-1 transition-transform duration-300"
            >
              <h1 className="font-bold">{job.title}</h1>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <Badge variant="ghost" className="text-green-600">Full-Time</Badge>
              <Badge variant="ghost" className="text-yellow-600">{job.salary}</Badge>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JobDescription;
