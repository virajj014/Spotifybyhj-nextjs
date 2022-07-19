import styles from '../styles/sidebar.module.css'
import fulllogo from '../media/fulllogo.png'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../hooks/spotifycustom'
import { useRecoilState } from 'recoil'
import { playlistatomid } from '../atoms/playlist'


const Sidebar = () => {
    const spotifyApi = useSpotify();

    const { data: session, status } = useSession();

    const [playlists, setplaylists] = useState([]);
    const [viewplaylist, setviewplaylist] = useRecoilState(playlistatomid);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {

                setplaylists(data.body.items);
            })
        }

    })

    // console.log(playlists)
    // console.log(viewplaylist)
    return (
        <div className={styles.outer}>
            <div className={styles.logo}>
                <Image src={fulllogo} layout='responsive' />
            </div>
            <br />
            <div className={`${styles.inner} ${styles.activepage}`}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p>Home</p>
            </div>

            <div className={styles.inner}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>Search</p>
            </div>

            <div className={styles.inner}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <p>Library</p>
            </div>
            <br />

            <div className={styles.inner}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
                <p>Create Playlist</p>
            </div>


            <div className={styles.inner}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <p>Liked Songs</p>
            </div>

            <div className={styles.hrline}></div>
            <div className={styles.playlists}>
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setviewplaylist(playlist.id)}>{playlist.name} </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar