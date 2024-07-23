import { useState, KeyboardEvent } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface IProps{
    keywords: string[],
    setKeywords: React.Dispatch<React.SetStateAction<string[]>>
}

export default function EditActivityKeywords({keywords, setKeywords}: IProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        if (keywords.length < 5) {
          setKeywords([...keywords, newKeyword]);
        }
      }
      setInputValue("");
    }
  };

  const handleRemoveKeyword = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col mt-3 mb-3">
      <Label htmlFor="keyword">Keywords:</Label>
      <Input
        type="text"
        id="keyword"
        className="my-1"
        maxLength={10}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a keyword and press Enter, (,) or Space"
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="pl-2 py-1 bg-purple rounded-full text-sm flex items-center font-medium"
          >
            {"#"}
            {keyword}
            <Button
              variant={"transparent"}
              size={"iconSm"}
              className="text-xs"
              onClick={(e) => handleRemoveKeyword(e, index)}
            >
              <IoClose />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
}
