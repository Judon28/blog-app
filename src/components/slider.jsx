import { defaultImg } from "../utilities/defaultImg";



export default function Slider (props) {

    const tags = props.data.tags ? props.data.tags.map((tag, index) => {
        return (
            <button
                key={index}
                className="font-semibold bg-white p-2 rounded-lg h-7 inline-flex whitespace-nowrap items-center"
            >
                {tag}
            </button>
        )
    }) : null;


    const image = props.data.img || defaultImg(props.data.category)
    

    return (
        <div className="bg-white p-2 snap-center rounded-xl">
            <div 
                className={`relative bg-cover bg-center h-110 lg:h-120 mx-auto flex items-end px-5 lg:px-20 py-10 rounded-xl overflow-hidden`}
                style={{ backgroundImage: `url(${image})` }}
                >

                <div className="absolute inset-0 bg-black/50"></div>
                <div className="z-10">
                    <div className="lg:w-[25%] flex gap-5">
                        {tags}
                        
                    </div>  

                    <div className="mt-5">
                        <h1 className="font-inter font-semibold text-[21px] md:text-[42px]  text-white">{props.data.shortTitle}</h1>    
                    </div> 

                    <div className="flex gap-3 items-center text-white  mt-3">
                        <p className="hidden md:block capitalize">{props.data.author}</p>
                        <div className="hidden md:block h-1 w-1 border-4 rounded-full"></div>
                        <div className="capitalize">{props.data.date}</div>
                    </div>   
                </div>
            </div>
        </div>
    )
}