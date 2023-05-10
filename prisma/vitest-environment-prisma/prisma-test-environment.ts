import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Antes de cada arquivo de testes')

    return {
      async teardown() {
        console.log('Após cada arquivo de teste')
      },
    }
  },
}
