import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Layout from '../components/Layout';

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
    const { resData, resImages } = useStaticQuery(graphql`
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
        resImages: allFile(filter: {relativeDirectory: {eq: "reservation"}}) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }      
  `)
    const { reservationSites, contactSection, locationSection } = resData.edges[0].node;

    return (
        <Layout hasNavbar hasFooter>
            <div className="res-container">
                <div className='res-websites-cont'>
                    <div className='res-title'>{reservationSites.title}</div>
                    <div className='res-render-space'>
                        {reservationSites && reservationSites !== null && reservationSites.length > 0 && 
                        reservationSites.itemList.map((item: BasicDataType, index: number) => {
                            <div className='each-item' key={index}>
                                <div className='item-title'>{item.title}</div>
                                <div className='item-desc'>{item.description}</div>
                                <Link to={item.button.link} className='item-button'>{item.button.text}</Link>
                            </div>
                        })}
                    </div>
                </div>
                <div className="res-contact">
                    <div className="heading">{contactSection.title}</div>
                    <div className='phone-cont'>
                        <div>Phone: </div>
                        <div>{contactSection.phone}</div>
                    </div>
                    <div className='email-cont'>
                        <div>Email: </div>
                        <div>{contactSection.email}</div>
                    </div>
                </div>
                <div className="lokalizacja-sub">
                    <div className="heading">{locationSection.title}</div>
                    <div className="map-wrapper">
                        <iframe src={locationSection.iframe.src} width={locationSection.iframe.width} height={locationSection.iframe.height} loading={locationSection.iframe.loading}></iframe>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Contact;