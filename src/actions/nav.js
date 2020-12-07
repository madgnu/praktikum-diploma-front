import { NAV_COLLAPSE, NAV_EXPAND } from './types';

export const expandNav = () => {
  return {
    type: NAV_EXPAND,
  }
}

export const collapseNav = () => {
  return {
    type: NAV_COLLAPSE
  }
}
