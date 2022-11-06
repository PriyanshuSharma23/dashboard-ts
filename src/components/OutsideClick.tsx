import React, { useRef, useEffect, RefObject } from "react";

function useOutsideAlerter(ref: RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter({
  children,
  cb,
}: {
  children: React.ReactNode;
  cb: () => void;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, cb);

  return <div ref={wrapperRef}>{children}</div>;
}
