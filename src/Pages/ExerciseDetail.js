import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../Utils/fetchData';
import Detail from '../Components/Detail';
import ExerciseVideos from '../Components/ExerciseVideos';
import SimilarExercises from '../Components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [heroThumbnail, setHeroThumbnail] = useState(null);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      try {
        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        if (!exerciseDetailData) {
          setExerciseDetail({});
          setExerciseVideos([]);
          setTargetMuscleExercises([]);
          setEquipmentExercises([]);
          return;
        }
        const detail = Array.isArray(exerciseDetailData) ? exerciseDetailData[0] : exerciseDetailData;
        setExerciseDetail(detail);
        // Ensure we have a gifUrl; fallback to known CDN pattern if missing
        const detailWithGif = {
          ...detail,
          gifUrl: detail?.gifUrl || (detail?.id ? `https://d205bpvrqc9yn1.cloudfront.net/${detail.id}.gif` : undefined),
        };
        try { console.log('[debug] detail object:', detailWithGif); console.log('[debug] detail gifUrl:', detailWithGif?.gifUrl); } catch {}

        const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${detail.name} exercise`, youtubeOptions);
        const contents = exerciseVideosData?.contents || [];
        setExerciseVideos(contents);
        const firstThumb = contents?.[0]?.video?.thumbnails?.[0]?.url || null;
        setHeroThumbnail(firstThumb);

        const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${detail.target}`, exerciseOptions);
        setTargetMuscleExercises(targetMuscleExercisesData || []);

        const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${detail.equipment}`, exerciseOptions);
        setEquipmentExercises(equimentExercisesData || []);
        setExerciseDetail(detailWithGif);
      } catch (err) {
        console.error('Failed to load exercise detail:', err);
        setExerciseDetail({});
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} heroThumbnail={heroThumbnail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;