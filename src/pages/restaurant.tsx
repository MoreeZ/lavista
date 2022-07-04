import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Layout from '../components/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/seo';

type DetailsType = {
    title: string,
    description_main: string,
    description_par1: string,
    description_par2: string
}

type DishType = {
    name: string,
    description: string,
    price: string
}

type MenuType = {
    subheading: string,
    dishes: DishType[]
}

const Details = (props: { details: DetailsType }) => {
    console.log(props.details);
    return (
        <div className="restaurant-screen scale-content-width">
            <SEO title="Restaurant" />
            <div className="restaurant-container">
                <div className="heading" data-aos="fade-up">
                    {props.details && props.details.title && props.details.title}
                </div>
                <div className="subheading" data-aos="fade-up" data-aos-delay="200">
                    {props.details && props.details.description_main && props.details.description_main}
                </div>
                <div className="subheading2" data-aos="fade-up" data-aos-delay="300">
                    {props.details && props.details.description_par1 && props.details.description_par1}
                </div>
                <div className="subheading2" data-aos="fade-up" data-aos-delay="400">
                    {props.details && props.details.description_par2 && props.details.description_par2}
                </div>
            </div>
            <div className="restaurant-darken"></div>
        </div>
    )
}

const Menu = (props: { menu: MenuType[] }) => {
    return (
        <div className='menu-container scale-content-width'>
            <div className='menu-heading'>Menu</div>
            <div className='menu-render-space block-content-width'>
                {
                    props.menu.map((submenu, index) => {
                        return (
                            <div className='each-submenu' data-aos="fade-up" key={index}>
                                <div className='submenu-heading'>{submenu.subheading}</div>
                                <table className='submenu-render-space'>
                                    <tr>
                                        <th>Dish</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                    {submenu.dishes.map((dish, index2) => {
                                        return (
                                            <tr key={index2}>
                                                <td className='dish-name'>{dish.name}</td>
                                                <td className='dish-description'>{dish.description}</td>
                                                <td className='dish-price'>{dish.price}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const Restaurant = () => {
    const { restaurantData, restaurantImages } = useStaticQuery(graphql`
    query RestaurantQuery {
        restaurantData: allDataJson (filter:{restaurant_details:{title:{ne:null}}}){
            edges {
              node {
                restaurant_details {
                  title
                  description_main
                  description_par1
                  description_par2
                }
                menu {
                  subheading
                  dishes {
                    name
                    description
                    price
                  }
                }
              }
            }
          }
    }
  `)

    React.useEffect(() => {
        AOS.init({ duration: 600 });
    }, [])

    return (
        <Layout hasNavbar hasFooter>
            <Details details={restaurantData.edges[0].node.restaurant_details} />
            <Menu menu={restaurantData.edges[0].node.menu} />
        </Layout>
    );
}

export default Restaurant;