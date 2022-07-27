import React from 'react';
import { PuffLoader } from 'react-spinners';

export const LoadingState = React.memo(() => {
  return (
    <div className="p-14">
      <div className="mx-auto text-center">
        <PuffLoader color="#9CA3AF" size="3rem" cssOverride={{ marginLeft: 'auto', marginRight: 'auto' }} />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Loading...</h3>
      </div>
    </div>
  );
});
