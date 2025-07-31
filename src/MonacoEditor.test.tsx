import { createRoot } from 'solid-js'
import { describe, expect, it, vi } from 'vitest'
import { MonacoEditor } from '../src'

describe('MonacoEditor', () => {
  it('renders a MonacoEditor component', async () => {
    createRoot(() => {
      const container = (<MonacoEditor />) as HTMLDivElement
      expect(container.outerHTML).toMatchSnapshot()
    })
  })

  it('accepts new props without errors', async () => {
    createRoot(() => {
      const beforeMount = vi.fn()
      const onValidate = vi.fn()
      
      const container = (
        <MonacoEditor
          line={42}
          beforeMount={beforeMount}
          onValidate={onValidate}
        />
      ) as HTMLDivElement
      
      expect(container).toBeDefined()
    })
  })

  it('has correct TypeScript interface for new props', () => {
    // This test ensures the interface compiles correctly
    const props: Parameters<typeof MonacoEditor>[0] = {
      line: 10,
      beforeMount: (monaco) => {
        // beforeMount callback should receive Monaco instance
        expect(monaco).toBeDefined()
      },
      onValidate: (markers) => {
        // onValidate callback should receive markers array
        expect(Array.isArray(markers)).toBe(true)
      }
    }
    
    expect(props).toBeDefined()
  })
})
