import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import Layout from '../components/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/seo';

export interface IResourcesProps {
}

type TitleDescElemType = {
  title: string,
  description: string
}

type SAADataType = {
  title: string,
  description: string,
  itemList: TitleDescElemType[]
}

const SaaSection = (props: { saaData: SAADataType, imageExt: string, saaImages: any, imageNotFound: IGatsbyImageData }) => {
  const filteredImages = props.saaImages.edges
    .filter(((edge: any) => (edge.node.relativePath.indexOf("services-and-activities/" + props.imageExt + "_") !== -1)))
    .sort((edge: any, edge2: any) => (edge.node.relativePath > edge2.node.relativePath));

  return (
    <div className={'saa-container scale-content-width saa-' + props.imageExt}>
      <SEO title="Services" />
      <div className='saa-landing block-content-width'>
        <div className='saa-title-main' data-aos="fade-up">{props.saaData.title}</div>
        <div className='saa-desc-main' data-aos="fade-up">{props.saaData.description}</div>
        <div className='saa-darken' />
      </div>
      <div className='saa-render-space block-content-width'>
        {
          props.saaData.itemList.map((item, index) => {

            return (
              <div className='each-item' key={index} data-aos="fade-in" aos-data-delay={(index * 200)} >
                <div className='item-image-cont'>
                  <GatsbyImage
                    alt={"image " + index}
                    image={
                      filteredImages[index] &&
                      filteredImages[index] !== null &&
                      filteredImages[index].node &&
                      filteredImages[index].node.childImageSharp.gatsbyImageData
                    }
                    imgStyle={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "1000px"
                    }}
                  />
                </div>
                <div className='item-text-cont'>
                  <div className='item-title'>{item.title}</div>
                  <div className='item-description'>{item.description}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const ServicesAndActivities = (props: IResourcesProps) => {
  const { saaData, saaImages, imgNotFoundData } = useStaticQuery(graphql`
    query SaaQuery {
        saaData: allDataJson (filter:{services:{title:{ne:null}}}){
            edges {
              node {
                services {
                  title
                  description
                  itemList {
                    title
                    description
                  }
                }
                activities {
                  title
                  description
                  itemList {
                    title
                    description
                  }
                }
              }
            }
          }
          saaImages: allFile(
            filter: {relativeDirectory: {eq: "services-and-activities"}}
          ) {
            totalCount
            edges {
              node {
                relativePath
                childImageSharp {
                  gatsbyImageData(
                    width: 400
                    aspectRatio: 1
                    placeholder: BLURRED
                    transformOptions: {fit: COVER, cropFocus: ATTENTION}
                    formats: [AUTO, WEBP, AVIF, JPG]
                  )
                }
              }
            }
          }
          imgNotFoundData: allFile(
            filter: {relativePath: {eq: "image-not-found.jpg"}}
          ) {
            totalCount
            edges {
              node {
                relativePath
                childImageSharp {
                  gatsbyImageData(
                    width: 400
                    aspectRatio: 1
                    placeholder: BLURRED
                    transformOptions: {fit: COVER, cropFocus: ATTENTION}
                    formats: [AUTO, WEBP, AVIF, JPG]
                  )
                }
              }
            }
          }
        }
  `)

  React.useEffect(() => {
    AOS.init({ duration: 500 });
  }, [])

  return (
    <Layout hasNavbar hasFooter>
      <SaaSection saaData={saaData.edges[0].node.services} imageExt="s" saaImages={saaImages} imageNotFound={imgNotFoundData.edges[0] && imgNotFoundData.edges[0].node.childImageSharp.gatsbyImageData} />
      <SaaSection saaData={saaData.edges[0].node.activities} imageExt="a" saaImages={saaImages} imageNotFound={imgNotFoundData.edges[0] && imgNotFoundData.edges[0].node.childImageSharp.gatsbyImageData} />
    </Layout>
  );
}


export default ServicesAndActivities;