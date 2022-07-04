import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';

type BasicDataType = {
  title: string,
  description: string,
  button: ButtonType
}

type ButtonType = {
  text: string,
  link: string
}

const Contact = () => {
  const { resData, websiteImages, bgImages } = useStaticQuery(graphql`
    query ReservationQuery {
        resData: allDataJson(filter: {reservationSites: {title: {ne: null}}}) {
          edges {
            node {
              reservationSites {
                title
                itemList {
                  title
                  description
                  button {
                    text
                    link
                  }
                }
              }
              contactSection {
                title
                email
                phone
              }
              locationSection {
                title
                iframe {
                    src
                    width
                    height
                    loading
                }
              }
            }
          }
        }
        websiteImages: allFile(
          filter: {relativeDirectory: {eq: "reservation"}, relativePath: {regex: "/w_/"}}
          sort: {fields: relativePath, order: ASC}
          ) {
            edges {
              node {
                relativePath
                childImageSharp {
                  gatsbyImageData(
                      width: 1200
                      aspectRatio: 1.5
                      placeholder: BLURRED
                      transformOptions: {fit: COVER, cropFocus: CENTER}
                      formats: [AUTO, WEBP, AVIF]
                    )
                }
              }
            }
          }
          bgImages: allFile(
            filter: {relativeDirectory: {eq: "reservation"}, relativePath: {regex: "/bg/"}}
            sort: {fields: relativePath, order: ASC}
            ) {
            edges {
              node {
                relativePath
                childImageSharp {
                  gatsbyImageData(
                      width: 1920
                      aspectRatio: 2.1
                      placeholder: BLURRED
                      transformOptions: {fit: COVER, cropFocus: CENTER}
                      formats: [AUTO, WEBP, AVIF]
                    )
                }
              }
            }
          }
      }      
  `)
  const { reservationSites, contactSection, locationSection } = resData.edges[0].node;

  const sortedImages = websiteImages.edges
    .sort((edge: any, edge2: any) => (edge.node.relativePath > edge2.node.relativePath));

  return (
    <Layout hasNavbar hasFooter backgroundColor={"#f0f2f7"}>
      <SEO title="Easy and Fast Reservations" />
      <div className="res-container scale-content-width">
        <div className='res-websites-cont block-content-width' >
          <h1 className='res-title'>{reservationSites.title}</h1>
          <div className='res-render-space'>
            {reservationSites && reservationSites.itemList !== null && reservationSites.itemList.length > 0 &&
              reservationSites.itemList.map((item: BasicDataType, index: number) => {
                return (
                  <div className='each-item' key={index}>
                    <div className='image-container'>
                      <GatsbyImage className='item-image' image={sortedImages && sortedImages[index] && sortedImages[index].node.childImageSharp.gatsbyImageData} alt={item.title + " image La Vista Canoa"} />
                      <div className='image-mask' />
                    </div>
                    <h3 className='item-title'>{item.title}</h3>
                    <div className='item-desc'>{item.description}</div>
                    <Link target="_blank" to={item.button.link} className='item-button btn btn-large'>{item.button.text}</Link>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="res-contact scale-content-width">
          <h1 className="heading">{contactSection.title}</h1>
          <div className='phone-cont each-contact'>
            <div className='tag'>Phone: </div>
            <div className='value'>{contactSection.phone}</div>
          </div>
          <div className='email-cont each-contact'>
            <div className='tag'>Email: </div>
            <a href={"mailto:" + contactSection.email} className='value'>{contactSection.email}</a>
          </div>
          <div className='bg-darken' />
        </div>
        <div className="res-location scale-content-width">
          <h1 className="heading">{locationSection.title}</h1>
          <div className="map-wrapper">
            <iframe src={locationSection.iframe.src} width={locationSection.iframe.width} height={locationSection.iframe.height} loading={locationSection.iframe.loading}></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;