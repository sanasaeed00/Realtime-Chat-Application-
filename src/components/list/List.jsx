import React from 'react'
import "./list.css"
import Userinfo from './userInfo/Userinfo'
import Chatlist from './chatList/Chatlist'
export default function List() {
  return (
    <div className='list'>
    <Userinfo/>
    <Chatlist/>
    </div>
  )
}
