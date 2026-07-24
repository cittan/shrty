import { useState } from "react";
import Layout from "../components/Layout";
import { useMutation } from "@tanstack/react-query";
import { shortenUrl } from "../service/api";



export default function HomePage() {
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [longUrl, setLongUrl] = useState("");
    const [copied, setCopied] = useState(false);

    const mutation = useMutation({
        mutationFn: shortenUrl,
        onSuccess: (data) => {
            setShortUrl(data);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!longUrl.trim()) return;
        setShortUrl(null);
        setCopied(false);
        mutation.mutate(longUrl);
    };

    const handleCopy = async () => {
        if (!shortUrl) return;
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    };

    return (
        <Layout>
            <h2>请输入长链接</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="请输入长链接"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "生成中..." : "生成短链"}
                </button>
            </form>

            {mutation.isError && <p>生成短链失败: {mutation.error.message}</p>}

            {shortUrl && (
                <>
                    <p>短链: {shortUrl}</p>
                    <button type="button" onClick={handleCopy}>
                        {copied ? "已复制" : "复制短链"}
                    </button>
                </>
            )}
        </Layout>
    )
}