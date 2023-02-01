function openLink(link: string) {
    window.open(link);
}

function openLinkInNewTab(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
}

export default {
    openLink,
    openLinkInNewTab
};

