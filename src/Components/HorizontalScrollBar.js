import React, { useContext, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/assets/icons/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

// Wrapper to consume itemId so it isn't forwarded to the DOM (avoids React warning),
// while still exposing it to ScrollMenu via the React element props.
const ScrollItem = ({ itemId, children, ...rest }) => (
  <Box {...rest}>{children}</Box>
);

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  useEffect(() => {
    const container = document.querySelector('.react-horizontal-scrolling-menu--scroll-container');
    if (!container) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      isDown = true;
      container.classList.add('is-grabbing');
      const rect = container.getBoundingClientRect();
      startX = e.clientX - rect.left;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove('is-grabbing');
    };
    const onMouseUp = () => {
      isDown = false;
      container.classList.remove('is-grabbing');
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = x - startX;
      const target = scrollLeft - walk;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const clamped = Math.max(0, Math.min(target, maxScroll));
      container.scrollLeft = clamped;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const content = (
    <>
      {data.map((item) => (
        <ScrollItem
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          sx={{
            display: 'inline-block',
            verticalAlign: 'top',
            mr: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {bodyParts ? (
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </ScrollItem>
      ))}
    </>
  );

  if (bodyParts) {
    return <ScrollMenu>{content}</ScrollMenu>;
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {content}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;