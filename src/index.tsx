import 'assets/scss/index.scss';
import 'assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import sessionManager from 'managers/session-manager';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AppStoreProvider } from './providers/app-provider';
import Router from './routers/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import config from 'config';
import DocumentMeta from 'react-document-meta';


if (config.env === 'prod') {
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

const container = document.getElementById('root');

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

function App(): JSX.Element {
    function handleWindowSizeChange() {
        sessionManager.isMobile = window.innerWidth <= 768;
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
    }

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const router = createBrowserRouter([
        { path: '*', element: <Router /> }
    ]);

    useEffect(() => {
        router.subscribe((state) => console.log('new state', state));
    }, [router]);

    const meta = {
        title: 'Đầu tư TiệnNgay',
        description: 'Đầu tư dễ dàng và an toàn với Tiện Ngay: ứng dụng giúp bạn yên tâm tích luỹ tài sản thông qua các các gói đầu tư có lãi suất vượt trội lên đến 18% và kỳ hạn linh hoạt chỉ từ 1 tháng.',
        meta: {
            charset: 'utf-8',
            name: {
                keywords: 'react,meta,document,html,tags'
            },
            'og:image': 'https://play-lh.googleusercontent.com/c_aF151w0DfmeexqEVxjhsN3henKLG4gLIzaK2mxKbIKkNFgY_kltqZWYTjtpJllT_Y=w5120-h2880-rw'
        }
    };

    return <>
        {/* <React.StrictMode> */}
        <DocumentMeta {...meta}>
            <AppStoreProvider>
                <RouterProvider router={router} />
            </AppStoreProvider>
            <ToastContainer theme="colored" className="customize-toast" limit={1} autoClose={5000} />
            {/* </React.StrictMode> */}
        </DocumentMeta>
    </>;
}
const root = createRoot(container!);
root.render(<App />);
