import Footer from 'components/footer';
import Header from 'components/header';
import { useAppStore } from 'hooks';
import OverlayLoader from 'pages/common/overlay-loader';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { publicRoutes, RouteProps } from './configs';
import { AppStoreProvider } from 'providers/app-provider';
import { COLORS } from 'theme/colors';
import { ConfigProvider } from 'antd';

const RouteWrapper = ({ ...props }: RouteProps): ReactElement => {
    const navigate = useNavigate();
    const { userManager } = useAppStore();

    useEffect(() => {
        window.scrollTo(0, 0);

        const isLoggedIn = !!userManager.userInfo;

        console.log(isLoggedIn);

        // not back browser
        history.pushState(null, '', location.href);
        window.onpopstate = function () {
            history.go(1);
        };

        // if (!isLoggedIn && props.needAuth) {
        //     navigate(Paths.login);
        //     return;
        // }
    }, [navigate, props.needAuth, userManager.userInfo]);

    return (
        <Suspense fallback={<OverlayLoader />}>
            <div className={'body'}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: COLORS.GREEN,
                            lineWidth: 1
                        }
                    }}>
                    {props.hasHeader && <Header />}
                    <div className={'content'}>
                        <props.page />
                    </div>
                    {props.hasFooter && <Footer />}
                </ConfigProvider>
            </div>
        </Suspense>
    );
};

const Router = () => {
    return (
        <BrowserRouter>
            <AppStoreProvider>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<RouteWrapper {...route} />}
                            />
                        );
                    })}
                </Routes>
            </AppStoreProvider>
        </BrowserRouter>
    );
};
export default Router;
