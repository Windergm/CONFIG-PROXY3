function FindProxyForURL(url, host) {
    url = url.toLowerCase();
    host = host.toLowerCase();

    // Excepciones para Firefox y servicios internos - siempre DIRECT
    var firefoxBypass = [
        "accounts.firefox.com",
        "sync.services.mozilla.com",
        "addons.mozilla.org",
        "mozilla.org",
        "firefox.com",
        "services.addons.mozilla.org"
    ];
    for (var i = 0; i < firefoxBypass.length; i++) {
        if (dnsDomainIs(host, firefoxBypass[i]) || host === firefoxBypass[i]) {
            return "DIRECT";
        }
    }

    // Acceso directo para redes locales y localhost
    if (
        isPlainHostName(host) ||
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "172.31.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "169.254.*")
    ) {
        return "DIRECT";
    }

    // Acceso directo para archivos grandes o multimedia (descargas)
    if (url.match(/\.(zip|rar|7z|tar|gz|iso|exe|msi|mp4|mkv|avi|mov|mp3|flac|wav|pdf)(\?|$)/)) {
        return "DIRECT";
    }

    // Para estos dominios estrictamente usar su proxy asignado, si no funciona hay error
    var staticProxies = {
        "adobe.com": "PROXY 102.129.178.6:4414",
        "perplexity.ai": "PROXY 96.62.127.25:50100",
        "chatgpt.com": "PROXY 91.132.124.97:8080",
        "freepik.com": "PROXY 45.170.253.85:50100",
        "freepik.es": "PROXY 45.170.253.85:50100",
        "canva.com": "PROXY 93.177.95.214:8080",
        "platzi.com": "PROXY 14.102.232.254:50100",
        "crehana.com": "PROXY 193.233.210.11:8080",
        "cloud.microsoft": "PROXY 45.170.253.85:50100",
        "creativefabrica.com": "PROXY 148.135.147.24:6534",
        "envato.com": "PROXY 45.170.253.51:50100"
    };
    for (var domain in staticProxies) {
        if (dnsDomainIs(host, domain) || host === domain) {
            return staticProxies[domain];
        }
    }

    // Si no está en la lista y no es excepción ni descarga, falla la conexión con proxy inválido
    return "PROXY 0.0.0.0:0";
}

