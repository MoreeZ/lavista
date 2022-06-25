import * as React from 'react';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import "../../gatsby-browser.js"

export interface ILayoutProps {
  hasNavbar?: boolean,
  hasFooter?: boolean
}

export default function Layout(props: React.PropsWithChildren<ILayoutProps>) {
  const isBrowser = typeof window !== "undefined"
  if (!isBrowser) {
    return <></>;
  }
  const [currentPath, setCurrentPath] = useState<string>("");
  const windowWidth = React.useRef<number>(window.innerWidth);

  useEffect(() => {
    // This code adds a window event listener that will set the windowWidth state every time the window resizes.
    const updateWW = () => { windowWidth.current = window.innerWidth };
    if (typeof (window) !== undefined) {
      setCurrentPath(window.location.pathname);
      window.addEventListener('resize', updateWW);
    }
    // removes event listener to prevent memory leaks
    return () => {
      if (typeof (window) !== undefined) {
        window.removeEventListener('resize', updateWW);
      }
    }
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {props.hasNavbar && <Navbar currentPath={currentPath} windowWidth={windowWidth} />}
      <div className='page-content'>
        {props.children}
      </div>
      {props.hasFooter && <Footer />}
    </div>
  );
}
