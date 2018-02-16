'use babel';

export const CARBON_URL =
    'https://carbon.now.sh/?bg=rgba(0,0,0,0)&t=dracula&l=auto&ds=true&wc=true&wa=true&pv=43px&ph=57px&ln=false&code=';

export function getCarbonURL(code) {
    if (code.length > 1000) return;

    return `${CARBON_URL}${encodeURI(code.trim()).replace('#', '%23')}`;
}
