"use client";

import { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";

const NotFoundPage = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width <= 1024);
    };

    checkIsTablet();

    window.addEventListener("resize", checkIsTablet);

    if (!isTablet) {
      document.body.style.backgroundColor = `var(--gray-10)`;
    } else {
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("resize", checkIsTablet);
    };
  }, [isTablet]);

  return <NotFound />;
};

export default NotFoundPage;
