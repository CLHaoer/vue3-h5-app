// 检查是否支持 View Transition API
export const supportsViewTransition = () => {
  return (
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const setHtmlAttr = (isDark: boolean) => {
  const html = document.documentElement
  html.classList.toggle('dark', isDark)
  html.classList.toggle('light', !isDark)
}

const defaultAnimate = () => {
  document.documentElement.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 300,
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export const startThemeAnimate = (cb: (...arg: unknown[]) => unknown, animate = defaultAnimate) => {
  if (supportsViewTransition()) {
    const transition = document.startViewTransition(cb)
    transition.ready.then(animate)
  } else {
    cb()
  }
}
