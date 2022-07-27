import React from 'react';

export const ErrorState = React.memo(({ error }: any) => {
  return (
    <div className="p-14 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">Something bad hapened</h3>
      <p className="mt-1 text-sm text-gray-500">{error?.message}</p>
    </div>
  );
});
