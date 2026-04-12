import { defaultImg } from "../utilities/defaultImg";

export default function PostCards (props) {

    const image = props.data.img || defaultImg(props.data.category)

    return (
        <div className="bg-white p-2 rounded-xl h-full">
            <div className="overflow-hidden rounded-xl">
                <img src={image} /*alt={props.data.img.alt}*/ className="h-60 w-full rounded-xl cursor-pointer transform transition-transform duration-300 hover:scale-105"/>
            </div>
            <h1 className="text-center mt-5 text-[18px] font-lato font-semibold capitalize cursor-pointer">{props.data.shortTitle}</h1>
            <div className="mt-3 flex justify-center items-center">
                <div className="w-10 border border-[#be9656b0] mr-3"></div>
                <span className="font-inter text-[#be9656b0] italic">{props.data.date}</span>
                <div className="w-10 border border-[#be9656b0] ml-3"></div>
            </div>

            <div className="mt-3 font-inter text-[16px]">
                <p>{props.data.content}</p>
            </div>

            <button className="mt-3 uppercase text-[#be9656b0] hover:text-black cursor-pointer">read more</button>
        </div>
    )
}