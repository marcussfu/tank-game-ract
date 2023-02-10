import {useEffect, useRef} from 'react';

const useAudio = (src, options) => {
    const {volume=1, playbackRate=1} = options;
    const sound = useRef(new Audio(src));

    useEffect(() => {
        sound.current.playbackRate = playbackRate;
    }, [playbackRate]);

    useEffect(() => {
        sound.current.volume = volume;
    }, [volume]);
    return sound.current;
};

export default useAudio;