import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/filterSlice';
const Categories = () => {
  const category = useSelector(state => state.filterSortSlice.category)
  const dispatch = useDispatch()
  
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
  const n = categories.map((item, index) => {
    return (
      <li
        onClick={() => dispatch(setCategory({ category: index }))}
        key={index}
        className={category === index ? 'active' : null}
      >
        {item}
      </li>)
  })

  return (
    <div className="categories">
      <ul>
        {n}
      </ul>
    </div>
  )
}
export default Categories;
// <div class="categories">
//   <ul>
//     <li class="active">Все</li>
//     <li>Мясные</li>
//     <li>Вегетарианская</li>
//     <li>Гриль</li>
//     <li>Острые</li>
//     <li>Закрытые</li>
//   </ul>
// </div>
// const [activeIndex, setActiveIndex] = useState(0)
// const onClickCategory = (index) => {
//   setActiveIndex(index)
// }
// const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
// const n = categories.map((item, index) => {
//   return (
//     <li
//       onClick={() => onClickCategory(index)}
//       className={activeIndex === index ? 'active' : null}
//     >
//       {item}
//     </li>)
// })
// console.log(n)
