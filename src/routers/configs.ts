// Layouts

// Pages
import Auth from 'pages/auth';
import Login from 'pages/auth/login';
import NotFound from 'pages/common/not-found';
import Home from 'pages/home';
import News from 'pages/news';
import { Paths } from './paths';
export interface RouteProps {
    path: string;
    page: () => JSX.Element;
    hasHeader?: boolean;
    hasFooter?: boolean;
    needAuth?: boolean;
}

// Public routes
const publicRoutes = [
    //common
    { path: Paths.home, page: Home, hasHeader: true, hasFooter: true},
    { path: Paths.any, page: NotFound},

    //auth
    { path: Paths.auth, page: Auth, hasHeader: true },

    //contract
    { path: Paths.news, page: News, hasHeader: true }
] as RouteProps[];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
