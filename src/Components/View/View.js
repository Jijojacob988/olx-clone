import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
function View() {

  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const{userId}=postDetails
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      res.forEach(doc => {
        setUserDetails(doc.data())
        
      });
    })

  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
