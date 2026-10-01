import { useEffect } from 'react'
import "../../../css/home.css"
import ActiveUsers from './ActiveUsers'
import Advertisement from './Advertisement'
import Events from './Events'
import NewCollection from './NewCollection'
import PopularWatches from './PopularWatches'
import Statistics from './Statistics'


import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ProductCollection } from '../../../lib/enums/product.enum'
import { Member } from '../../../lib/types/member'
import { Product } from '../../../lib/types/product'
import MemberService from '../../services/MemberService'
import ProductService from '../../services/ProductService'
import { setNewProducts, setPopularProducts, setTopUsers } from './slice'
/** Redux Slice & Selector **/
const actionDispatch = (dispatch: Dispatch)=>({
  setPopularProducts:(data:Product[])=>dispatch(setPopularProducts(data)),
  setNewProducts:(data:Product[])=> dispatch(setNewProducts(data)),
  setTopUsers:(data: Member[]) => dispatch(setTopUsers(data))
});



export  default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(useDispatch());



    useEffect(() => {
      //Backend server data fetch => Data
      const product= new ProductService();
      product.getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.WATCHES,
      }).then((data)=>{
        console.log("Data passed here:", data);
        setPopularProducts(data);
      }).catch((err) => console.log(err));
        console.log("Error fetching popular products:");
      product.getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.WATCHES,
      }).then((data)=>{
        console.log("Data passed here:", data);
        setNewProducts(data);
      }).catch((err) => console.log(err));

      const member = new MemberService();
      member.getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));


    },[]);


  return <div className={'homepage'}>
    <Statistics />
    <PopularWatches />
    <NewCollection />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>;
}