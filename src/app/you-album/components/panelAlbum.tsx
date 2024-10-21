import { dragAndDrop } from "@formkit/drag-and-drop/react";
import { use, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { dropOrSwap } from "@formkit/drag-and-drop";

const CANTIDAD_STAMPS = 12;

interface PanelAlbumProps {
  onRefCurrentAlbum: (ref: HTMLElement) => void,
  onSetSlotsFree: (slotsFree: number) => void
}

export default function PanelAlbum({ onRefCurrentAlbum, onSetSlotsFree }: PanelAlbumProps) {
    const [stamps, setStamps] = useState<string[]>([]);
    const parentRef = useRef(null);
    const [slotsFree, setSlotsFree] = useState(Array(CANTIDAD_STAMPS).fill(null));

    useEffect(() => {
        if (parentRef.current) {
            onRefCurrentAlbum(parentRef.current);
            dragAndDrop({
                parent: parentRef.current,
                state: [stamps, setStamps],
                group: "album", 
                draggable(tag) {
                  return !tag.className.includes("no-drag");
                },
                onDragstart: (event) => {
                  let element = event.parent.el.childNodes[event.position] as HTMLElement;
                  element.style.opacity = "0.5";
                },
                onDragend: (event) => {
                  event.draggedNode.el.style.opacity = "1";
                },
                onTransfer: (event) => {
                  console.log(event);
                },
                plugins: [
                  dropOrSwap({
                      shouldSwap: () => true
                  })
                ]
            });
        }
    }, [parentRef.current]);

    useEffect(() => {
      setSlotsFree(Array(CANTIDAD_STAMPS - stamps.length).fill(null))
      onSetSlotsFree(CANTIDAD_STAMPS - stamps.length)
    },[stamps])


    return (
      <div className="w-full md:w-1/2 h-screen bg-gray-800 p-4 overflow-hidden">
      <h2 className="text-3xl font-bold text-orange-500">Your Album</h2>
      <ul ref={parentRef} className="grid bg-gray-800 p-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stamps.map((stamp, index) => (
              <li key={stamp+index} className="aspect-square">
                  <Image
                      src={stamp}
                      width={150}
                      height={150}
                      alt={"Monster de Halloween en el álbum"}
                      className="object-cover rounded-lg shadow-md cursor-move border-2 border-orange-500 hover:border-purple-500 transition-colors duration-300"
                  />
              </li>
          ))}
          {slotsFree.map((_, index) => (
              <li key={index} draggable={false} className="no-drag aspect-square">
                  <div className="w-[150px] h-[172px] bg-gray-700 rounded-lg shadow-md border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <span className="text-gray-500 text-4xl">+</span>
                  </div>
              </li>
          ))}
      </ul>
  </div>
    );
}
