import { useContext, useRef, useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom";
import qs from "qs"
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setStateFromURL } from '../redux/filterSlice';
import Categories from '../components/Categories';
import Sort, { listSortObjects } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";
import { SearchContext } from "../App";
import "../App.css"

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { category, name, sort, direction, page } = useSelector(state => state.filterSortSlice)
  const sortObject = useMemo(() => ({ name, sort, direction }), [name])

  const { searchValue } = useContext(SearchContext)
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isQueryFromURL = useRef('')
  const isMounted = useRef(false)
  const pizzasPerPage = 8;

  useEffect(() => {
    setIsLoading(true)
    const unicURL = window.location.search
    if (unicURL) {
      isQueryFromURL.current = true
      const params = qs.parse(unicURL.substring(1))
      const { name, direction } = listSortObjects.find(obj => obj.sort = params.sort)
      dispatch(setStateFromURL({
        ...params,
        name,
        direction
      }))
      if (unicURL === '?page=1&sort=rating&category=0') {
        setIsLoading(true)
        const request = createRequest()
        sendFetch(request)
      }
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: page,
        sort: sortObject.sort,
        direction: sortObject.direction,
        category,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [category, sortObject, page])

  useEffect(() => {
    if (!isQueryFromURL.current) {
      setIsLoading(true)
      const request = createRequest()
      sendFetch(request)
    }
    isQueryFromURL.current = false
    // isQueryFromURL.current = false
    // window.scrollTo(0, 0)
  }, [category, sortObject, page])


  function createRequest() {
    let request = `https://6396eaa077359127a0266260.mockapi.io/pizzaItems?page=${page}&limit=${pizzasPerPage}`
    request = `${request}&sortBy=${sortObject.sort}`
    request = request + `${sortObject.direction ? "&order=" + sortObject.direction : ''}`
    request = category === 0
      ? request
      : request + `&category=${category}`
    return request
  }

  const sendFetch = async (request) => {
    const res = await axios.get(request)
    setPizzaItems(res.data)
    setIsLoading(false)
  }

  const checkSearch = (titleToCheck, searchValueText) => {
    return titleToCheck.toLowerCase().includes(searchValueText.toLowerCase())
  }

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)
  const pizzaRendered = pizzaItems.map((obj) => {
    if (checkSearch(obj.title, searchValue)) {
      return <PizzaBlock key={obj.id} {...obj} />
    }
  })

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : pizzaRendered
        }
      </div>
      <Pagination
        pizzaItemsCount={pizzaRendered.length}
        pizzasPerPage={pizzasPerPage}
      />
    </ >
  )
}
