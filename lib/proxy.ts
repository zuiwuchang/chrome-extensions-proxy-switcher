export enum Mode {
    /**
     * "fixed_servers" singleProxy
     */
    single = 1,
    /**
     * "fixed_servers" proxyForHttps proxyForHttp proxyForFtp fallbackProxy
     */
    server = 2,
    /**
     * "pac_script" with url
     */
    pac = 3,
    /**
     * "pac_script" with data
     */
    script = 4,
}
export type Scheme = "http" | "https" | "quic" | "socks4" | "socks5";
/**
 * An object encapsulating a single proxy server's specification.
 */
export interface ProxyServer {

    /**
     * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
     */
    scheme?: Scheme;

    /**
     * The hostname or IP address of the proxy server. Hostnames must be in ASCII (in Punycode format). IDNA is not supported, yet.
     */
    host: string;

    /**
     * The port of the proxy server. Defaults to a port that depends on the scheme.
     */
    port?: number;
}
export interface ProxyRules {
    /**
     * The proxy server to be used for HTTP requests.
     */
    proxyForHttp?: ProxyServer

    /**
     * The proxy server to be used for HTTPS requests.
     */
    proxyForHttps?: ProxyServer

    /**
     * The proxy server to be used for FTP requests.
     */
    proxyForFtp?: ProxyServer

    /**
     * The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified.
     */
    fallbackProxy?: ProxyServer

    /**
     * List of servers to connect to without a proxy server.
     */
    bypassList?: string[]
}
/**
 * An object holding proxy auto-config information. Exactly one of the fields should be non-empty.
 */
export interface PacScript {
    /**
     * URL of the PAC file to be used.
     */
    url: string

    /**
     * A PAC script.
     */
    data: string

    /**
     * If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false.
     */
    mandatory: boolean
}
export interface ProxyConfig {
    /**
     * 代理名稱，必須唯一，不能以 '::' 作爲名稱前綴
     */
    name: string

    /**
     * 代理模式
     */
    mode: Mode

    /**
     * single/server 模式時有效
     */
    rules?: ProxyRules

    /**
     * pac/script 模式時有效
     */
    pacScript?: PacScript
}