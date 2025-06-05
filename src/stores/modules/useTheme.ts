import { setHtmlAttr, startThemeAnimate } from '@/utils/theme'
const match = window.matchMedia('(prefers-color-scheme: dark)')
export const useTheme = defineStore(
  'theme',
  () => {
    const ThemeIsDark = ref(match.matches)
    const toggleTheme = () => {
      startThemeAnimate(() => {
        ThemeIsDark.value = !ThemeIsDark.value
        setHtmlAttr(ThemeIsDark.value)
      })
    }
    // init Theme
    setHtmlAttr(ThemeIsDark.value)
    match.addEventListener('change', () => {
      if (ThemeIsDark.value === match.matches) return
      toggleTheme()
    })
    return { ThemeIsDark, toggleTheme }
  },
  {
    persist: true,
  },
)
