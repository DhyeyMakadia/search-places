import React, { FC, useEffect, useRef, useState } from "react";

type Props = {
  setText: (text: string) => void;
  setIsLoading: (value: boolean) => void;
};

const SearchBox: FC<Props> = ({ setText, setIsLoading }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const disabled = false;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disabled && event.ctrlKey && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setText(event.target.value);
  };
  return (
    <>
      <div className="search-box-container">
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search places..."
          disabled={disabled}
        />
        <span className="search-shortcut">Ctrl + /</span>
      </div>
    </>
  );
};

export default SearchBox;
