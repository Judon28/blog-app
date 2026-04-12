

export default function CategoriesTable (props) {
    return (
        <>
            <tr className="">
                <td className="tborder capitalize w-[80%]" >{props.data.category}</td>
                <td className="tborder">
                    <button onClick={() => props.onDelete(props.data.id)} className="w-10 h-10 flex justify-center items-center cursor-pointer"><i className="fa-solid fa-trash"></i></button>
                </td>
                
            </tr>
        </>
    )
}