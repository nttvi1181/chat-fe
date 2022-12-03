import React, { useEffect, useRef } from 'react';

type Props = {
  children: any;
  onClickOutside: () => void;
  multiWraperRef?: any[];
  style?: any;
}

const ClickOutside = ({
  children, onClickOutside, multiWraperRef, style,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
       * Alert if clicked on outside of element
       */
    function handleClickOutside(event: any) {
      let checkInsite = false;
      if (multiWraperRef && multiWraperRef.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const wrapRef of multiWraperRef) {
          if (wrapRef?.current && wrapRef.current.contains(event.target)) {
            checkInsite = true;
          }
        }
      }

      if (ref?.current && !ref?.current.contains(event.target) && !checkInsite) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return <div ref={ref} style={style || null}>{children}</div>;
};

export default ClickOutside;
