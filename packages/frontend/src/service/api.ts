

export async function shortenUrl(url: string) {
    const res = await fetch(
        'https://s.kotoha.de5.net/api/shorten',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        }
    );
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
    }
    const data = await res.json();
    return data.shortUrl as string;
}