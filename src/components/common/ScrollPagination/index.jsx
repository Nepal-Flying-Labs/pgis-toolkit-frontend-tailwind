import { useRef } from 'react';

const useInfiniteLoading = onScrollEndInteract => {
  const observer = useRef();

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };
  const lastLogElementRef = node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onScrollEndInteract();
      }
    }, options);
    if (node) observer.current.observe(node);
  };

  return { lastLogElementRef };
};

export default useInfiniteLoading;
