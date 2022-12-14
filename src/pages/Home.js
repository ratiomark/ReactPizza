import { useState, useEffect } from "react"

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import pizzas from '../data/pizzaJSON.json'
import "../App.css"

export const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [category, setCategory] = useState(0)
  const [sortObject, setSortObject] = useState({
    sort: "rating",
    name: "популярности",
    direction: undefined
  })
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setIsLoading(true)
    const request = createRequest()
    // let request = category === 0
    //   ? "https://6396eaa077359127a0266260.mockapi.io/pizzaItems"
    //   : `https://6396eaa077359127a0266260.mockapi.io/pizzaItems?category=${category}`
    fetch(request)
      .then(res => res.json())
      .then(json => {
        // setTimeout(() => {
        setPizzaItems(json)
        setIsLoading(false)
        // }, 400);
      })
    window.scrollTo(0, 0)
  }, [category, sortObject])

  const createRequest = () => {
    let request = `https://6396eaa077359127a0266260.mockapi.io/pizzaItems?sortBy=${sortObject.sort}`
    request = request + `${sortObject.direction ? "&order=" + sortObject.direction : ''}`
    request = category === 0
      ? request
      : request + `&category=${category}`

    return request
    //   ? "https://6396eaa077359127a0266260.mockapi.io/pizzaItems"
    //   : `https://6396eaa077359127a0266260.mockapi.io/pizzaItems?category=${category}`
    // let request = category === 0
    //   ? "https://6396eaa077359127a0266260.mockapi.io/pizzaItems"
    //   : `https://6396eaa077359127a0266260.mockapi.io/pizzaItems?category=${category}`
  }

  return (
    <>
      <div className="content__top">
        <Categories category={category} onCategoryChange={(id) => { setCategory(id) }} />
        <Sort
          sortObject={sortObject}
          onSortChange={(obj) => {
            setSortObject(obj)
          }}
        // activeSortIndex={activeSortIndex}
        // onSortChange={(index) => {
        //   setActiveSortIndex(index)
        // }}
        // activeSortIndex={activeSortIndex}
        // setActiveSortIndex={(index)=>setActiveSortIndex(index)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(pizzaItems.length)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((obj) => (<PizzaBlock key={obj.id} {...obj} />
          ))
        }
      </div>
    </ >
  )
}
