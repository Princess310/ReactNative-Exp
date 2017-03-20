
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import tabs from './tabs';
import app from './app';
import yaoyue from './yaoyue';
import yaoyueTabs from './yaoyueTabs';
import gallery from './gallery';

export default combineReducers({

  drawer,
  user,
  list,
  cardNavigation,
  tabs,
  app,
  yaoyue,
  yaoyueTabs,
  gallery,
  
});
