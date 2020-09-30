import {
  COLLAPSE_MENU,
  COLLAPSE_TOGGLE,
  FULL_SCREEN,
  FULL_SCREEN_EXIT,
  CHANGE_LAYOUT,
  NAV_CONTENT_LEAVE,
  NAV_COLLAPSE_LEAVE,
  SET_ACTIVE_COMPONENT,
  USER_EDITING,
} from "../types";

import config from "../../config";

const initialState = {
  isOpen: [], //for active default menu
  isTrigger: [], //for active default menu, set blank for horizontal
  ...config,
  isFullScreen: false, // static can't change
  isUserEditing: false,
  activeComponent: {
    network: "accessController",
    cloud: "captivePortals",
  },
};

export default (state = initialState, action) => {
  let trigger = [];
  let open = [];

  switch (action.type) {
    case COLLAPSE_MENU:
      return {
        ...state,
        collapseMenu: !state.collapseMenu,
      };
    case COLLAPSE_TOGGLE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }

        if (triggerIndex === -1) {
          open = [...open, action.menu.id];
          trigger = [...trigger, action.menu.id];
        }
      } else {
        open = state.isOpen;
        const triggerIndex = state.isTrigger.indexOf(action.menu.id);
        trigger = triggerIndex === -1 ? [action.menu.id] : [];
        open = triggerIndex === -1 ? [action.menu.id] : [];
      }

      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case NAV_CONTENT_LEAVE:
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger,
      };
    case NAV_COLLAPSE_LEAVE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;

        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter((item) => item !== action.menu.id);
          trigger = trigger.filter((item) => item !== action.menu.id);
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger,
        };
      }
      return { ...state };
    case FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };
    case FULL_SCREEN_EXIT:
      return {
        ...state,
        isFullScreen: false,
      };
    case CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layout,
      };
    case SET_ACTIVE_COMPONENT:
      if (action.storage) {
        return {
          ...state,
          activeComponent: {
            ...JSON.parse(localStorage.getItem("active_components")),
          },
        };
      } else {
        localStorage.setItem(
          "active_components",
          JSON.stringify({
            ...state.activeComponent,
            [action.route]: action.val,
          })
        );
        return {
          ...state,
          activeComponent: {
            ...state.activeComponent,
            [action.route]: action.val,
          },
        };
      }
    case USER_EDITING:
      return {
        ...state,
        isUserEditing: action.payload,
      };
    default:
      return state;
  }
};
