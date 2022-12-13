import { useState, useEffect } from "react"

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import pizzas from '../data/pizzaJSON.json'
import "../App.css"

export const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://6396eaa077359127a0266260.mockapi.io/pizzaItems')
      .then(res => res.json())
      .then(json => {
        setTimeout(() => {
          setPizzaItems(json)
          setIsLoading(false)
        }, 400);
      })
    window.scrollTo(0,0)
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((obj) => (<PizzaBlock key={obj.id} {...obj} />
          ))
        }
      </div>
    </ >
  )
}
