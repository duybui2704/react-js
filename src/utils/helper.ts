function openLink(link: string) {
    window.open(link);
}

function openLinkInNewTab(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
}

function openLinkOnIos(link: string) {
    if (!window.open(link)) {
        window.location.href = link;
    }
}

export default {
    openLink,
    openLinkInNewTab,
    openLinkOnIos
};

