const appTitle = import.meta.env.VITE_APP_TITLE
const Title = useTitle()
export const setTitle = (title?: string) => {
  Title.value = title ? `${title} | ${appTitle}` : appTitle
}
