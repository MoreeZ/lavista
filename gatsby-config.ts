import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "La Vista Hotel Canoa",
    titleTemplate: "La Vista Hotel Canoa: %s",
    description: "50 meter walk from the beach. Newly renovated. Unmatched comfort, wonderful views and delicious food at the heart of Canoa, Ecuador. Relax and forget about your problems with La Vista Hotel Ecuador.",
    url: "https://www.lavistacanoa.com", // No trailing slash allowed!
    image: "/icon.jpg", // Path to the image placed in the 'static' folder, in the project's root directory.
    twitterUsername: "@OskarMoreeZ",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [ 
  "gatsby-plugin-sass", 
  "gatsby-plugin-image", 
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sharp", 
   "gatsby-transformer-sharp", 
   {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "data",
      "path": "./src/data/"
    },
    __key: "data"
  },
  'gatsby-transformer-json',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `La Vista Hotel`,
      short_name: `La Vista`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#0d9ff4`,
      display: `standalone`,
      icon: `src/images/icon.png`
    },
  },
  {
    resolve: `gatsby-plugin-offline`,
    options: {
      precachePages: [`/`, '/rooms/', '/restaurant/', '/services-and-activities/', '/reservation/'],
    },
  },
  'gatsby-plugin-react-helmet'
]
};

export default config;
