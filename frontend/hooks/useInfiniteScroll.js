import {  useRef, useCallback } from "react";

export const useInfiniteScroll = ({ hasMore, loading, onIntersect }) => {
  const observer = useRef();

  const observeTarget = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onIntersect();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, onIntersect]
  );

  return observeTarget;
};