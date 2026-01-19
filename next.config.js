/** @type {import('next').NextConfig} */
// Force reload due to HMR error
const nextConfig = {
    images: {
        domains: [
            "utfs.io",
            "placehold.co"
        ]
    },
    webpack: (config) => {
        config.watchOptions = {
            ignored: [
                '**/node_modules',
                '**/.git',
                'C:\\DumpStack.log.tmp',
                'C:\\pagefile.sys',
                'C:\\hiberfil.sys',
                'C:\\swapfile.sys',
            ],
        }
        return config
    },
}

module.exports = nextConfig
