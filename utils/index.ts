export const jsonFetcher = (url: string) => fetch(url).then(res => res.json());
