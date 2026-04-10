import { useEffect, useRef, useState, type PointerEventHandler, type WheelEventHandler } from 'react';

type UseHomePageSwipeOptions = {
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const DRAG_THRESHOLD = 8;
const WHEEL_SWIPE_THRESHOLD = 150;
const WHEEL_ACCUMULATE_MS = 400;

export function useHomePageSwipe(options: UseHomePageSwipeOptions) {
  const containerRef = useRef<HTMLElement | null>(null);
  const swipeStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isDragging: boolean;
    captureTarget: HTMLElement | null;
  } | null>(null);
  const transitionLockRef = useRef(false);
  const transitionLockTimerRef = useRef<number | null>(null);
  const [pageTransitionDirection, setPageTransitionDirection] = useState<-1 | 1>(1);

  // Horizontal wheel accumulator for trackpad swipe
  const wheelAccum = useRef({ dx: 0, lastTick: 0 });

  useEffect(() => {
    return () => {
      if (transitionLockTimerRef.current !== null) {
        window.clearTimeout(transitionLockTimerRef.current);
      }
    };
  }, []);

  const clearSwipeState = () => {
    swipeStateRef.current = null;
  };

  const lockTransition = () => {
    transitionLockRef.current = true;

    if (transitionLockTimerRef.current !== null) {
      window.clearTimeout(transitionLockTimerRef.current);
    }

    transitionLockTimerRef.current = window.setTimeout(() => {
      transitionLockRef.current = false;
      transitionLockTimerRef.current = null;
    }, 280);
  };

  const finishSwipe = (pointerId: number) => {
    if (!swipeStateRef.current || swipeStateRef.current.pointerId !== pointerId) {
      return;
    }

    if (!swipeStateRef.current.isDragging) {
      clearSwipeState();
      return;
    }

    const deltaX = swipeStateRef.current.endX - swipeStateRef.current.startX;
    const deltaY = swipeStateRef.current.endY - swipeStateRef.current.startY;
    const minimumSwipeDistance = 40;

    if (!transitionLockRef.current && Math.abs(deltaX) >= minimumSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        setPageTransitionDirection(1);
        lockTransition();
        options.onNextPage();
      } else {
        setPageTransitionDirection(-1);
        lockTransition();
        options.onPreviousPage();
      }
    }

    clearSwipeState();
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!event.isPrimary || transitionLockRef.current) {
      return;
    }

    if (event.pointerType !== 'touch' && event.pointerType !== 'mouse') {
      return;
    }

    swipeStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      endX: event.clientX,
      endY: event.clientY,
      isDragging: false,
      captureTarget: event.currentTarget as HTMLElement
    };
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!swipeStateRef.current || swipeStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    swipeStateRef.current.endX = event.clientX;
    swipeStateRef.current.endY = event.clientY;

    if (!swipeStateRef.current.isDragging) {
      const dx = Math.abs(event.clientX - swipeStateRef.current.startX);
      const dy = Math.abs(event.clientY - swipeStateRef.current.startY);

      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        swipeStateRef.current.isDragging = true;
        const target = swipeStateRef.current.captureTarget;
        if (target && !target.hasPointerCapture(event.pointerId)) {
          target.setPointerCapture(event.pointerId);
        }
      }
    }
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    finishSwipe(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    finishSwipe(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    finishSwipe(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleLostPointerCapture: PointerEventHandler<HTMLDivElement> = () => {
    clearSwipeState();
  };

  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    if (transitionLockRef.current) return;

    const now = Date.now();

    // Reset accumulator if too much time has passed or direction changed
    if (now - wheelAccum.current.lastTick > WHEEL_ACCUMULATE_MS) {
      wheelAccum.current = { dx: 0, lastTick: now };
    }
    if (wheelAccum.current.dx !== 0 && Math.sign(event.deltaX) !== Math.sign(wheelAccum.current.dx)) {
      wheelAccum.current = { dx: 0, lastTick: now };
    }

    wheelAccum.current.dx += event.deltaX;
    wheelAccum.current.lastTick = now;

    // Only trigger if horizontal scroll is dominant
    if (Math.abs(wheelAccum.current.dx) < WHEEL_SWIPE_THRESHOLD) return;
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;

    if (wheelAccum.current.dx > 0) {
      setPageTransitionDirection(-1);
      lockTransition();
      options.onPreviousPage();
    } else {
      setPageTransitionDirection(1);
      lockTransition();
      options.onNextPage();
    }

    // Reset after triggering
    wheelAccum.current = { dx: 0, lastTick: now };
  };

  return {
    containerRef,
    pageTransitionDirection,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
    handleLostPointerCapture,
    handleWheel
  };
}
