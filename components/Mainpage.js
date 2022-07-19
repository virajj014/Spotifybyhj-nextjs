import React, { useEffect, useState } from 'react'
import styles from '../styles/Mainpage.module.css'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { playlistatomdata, playlistatomid } from '../atoms/playlist'
import { useRecoilState } from 'recoil'
import spotifyApi from '../lib/spotify'


const Mainpage = () => {
    const { data: session, status } = useSession();
    const [loading, setloading] = useState(false);

    const [viewplaylistid, setviewplaylistid] = useRecoilState(playlistatomid);
    const [viewplaylistdata, setviewplaylistdata] = useRecoilState(playlistatomdata);

    // if (session) {
    //     console.log(session.user.email);
    // }
    const router = useRouter()
    if (session === null) {
        router.push('/signin')
    }

    useEffect(() => {
        try {
            if (session) {
                spotifyApi.getPlaylist(viewplaylistid).then((data) => {
                    setviewplaylistdata(data.body)
                })
                setloading(false)
            }
        }
        catch (err) {
            setloading(true)
            console.log(err)
        }
    }, [viewplaylistid, session])

    // console.log(viewplaylistdata);

    return (
        <div className={styles.outer}>
            <div className={styles.topnav}>
                <div className={styles.loginlogoutbtn}>
                    {session ? <button onClick={() => signOut()}>logout</button> : <button onClick={() => router.push('/signin')}>login</button>}
                </div>
                {session ?
                    <div className={styles.nameimg}>
                        <div className={styles.userimg}>
                            {session ? <Image src={session.user.image} layout='responsive' width='40px' height='40px' /> : <></>}
                        </div>
                        <div className={styles.username}>
                            {session ? <p>{session.user.name}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </p> : <></>}
                        </div>
                    </div>
                    : <></>}
            </div>

            {viewplaylistdata == null ? <h1 style={{ color: 'white' }}>loading...</h1> : <>
                <img width={'400px'} src={viewplaylistdata.images[0].url} />
                <h1 style={{ color: 'white' }}>{viewplaylistdata.name}</h1>
            </>}
        </div>
    )
}

export default Mainpage