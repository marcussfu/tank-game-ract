import {useEffect, useRef} from 'react';

const useAudio = (src, options) => {
    const {volume=1, playbackRate=1, loop=false} = options;
    const sound = useRef(new Audio(src));

    useEffect(() => {
        sound.current.playbackRate = playbackRate;
    }, [playbackRate]);

    useEffect(() => {
        sound.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        sound.current.loop = loop;
    }, [loop]);
    return sound.current;
};

export default useAudio;