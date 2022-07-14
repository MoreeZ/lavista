import * as React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ImageCarousel = (props: { carouselImages: any | null, path: string, heading?: string, subheading?: string, button?: ButtonType, large?: boolean }) => {
    const filteredImages = props.carouselImages.edges
        .filter(((edge: any) => (edge.node.relativePath.indexOf(props.path) !== -1)))

    return (
        <div className='scale-content-width' style={props.large ? {height: "80vh"} : {}} >
            <div className='carousel-container scale-content-width' style={props.large ? {height: "80vh"} : {}} >
                {/* <div className='heading'>More Images</div> */}
                <div className='carousel-render-space' style={props.large ? {height: "80vh"} : {}} >
                    <div className='text-space block-content-width'>
                        <h1 className='heading' data-aos="fade-up">{props.heading && props.heading}</h1>
                        <h2 className='subheading' data-aos="fade-up" data-aos-delay="200">{props.subheading && props.subheading}</h2>
                        {props.button &&
                            <Link target="_blank" to={props.button.link} className="btn btn-large btn-secondary" data-aos="fade-up" data-aos-delay="400">{props.button.text && props.button.text !== null && props.button.text}</Link>
                        }
                    </div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSwiper={(swiper) => console.log(swiper)}
                        autoplay={true}
                    >
                        {
                            filteredImages && filteredImages !== null && filteredImages.map((edge: any, index: number) => {
                                return (
                                    <SwiperSlide key={index} className='image-container' style={props.large ? {height: "80vh"} : {}} >
                                        <div className=''>
                                            <GatsbyImage key={index} image={edge.node.childImageSharp.gatsbyImageData} alt={"Room image La Vista Canoa"} />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='bg-dim' style={props.large ? {height: "80vh"} : {}} />
                </div>
            </div>
        </div>
    );
}

export default ImageCarousel;