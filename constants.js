const HH_BODY_ID = 'hh_hentai';

const STYLE = {
  ABSOLUTE: {
    position: 'absolute',
    top: '.5em',
    right: '.5em'
  },
  POINTER: {
    cursor: 'pointer'
  },
  
  FLIP_BTN: {
    width: '3em',
    height: '3em',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(to top,#008ed5 0,#05719c 100%)',
    boxShadow: '0 3px 0 rgba(13,22,25,.6), inset 0 3px 0 #6df0ff',
    border: '1px solid #000',
    borderRadius: '0.5em',
  },

  BOARD_WRAP: {
    position: 'relative',
    display: 'none',
    backgroundImage: 'linear-gradient(180deg,#ffa23e,#c41b53)',
    width: '15em',
    padding: '.2em',
    borderRadius: '0.5em',
    zIndex: 10
  },
  CLOSE: {
    width: '2em',
    height: '2em'
  },
  BOARD: {
    backgroundImage:
      'linear-gradient(to top,#572332 0,#572332 1%,#2c1e1c 100%)',
    backgroundSize: '8em',
    borderRadius: '0.35em',
    padding: '1em .5em'
  }
};
