import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import "../../gatsby-browser.js"

export interface ILayoutProps {
  hasNavbar?: boolean,
  hasFooter?: boolean,
  backgroundColor?: string
}

export default function Layout(props: React.PropsWithChildren<ILayoutProps>) {
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: props.backgroundColor }}>
      {props.hasNavbar && <Navbar />}
      <div className='page-content'>
        {props.children}
      </div>
      {props.hasFooter && <Footer />}
    </div>
  );
}
