import * as React from 'react';
import { useState, useEffect } from 'react';
import { Squash as Hamburger } from 'hamburger-react'
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

interface NavLink {
  text: string,
  to: string,
  dropdownList?: NavLink[]
}

const links: Array<NavLink> = [
  { text: "Home", to: "" },
  { text: "Rooms", to: "/rooms" },
  { text: "Restaurant", to: "/restaurant" },
  { text: "Services and Activities", to: "/services-and-activities" },
  { text: "Reservation", to: "/reservation" },
]

export default function Navbar() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const isBrowser = typeof window !== "undefined"
  if (!isBrowser) {
    return <></>;
  }
  const [currentPath, setCurrentPath] = useState<string>("");
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

  useEffect(() => {
    // This code adds a window event listener that will set the windowWidth state every time the window resizes.
    const updateWW = () => { setWindowWidth(window.innerWidth) };
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

  const { logoImages } = useStaticQuery(graphql`
    query LogoQuery {
      logoImages: allFile(
        filter: {relativeDirectory: {eq: "navbar"}}
      ) {
        totalCount
        edges {
          node {
            relativePath
            childImageSharp {
                gatsbyImageData(
                    height: 70
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
            }
          }
        }
      }
    }
  `)

  console.log(logoImages)

  useEffect(() => {
    const htmlElem = document.querySelector('html');
    const dropdown = document.getElementById('nav-dropdown');
    if (typeof (document) !== undefined && htmlElem !== null && dropdown !== null) {
      if (isOpen) {
        htmlElem.style.overflowY = "hidden";
        dropdown.style.overflowY = "scroll";
      } else {
        htmlElem.style.overflowY = "scroll";
        dropdown.style.overflowY = "scroll";
      }
    }
  }, [isOpen])
  return (
    <div className='navbar'>
      <div className='nav-container'>
        <div className='nav-left'>
          {windowWidth > 800 ?
            <Link to='/' className='nav-logo' style={{ height: "100%" }}>
              <GatsbyImage
                image={logoImages.edges[0].node.childImageSharp.gatsbyImageData}
                alt="La Vista"
                imgStyle={{ height: "70px" }}
              />
            </Link>
            :
            <Hamburger size={30} color="white" toggle={setOpen} toggled={isOpen} />

          }
        </div>
        <div className='nav-center'>
          {windowWidth <= 800 &&
            <Link className='nav-logo' to='/' style={{ height: "100%" }}>
              <GatsbyImage
                image={logoImages.edges[0].node.childImageSharp.gatsbyImageData}
                alt="La Vista"
                imgStyle={{ height: "100%" }}
              />
            </Link>
          }
        </div>
        <div className='nav-right'>
          {windowWidth > 800 &&
            links && links.map((link, index) => (
              <div className='nav-link-box' key={index}>
                <Link to={link.to === "" ? "/" : link.to} className={currentPath === link.to || currentPath === link.to + "/" ? "active-link" : ""} onClick={() => { setOpen(false) }}>
                  {link.text}
                </Link>
                {link.dropdownList && link.dropdownList.map((link2, index) => (
                  <div className='nav-link-box dropdown-link' key={index}>
                    <Link to={link2.to} className={currentPath === link2.to || currentPath === link2.to + "/" ? "active-link" : ""}>
                      {link2.text}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
        </div>
        {windowWidth <= 800 &&
          <div id="nav-dropdown" className={'nav-dropdown ' + (isOpen ? "" : "hidden")}>
            {
              links && links.map((link, index) => (
                <div className='nav-dropdown-link' key={index}>
                  <Link key={link.to} to={link.to === "" ? "/" : link.to} className={currentPath === link.to || currentPath === link.to + "/" ? "active-link" : ""}>
                    {link.text}
                  </Link>
                </div>
              ))}
          </div>}
      </div>
    </div>
  );
}