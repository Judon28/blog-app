import { useState } from "react";

export default function TagInput({ tags, setTags }) {

  //const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  function addTag(value) {

    const tag = value.trim();
    const maxLength = 3

    if (!tag) return;

    if (tags.includes(tag)) return;

    if (tags.length > maxLength) return;

    setTags([...tags, tag]);

    

    

  }

  function removeTag(indexToRemove) {

    setTags(
      tags.filter((_, index) => index !== indexToRemove)
    );

  }

  function handleKeyDown(e) {

    if (e.key === "Enter" || e.key === ",") {

      e.preventDefault();

      addTag(input);

      setInput("");

    }

  }

  const tagList = tags.map(TagItem);

  function TagItem(tag, index) {

    return (

      <span
        key={index}
        className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
      >

        {tag}

        {RemoveButton(index)}

      </span>

    );

  }

  function RemoveButton(index) {

    return (

      <button
        type="button"
        onClick={() => removeTag(index)}
        className="text-blue-500 hover:text-red-500"
      >
        ×
      </button>

    );

  }

  function TagInputField() {

    return (

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type tag and press enter"
        className="flex-1 outline-none text-[14px]"
        
      />

    );

  }

  return (

    <div className="w-full">

      <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2">

        {tagList}

        {TagInputField()}

      </div>

    </div>

  );

}



















