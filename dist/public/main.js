{
    const config = HFS.getPluginConfig()
    HFS.onEvent('beforeHeader', () => `<div id='player'/>`)

    let webamp = null;
    let closed = false;

    function initWebamp() {
        webamp = new Webamp({
            zIndex: 10,
            handleTrackDropEvent: async (event) => {
                // allow dropping files from HFS
                //get url from drop:
                const url = event.dataTransfer.getData('text/plain');
                webamp.appendTracks([{ url: url }]);
            }
        });
        webamp.onClose(() => { closed = true; });
    }

    HFS.onEvent('fileMenu', ({ entry }) =>
        new RegExp(config.regex).test(entry.ext) &&
        { label: "Load Into Webamp", icon: 'audio', onClick: () => play(entry) })

    function play(entry) {
        if (!webamp) {
            initWebamp();
            webamp.renderWhenReady(document.getElementById('player'));
        }
        webamp.appendTracks([{ url: entry.uri }]);
        if (closed) {
            webamp.reopen();
        }
    }

    HFS.onEvent('fileMenu', ({ entry }) =>
        entry.ext == 'wsz' &&
        { label: "Load Webamp Skin", icon: 'doc', onClick: () => loadSkin(entry.uri) })

    function loadSkin(url) {
        if (!webamp) {
            initWebamp();
        }
        webamp.setSkinFromUrl(url);
        webamp.renderWhenReady(document.getElementById('player'));
    }
}