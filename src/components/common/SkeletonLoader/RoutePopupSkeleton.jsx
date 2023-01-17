import React from 'react';

export default function RoutePopupSkeleton() {
  return (
    <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-4">
      {Array.from({ length: 5 }).map(() => (
        <>
          <div
            role="status"
            className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-w-28
        naxatw-h-3 naxatw-bg-grey-300 naxatw-rounded-lg naxatw-animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 384 512"
            />
          </div>
          <div
            role="status"
            className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-w-28
        naxatw-h-3 naxatw-bg-grey-300 naxatw-rounded-lg naxatw-animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 384 512"
            />
          </div>
        </>
      ))}
    </div>
  );
}
