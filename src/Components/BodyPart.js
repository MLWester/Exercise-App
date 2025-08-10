import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/assets/icons/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      borderTop: bodyPart === item ? '4px solid #FF2625' : '4px solid transparent',
      background: '#fff',
      borderRadius: '12px',
      minWidth: { xs: '180px', sm: '200px', md: '220px' },
      height: { xs: '160px', sm: '180px', md: '200px' },
      cursor: 'pointer',
      gap: 2,
      boxShadow: bodyPart === item ? '0 6px 20px rgba(255,38,37,0.2)' : '0 2px 10px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 24px rgba(0,0,0,0.12)' },
      textAlign: 'center',
      px: 2,
    }}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src={Icon} alt="dumbbell" style={{ width: 40, height: 40 }} />
    <Typography fontSize={{ xs: 16, sm: 18, md: 20 }} fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize">
      {item}
    </Typography>
  </Stack>
);

export default BodyPart;