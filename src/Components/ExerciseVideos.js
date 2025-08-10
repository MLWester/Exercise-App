import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos) return <Loader />;
  if (exerciseVideos.length === 0) {
    return (
      <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
        <Typography sx={{ fontSize: { lg: '28px', xs: '18px' } }} color="#000">
          No videos found. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} 
      fontWeight={700} 
      color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', 
            textTransform: 'capitalize' }}>
                {name}</span> exercise videos
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gridTemplateRows: 'repeat(2, auto)',
          gridAutoFlow: 'column',
          columnGap: { xs: '16px', sm: '24px', lg: '40px' },
          rowGap: { xs: '16px', sm: '24px', lg: '40px' },
          alignItems: 'start',
          justifyItems: 'stretch',
        }}
      >
        {exerciseVideos?.slice(0, 6)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            style={{ width: '100%', height: '100%' }}
          >
            <img
              style={{ width: '100%', height: 'auto', borderTopLeftRadius: '20px' }}
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
            />
            <Box>
              <Typography sx={{ fontSize: { lg: '28px', xs: '18px' } }} 
              fontWeight={600} color="#000">
                {item.video.title}
              </Typography>
              <Typography fontSize="14px" color="#000">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default ExerciseVideos;