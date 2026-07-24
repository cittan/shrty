import { useState } from "react";
import Layout from "../components/Layout";



export default function App() {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [shortUrl,setShortUrl] = useState<string | null>(null);

    return (
        <Layout>
            <h2>请输入长链接</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="请输入长链接" />
                <button onClick={() => setLoading(true)}>生成短链</button>
            </form>
        </Layout>
    )
}