import {useEffect} from 'react'
import {NavActions} from '../Nav/NavActions'
import {NavType} from '../Nav/NavTypes'

export const useKeypress = (
  targetKey: string,
  dispatch: React.Dispatch<NavType>
) => {
  function handleKeyPress(event: KeyboardEvent) {
    event.preventDefault()
    if (event.key.toLowerCase() === targetKey.toLowerCase()) {
      event.type === 'keydown'
        ? dispatch({type: NavActions.SET_UPARROW_PRESSED})
        : dispatch({type: NavActions.SET_UPARROW_NOT_PRESSED})
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
