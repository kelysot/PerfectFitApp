import React from 'react';
import styled from "styled-components";

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
    <div>
        <h1>{!data ? "Loading..." : data}</h1>
        <p>{!numOfUsers ? "Number of users: --- " : "Number of users: " + numOfUsers}</p>
        <p>{!numOfProfiles ? "Number of profiles: --- " : "Number of profiles: " + numOfProfiles}</p>
        <p>{!numOfPosts ? "Number of posts: --- " : "Number of posts: " + numOfPosts}</p>
    </div>
  )
}

export default Home;