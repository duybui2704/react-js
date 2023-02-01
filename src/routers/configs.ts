// Layouts

// Pages
import { AUTH_STATE } from 'commons/constants';
import Auth from 'pages/auth';
import Congrats from 'pages/auth/congrats';
import NotFound from 'pages/common/not-found';
import Home from 'pages/home';
import Policy from 'pages/policy';
import { Paths } from './paths';
export interface RouteProps {
    path: string;
    page: (props: any) => JSX.Element;
    hasHeader?: boolean;
    hasFooter?: boolean;
    needAuth?: boolean;
    data?: any
}

// Public routes
const publicRoutes = [
    //common
    { path: Paths.home, page: Home, hasHeader: true, hasFooter: true },
    { path: Paths.any, page: NotFound },

    //auth
    { path: Paths.auth, page: Auth, hasHeader: true },
    { path: Paths.register, page: Auth, data: AUTH_STATE.REGISTER, hasHeader: true },
    { path: Paths.congrats, page: Congrats},

    // policy
    { path: Paths.policy, page: Policy }
] as RouteProps[];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
