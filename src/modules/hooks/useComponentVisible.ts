import React, { useEffect, useRef, useState } from "react";

const useComponentVisible: any = (initialState: boolean) => {
  const ref = useRef<HTMLElement>(null);
  const [isComponentVisible, setIsComponentVisible] =
    useState<boolean>(initialState);

  const handleClickOutside = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return [ref, isComponentVisible, setIsComponentVisible];
};

export default useComponentVisible;
