function FindProxyForURL(url, host) {
    host = host.toLowerCase();

    // Cache simple de resultados DNS y evaluaciones frecuentes
    var isLocalhost = (host === "localhost" || host === "127.0.0.1");
    var isInPrivateNet = false;
    var hostIP = null;

    // Comprobar si el host es IPv4 o resolver IP
    var isIpV4Addr = /^(\d+\.){3}\d+$/;
    if (isIpV4Addr.test(host)) {
        hostIP = host;
    } else {
        hostIP = dnsResolve(host);
    }

    // Redes privadas típicas: Clase A, B, C
    if (hostIP !== null) {
        if (shExpMatch(hostIP, "10.*") || shExpMatch(hostIP, "172.16.*") || shExpMatch(hostIP, "172.17.*") ||
            shExpMatch(hostIP, "172.18.*") || shExpMatch(hostIP, "172.19.*") || shExpMatch(hostIP, "172.20.*") ||
            shExpMatch(hostIP, "172.21.*") || shExpMatch(hostIP, "172.22.*") || shExpMatch(hostIP, "172.23.*") ||
            shExpMatch(hostIP, "172.24.*") || shExpMatch(hostIP, "172.25.*") || shExpMatch(hostIP, "172.26.*") ||
            shExpMatch(hostIP, "172.27.*") || shExpMatch(hostIP, "172.28.*") || shExpMatch(hostIP, "172.29.*") ||
            shExpMatch(hostIP, "172.30.*") || shExpMatch(hostIP, "172.31.*") ||
            shExpMatch(hostIP, "192.168.*")) {
            isInPrivateNet = true;
        }
    }

    if (isLocalhost || isInPrivateNet) {
        return "DIRECT";
    }

    // Evitar proxy para recursos estáticos comunes
    if (shExpMatch(url, "*.css") || shExpMatch(url, "*.js") ||
        shExpMatch(url, "*.woff") || shExpMatch(url, "*.woff2") ||
        shExpMatch(url, "*.ttf") || shExpMatch(url, "*.eot")) {
        return "DIRECT";
    }

    // CDN de medios
    if (shExpMatch(host, "cdn.*") || shExpMatch(host, "media.*") || shExpMatch(host, "img.*")) {
        return "DIRECT";
    }

    // Archivos grandes y medios
    if (shExpMatch(url, "*.zip") || shExpMatch(url, "*.rar") || shExpMatch(url, "*.7z") ||
        shExpMatch(url, "*.tar") || shExpMatch(url, "*.gz") || shExpMatch(url, "*.iso") ||
        shExpMatch(url, "*.exe") || shExpMatch(url, "*.msi") ||

        shExpMatch(url, "*.mp4") || shExpMatch(url, "*.mkv") || shExpMatch(url, "*.avi") ||
        shExpMatch(url, "*.mov") || shExpMatch(url, "*.webm") || shExpMatch(url, "*.flv") ||
        shExpMatch(url, "*.m4v") ||

        shExpMatch(url, "*.mp3") || shExpMatch(url, "*.flac") || shExpMatch(url, "*.wav") ||
        shExpMatch(url, "*.aac") || shExpMatch(url, "*.ogg") || shExpMatch(url, "*.m4a") ||

        shExpMatch(url, "*.jpg") || shExpMatch(url, "*.jpeg") || shExpMatch(url, "*.png") ||
        shExpMatch(url, "*.gif") || shExpMatch(url, "*.bmp") || shExpMatch(url, "*.svg") ||
        shExpMatch(url, "*.webp") || shExpMatch(url, "*.ico") ||

        shExpMatch(url, "*.pdf") || shExpMatch(url, "*.epub")) {
        return "DIRECT";
    }

    // Reglas específicas por dominio
    if (dnsDomainIs(host, "adobe.com")) return "PROXY 102.129.178.6:4414";
    if (dnsDomainIs(host, "perplexity.ai") || dnsDomainIs(host, "artlist.io")) return "PROXY 96.62.127.25:50100";
    if (dnsDomainIs(host, "chatgpt.com")) return "PROXY 91.132.124.97:8080";
    if (dnsDomainIs(host, "freepik.com") || dnsDomainIs(host, "freepik.es")) return "PROXY 14.102.232.254:50100";
    if (dnsDomainIs(host, "placeit.net")) return "PROXY 161.123.54.112:5496";
    if (dnsDomainIs(host, "canva.com")) return "PROXY 93.177.95.214:8080";
    if (dnsDomainIs(host, "platzi.com")) return "PROXY 14.102.232.254:50100";
    if (dnsDomainIs(host, "crehana.com")) return "PROXY 193.233.210.11:8080";
    if (dnsDomainIs(host, "cloud.microsoft")) return "PROXY 14.102.232.254:50100";
    if (dnsDomainIs(host, "creativefabrica.com")) return "PROXY 148.135.147.24:6534";
    if (dnsDomainIs(host, "motionarray.com")) return "PROXY 14.102.232.254:50100";
    if (dnsDomainIs(host, "envato.com")) return "PROXY 45.170.253.85:50100";

    // Por defecto todo directo
    return "DIRECT";
}

