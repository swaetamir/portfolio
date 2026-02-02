"use client";

import {useEffect, useRef, useState} from "react";
import CloseButton from "@/components/CloseButton";

type Props = {
    open: boolean;
    onClose: () => void;
    // default position in poster coords (like on figma)
    defaultLeft?: number;
    defaultTop?: number;
  };
  
  export default function ContactPopup({
    open,
    onClose,
    defaultLeft = 303,
    defaultTop = 603,
  }: Props) {
    const [pos, setPos] = useState({ left: defaultLeft, top: defaultTop });
    const dragging = useRef(false);
    const start = useRef({ x: 0, y: 0 });
    const startPos = useRef({ left: defaultLeft, top: defaultTop });
  
    // reset position when opened
    useEffect(() => {
      if (open) {
        setPos({ left: defaultLeft, top: defaultTop });
        startPos.current = { left: defaultLeft, top: defaultTop };
      }
    }, [open, defaultLeft, defaultTop]);
  
    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
      // left click / primary pointer only
      if (e.button !== 0) return;
  
      dragging.current = true;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      start.current = { x: e.clientX, y: e.clientY };
      startPos.current = { ...pos };
    }
  
    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
      if (!dragging.current) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      setPos({
        left: startPos.current.left + dx,
        top: startPos.current.top + dy,
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
        // element is positioned relative to poster container
        className="absolute bg-white overflow-hidden"
        style={{
          width: 408,
          height: 214,
          left: pos.left,
          top: pos.top,
          border: "1px solid black",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
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
        <div
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
        </div>
  
        {/* links */}
        <a
          href="mailto:swaeta.mobasher@gmail.com"
          className="absolute underline underline-offset-4"
          style={{
            left: 47,
            top: 75,
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
            top: 115,
            color: "black",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          github
        </a>
  
        {/* close button */}
        <div style={{ position: "absolute", top: 6, right: 6 }}>
        <CloseButton onClick={onClose} ariaLabel="Close contact popup" />
        </div>

      </div>
    );
  }