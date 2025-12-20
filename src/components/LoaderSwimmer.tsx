import React from 'react';

export interface LoaderSwimmerProps {
  loading: boolean;
}

/**
 * Shows an animated swimmer loader when `loading` is true.
 *
 * @param props - Contains the loading boolean
 * @returns Loader element or null
 */
const LoaderSwimmer: React.FC<LoaderSwimmerProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div data-testid="loader-swimmer" aria-live="polite" className="flex items-center justify-center p-4">
      <div className="animate-pulse text-sky-500">🏊‍♂️ Loading…</div>
    </div>
  );
};

export default React.memo(LoaderSwimmer);



