"use client";

import { useState } from "react";
import FaceGrid from "../components/FaceGrid";
import ContactPopup from "../components/ContactPopup";
import PosterStage from "../components/PosterStage";

export default function Home(){
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <main className="bg-[#ffffff] text-black">
      <PosterStage>
        <div className="relative bg-white overflow-hidden" style={{ width: 1392, height: 900 }}>
          {/* name */}
          <div
            style={{
              left: 50,
              top: 34,
              position: "absolute",
              color: "black",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            SWAETA MIR
          </div>
  
          {/* underline line */}
          <div
            style={{
              width: 245.01,
              height: 0,
              left: 50,
              top: 75,
              position: "absolute",
              borderTop: "2px solid black",
            }}
          />
  
          {/* projects */}
          <a
            href="/projects"
            style={{
              left: 50,
              top: 101,
              position: "absolute",
              color: "black",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Selected Works &amp; Experiments
          </a>

  
          {/* contact */}
          <button
            onClick={() => setContactOpen((v) => !v)}
            style={{
              left: 50,
              top: 763,
              position: "absolute",
              color: "black",
              fontSize: 20,
              fontWeight: 700,
              background: "transparent",
              cursor: "pointer",
              zIndex: 50,
            }}
          >
            Contact
          </button>
          {/* underline under contact (only open when popup is open) */}
          {contactOpen && (
            <div
              style={{
                width: 67.01,
                height: 0,
                left: 52,
                top: 787,
                position: "absolute",
                borderTop: "1.5px solid black",
                zIndex: 49,
              }}
            />
          )}

  
          {/* footer */}
          <div
            style={{
              left: 50,
              top: 815,
              position: "absolute",
              color: "black",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Montreal
          </div>
  
          <div
            style={{
              left: 50,
              top: 839,
              position: "absolute",
              color: "black",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            2025-2026
          </div>
  
          {/* 3x3 faces grid */}
          <FaceGrid />
  
          <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
      </PosterStage>
    </main>
  );
}  