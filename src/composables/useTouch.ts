interface TouchOptions {
  el?: HTMLElement
  touchstart?: (e: TouchEvent) => void
  touchmove?: (e: TouchEvent) => void
  touchend?: (e: TouchEvent) => void
  touchcancel?: (e: TouchEvent) => void
}

export const useTouch = (options: TouchOptions) => {
  const { el = document.documentElement, ...events } = options
  const element = unref(el)
  const eventNames = Object.keys(events)

  onMounted(() => {
    if (!element || !events) return
    eventNames.forEach((eventName) => {
      const handler = events[eventName as keyof typeof events]
      if (handler) element.addEventListener(eventName, handler as EventListener, { passive: false })
    })
  })
  onUnmounted(() => {
    if (!element || !events) return
    eventNames.forEach((eventName) => {
      const handler = events[eventName as keyof typeof events]
      if (handler) element.removeEventListener(eventName, handler as EventListener)
    })
  })
}
