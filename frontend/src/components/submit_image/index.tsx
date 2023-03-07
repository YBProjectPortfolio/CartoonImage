import { FormEvent, useContext, useState } from "react";
import { context } from "../../App";

export default function SubmitImage() {
    const [image, setImage] = useState<string>("");
    const [imageFormData, setImageFormData] = useState<File>();
    const imageFile = useContext(context);

    async function loadImage(e: FormEvent<HTMLInputElement>) {
        try {
            e.preventDefault()

            // ! take a look when you setup a backend.
            if (!imageFile?.cartoon.image.isEmpty()) imageFile?.cartoon.setImage("");
            const fileInput = e.currentTarget.files?.item(0) as File;
            setImageFormData(fileInput);

            const reader = new FileReader()
            reader.readAsDataURL(fileInput)
        }
        catch {
            alert("Something went wrong");
        }
    }
    async function submit() {
        if (imageFormData) {
            imageFile?.turnOff.setTurnedOff(true);
            const data = await fetch("http://localhost:5000/api/", {
                method: "POST",
                body: imageFormData
            });
            const d = await data.text();
            imageFile?.cartoon.setImage("data:image/png;base64," + d);
            return
        }
        alert("Image should be loaded.")
    }

    return (
        <section className="flex flex-col items-center gap-2">
            <div className='relative bg-white rounded-md shadow-md'>
                <img src={image} alt="Click to upload image" className='w-56 bg-contain text-sm cursor-pointer text-gray-400 h-56 border rounded-md p-1 flex justify-center items-center' />
                <input type="file" accept='.png, .jpg, .jpeg' name="" id="" className="absolute top-0 h-56 w-56 opacity-0" onInputCapture={async (e) => await loadImage(e)} />
            </div>
            <div className='bg-red-500 p-2 text-slate-50 font-sans rounded-md w-52 text-center shadow-sm cursor-default duration-150 hover:bg-red-400' onClick={async () => await submit()}>Submit</div>
        </section>
    )
}