import React, { useEffect, useState } from 'react'
import styles from '../styles/Mainpage.module.css'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { playlistatomdata, playlistatomid } from '../atoms/playlist'
import { useRecoilState } from 'recoil'
import spotifyApi from '../lib/spotify'
import Songcard from './Songcard'

const Mainpage = () => {
    const { data: session, status } = useSession();
    const [loading, setloading] = useState(false);

    const [tduration, settduration] = useState('1000 hrs');

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

            {viewplaylistdata == null ? <h1 style={{ color: 'white' }}>loading...</h1> :

                <div className={styles.playlistinside}>
                    <div className={styles.s1}>
                        <img src={viewplaylistdata.images[0].url} />
                        <div>
                            <h2>PLAYLIST</h2>
                            <h1>{viewplaylistdata.name}</h1>
                            <p>{viewplaylistdata.description}</p>
                            <div className={styles.s11}>
                                <p>{viewplaylistdata.owner.display_name}</p>
                                <p className={styles.dot}></p>
                                <p>{viewplaylistdata.followers.total} likes</p>
                                <p className={styles.dot}></p>
                                <p>{viewplaylistdata.tracks.items.length} songs</p>
                                <p>,</p>
                                <p className={styles.tduration}>{tduration}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.s2}>
                        <div className={styles.s21}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                            </svg>
                            <p className={styles.dot}></p>
                            <p className={styles.dot}></p>
                            <p className={styles.dot}></p>
                        </div>


                        <div className={styles.s22}>
                            <div className={styles.ptableheads}>
                                <p className={styles.sno}>#</p>
                                <p className={styles.title}>TITLE</p>
                                <p className={styles.album}>ALBUM</p>
                                <p className={styles.date}>DATE ADDED</p>
                                <p className={styles.time}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </p>
                            </div>
                            <div className={styles.hrline}></div>
                            <div className={styles.songslist}>
                                {viewplaylistdata.tracks.items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Songcard item={item} index={index} />
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Mainpage