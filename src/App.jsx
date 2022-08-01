
import React, { useEffect, useState } from 'react';
import "./styles/main.scss";
import Banner from "components/Banner";
import Header from "components/Header";
import Form from "components/Form";
import baseApi from './services/baseApi';
import UserList from "components/UserList";


export default function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  // const [loadMore, setLoadMore] = useState(false);

  const getUsers = async (currentPage) => {
    const response = await baseApi.get(`/users?page=${currentPage}&count=6`);
    setUsers((state) => [...state, ...response.data.users]);
    setTotalPages(response.data.total_pages);
    // setLoadMore(currentPage < Math.ceil(response.data.total_pages / 6))
    console.log(response)
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);


  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  

  const addMoreUsers = () => {
    setCurrentPage((state) => state + 1);
  };

  return (
    <div className='page'>
      <Header />
      
      <Banner />
      {users && <UserList
        users={users}
        addMoreUsers={addMoreUsers}
        totalPages={totalPages}
        currentPage={currentPage}
      />}
      <Form getUsers={users}/>
      
    </div>

    
  );
};
