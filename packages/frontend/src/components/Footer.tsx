export default function Footer() {
    return (
        <footer className="p-4 bg-gray-200 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} 短链服务. All rights reserved.</p>
        </footer>
    )
}