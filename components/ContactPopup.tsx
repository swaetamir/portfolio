"use client";

import {useRef, useState} from "react";
import CloseButton from "@/components/CloseButton";

type Props = {
    open: boolean;
    onClose: () => void;
    defaultLeft?: number;
    defaultTop?: number;
    zIndex?: number;
    onFocus?: () => void;
  };

  export default function ContactPopup({
    open,
    onClose,
    defaultLeft = 303,
    defaultTop = 603,
    zIndex,
    onFocus,
  }: Props) {
    const [pos, setPos] = useState({ left: defaultLeft, top: defaultTop });
    const dragging = useRef(false);
    const start = useRef({ x: 0, y: 0 });
    const startPos = useRef({ left: defaultLeft, top: defaultTop });
    const scaleRef = useRef(1);
    const containerRef = useRef<HTMLDivElement>(null);
  
    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
      if (e.button !== 0) return;
      scaleRef.current = containerRef.current
        ? containerRef.current.getBoundingClientRect().width / 408
        : 1;
      dragging.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      start.current = { x: e.clientX, y: e.clientY };
      startPos.current = { ...pos };
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
      if (!dragging.current) return;
      const s = scaleRef.current;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      const W = 408, H = 214;
      setPos({
        left: Math.max(10, Math.min(1392 - W - 10, startPos.current.left + dx / s)),
        top: Math.max(10, Math.min(900 - H - 10, startPos.current.top + dy / s)),
      });
    }
  
    function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
      dragging.current = false;
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  
    if (!open) return null;
  
    return (
      <div
        ref={containerRef}
        className="absolute bg-white overflow-hidden"
        onMouseDownCapture={() => onFocus?.()}
        style={{
          width: 408,
          height: 214,
          left: pos.left,
          top: pos.top,
          border: "1px solid black",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          zIndex: zIndex ?? 80,
        }}
      >
        {/* draggable header area */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />
  
        {/* title */}
       {/* <div
          className="absolute"
          style={{
            left: 23,
            top: 14,
            color: "black",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Computer Science &amp; Statistics Student
        </div>*/}

        {/* links */}
        <a
          href="mailto:swaeta.mobasher@gmail.com"
          className="absolute underline underline-offset-4"
          style={{
            left: 47,
            top: 55,
            color: "black",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          email
        </a>
  
        <a
          href="https://github.com/swaetamir"
          target="_blank"
          rel="noreferrer"
          className="absolute underline underline-offset-4"
          style={{
            left: 47,
            top: 95,
            color: "black",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          github
        </a>

        <a
          href="https://substack.com/@thedatastudioarchive"
          target="_blank"
          rel="noreferrer"
          className="absolute underline underline-offset-4"
          style={{
            left: 47,
            top: 135,
            color: "black",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          substack
        </a>

        {/* close button */}
        <div style={{ position: "absolute", top: 9, right: 10 }}>
        <CloseButton onClick={onClose} ariaLabel="Close contact popup" />
        </div>

      </div>
    );
  }