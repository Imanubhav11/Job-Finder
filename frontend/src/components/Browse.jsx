import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/UseGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Animation variants for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
        {/* Search Results Heading */}
        <h1 className="font-bold text-xl text-center sm:text-left my-6">
          Search Results ({allJobs.length})
        </h1>

        {/* Jobs Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Job job={job} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No jobs found. Try adjusting your search query.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
