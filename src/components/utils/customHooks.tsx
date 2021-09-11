import {useEffect} from 'react'
import {NavActions, NavKeys, NavType} from '../Nav/NavResources'

export const useKeypress = (
  targetKey: string,
  dispatch: React.Dispatch<NavType>
) => {
  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key.toLowerCase()
    if (key === targetKey.toLowerCase()) {
      if (event.type === 'keydown') {
        key === NavKeys.ArrowUp
          ? dispatch({type: NavActions.SET_UPARROW_PRESSED})
          : dispatch({type: NavActions.SET_DOWNARROW_PRESSED})
      } else {
        dispatch({type: NavActions.SET_NOT_PRESSED})
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyPress)
    }
  })
}
