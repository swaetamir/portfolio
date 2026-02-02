import Image from "next/image";

type FaceKey = "unimpressed" | "happy" | "tired" | "questioning";

type FaceItem = {
  key: FaceKey;
  alt: string;
  left: number;
  top: number;
};

const faces: FaceItem[] = [
  // row 1
  { key: "unimpressed", alt: "unimpressed", left: 622, top: 143 },
  { key: "happy", alt: "happy", left: 882, top: 143 },
  { key: "tired", alt: "tired", left: 1142, top: 143 },

  // row 2
  { key: "tired", alt: "tired 2", left: 622, top: 403 },
  { key: "questioning", alt: "questioning", left: 882, top: 403 },
  { key: "unimpressed", alt: "unimpressed 2", left: 1142, top: 403 },

  // row 3
  { key: "questioning", alt: "questioning 2", left: 622, top: 663 },
  { key: "tired", alt: "tired 3", left: 882, top: 663 },
  { key: "happy", alt: "happy 2", left: 1142, top: 663 },
];

function srcFor(key: FaceKey) {
  return `/faces/${key}.png`;
}

export default function FaceGrid() {
  return (
    <>
      {faces.map((f, i) => (
        <Image
          key={`${f.key}-${i}`}
          src={srcFor(f.key)}
          alt={f.alt}
          width={200}
          height={200}
          style={{ position: "absolute", left: f.left, top: f.top }}
          priority={i < 3}
        />
      ))}
    </>
  );
}
