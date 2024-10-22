'use client'
import { dropOrSwap } from "@formkit/drag-and-drop";
import { dragAndDrop } from "@formkit/drag-and-drop/react";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import PanelStampsSkeleton from "./panelStampSkeleton";

export default function PanelStamps() {
  const [stamps, setStamps] = useState<string[]>([]);
  const [firstRender, setFirstRender] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    if (stamps.length < 1) {
      fetch("./api/getYouStamps")
        .then((res) => res.json())
        .then((res) => {
          setFirstRender(true);
          setStamps(res);
        })
    }

    if (parentRef.current && stamps.length > 0) {
      dragAndDrop({
        parent: parentRef.current,
        state: [stamps, setStamps],
        group: "album",
        onDragstart: (event) => {
          let element = event.parent.el.childNodes[event.position] as HTMLElement;
          element.style.opacity = "0.5";
        },
        onDragend: (event) => {
          event.draggedNode.el.style.opacity = "1";
        },
        plugins: [
          dropOrSwap({
            shouldSwap: () => true
          })
        ]
      });
    }

  }, [parentRef.current]);



  return (
    <div className="h-screen bg-gray-800 p-4 overflow-hidden">
    <h2 className="text-3xl font-bold mt-2 text-orange-500">Monster Stamps</h2>
    <div className="grid p-4 h-full">
      <ul ref={parentRef} className="grid grid-cols-3 justify-items-center h-full ">
        {stamps.map((stamp, index) => (
          <li 
            key={stamp+index} 
            className="w-20 h-20 hover:z-10 transition-all duration-200 ease-in-out transform hover:scale-110"
            style={{ zIndex: index }}
          >
            <Image
              src={stamp}
              width={80}
              height={80}
              alt={`Espanto de Halloween ${index + 1}`}
              className="w-[90%] h-[90%] object-cover rounded-lg shadow-md cursor-move border-2 border-orange-500 hover:border-purple-500 transition-colors duration-300"
            />
          </li>
        ))}
        {!firstRender &&  <PanelStampsSkeleton/>}
        {firstRender && stamps.length < 1 && <p className="text-white text-4xl">No stamps available. You have to open the stamp box.
          </p>}
      </ul>
    </div>
  </div>
  );
}