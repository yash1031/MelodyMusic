import React, {useState} from 'react'
import MusicContext from './MusicContext'

const MusicState = (props) => {
    // Track1: 7ynyU7I8T6aWEaKIOrKTxE
    // Track2: 4Jvcqx8FzibEVxRpJCTrVw
    // Instrumental: 0JQ5DAqbMKFRieVZLLoo9m
    const [current_track, setTrack] = useState('4Jvcqx8FzibEVxRpJCTrVw');

    return (
        <MusicContext.Provider value={{current_track, setTrack}}>
          {props.children}
        </MusicContext.Provider>
      )
}

export default MusicState
