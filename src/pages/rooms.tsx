import * as React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';

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


const EachRoom = (props: { data: RoomType, index: number, image: IGatsbyImageData, reverse: boolean }) => {
    if (!props.reverse) {
        return (
            <div className='scale-content-width' style={{ backgroundColor: "white" }}>
                <div className={'room-container'}>
                    <div className={"room-left"}>
                        <div className='room-heading' data-aos="fade-right">{props.data.title}</div>
                        <div className='room-price' data-aos="fade-right">Price per night:&nbsp;&nbsp;<span>{props.data.price}</span></div>
                        <div className='utilities-container' data-aos="fade-right">{
                            props.data.utilities && props.data.utilities.map((util) => {
                                return (
                                    <span className='utility' key={util}>{util}</span>
                                )
                            })
                        }</div>
                        <div className='room-desc' data-aos="fade-right">{props.data.description}</div>
                        <Link target="_blank" to={props.data.button.link} className={"room-button btn btn-large"} data-aos="fade-right">{props.data.button?.text}</Link>
                    </div>
                    <div className={"room-right"} data-aos="fade-left">
                        <GatsbyImage image={props.image} alt={"Room " + props.index + " image"} style={{ height: "100%" }} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='scale-content-width' style={{ backgroundColor: "white" }}>
                <div className={'room-container room-container-reverse'}>
                    <div className={"room-left"}>
                        <div className='room-heading' data-aos="fade-left" >{props.data.title}</div>
                        <div className='room-price' data-aos="fade-left" >Price per night:&nbsp;&nbsp;<span>{props.data.price}</span></div>
                        <div className='utilities-container' data-aos="fade-left">{
                            props.data.utilities && props.data.utilities.map((util) => {
                                return (
                                    <span className='utility' key={util} >{util}</span>
                                )
                            })
                        }</div>
                        <div className='room-desc' data-aos="fade-left"  >{props.data.description}</div>
                        <Link target="_blank" to={props.data.button.link} className={"room-button btn btn-large btn-secondary"} data-aos="fade-left">{props.data.button?.text}</Link>
                    </div>
                    <div className={"room-right"} data-aos="fade-right">
                        <GatsbyImage image={props.image} alt={"Room " + props.index + " image"} style={{ height: "100%" }} />
                    </div>
                </div>
            </div>
        )
    }

}

const ImageCarousel = (props: { carouselImages: any | null, path: string }) => {
    const filteredImages = props.carouselImages.edges.filter(((edge: any) => (edge.node.relativePath.indexOf(props.path) !== -1)));
    return (
        <div>
            <div className='scale-content-width'>
                <div className='carousel-container scale-content-width'>
                    {/* <div className='heading'>More Images</div> */}
                    <div className='carousel-render-space'>
                        <div className='text-space block-content-width'>
                            <div className='heading' data-aos="fade-up">Our Rooms</div>
                            <div className='subheading' data-aos="fade-up" data-aos-delay="200">All of our rooms provide direct views to the beach and the town of Canoa. Each room is equipped with a private bathroom, television, and airconditioning. The rooms are cleaned daily and fresh linen is provided everyday.</div>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            spaceBetween={0}
                            navigation
                            slidesPerView={1}
                            onSwiper={(swiper) => console.log(swiper)}
                            autoplay={true}
                            loop={true}
                        >
                            {
                                filteredImages && filteredImages !== null && filteredImages.map((edge: any, index: number) => {
                                    return (
                                        <SwiperSlide key={index} className='image-container'>
                                            <div className=''>
                                                <GatsbyImage key={index} image={edge.node.childImageSharp.gatsbyImageData} alt={"showcase"} />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        <div className='bg-dim' />
                    </div>
                </div>
            </div>
        </div>
    );
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
    const { roomsData, mainImages, galleryImages, carouselImages } = useStaticQuery(graphql`
    query RoomsQuery {
        roomsData: allDataJson(filter: {roomsLanding: {title: {ne: null}}}) {
          edges {
            node {
              roomsLanding {
                title
                description
              }
              availableRooms {
                title
                description
                price
                utilities
                button {
                  text
                  link
                }
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
                  transformOptions: {fit: COVER, cropFocus: ATTENTION}
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
        carouselImages: allFile(
          filter: {relativeDirectory: {eq: "rooms"}, relativePath: {regex: "/swiper/"}}
        ) {
          totalCount
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(
                  width: 1920
                  aspectRatio: 3.4
                  placeholder: BLURRED
                  transformOptions: {fit: COVER, cropFocus: ATTENTION}
                  formats: [AUTO, WEBP, AVIF]
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
                  width: 800
                  aspectRatio: 1.2
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
        <Layout hasNavbar hasFooter backgroundColor={"#f7f7f7"}>
            <ImageCarousel carouselImages={carouselImages} path={"rooms/swiper_"} />
            {
                roomsData && roomsData.edges[0] && roomsData.edges[0] !== null && roomsData.edges[0].node.availableRooms.map((eachRoom: any, index: number) => (
                    <div key={index}>
                        <EachRoom data={eachRoom} image={getImageFromPath("rooms/" + (index + 1) + "_")} index={index} reverse={index % 2 === 1} />
                    </div>
                ))
            }
        </Layout>
    );
}

export default Rooms
