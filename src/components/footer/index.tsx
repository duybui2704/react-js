import Languages from 'commons/languages';
import React, { memo } from 'react';
import styles from './footer.module.scss';

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerContainerLeft}>
                <div className={styles.textTienNgay}>
                    <span>{`${Languages.footer.tienNgay}`}</span>
                    <span className={styles.textVn}>{Languages.footer.dotVn}</span>
                </div>

                <div className={styles.textCopyRight}>
                    <span>{`${Languages.footer.copyRight}`}</span>
                </div>
            </div>
            <div className={styles.footerContainerRight}>
                <span className={styles.textErrAccess}>
                    {Languages.footer.contactAccessIfErr}
                </span>
                <span className={styles.textSdtIfErrAccess}>
                    {Languages.footer.sdtIfErrAccess}
                </span>
            </div>

        </div>
    );
}

export default memo(Footer);
