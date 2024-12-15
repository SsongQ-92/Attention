import { useEffect, useState } from 'react';

const useDropDown = (ref: HTMLElement) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    function checkClickOutsideRef(e: MouseEvent) {
      if (e.target !== ref) {
        setIsDropDownOpen(false);
      }
    }

    document.addEventListener('click', checkClickOutsideRef);

    return () => {
      document.removeEventListener('click', checkClickOutsideRef);
    };
  }, [ref]);

  return [isDropDownOpen, setIsDropDownOpen];
};

export default useDropDown;
