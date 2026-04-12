import { defaultImg } from "../utilities/defaultImg";


export default function HomeGrid (props) {

    const image = props.data.img || defaultImg(props.data.category)


    return (
        <div className="bg-white p-2 rounded-xl">
            <div 
            className="relative overflow-hidden h-55 lg:h-85  bg-cover bg-center flex items-end p-7 font-inter font-semibold text-white text-[14px] lg:text-[18px] rounded-xl transform transition-transform duration-500 hover:scale-103 cursor-pointer"
            style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <h2 className="z-10 ">{props.data.shortTitle}...</h2>
            </div>
        </div>
    )
}