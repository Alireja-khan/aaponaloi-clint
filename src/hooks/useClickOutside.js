import { useEffect } from 'react';

/**
 * Detects clicks outside the referenced element and runs a callback
 * @param {React.RefObject} ref - element to detect outside click from
 * @param {Function} callback - function to call on outside click
 */
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
