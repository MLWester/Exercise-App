import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography, Grid } from '@mui/material';

import { exerciseOptions, fetchData } from '../Utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        let exercisesData = [];

        if (bodyPart === 'all') {
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        } else {
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        }

        setExercises(exercisesData || []);
        try {
          if (Array.isArray(exercisesData) && exercisesData.length > 0) {
            console.log('[debug] sample list gifUrl:', exercisesData[0]?.gifUrl);
          }
        } catch {}
      } catch (err) {
        console.error('Failed to load exercises:', err);
        setExercises([]);
      }
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: 6, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: 44, xs: 32 }, mb: 5 }}>
        Showing Results
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} alignItems="stretch">
        {currentExercises.map((exercise, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 9, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Box>
    </Box>
  );
};

export default Exercises;