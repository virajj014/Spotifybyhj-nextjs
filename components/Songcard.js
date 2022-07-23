import React from 'react'
import { useRecoilState } from 'recoil'
import SpotifyWebApi from 'spotify-web-api-node'
import { currentsongIdstate, isplayingstate } from '../atoms/song'
import useSpotify from '../hooks/spotifycustom'
import styles from '../styles/Mainpage.module.css'

const Songcard = (props) => {
    const spotifyApi = useSpotify();
    const [currentsongid, setCurrentsongid] = useRecoilState(currentsongIdstate);
    const [isplaying, setIsplaying] = useRecoilState(isplayingstate);

    const playSong = async () => {
        setCurrentsongid(props.item.track.id);
        setIsplaying(true);
    }
    return (
        <div className={styles.song} onClick={() => playSong()}>
            <p className={styles.sno}>{props.index + 1}</p>
            <div className={styles.title}>
                <img src={props.item.track.album.images[0]?.url} />
                <div>
                    <p className={styles.titlename}>{props.item.track.name}</p>
                    <div className={styles.artistnames}>
                        <p>

                            {props.item.track.artists.map((artist, index) => {
                                return (
                                    <span key={index} className={styles.artist}>{artist.name} </span>
                                )
                            })}

                        </p>
                    </div>
                </div>
            </div>
            <p className={styles.album}>{props.item.track.album.name}</p>
            <p className={styles.date}>{props.item.added_at.split('T')[0]}</p>
            <p className={styles.time}>
                {Math.floor((props.item.track.duration_ms / 1000 / 60) << 0)}
                :{Math.floor((props.item.track.duration_ms / 1000) % 60) < 10 ?
                    '0' + Math.floor((props.item.track.duration_ms / 1000) % 60)
                    : Math.floor((props.item.track.duration_ms / 1000) % 60)}
            </p>
        </div>
    )
}

export default Songcard