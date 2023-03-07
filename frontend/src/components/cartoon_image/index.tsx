import { useContext, useRef, useState } from "react"
import { context } from "../../App";

export default function Cartoon() {
    const downloadImageFile = useRef<HTMLImageElement>(null);
    const image = useContext(context);

    function donwloadImage() {
        if (downloadImageFile.current) {
            const tempImageSize = document.createElement("img");
            const a = image?.cartoon.image as string;
            tempImageSize.src = a;
            const imageEl = downloadImageFile.current;
            const canvas = document.createElement("canvas") satisfies HTMLCanvasElement;
            canvas.height = tempImageSize.height;
            canvas.width = tempImageSize.width;

            const context = canvas.getContext("2d");
            context?.drawImage(imageEl, 0, 0);

            canvas.toBlob((blob: Blob | null) => {
                const link = document.createElement("a") satisfies HTMLAnchorElement;
                link.download = "cartoon.png";

                if (blob) {
                    link.href = URL.createObjectURL(blob);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    tempImageSize.remove()
                }
            }, "image/png");

        }
    }
    return (
        <>
            {!image?.turnOff.isTurnedOff ?
                <div className="hidden"></div>
                :
                <>
                    {
                        image?.cartoon.image.isEmpty() ?
                            <section className="flex flex-col items-center gap-2">
                                <div className='bg-black rounded-md shadow-md'>
                                    <img src={""} alt="Loading..." className='w-56 bg-contain text-sm cursor-default text-gray-400 h-56 border rounded-md p-1 flex justify-center items-center' />
                                </div>
                                <button disabled={true} className='bg-red-900 p-2 text-slate-50 font-sans rounded-md w-52 text-center shadow-sm cursor-default duration-150 hover:bg-red-400'>Loading...</button>
                            </section>
                            :
                            <section className="flex flex-col items-center gap-2">
                                <div className='bg-black rounded-md shadow-md'>
                                    <img ref={downloadImageFile} src={image?.cartoon.image} alt="Loading..." className='w-56 bg-contain text-sm cursor-default text-gray-400 h-56 border rounded-md p-1 flex justify-center items-center' />
                                </div>
                                <button disabled={false} className='bg-blue-500 p-2 text-slate-50 font-sans rounded-md w-52 text-center shadow-sm cursor-default duration-150 hover:bg-red-400' onClick={donwloadImage}>Download</button>
                            </section>
                    }
                </>
            }
        </>
    )
}