import { Link } from "react-router-dom";


export default function PostsTable (props) {
    return( 
        <>
        
            <tr className="">
                <td className="tborder"><input type="checkbox" className="scale-150" 
                    checked={props.selectedPosts.includes(props.postData.id)} 
                    onChange={() => props.onSelect(props.postData.id)} />
                </td>

                <td className="tborder" >{props.postData.tableTitle}</td>
                <td className="tborder">
                    <button className={`status2 ${props.postData.status==="published" ? "bg-green-900" :"bg-blue-900"}`}>{props.postData.status}</button>
                </td>
                <td className="tborder text-center">{props.postData.views || 0}</td>
                <td className="tborder text-center">{props.postData.date}</td>
                <td className="tborder text-center">
                    <Link 
                        key={props.postData.id}
                        to={`/post/${props.postData.slug}`}
                        target="_blank"
                    >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </td>
                <td className="flex gap-5 justify-center border-b border-gray-400 px-3 py-5">
                    <Link 
                        key={props.postData.id}
                        to={`/editPost/${props.postData.id}`}
                    >
                        <button className="bg-blue-900 rounded-xl w-10 h-10 text-white flex justify-center items-center cursor-pointer"><i className="fa-solid fa-pen-to-square"></i></button>
                    </Link>

                    <button onClick={() => props.onDeleteSingle(props.postData.id)} className="bg-red-900 rounded-xl w-10 h-10 text-white flex justify-center items-center cursor-pointer"><i className="fa-solid fa-trash"></i></button>

                </td>
                
            </tr>
        </>   
    )
    
}