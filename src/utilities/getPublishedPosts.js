
export function getPublishedPosts(item) {
    /*function published (post) {
        return post.status === "Published"
    }
    item.filter(published)*/
    return item.filter(post => post.status === "published");

}



























/*import { useState } from "react";


export default function DraftPosts () {
    const [postStatus, setPostSatus] = useState("");
    const [input, setInput] = useState("");

    function setStatus (value) {
        if (value === "published") {
            setPostSatus("published")
        }else if (value === "draft") {
            setPostSatus("draft")
        } else {
            return
        } 
    }

    setStatus(input)

    function sortDrafts (post) {
        if (postStatus === "draft") {
            post.filter((item) => {
                return item.value === "published"
            })
        }
    }

    function getStatus (inputValue) {
        setInput(inputValue.value)
    }
    
    function statusField () {
        return (
            <select id="status" name="status" className="p-5 border border-gray-300 rounded-xl focus:outline-white focus:ring-0 focus:border-none ">     
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
            </select>
        )
    }

    
}*/


