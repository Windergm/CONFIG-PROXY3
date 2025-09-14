function FindProxyForURL(url, host) {
    url = url.toLowerCase();
    host = host.toLowerCase();

    // Lista de dominios que deben ir siempre DIRECT (Firefox Sync, extensiones, etc.)
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

    // Cache DNS estático para dominios específicos
    var staticProxies = {
        "adobe.com": "PROXY 102.129.178.6:4414; DIRECT",
        "perplexity.ai": "PROXY 96.62.127.25:50100; DIRECT", 
        "chatgpt.com": "PROXY 91.132.124.97:8080; DIRECT",
        "freepik.com": "PROXY 45.170.253.85:50100; DIRECT",
        "freepik.es": "PROXY 45.170.253.85:50100; DIRECT",
        "canva.com": "PROXY 93.177.95.214:8080; DIRECT",
        "platzi.com": "PROXY 14.102.232.254:50100; DIRECT",
        "crehana.com": "PROXY 193.233.210.11:8080; DIRECT",
        "cloud.microsoft": "PROXY 45.170.253.85:50100; DIRECT",
        "creativefabrica.com": "PROXY 148.135.147.24:6534; DIRECT",
        "envato.com": "PROXY 45.170.253.51:50100; DIRECT"
    };

    // Bypass para archivos grandes y multimedia
    if (url.match(/\.(zip|rar|7z|tar|gz|iso|exe|msi|mp4|mkv|avi|mov|mp3|flac|wav|pdf)(\?|$)/)) {
        return "DIRECT";
    }

    // Bypass para CDNs y contenido estático
    if (host.match(/^(cdn\.|media\.|img\.|static\.|assets\.|videos\.|images\.|photos\.)/)) {
        return "DIRECT";
    }

    // Bypass para redes locales
    if (isPlainHostName(host) ||
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "172.31.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "169.254.*")) {
        return "DIRECT";
    }

    // Aplicar proxy específico si el dominio coincide
    for (var domain in staticProxies) {
        if (dnsDomainIs(host, domain) || host === domain) {
            return staticProxies[domain];
        }
    }

    // Conexión directa por defecto
    return "DIRECT";
}
