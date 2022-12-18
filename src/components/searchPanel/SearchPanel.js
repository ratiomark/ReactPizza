import React, { useRef, useContext, useState, useCallback } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import style from "./searchPanel.module.scss";


const SearchPanel = () => {
  const { setSearchValue } = useContext(SearchContext)
  const [localSearchValue, setLocalSearchValue] = useState('')
  // useEffect(() => {
  // }, [])
  // const inputRef = document.querySelector("input")
  const inputRef = useRef(0)
  const onClickCloseButton = () => {
    setSearchValue('')
    setLocalSearchValue('')
    inputRef.current.focus()
  }
  const updateSearchValue = useCallback(
    debounce((stringValue) => {
      setSearchValue(stringValue)
    }, 200)
    , [])

  const changeSearchValueDebounce = (e) => {
    setLocalSearchValue(e.target.value)
    updateSearchValue(e.target.value)
  }
  return (
    <div className={style.root}>
      <svg height="32px" className={style.searchIcon} id="Layer_1" version="1.1" viewBox="0 0 520 520" width="32px">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      <input
        ref={inputRef}
        value={localSearchValue}
        onChange={
          changeSearchValueDebounce
          // debounce(() => { setSearchValue(e.target.value) }, 2000)
        }
        type="text"
        placeholder="Срочно ищи пиццу, чтобы делать ням-ням 😉"
        className={style.input}

      />
      {localSearchValue &&
        <svg height="48"
          onClick={onClickCloseButton}
          className={style.closeIcon}
          viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      }

    </div>
  );
};

export default SearchPanel;
