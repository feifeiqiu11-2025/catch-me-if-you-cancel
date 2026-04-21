# catch-me-if-you-cancel

A cheeky subscription-cancel flow where **"Yes, cancel"** shrinks and dodges your mouse while **"No, keep my subscription"** grows — ending in a confetti-showered dancing dragon when you finally give in.

Built with Next.js 15, React 19, and Tailwind CSS. No confetti library, no animation library, no dark-pattern library. Just a few divs and some CSS keyframes.

> ⚠️ **This is a joke. Please don't send this to regulators.**
>
> It's a 100% parody / weekend-fun project — not a real cancel flow, not shipped in a real product, not charging anyone real money. Nobody is actually being prevented from cancelling anything.
>
> Real products should **not** do this. The EU's Digital Services Act and consumer-protection rules (and the US FTC's "click-to-cancel" rule) specifically target UI that makes cancellation harder than signup — and they are right to. If you're building an actual SaaS, please make cancellation a single boring button. No dragons.

## The gag

1. User clicks **Cancel subscription** on a fake billing page.
2. A guilt-trip modal asks if they're *really* sure.
3. Clicking **Yes, cancel** → modal advances to the next round with a new plea. The "Yes" button **shrinks** each round. The "No, keep my subscription" button **grows**.
4. On the final round, the "Yes" button also **dodges the mouse** (while staying inside the modal — so you can chase it, but never catch it).
5. Eventually you give up and click **No**. Confetti falls. A dragon wiggles and jumps. Your subscription lives.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and try to cancel.

## Files that matter

- [`app/page.tsx`](app/page.tsx) — the fake billing page
- [`app/StayWithUsModal.tsx`](app/StayWithUsModal.tsx) — the whole gag: shrinking button, dodge logic, confetti, dragon
- [`public/demo-dragon.png`](public/demo-dragon.png) — the celebration dragon

## Why this is (not quite) a dark pattern

Real retention flows that physically prevent cancellation are illegal in several jurisdictions (see the FTC's 2024 "click-to-cancel" rule). This demo is a parody — every single round still has a perfectly visible "Yes, cancel" button, even when it's jumping around. The joke is on the user, not the user's wallet.

## License

MIT — take it, fork it, swap the dragon for your own mascot.
