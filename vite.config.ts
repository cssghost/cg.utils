import { defineConfig } from 'vite'
import path from 'path'

function resolve (dir: string) {
  return path.join(__dirname, './', dir)
}

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Counter',
      fileName: 'counter'
    }
  },
  resolve: {
    alias: [
      {find: 'lib', replacement: resolve('lib')}
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.less'] // 需要忽略的文件后缀
  },
})
