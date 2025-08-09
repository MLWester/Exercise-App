import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../Utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exercisesData);
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
    <div id="exercises" style={{ marginTop: 50, padding: 20 }}>
      <Typography variant="h4" fontWeight="bold" style={{ fontSize: 44, marginBottom: 46 }}>Showing Results</Typography>
      <div style={{ width: '100vw', overflowX: 'auto', position: 'relative', padding: 0, margin: 0 }}>
        <div
          style={{
            display: 'inline-flex',
            minWidth: 'max-content',
            whiteSpace: 'nowrap',
            paddingBottom: 16,
          }}
        >
          {currentExercises.map((exercise, idx) => (
            <span key={idx} style={{ display: 'inline-block', marginRight: 32 }}>
              <ExerciseCard exercise={exercise} />
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {exercises.length > 9 && (
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
      </div>
    </div>
  );
};

export default Exercises;