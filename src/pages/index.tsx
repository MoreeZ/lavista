import * as React from "react"
import Layout from "../components/Layout"
// import elephantDemo from '../images/elephant-demo.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

type BasicDataType = {
  title: string,
  description: string,
  buttonText: string
}

type ContactDataType = {
  title: string,
  textContact: string[],
  subheading: string,
  buttons: ButtonType[]
}

type ButtonType = {
  text: string,
  link: string
}

const WelcomeBlock = (props: { data: BasicDataType }) => (
  <div className="welcome-screen scale-content-width">
    <div className="content-container">
      <div className="heading" data-aos="fade-up">
        {props.data && props.data.title && props.data.title}
      </div>
      <div className="subheading" data-aos="fade-up" data-aos-delay="200">
        {props.data && props.data.description && props.data.description !== null && props.data.description}
      </div>
      <a href="#" className="btn btn-large btn-secondary" data-aos="fade-up" data-aos-delay="400">{props.data && props.data.buttonText && props.data.buttonText !== null && props.data.buttonText}</a>
    </div>
    <div className="welcome-darken"></div>
  </div>
)

const RoomsBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className='scale-content-width'>
    <div className="block-content-width og-container">
      <div className="og-left">
        <div className='og-heading' data-aos="fade-right">{props.data && props.data.title && props.data.title !== null && props.data.title}</div>
        <div className='og-desc' data-aos="fade-right">{props.data && props.data.description && props.data.description !== null && props.data.description}</div>
        <a href="/grinds-info" className="og-button btn btn-large" data-aos="fade-right">{props.data && props.data.buttonText && props.data.buttonText !== null && props.data.buttonText}</a>
      </div>
      <div className="og-right" data-aos="fade-left">
        <GatsbyImage image={props.image} alt={"Rooms image unavailable..."} />
      </div>
    </div>
  </div>
)

const AboutUsBlock = (props: { data: BasicDataType }) => (
  <div className='scale-content-width au-container'>
    <div className="block-content-width au-content">
      <div className="au-heading" data-aos="fade-up">{props.data && props.data.title && props.data.title !== null && props.data.title}</div>
      <div className="au-desc" data-aos="fade-up">{props.data && props.data.description && props.data.description !== null && props.data.description}</div>
      <a href="/about-us" className="au-button btn btn-secondary btn-large" data-aos="fade-up">{props.data && props.data.buttonText && props.data.buttonText !== null && props.data.buttonText}</a>
    </div>
  </div>

)

const FacilitiesBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className='scale-content-width rsc-container'>
    <div className="rsc-left" data-aos="fade-right">
      <GatsbyImage image={props.image} alt={"Facilities image unavailable..."} />
    </div>
    <div className="rsc-right">
      <div className='rsc-heading' data-aos="fade-left">{props.data && props.data.title && props.data.title !== null && props.data.title}</div>
      <div className='rsc-desc' data-aos="fade-left">{props.data && props.data.description && props.data.description !== null && props.data.description}</div>
      <a href="/resources" className="rsc-button btn btn-large" data-aos="fade-left">{props.data && props.data.buttonText && props.data.buttonText !== null && props.data.buttonText}</a>
    </div>
  </div>
)

const RestaurantBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className="scale-content-width of-container ">
    <div className="of-left">
      <div className='of-heading' data-aos="fade-right">{props.data && props.data.title && props.data.title !== null && props.data.title}</div>
      <div className='of-desc' data-aos="fade-right">{props.data && props.data.description && props.data.description !== null && props.data.description}</div>
      <a href="/resources" className="of-button btn btn-large" data-aos="fade-right">{props.data && props.data.buttonText && props.data.buttonText !== null && props.data.buttonText}</a>
    </div>
    <div className="of-right" data-aos="fade-left">
      <GatsbyImage image={props.image} alt={"Restaurant image unavailable..."} />
    </div>
  </div>
)

const ContactUsBlock = (props: { data: ContactDataType }) => (
  <form className="scale-content-width contact-container">
    <div className="header" data-aos="fade-up">
      {props.data && props.data.title && props.data.title !== null && props.data.title}
    </div>
    <div className="text-contacts" data-aos="fade-up">
      {props.data && props.data.textContact && props.data.textContact !== null && props.data.textContact.map((txt) => (<div key={txt} className="text-contact">{txt}</div>))}
    </div>
    <div className="subheading" data-aos="fade-up">
      {props.data && props.data.subheading && props.data.subheading !== null && props.data.subheading}
    </div>
    <div className="ib-row" data-aos="fade-up">
      {props.data && props.data.buttons && props.data.buttons !== null && props.data.buttons.map((btnObj) => (<a key={btnObj.text} className="ib-row btn btn-large btn-secondary" data-aos="fade-up" href={btnObj.link}>{btnObj.text && btnObj.text}</a>))}
    </div>
  </form>
)

const IndexPage = () => {
  // const dataJson = {};
  const { dataJson, homeImages } = useStaticQuery(graphql`
    query HomeQuery {
      dataJson {
        landing {
          title
          description
          buttonText
        }
        ourRooms {
          title
          description
          buttonText
        }
        aboutUs {
          title
          description
          buttonText
        }
        itemOne {
          title
          description
          buttonText
        }
        itemTwo {
          title
          description
          buttonText
        }
        contactUs {
          title
          textContact
          subheading
          buttons {
            text
            link
          }
        }
      }
      homeImages: allFile(filter: {relativeDirectory: {eq: "home"}}) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, height: 1500, width: 1500)
            }
          }
        }
      }
    }  
  `)

  React.useEffect(() => {
    AOS.init({ duration: 600 });
  }, [])

  console.log(homeImages.edges)

  const getImageFromPath = (path: string) => {
    const extensions = [".jpg", ".png", ".jpeg"]
    for (let i = 0; i < extensions.length; i++) {
      try {
        const imageData = homeImages.edges.find((edge: { node: { relativePath: string; }; }) => {
          return edge.node.relativePath === path + extensions[i]
        }).node.childImageSharp.gatsbyImageData;
        return imageData;
      } catch (err) {
        console.log("Could not find image with path " + path + extensions[i])
      }
    }
    return null;
  }

  return (
    <Layout hasNavbar hasFooter>
      <WelcomeBlock data={dataJson.landing} />
      <RoomsBlock data={dataJson.ourRooms} image={getImageFromPath("home/rooms")} />
      <AboutUsBlock data={dataJson.aboutUs} />
      <FacilitiesBlock data={dataJson.itemOne} image={getImageFromPath("home/facilities")} />
      <RestaurantBlock data={dataJson.itemTwo} image={getImageFromPath("home/restaurant")} />
      <ContactUsBlock data={dataJson.contactUs} />
    </Layout>
  )
}

export default IndexPage
