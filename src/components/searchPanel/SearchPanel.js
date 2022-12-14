import React from 'react'
import style from './searchPanel.module.scss'
const SearchPanel = () => {
  return (
    <div>
      <input type="text"
        placeholder='Срочно ищи пиццу, чтобы делать ням-ням)'
        className={style.root}
      />
    </div>
  )
}

export default SearchPanel