exports.version = 1
exports.description = "Use Webamp from within HFS"
exports.apiRequired = 8.1
exports.repo = "kran27/webamp-plugin"
exports.frontend_js = ['main.js', 'https://unpkg.com/webamp@latest/built/webamp.bundle.min.js'] //, 'https://unpkg.com/butterchurn@latest/lib/butterchurn.min.js'] // butterchurn isn't easily usable yet
exports.frontend_css = 'webamp.css'

exports.config = {
    regex: {
        frontend: true, type: 'string', defaultValue: 'm4a|mp3|wav|aac|ogg|flac',
        helperText: "Regex for supported file types"
    }
}