import { useEffect, useState } from "react";

const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px = desktop breakpoint
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <h1 className="text-2xl font-bold">Desktop Only</h1>
        <p>Please use a laptop or desktop to access the admin dashboard.</p>
    </div>
    );
  }

  return children;
};

export default DesktopOnly;