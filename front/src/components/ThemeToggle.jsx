import { useTheme } from '../hooks/useTheme'

// Tombol matahari/bulan. Label aksesibel selalu sinkron dengan aksi berikutnya.
export default function ThemeToggle() {
  const [theme, toggle] = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="grid size-9 place-items-center border border-sumi/25 transition hover:bg-sumi/5 active:scale-95 "
    >
      <span aria-hidden="true" className="text-sm">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}
