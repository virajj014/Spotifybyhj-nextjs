import styles from '../styles/Musicplayer.module.css'
import useSpotify from '../hooks/spotifycustom'
import { useRecoilState } from 'recoil'
import { currentsongIdstate, isplayingstate } from '../atoms/song'
import usesonginfo from '../hooks/songinfo'
import { useSession, useState } from 'next-auth/react'

const Musicplayer = () => {
    const songinfo = usesonginfo();
    console.log(songinfo);
    return (
        <div className={styles.outer}>
            <div className={styles.left}>
                <img width={'60px'} src={songinfo?.album.images?.[0]?.url} />
                <div className={styles.name}>
                    <h1>{songinfo?.name}</h1>
                    <p>
                        {songinfo?.artists.map((artist, index) => { return artist.name }).join(', ')}
                    </p>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>


            <div className={styles.playerplaypause}>
                <div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className={styles.hrline}></div>
            </div>

            <div className={styles.right}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                </button>
                <div className={styles.hrline2}></div>
            </div>
        </div>
    )
}

export default Musicplayer