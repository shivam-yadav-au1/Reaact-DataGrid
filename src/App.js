import React from 'react';
import './App.css'
import AppService from './services/AppService';
import USERSDATA from './data/data.json'
import Pagination from './Pagination'

class App extends React.Component{

  constructor(props){
    super(props);
    this.appService = new AppService();
    this.state={
      users:[],
      currentUsers:[],
      currentPage: null,
      totalPages: null
    }
  }



  componentDidMount=async()=>{
    let data = USERSDATA;
    this.setState({users:data});

  }

  renderData =()=>{
    return this.state.users.map((item,index)=>{
      return (
        <tr key={item.email}>
          <th scope="row">{index+1}</th>
          <td>{item.name}</td>
          <td>{item.username}</td>
         <td>{item.email}</td>
      </tr>
      )
    })
  }

  onPageChanged =(data)=>{
   
    const { users } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  }


  render(){

    const {
      users,
      currentUsers,
      currentPage,
      totalPages
    } = this.state;
    const totalUsers = users.length;

    if (totalUsers === 0) return null;
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    
    return (
      <div>

      
      <div className="center">
       
      <div className="table-responsive-sm">
        <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">UserName</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentUsers.map((item,index)=>{
                        return(
                          <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
          </table>
          </div>
      
         
          </div>
     
      <div className="pagination-container">
            <div className="paginationHeading">
              <h2>
                <strong className="text-secondary">{totalUsers}</strong>{" "}
                Users
               
              </h2>
              {currentPage && (
             
                <span style={{marginLeft:'10px'}}>
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row  align-items-center">
              <Pagination 
                totalRecords={totalUsers}
                pageLimit={10}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
      </div>
                    
          
      </div>
      
      
    );

  }
  
}

export default App;
