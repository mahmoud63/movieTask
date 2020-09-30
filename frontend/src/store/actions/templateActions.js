import {
	COLLAPSE_MENU,
	COLLAPSE_TOGGLE,
	FULL_SCREEN,
	FULL_SCREEN_EXIT,
	CHANGE_LAYOUT,
	NAV_CONTENT_LEAVE,
	NAV_COLLAPSE_LEAVE,
	USER_EDITING,
	SET_ACTIVE_COMPONENT
} from '../types';


export const openFullScreen = () => {return { type: FULL_SCREEN }}
export const exitFullScreen = () => {return { type: FULL_SCREEN_EXIT }}
export const collapseMenu = () => {return { type: COLLAPSE_MENU }}
export const changeLayout = (layout) => {return { type: CHANGE_LAYOUT, layout: layout }}
export const collapseToggle = (menu) => {return { type: COLLAPSE_TOGGLE, menu: menu }}
export const navContentLeave = () => {return { type: NAV_CONTENT_LEAVE }}
export const navCollapseLeave = (menu) => {return { type: NAV_COLLAPSE_LEAVE, menu: menu }}
export const setActiveComponent = (route, val, storage=false) => {
	return {type: SET_ACTIVE_COMPONENT, route, val, storage}
}
export const setIsUserEditing = (val) => {return { type: USER_EDITING, payload: val }}
