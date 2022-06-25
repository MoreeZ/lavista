import * as React from 'react';
import Layout from '../components/Layout';

export interface IContactProps {
}

export default function Contact(props: IContactProps) {
    return (
        <Layout hasNavbar hasFooter>
            Contact content goes here
        </Layout>
    );
}
