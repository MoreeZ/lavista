import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import Layout from '../components/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const SaaSection = (props: { saaData: SAADataType, imageExt: string, saaImages: any }) => {
  const filteredImages = props.saaImages.edges
    .filter(((edge: any) => (edge.node.relativePath.indexOf("services-and-activities/" + props.imageExt + "_") !== -1)))
    .sort((edge: any, edge2: any) => (edge.node.relativePath > edge2.node.relativePath));
  let imageIndex = 0;

  return (
    <div className={'saa-container scale-content-width saa-' + props.imageExt}>
      <div className='saa-landing block-content-width'>
        <div className='saa-title-main' data-aos="fade-up">{props.saaData.title}</div>
        <div className='saa-desc-main' data-aos="fade-up">{props.saaData.description}</div>
        <div className='saa-darken' />
      </div>
      <div className='saa-render-space block-content-width'>
        {
          props.saaData.itemList.map((item, index) => {
            const imageId = filteredImages[imageIndex] && filteredImages[imageIndex].node.relativePath
              .replace(/^services-and-activities\/(\w)_/, "")
              .replace(/.png$/, "").replace(/.jpg$/, "").replace(/.jpeg$/, "");
              
            let imageData = null;
            if (filteredImages && 
              filteredImages[imageIndex] &&
              filteredImages[imageIndex] !== null && 
              filteredImages[imageIndex].node &&
              Number(imageId)-1 === index
              ) {
              imageData = filteredImages[imageIndex].node.childImageSharp.gatsbyImageData;
              imageIndex++;
            }

            return (
              <div className='each-item' key={index} data-aos="fade-in" aos-data-delay={(index * 200)} >
                <div className='item-image-cont'>
                  <GatsbyImage
                    alt={"image " + index}
                    image={imageData}
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
  const { saaData, saaImages } = useStaticQuery(graphql`
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
                    width: 600
                    aspectRatio: 1
                    placeholder: BLURRED
                    transformOptions: {fit: COVER, cropFocus: ATTENTION}
                    formats: [AUTO, WEBP, AVIF]
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
      <SaaSection saaData={saaData.edges[0].node.services} imageExt="s" saaImages={saaImages} />
      <SaaSection saaData={saaData.edges[0].node.activities} imageExt="a" saaImages={saaImages} />
    </Layout>
  );
}


export default ServicesAndActivities;