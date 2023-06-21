import { useEffect, useRef, useState } from 'react';

function debounce(func, timeout = 300) {
  let timer;
  return arg => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(arg);
    }, timeout);
  };
}

export default function useScrollToBottom({ elementId = 'scroll-container' }) {
  const scrollContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [bottomTouched, setBottomTouched] = useState();

  const scrollContainerHeight = scrollContainerRef?.current?.clientHeight;
  const scrollContentHeight = scrollContentRef?.current?.clientHeight;

  useEffect(() => {
    const el = document.getElementById(elementId);
    const handleScroll = debounce(() => {
      // https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom-not-just-the-window-but-any-element
      const bottom =
        Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;
      setBottomTouched(bottom);
    }, 50);
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [elementId]);

  return {
    scrollContainerRef,
    scrollContentRef,
    showButton: scrollContainerHeight < scrollContentHeight && !bottomTouched,
  };
}
