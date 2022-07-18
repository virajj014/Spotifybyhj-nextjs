import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import styles from '../styles/signin.module.css'
import Sidebar from '../components/Sidebar'
import fulllogo from '../media/fulllogo.png'
import Image from 'next/image'

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
const signin = (props) => {
    return (
        <div className={styles.outer}>
            <Sidebar />
            <div className={styles.inner}>
                {Object.values(props.providers).map((provider) => (
                    <div className={styles.btnouter} key={provider.name}>
                        <div className={styles.btnimg}><Image src={fulllogo} layout='responsive' style={{ backgroundColor: 'inherit' }} /></div>
                        <button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>Login with {provider.name}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default signin