// Jumps to an element a few times while the page settles, stopping once it is in view so it never
// fights a visitor who has started scrolling. The site's CSS smooth scrolling is switched off for the
// jump, because a smooth scroll started during page load can stall. Returns a cleanup for useEffect.
export function scrollToAnchorWhileLoading(id: string): () => void {
  const jump = () => {
    const element = document.getElementById(id)
    if (!element || Math.abs(element.getBoundingClientRect().top) <= 150) return
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"
    element.scrollIntoView({ block: "start" })
    html.style.scrollBehavior = previous
  }
  const timers = [0, 250, 800].map((delay) => window.setTimeout(jump, delay))
  return () => timers.forEach((timer) => window.clearTimeout(timer))
}
