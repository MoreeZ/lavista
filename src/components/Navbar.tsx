import * as React from 'react';
import { useState, useEffect } from 'react';
import { Squash as Hamburger } from 'hamburger-react'
import { useStaticQuery, graphql } from 'gatsby';

export interface Props {
  currentPath: string,
  windowWidth: React.MutableRefObject<number>
}

interface NavLink {
  text: string,
  to: string,
  dropdownList?: NavLink[]
}

const links: Array<NavLink> = [
  { text: "Home", to: ""},
  { text: "Our Rooms", to: "/rooms"},
  { text: "Our restaurant", to: "/restaurant"},
  { text: "Services and activities", to: "/services-and-activites"},
  { text: "Make a reservation", to: "/reservation"},
]

export default function Navbar(props: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  // const {dataJson} = useStaticQuery(graphql`
  //   query LogoQuery {
  //     allImageSharp(filter: {fluid: {originalName: {eq: "icon.png"}}}) {
  //       nodes {
  //         fluid {
  //           originalName
  //           base64
  //         }
  //       }
  //     }
  //   }
  // `)

  useEffect(()=>{
    const htmlElem = document.querySelector('html');
    const dropdown = document.getElementById('nav-dropdown');
    if (typeof(document) !== undefined && htmlElem !== null && dropdown !== null) {
      if (isOpen){
        htmlElem.style.overflowY = "hidden";
        dropdown.style.overflowY = "scroll";
      }else {
        htmlElem.style.overflowY = "scroll";
        dropdown.style.overflowY = "scroll";
      }
    }
  },[isOpen])
  return (
    <div className='navbar'>
      <div className='nav-container'>
        <div className='nav-left'>
          {props.windowWidth.current > 800 ?
            <div className='nav-logo'><img src={"#"} alt="Logo" /></div>
            :
            <Hamburger size={30} color="white" toggle={setOpen} toggled={isOpen}/>
            
          }
        </div>
        <div className='nav-center'>
          {props.windowWidth.current <= 800 &&
            <a className='nav-logo' href='/'><img src='#' alt="LC Tutors" /></a>
          }
        </div>
        <div className='nav-right'>
          {props.windowWidth.current > 800 &&
            links && links.map((link, index) => (
              <div className='nav-link-box' key={index}>
                <a href={link.to} className={props.currentPath === link.to || props.currentPath === link.to + "/" ? "active-link" : ""}>
                  {link.text}
                </a>
                {link.dropdownList && link.dropdownList.map((link2, index) => (
                  <div className='nav-link-box dropdown-link' key={index}>
                    <a href={link2.to} className={props.currentPath === link2.to || props.currentPath === link2.to + "/" ? "active-link" : ""}>
                      {link2.text}
                    </a>
                  </div>
                ))}
              </div>
            ))}
        </div>
        {props.windowWidth.current <= 800 &&
          <div id="nav-dropdown" className={'nav-dropdown ' + (isOpen ? "" : "hidden")}>
            {
              links && links.map((link, index) => (
                <div className='nav-dropdown-link' key={index}>
                  <a key={link.to} href={link.to} className={props.currentPath === link.to || props.currentPath === link.to + "/" ? "active-link" : ""}>
                    {link.text}
                  </a>

                </div>
              ))}
          </div>}
      </div>
    </div>
  );
}