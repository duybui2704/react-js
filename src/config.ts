const config = {
    baseURL: process.env['REACT_APP_BASE_URL'] || '',
    errorURL: process.env['REACT_APP_ERROR_URL'] || '',
    env: process.env['REACT_APP_ENV'] || 'dev'
} as const;

export default config;
