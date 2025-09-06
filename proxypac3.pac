function FindProxyForURL(url, host) {
    url = url.toLowerCase();
    host = host.toLowerCase();

    // Exclusión masiva para servicios críticos, correo, sync y buscadores
    if (
        shExpMatch(host, "*.mozilla.org") ||
        shExpMatch(host, "*.microsoft.com") ||
        shExpMatch(host, "*.windows.com") ||
        shExpMatch(host, "*.live.com") ||
        shExpMatch(host, "*.update.microsoft.com") ||
        shExpMatch(host, "*.firefoxusercontent.com") ||
        shExpMatch(host, "*.google.com") ||
        shExpMatch(host, "*.gmail.com") ||
        shExpMatch(host, "*.duckduckgo.com") ||
        shExpMatch(host, "*.icloud.com") ||
        shExpMatch(host, "*.apple.com") ||
        shExpMatch(host, "*.msn.com") ||
        shExpMatch(host, "*.outlook.com")
    ) {
        return "DIRECT";
    }

    // Exclusión para descarga, multimedia y CDN
    if (url.match(/\.(zip|rar|7z|tar|gz|iso|exe|msi|mp4|mkv|avi|mov|mp3|flac|wav|pdf)(\?|$)/)) {
        return "DIRECT";
    }
    if (host.match(/^(cdn\.|media\.|img\.|static\.|assets\.|videos\.|images\.|photos\.)/)) {
        return "DIRECT";
    }
    if (isPlainHostName(host) ||
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "172.17.*") ||
        shExpMatch(host, "172.18.*") ||
        shExpMatch(host, "172.19.*") ||
        shExpMatch(host, "172.20.*") ||
        shExpMatch(host, "172.21.*") ||
        shExpMatch(host, "172.22.*") ||
        shExpMatch(host, "172.23.*") ||
        shExpMatch(host, "172.24.*") ||
        shExpMatch(host, "172.25.*") ||
        shExpMatch(host, "172.26.*") ||
        shExpMatch(host, "172.27.*") ||
        shExpMatch(host, "172.28.*") ||
        shExpMatch(host, "172.29.*") ||
        shExpMatch(host, "172.30.*") ||
        shExpMatch(host, "172.31.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "169.254.*")
    ) {
        return "DIRECT";
    }

    // PROXY solo para dominios específicos manual
    var staticProxies = {
        "adobe.com": "PROXY 102.129.178.6:4414; DIRECT",
        "perplexity.ai": "PROXY 96.62.127.25:50100; DIRECT",
        "chatgpt.com": "PROXY 91.132.124.97:8080; DIRECT",
        "freepik.com": "PROXY 45.170.253.85:50100; DIRECT",
        "freepik.es": "PROXY 45.170.253.85:50100; DIRECT",
        "canva.com": "PROXY 93.177.95.214:8080; DIRECT",
        "platzi.com": "PROXY 14.102.232.254:50100; DIRECT",
        "crehana.com": "PROXY 193.233.210.11:8080; DIRECT",
        "cloud.microsoft": "PROXY 14.102.232.254:50100; DIRECT",
        "creativefabrica.com": "PROXY 148.135.147.24:6534; DIRECT",
        "envato.com": "PROXY 45.170.253.51:50100; DIRECT"
    };
    for (var domain in staticProxies) {
        if (dnsDomainIs(host, domain) || host == domain) {
            return staticProxies[domain];
        }
    }
    return "DIRECT";
}
3
