import { getAwayNotice } from "@/lib/away-notice"

// A slim light purple line under the header while Henry is away (lib/away-notice.ts).
//
// It is left out of the page once the first day back has started. Pages built before that day still carry it, so the
// small script next to it hides it on the visitor's device from that moment, before the page is first painted. It
// only switches the line off: it never adds or moves anything, so it cannot upset hydration.
export function AwayNotice() {
  const notice = getAwayNotice()
  if (!notice) return null

  return (
    <>
      <div
        id="away-notice"
        suppressHydrationWarning
        className="border-b border-primary/20 bg-primary/10 px-4 py-2 text-center text-sm font-semibold text-balance text-primary sm:text-base"
      >
        {notice.text}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `if(Date.now()>=${notice.endsAt}){var n=document.getElementById("away-notice");if(n)n.style.display="none"}`,
        }}
      />
    </>
  )
}
