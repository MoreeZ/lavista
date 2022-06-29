import * as React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import AOS from 'aos';
import 'aos/dist/aos.css';

import Layout from '../components/Layout';

type ButtonType = {
    text: string,
    link: string
}

type RoomType = {
    title: string,
    description: string,
    price: string,
    utilities: string[]
    button: ButtonType
}


const EachRoom = (props: { data: RoomType, index: number, image: IGatsbyImageData }) => {
    props.image.height = 600;
    return (
        <div className='scale-content-width' style={{ backgroundColor: "white" }}>
            <div className={'room-container'}>
                <div className={"room-left"}>
                    <div className='room-heading' data-aos="fade-right">{props.data.title}</div>
                    <div className='room-desc' data-aos="fade-right">{props.data.description}</div>
                    <div className='room-price' data-aos="fade-right">Price per night:&nbsp;&nbsp;<span>{props.data.price}</span></div>
                    <div className='utilities-container' data-aos="fade-right">{
                        props.data.utilities && props.data.utilities.map((util)=>{
                            return (
                                <span className='utility' key={util}>{util}</span>
                            )
                        })
                    }</div>
                    <a href={props.data.button.link} className={"room-button btn"} data-aos="fade-right">{props.data.button?.text}</a>
                </div>
                <div className={"room-right"} data-aos="fade-left">
                    <GatsbyImage image={props.image} alt={"Room " + props.index + " image"} style={{ height: "100%" }} />
                </div>
            </div>
        </div>
    )
}

const ImageGallery = (props: { galleryImages: any | null, path: string }) => {
    // get all images with same number eg. all "rooms/1_"
    const filteredImages = props.galleryImages.edges.filter(((edge: any) => (edge.node.relativePath.indexOf(props.path) !== -1)));
    console.log(props.path, filteredImages);
    return (
        <div className='scale-content-width'>
            <div className='gallery-container block-content-width'>
                <div className='heading'>More Images</div>
                <div className='gallery-render-space'>
                    {
                        filteredImages && filteredImages !== null && filteredImages.map((edge: any, index: number) => {
                            console.log(edge);
                            return (
                                <div key={index} className='image-container' data-aos="fade-in" data-aos-delay={100 * index} onClick={handleFullscreenImg}>
                                    <div className=''>
                                        <GatsbyImage key={index} image={edge.node.childImageSharp.gatsbyImageData} alt={"showcase"} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const handleFullscreenImg = (e: any) => {
    const dimElement = e.currentTarget.children[0];
    const imageElement = e.currentTarget.children[0].children[0].children[2].children[2];
    const htmlElem = document.querySelector('html');
    console.log(dimElement)
    if (dimElement.className === 'bg-dim') {
        imageElement.className = '';
        dimElement.className = '';
        if (typeof (document) !== undefined && htmlElem !== null)
            htmlElem.style.overflowY = "scroll";
    } else {
        imageElement.className = 'expanded';
        dimElement.className = 'bg-dim';
        if (typeof (document) !== undefined && htmlElem !== null)
            htmlElem.style.overflowY = "hidden";
    }

}

const Rooms = () => {
    const { roomsData, mainImages, galleryImages } = useStaticQuery(graphql`
    {
        roomsData: allRoomsJson {
            edges {
                node {
                    title
                    price
                    utilities
                    description
                    button {
                        text
                        link
                    }
                }
            }
        }
        mainImages: allFile(
            filter: {relativeDirectory: {eq: "rooms"}, relativePath: {regex: "/main/"}}
          ) {
            totalCount
            edges {
              node {
                relativePath
                childImageSharp {
                    gatsbyImageData(
                        width: 800
                        aspectRatio: 1.2
                        placeholder: BLURRED
                        transformOptions: {cropFocus: CENTER, trim: 1}
                        formats: [AUTO, WEBP, AVIF],
                    )
                }
              }
            }
          }
        galleryImages: allFile(
          filter: {relativeDirectory: {eq: "rooms"}, relativePath: {regex: "/^((?!main).)*$/"}}
        ) {
          totalCount
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(
                    width: 300
                    aspectRatio: 1
                    placeholder: BLURRED
                    transformOptions: {cropFocus: CENTER, trim: 1}
                    formats: [AUTO, WEBP, AVIF],
                )
              }
            }
          }
        }
      }          
    `)

    React.useEffect(() => {
        AOS.init({ duration: 600 });
    }, [])

    const getImageFromPath = (path: string) => {
        const extensions = [".jpg", ".png", ".jpeg"]
        for (let i = 0; i < extensions.length; i++) {
            try {
                const imageData = mainImages.edges.find((edge: { node: { relativePath: string; }; }) => {
                    return edge.node.relativePath === path + "main" + extensions[i]
                }).node.childImageSharp.gatsbyImageData;
                return imageData;
            } catch (err) {
                continue;
            }
        }
        return null;
    }

    return (
        <Layout hasNavbar hasFooter backgroundColor={"#ececec"}>
            {
                roomsData && roomsData.edges && roomsData.edges !== null && roomsData.edges.map((roomEdge: any, index: number) => (
                    <div key={index}>
                        <EachRoom data={roomEdge.node} image={getImageFromPath("rooms/" + (index + 1) + "_")} index={index} />
                        <ImageGallery galleryImages={galleryImages} path={"rooms/" + (index + 1) + "_"} />
                    </div>
                ))
            }
        </Layout>
    );
}

export default Rooms
