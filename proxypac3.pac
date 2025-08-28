function FindProxyForURL(url, host) {
    host = host.toLowerCase();

    // Conexión directa para CDN de medios (subdominios que empiezan con cdn., media., img.)
    if (shExpMatch(host, "cdn.*") ||
        shExpMatch(host, "media.*") ||
        shExpMatch(host, "img.*")) {
        return "DIRECT";
    }
    
    // Conexión directa para archivos grandes y medios (videos, audio, imágenes, miniaturas, documentos pesados)
    if (shExpMatch(url, "*.zip") || shExpMatch(url, "*.rar") || shExpMatch(url, "*.7z") ||
        shExpMatch(url, "*.tar") || shExpMatch(url, "*.gz") || shExpMatch(url, "*.iso") ||
        shExpMatch(url, "*.exe") || shExpMatch(url, "*.msi") ||

        // Videos
        shExpMatch(url, "*.mp4") || shExpMatch(url, "*.mkv") || shExpMatch(url, "*.avi") || 
        shExpMatch(url, "*.mov") || shExpMatch(url, "*.webm") || shExpMatch(url, "*.flv") ||
        shExpMatch(url, "*.m4v") ||

        // Audios
        shExpMatch(url, "*.mp3") || shExpMatch(url, "*.flac") || shExpMatch(url, "*.wav") ||
        shExpMatch(url, "*.aac") || shExpMatch(url, "*.ogg") || shExpMatch(url, "*.m4a") ||

        // Imágenes y miniaturas
        shExpMatch(url, "*.jpg") || shExpMatch(url, "*.jpeg") || shExpMatch(url, "*.png") || 
        shExpMatch(url, "*.gif") || shExpMatch(url, "*.bmp") || shExpMatch(url, "*.svg") ||
        shExpMatch(url, "*.webp") || shExpMatch(url, "*.ico") ||

        // Documentos pesados
        shExpMatch(url, "*.pdf") || shExpMatch(url, "*.epub")) {
        return "DIRECT";
    }

    // Reglas de proxy específicas por dominio
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

    // Todo lo demás va directo
    return "DIRECT";
}
