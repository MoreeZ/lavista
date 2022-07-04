import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';


const Footer = () => {
  const { footerData, footerImages } = useStaticQuery(graphql`
  query FooterQuery {
    footerData: allDataJson(filter: {footerData: {location: {ne: null}}}) {
      edges {
        node {
          footerData {
            location
            email
            links
            privacy
            copyright
          }
        }
      }
    }
    footerImages: allFile(
      filter: {relativeDirectory: {eq: "footer"}}
      sort: {fields: relativePath, order: ASC}
    ) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, height: 50, width: 50, aspectRatio: 1)
          }
        }
      }
    }
  }  
  `)

  const { location, email, links, privacy, copyright } = footerData.edges[0].node.footerData;
  const filteredImages = footerImages.edges
    .sort((edge: any, edge2: any) => (edge.node.relativePath > edge2.node.relativePath));

  return (
    <div className='footer scale-content-width'>
      <div className='footer-top'>
        <div className='text'>{location}</div>
        <div className='text'>
          <a target="_blank" href={"mailto:" + email}>{email}</a>
        </div>
        <div className='icon-cont text'>
          {
            links && links.length > 0 && links.map((link: string, index: number) => {
              return (
                <Link to={link} target="_blank">
                  <GatsbyImage
                    image={filteredImages && filteredImages[index] &&
                      filteredImages[index] !== null &&
                      filteredImages[index].node.childImageSharp !== null &&
                      filteredImages[index].node.childImageSharp.gatsbyImageData}
                    alt={index.toString()}
                  />
                </Link>
              )
            })
          }
        </div>
        <hr color='white ' />
      </div>
      <div className='footer-bottom'>
        <div className='privacy-policy text'><a target="_blank" href='/'>
          {privacy}
        </a></div>
        <div className='copyright'>
          {copyright}  
        </div>
      </div>
    </div>
  );
}

export default Footer;