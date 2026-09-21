import { useEffect, useState } from "react";
import Cinematic from "./Cinematic";
import { Modal, useReveals } from "./shared";
import { useSmoothScroll } from "./useSmoothScroll";

export function App() {
  const [modal, setModal] = useState(null);
  const [initialModule, setInitialModule] = useState(undefined);
  useReveals();
  useSmoothScroll();

  useEffect(() => {
    document.title = "OrgTik | Digital services and business software";
  }, []);

  const open = (type, module) => {
    setInitialModule(module);
    setModal(type);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Cinematic
        onContact={() => open("contact")}
        onAccount={() => open("account")}
        onPlan={(module) =>
          open("plan", typeof module === "string" ? module : undefined)
        }
      />
      {modal && (
        <Modal
          key={`${modal}-${initialModule}`}
          type={modal}
          onClose={() => setModal(null)}
          initialModule={initialModule}
        />
      )}
    </>
  );
}
