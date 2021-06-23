import Loadable from 'react-loadable';
import Loading from '../shared/Loading';

export const AboutPage = Loadable({
  loader: () => import('./AboutPage'),
  loading: Loading,
  delay: 300, // 0.3 seconds
});

export const ErrorPage = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
  delay: 300, // 0.3 seconds
});

export { default as Home } from './Home';
export { default as DynamicPage } from './AboutPage';
export { default as NotFound } from './NotFound';
