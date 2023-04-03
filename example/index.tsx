import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DateRangeCard } from './components/DateRangeCard';
import { Button, Popper } from '@material-ui/core';
import { useRef, useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = (): void => setOpen(prevOpen => !prevOpen);
  const handleClose = (): void => setOpen(false);

  const buttonAnchorRef = useRef<HTMLButtonElement>(null);

  return (
    <React.Fragment>
      <Button ref={buttonAnchorRef} onClick={handleToggle} variant="contained">
        Open Me
      </Button>
      <Popper
        open={open}
        anchorEl={buttonAnchorRef.current}
        placement="bottom-start"
      >
        <DateRangeCard onClose={handleClose} />
      </Popper>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
