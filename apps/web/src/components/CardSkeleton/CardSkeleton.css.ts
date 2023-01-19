import { keyframes, style } from '@vanilla-extract/css';

const shine = keyframes({
  '100%': {
    backgroundPosition: 'right -40px top 0',
  },
});

export const cardSkeletonStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: 247,
  width: 330,
  backgroundColor: '#FFF',
  boxShadow: '0 5px 10px 0 rgb(0 0 0 / 15%)',
  borderRadius: '10px',
  overflow: 'hidden',
});

export const cardSkeletonImageStyle = style({
  backgroundColor: '#e2e5e7',
  backgroundImage:
    'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
  backgroundSize: '40px 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left -40px top 0',
  animation: `${shine} 1s ease infinite`,
  height: 247,
});
