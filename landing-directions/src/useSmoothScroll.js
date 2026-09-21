import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function useSmoothScroll() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let scroll;
    const syncLock = () => {
      if (!scroll) return;
      if (document.querySelector("dialog[open]")) scroll.stop();
      else if (scroll.isStopped) scroll.start();
    };
    const configure = () => {
      scroll?.destroy();
      scroll = undefined;
      if (motion.matches) return;
      scroll = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          node.tagName === "DIALOG" ||
          node.classList?.contains("testimonial-grid"),
      });
      syncLock();
    };
    const keyboard = (event) => {
      if (
        [
          "Tab",
          "Home",
          "End",
          "PageUp",
          "PageDown",
          "ArrowUp",
          "ArrowDown",
          " ",
        ].includes(event.key)
      ) {
        scroll?.scrollTo(window.scrollY, { immediate: true });
      }
    };
    configure();
    const dialogs = new MutationObserver(syncLock);
    dialogs.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    motion.addEventListener("change", configure);
    window.addEventListener("keydown", keyboard);
    return () => {
      dialogs.disconnect();
      motion.removeEventListener("change", configure);
      window.removeEventListener("keydown", keyboard);
      scroll?.destroy();
    };
  }, []);
}
