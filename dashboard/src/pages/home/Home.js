import React from 'react';
import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import CardDetails from "../../components/CardDetails";

function Home() {

    const [data, setData] = React.useState("");
    const [numOfUsers, setNumOfUsers] = React.useState(0);
    const [numOfProfiles, setNumOfProfiles] = React.useState(0)
    const [numOfPosts, setNumOfPosts] = React.useState(0)
  
    React.useEffect(() => {
      fetch("/dashboard")
        .then((res) => res.json())
        .then((data) => {
            setData(data.message)
            setNumOfUsers(data.numOfUsers)
            setNumOfProfiles(data.numOfProfiles)
            setNumOfPosts(data.numOfPosts)
          })
    }, [])

  return (
    <HomeStyle>
        {/* <h1>{!data ? "Loading..." : data}</h1>
        <p>{!numOfUsers ? "Number of users: --- " : "Number of users: " + numOfUsers}</p>
        <p>{!numOfProfiles ? "Number of profiles: --- " : "Number of profiles: " + numOfProfiles}</p>
        <p>{!numOfPosts ? "Number of posts: --- " : "Number of posts: " + numOfPosts}</p> */}
        <Sidebar />
        <div className="homeContainer">
          <TopBar />
          <div className="cardsDetails">
            <CardDetails />
            <CardDetails />
            <CardDetails />
            <CardDetails />
          </div>
        </div>
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  display:flex;
  box-shadow:-15px 20px 20px rgb(0 0 0 / 12%);
  border-radius:15px;
  .homeContainer{
    flex:6 ;
    background-color: #f8f0e8a6;
    border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  }
`

export default Home;