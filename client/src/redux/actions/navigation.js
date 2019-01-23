import { TOGGLE_SIDEBAR } from "./types"

export const toggleSidebar = isSidebarOpen => dispatch => {
  dispatch({ type: TOGGLE_SIDEBAR, payload: isSidebarOpen })
}
