import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/form';
import Files from './components/files';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator
} from "@aws-amplify/ui-react";

import { Amplify, Auth } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


function App({signOut}) {
  const [filename, setFilename] = useState("")
  const [accesstoken, setAccessToken] = useState("")
  const [username, setUsername] = useState("")
  const [files, setFiles] = useState([])

  const getFilename = (val) => {
    setFilename(val)
  }

  useEffect(() => {
    const getToken = async () => {

      const username = await Auth.currentAuthenticatedUser()
      console.log(username.username)

      if (username) {
        setUsername(username.username)
      }

    }
    getToken()
  }, [username])

  useEffect(() => {
    const getFiles = async () => {

      try {
        const user = await Auth.currentSession()
        const token = user.accessToken.jwtToken
        setAccessToken(token)
        const tokenValue = {
          'access_Token': token
        }
        let res = await fetch("https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/savedfiles",
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(tokenValue)
          })
        if (res.ok) {
          const details = await res.json()
          //console.log(details)
          if (details.body) {
            const result = details.body
            setFiles(result)
          }
        }
        else {
          console.log(res)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getFiles()
  }, [files])


  return (   
    <>
      <div>Welcome to your dashboard {username}</div>
      <div>
        <p>{filename}</p>
      </div>
      <Form filename={getFilename} token={accesstoken} username={username} />
      <Files files={files} username={username} />
      <p>
        <button onClick={signOut}>Logout</button>
      </p>
    </>

  );
}

export default withAuthenticator(App)
