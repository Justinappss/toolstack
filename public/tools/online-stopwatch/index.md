---
title: Online Stopwatch
description: Free online stopwatch with lap times, countdown timer, and keyboard shortcuts. Works in any browser, no download required.
url: "https://toolstack.tech/tools/online-stopwatch"
last_updated: 2026-05-23
author: Justin Pirrie
site: ToolStack — Free AI & Utility Tools (toolstack.tech)
---

# Online Stopwatch

Free online stopwatch with lap times, countdown timer, and keyboard shortcuts. Works in any browser, no download required.

**URL:** https://toolstack.tech/tools/online-stopwatch  
**Free:** Yes — no signup, no account, no limits  
**Author:** Justin Pirrie, Founder of ToolStack

## What This Tool Does

This online stopwatch runs entirely in your browser with no installation required. It offers two modes: a standard stopwatch with lap recording, and a countdown timer with custom durations. The stopwatch is accurate to the centisecond using the browser's high-resolution Performance API, and the elapsed time is calculated from timestamps rather than tick counts — meaning it stays accurate even when you switch tabs or minimise the browser window. Lap times are recorded with split times, with the fastest lap highlighted green and the slowest in red.

## Common Use Cases

An online stopwatch is useful for interval training and workout timing, cooking (pasta, soft-boiled eggs, sourdough proofing), presentations and speaking practice, sprint planning and meeting time-boxing, classroom activities and exam practice, and timing website performance or code execution manually. The countdown mode handles anything where you need an alert after a set duration.

## Frequently Asked Questions

**Q: How accurate is this online stopwatch?**

This stopwatch is accurate to the centisecond (10 milliseconds) using the browser's `performance.now()` API, which provides sub-millisecond resolution. For human-timed activities like workouts, cooking, meetings, and presentations, this is more than sufficient. For scientific or industrial timing applications requiring microsecond precision, dedicated hardware timers are appropriate. The key advantage of timestamp-based timing (vs tick-based) is that accuracy is maintained even when the browser tab is not actively in focus.

---

**Q: Does the stopwatch keep running if I switch tabs?**

Yes. Elapsed time is calculated from the difference between timestamps recorded at start and stop, not by counting individual ticks. If you switch tabs, the browser may throttle JavaScript timers (a standard browser energy-saving behaviour), but the displayed time catches up correctly when you return because the underlying calculation is based on real clock time. The timer does not pause, skip, or drift when you switch away and return.

---

**Q: How do I record lap times?**

Press the Lap button or press the L key on your keyboard while the stopwatch is running. Each lap records the split time (time for that lap only) and the cumulative elapsed time. The fastest lap is highlighted in green and the slowest in red, making it easy to identify where time was gained or lost across intervals. Lap history scrolls within the interface and does not auto-clear when you reset.

---

**Q: Can I set a countdown timer?**

Yes — switch to Countdown mode using the M key or the mode toggle. Enter any combination of hours, minutes, and seconds up to 23:59:59, or select a quick preset (1, 3, 5, 10, 15, 20, 25, 30 minutes). When the countdown reaches zero, an alert fires and the display flashes. The countdown can be paused and resumed mid-run. It resets to the last entered duration when you press reset.

---

**Q: What are the keyboard shortcuts?**

Space bar starts and pauses the stopwatch or countdown. R resets to zero. L records a lap (stopwatch mode only). M switches between stopwatch and countdown mode. These shortcuts work without clicking anywhere in the interface first, which is useful when your hands are occupied (cooking, training) and you need to tap a key quickly.

---

**Q: Does this work on mobile?**

Yes — the interface is fully responsive and works on iPhone, Android, and tablet browsers. The large start/stop button is designed for one-handed tap control. Lap recording and countdown mode both work on mobile. The keyboard shortcuts do not apply on mobile but the equivalent buttons are always visible.

---

**Q: Why use an online stopwatch instead of my phone's built-in one?**

The main advantage is multi-tasking: an online stopwatch stays open in a browser tab alongside whatever else you're working on — a recipe, a document, a video call — without switching apps. It also displays clearly on larger screens, making it easier to read from a distance. For shared use cases (classroom timers, presentation timing visible to an audience), a browser-based stopwatch on a monitor is significantly more practical than a phone.

---

*Use this tool free at https://toolstack.tech/tools/online-stopwatch*
