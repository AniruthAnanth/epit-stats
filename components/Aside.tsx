'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AsideProps {
  children: React.ReactNode;
}

export default function Aside({ children }: AsideProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [topPosition, setTopPosition] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const asideColumn = document.querySelector('.aside-column');
    if (asideColumn) {
      setPortalTarget(asideColumn as HTMLElement);
    }

    const updatePosition = () => {
      if (!markerRef.current) return;

      const gridContainer = document.querySelector('.grid');
      if (!gridContainer) return;

      // Calculate offset from grid top using offsetTop (scroll-independent)
      let element = markerRef.current as HTMLElement | null;
      let offsetTop = 0;

      // Walk up the DOM tree until we reach the grid container
      while (element && element !== gridContainer) {
        offsetTop += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;

        // Break if we've gone outside the grid container
        if (element && !gridContainer.contains(element)) {
          break;
        }
      }

      setTopPosition(offsetTop);
      setIsReady(true);
    };

    // Update position multiple times to ensure proper rendering
    const timeoutId1 = setTimeout(updatePosition, 100);
    const timeoutId2 = setTimeout(updatePosition, 300);

    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', updatePosition);
    };
  }, [children]);

  return (
    <>
      <div ref={markerRef} className="aside-marker" />
      {portalTarget && isReady && createPortal(
        <div
          className="aside-content"
          style={{
            position: 'absolute',
            top: `${topPosition - 50}px`,
            opacity: 1,
            transition: 'opacity 0.2s ease-in'
          }}
        >
          {children}
        </div>,
        portalTarget
      )}
    </>
  );
}
