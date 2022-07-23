import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentsongIdstate, isplayingstate } from '../atoms/song';
import useSpotify from './spotifycustom';



const usesonginfo = () => {
    const spotifyApi = useSpotify();
    const [currentsongid, setCurrentsongid] = useRecoilState(currentsongIdstate);
    const [isplaying, setIsplaying] = useRecoilState(isplayingstate);
    const [songinfo, setSonginfo] = useState(null);

    useEffect(() => {
        const fetSongInfo = async () => {
            if (currentsongid) {
                const trankInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentsongid}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then(res => res.json())

                setSonginfo(trankInfo);
            }
        }
        fetSongInfo();
    }, [currentsongid, spotifyApi])


    // console.log(songinfo);
    return songinfo
}

export default usesonginfo