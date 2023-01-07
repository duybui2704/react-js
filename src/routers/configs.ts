// Layouts

// Pages
import Auth from 'pages/auth';
import NotFound from 'pages/common/not-found';
import Home from 'pages/home';
import Profile from 'pages/profile';
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

    //profile

    { path: Paths.profile, page: Profile, hasHeader: true }
] as RouteProps[];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
