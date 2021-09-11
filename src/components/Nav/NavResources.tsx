import {Reducer} from 'react'

export const NavActions = {
  SET_UPDATED: 'UPDATED',
  SET_ALL: 'ALL',
  SET_UPARROW_PRESSED: 'UPARROW_PRESSED',
  SET_DOWNARROW_PRESSED: 'DOWNARROW_PRESSED',
  SET_NOT_PRESSED: 'SET_NOT_PRESSED',
  SET_CURRENT: 'SET_CURRENT',
}

export type NavType = {
  type: string
  payload?: string
}

export const NavKeys = {
  ArrowUp: 'arrowup',
  ArrowDown: 'arrowdown',
}

type NavState = {
  category: string
  isUpPressed: boolean
  isDownPressed: boolean
}

export const NavCategories = {
  UPDATED: 'Updated',
  POPULAR: 'Popular',
  SIMULCASTS: 'Simulcasts',
  ALL: 'All',
}

const generatedNavItems = []
for (const category in NavCategories) {
  // @ts-ignore
  generatedNavItems.push(NavCategories[category])
}

export const NavItems = generatedNavItems

export const NavReducer: Reducer<NavState, NavType> = (state, action) => {
  switch (action.type) {
    case NavActions.SET_UPDATED:
      return {
        isDownPressed: false,
        isUpPressed: false,
        category: NavCategories.UPDATED,
      }

    case NavActions.SET_ALL:
      return {
        isUpPressed: false,
        isDownPressed: false,
        category: NavCategories.ALL,
      }

    case NavActions.SET_UPARROW_PRESSED:
      return {
        ...state,
        isUpPressed: true,
        category: action.payload || state.category,
      }

    case NavActions.SET_DOWNARROW_PRESSED:
      return {
        ...state,
        isDownPressed: true,
        category: action.payload || state.category,
      }

    case NavActions.SET_NOT_PRESSED:
      return {...state, isUpPressed: false, isDownPressed: false}

    case NavActions.SET_CURRENT:
      return {
        isUpPressed: false,
        isDownPressed: false,
        category: action.payload || '',
      }

    default:
      return {...state}
  }
}
