import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Layout from '../Layouts/dashLayout.jsx';

export default function Dashboard() {

    const { auth } = usePage().props;

    return (
    <>
    <Layout></Layout>
            
    </>
    );
}
