import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import FallbackImage from '../assets/assets/icons/gym.png';
import { fetchData, youtubeOptions } from '../Utils/fetchData';

const ExerciseCard = ({ exercise }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!exercise?.name || !exercise?.id) return;

    const cache = (window.__ytThumbCache = window.__ytThumbCache || new Map());
    if (cache.has(exercise.id)) {
      setThumbnail(cache.get(exercise.id));
      return;
    }

    const query = encodeURIComponent(`${exercise.name} exercise`);
    fetchData(`https://youtube-search-and-download.p.rapidapi.com/search?query=${query}`, youtubeOptions)
      .then((data) => {
        const url = data?.contents?.[0]?.video?.thumbnails?.[0]?.url || null;
        if (!cancelled) {
          cache.set(exercise.id, url);
          setThumbnail(url);
        }
      })
      .catch(() => {
        if (!cancelled) setThumbnail(null);
      });

    return () => {
      cancelled = true;
    };
  }, [exercise?.id, exercise?.name]);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
      <img
        src={thumbnail || FallbackImage}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FallbackImage;
        }}
        referrerPolicy="no-referrer"
        decoding="async"
        alt={exercise.name}
        loading="lazy"
        style={{ width: '100%', display: 'block' }}
      />
      <Stack direction="row">
        <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;