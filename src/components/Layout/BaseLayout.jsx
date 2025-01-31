import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@components/partial/Header";
import Footer from "@components/partial/Footer";
import { routeClick } from "@helpers/routeClick";

export default function BaseLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState({
    home: false,
    project: true,
    shelf: true,
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleOnRouteClick = (route) => {
    setVisibility(routeClick(route));

    if (screenWidth < 540 && isOpen) {
      document.body.classList.remove("no-scroll");
    }
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header
        handleOnRouteClick={handleOnRouteClick}
        visibility={visibility}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        screenWidth={screenWidth}
      />
      <Outlet />
      <Footer
        visibility={visibility}
        handleOnRouteClick={handleOnRouteClick}
        setIsOpen={setIsOpen}
      />
      <ScrollRestoration /> 
    </>
  );
}
