import Image from "next/image";

interface BoxStampProps {
    imagesBox: string[];
}

export default function BoxStamp({ imagesBox }: BoxStampProps) {
    return (
        <div className="w-full mt-10 justify-items-center grid grid-cols-2 sm:grid-cols-3 h-[70%] gap-2 p-3">
            {imagesBox && imagesBox.map((image) => (
                <div key={image} className="relative group w-[80%] h-[auto]">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-600/50 to-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-10"></div>
                    <Image 
                        src={image} 
                        alt="Image monster" 
                        width={200}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 right-2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <p className="text-sm font-bold bg-black/50 rounded p-1">Spooky Stamp</p>
                    </div>
                </div>
            ))}
        </div>
    );
}