import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "../../assets/styles/Pagination.css"

const Paginator = ({ setPage, page, pagedata }) => {

  const [number, setNumber] = useState([1,2,3,4,5,6,7,8,9,10]);
  const handleNumbers = (value) => {
    let pageNumbers = [];
    let listapage=Math.floor((pagedata.current_page-1)/10);
    let limitrest=pagedata.cantpages-(Math.floor((pagedata.cantpages-1)/10)*10);
    if (listapage===Math.floor((pagedata.cantpages-1)/10)){
      for (let i=1; i<=limitrest; i++){
        pageNumbers.push(i+(listapage*10));
      }
    }else{
      for (let i=1; i<=10; i++){
        pageNumbers.push(i+(listapage*10));
      }
    }
    return pageNumbers;
  }

  useEffect(() => {
      setNumber(handleNumbers(pagedata.current_page));
  }, [pagedata.current_page]);

  const handleNext = () => {
    if (page === pagedata.cantpages) {
      setPage(page);
    } else {
      setPage(page + 1);
    };
  }

  const handleBack = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    };
  }

  const handlePage = (current) => {
    setPage(current);
  }

  const handleFirst = () => {
    setPage(1);
  }

  const handleLast = () => {
    setPage(pagedata.cantpages);
  }
  
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem onClick={() => handleFirst()} >
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem onClick={() => handleBack()} >
          <PaginationLink previous href="#" />
        </PaginationItem>
        {
          number.map((page, index) => {
            return (
              <PaginationItem key={index} className={page===pagedata.current_page ? "active" : null} >
                <PaginationLink href="#" onClick={() => handlePage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })
        }
        <PaginationItem>
          <PaginationLink next href="#" onClick={() => handleNext()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" onClick={() => handleLast()} />
        </PaginationItem>
      </Pagination>
    );
}

export default Paginator;