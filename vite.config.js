import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssRemToResponsivePixel from 'postcss-rem-to-responsive-pixel'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            uni(),
            uvwt({
                disabled: ['h5', 'app'].includes(process.env.UNI_PLATFORM),
            }),
        ],
        server: {
            host: '0.0.0.0',
            strictPort: false,
        },
        css: {
            postcss: {
                plugins: [
                    tailwindcss(),
                    autoprefixer(),
                    postcssRemToResponsivePixel({
                        rootValue: 16,
                        propList: ['*'],
                        transformUnit: 'px',
                    }),
                ],
            },
        },
    }
})
