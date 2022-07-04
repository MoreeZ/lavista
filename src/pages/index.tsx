import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo";
// import elephantDemo from '../images/elephant-demo.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

type BasicDataType = {
  title: string,
  description: string,
  button: ButtonType
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
      <h1 className="heading" data-aos="fade-up">
        {props.data && props.data.title && props.data.title}
      </h1>
      <h2 className="subheading" data-aos="fade-up" data-aos-delay="200">
        {props.data && props.data.description && props.data.description !== null && props.data.description}
      </h2>
      <Link target="_blank" to={props.data.button.link} className="btn btn-large btn-secondary" data-aos="fade-up" data-aos-delay="400">{props.data && props.data.button.text && props.data.button.text !== null && props.data.button.text}</Link>
    </div>
    <div className="welcome-darken"></div>
  </div>
)

const RoomsBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className='scale-content-width'>
    <div className="block-content-width rm-container">
      <div className="rm-left">
        <h2 className='rm-heading' data-aos="fade-right">{props.data && props.data.title && props.data.title !== null && props.data.title}</h2>
        <h3 className='rm-desc' data-aos="fade-right">{props.data && props.data.description && props.data.description !== null && props.data.description}</h3>
        <Link target="_blank" to={props.data.button.link} className="rm-button btn btn-large" data-aos="fade-right">{props.data && props.data.button.text && props.data.button.text !== null && props.data.button.text}</Link>
      </div>
      <div className="rm-right" data-aos="fade-left">
        <GatsbyImage image={props.image} alt={"Rooms image La Vista Hotel Canoa"} />
      </div>
    </div>
  </div>
)

const AboutUsBlock = (props: { data: BasicDataType }) => (
  <div className='scale-content-width au-container'>
    <div className="block-content-width au-content">
      <h2 className="au-heading" data-aos="fade-up">{props.data && props.data.title && props.data.title !== null && props.data.title}</h2>
      <h3 className="au-desc" data-aos="fade-up">{props.data && props.data.description && props.data.description !== null && props.data.description}</h3>
      <Link target="_blank" to={props.data.button.link} className="au-button btn btn-secondary btn-large" data-aos="fade-up">{props.data && props.data.button.text && props.data.button.text !== null && props.data.button.text}</Link>
    </div>
  </div>

)

const FacilitiesBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className='scale-content-width rsc-container'>
    <div className="rsc-left" data-aos="fade-right">
      <GatsbyImage image={props.image} alt={"Facilities image La Vista Hotel Canoa"} />
    </div>
    <div className="rsc-right">
      <h2 className='rsc-heading' data-aos="fade-left">{props.data && props.data.title && props.data.title !== null && props.data.title}</h2>
      <h3 className='rsc-desc' data-aos="fade-left">{props.data && props.data.description && props.data.description !== null && props.data.description}</h3>
      <Link target="_blank" to={props.data.button.link} className="rsc-button btn btn-large" data-aos="fade-left">{props.data && props.data.button.text && props.data.button.text !== null && props.data.button.text}</Link>
    </div>
  </div>
)

const RestaurantBlock = (props: { data: BasicDataType, image: IGatsbyImageData }) => (
  <div className="scale-content-width of-container ">
    <div className="of-left">
      <h2 className='of-heading' data-aos="fade-right">{props.data && props.data.title && props.data.title !== null && props.data.title}</h2>
      <h3 className='of-desc' data-aos="fade-right">{props.data && props.data.description && props.data.description !== null && props.data.description}</h3>
      <Link target="_blank" to={props.data.button.link} className="of-button btn btn-large" data-aos="fade-right">{props.data && props.data.button.text && props.data.button.text !== null && props.data.button.text}</Link>
    </div>
    <div className="of-right" data-aos="fade-left">
      <GatsbyImage image={props.image} alt={"Restaurant image La Vista Hotel Canoa"} />
    </div>
  </div>
)

const ContactUsBlock = (props: { data: ContactDataType }) => (
  <form className="scale-content-width contact-container">
    <h2 className="header" data-aos="fade-up">
      {props.data && props.data.title && props.data.title !== null && props.data.title}
    </h2>
    <div className="text-contacts" data-aos="fade-up">
      {props.data && props.data.textContact && props.data.textContact !== null && props.data.textContact.map((txt) => (<div key={txt} className="text-contact">{txt}</div>))}
    </div>
    <h4 className="subheading" data-aos="fade-up">
      {props.data && props.data.subheading && props.data.subheading !== null && props.data.subheading}
    </h4>
    <div className="ib-row" data-aos="fade-up">
      {props.data && props.data.buttons && props.data.buttons !== null && props.data.buttons.map((btnObj) => (<Link target="_blank" key={btnObj.text} className="ib-row btn btn-large btn-secondary" data-aos="fade-up" to={btnObj.link}>{btnObj.text && btnObj.text}</Link>))}
    </div>
  </form>
)

const IndexPage = () => {
  // const homeData = {};
  const { homeData, homeImages } = useStaticQuery(graphql`
  query HomeQuery {
    homeData: allDataJson(filter: {landing: {title: {ne: null}}}) {
      edges {
        node {
          landing {
            title
            description
            button {
              text
              link
            }
          }
          ourRooms {
            title
            description
            button {
              text
              link
            }
          }
          aboutUs {
            title
            description
            button {
              text
              link
            }
          }
          itemOne {
            title
            description
            button {
              text
              link
            }
          }
          itemTwo {
            title
            description
            button {
              text
              link
            }
          }
          contactUs {
            title
            subheading
            textContact
            buttons {
              link
              text
            }
          }
        }
      }
    }
    homeImages: allFile(
      filter: {relativeDirectory: {eq: "home"}}
      sort: {fields: relativePath, order: ASC}
    ) {
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
      <SEO title="Home" />
      <WelcomeBlock data={homeData.edges[0].node.landing} />
      <RoomsBlock data={homeData.edges[0].node.ourRooms} image={getImageFromPath("home/rooms")} />
      <AboutUsBlock data={homeData.edges[0].node.aboutUs} />
      <FacilitiesBlock data={homeData.edges[0].node.itemOne} image={getImageFromPath("home/facilities")} />
      <RestaurantBlock data={homeData.edges[0].node.itemTwo} image={getImageFromPath("home/restaurant")} />
      <ContactUsBlock data={homeData.edges[0].node.contactUs} />
    </Layout>
  )
}

export default IndexPage
