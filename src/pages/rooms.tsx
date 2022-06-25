import * as React from 'react';
import Layout from '../components/Layout';

export interface IAboutUsProps {
}

export default function AboutUs(props: IAboutUsProps) {
    return (
        <Layout hasNavbar hasFooter>
            AboutUs content goes here
        </Layout>
    );
}
