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


function App({ signOut }) {
  const [filename, setFilename] = useState("")
  const [access_token, setToken] = useState("")
  const [username, setUsername] = useState("")

  const getFilename = (val) => {
    setFilename(val)
  }

  useEffect(() => {
    const user = Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.accessToken
    console.log(user.username)
    console.log(token)
    //setToken(token)
    //setUsername(user.username)
  })

  useEffect(() => {
    const token_value = {
      'access_token': access_token
    }
    const loadfile = async () => {
      try {
        const res = await fetch("https://pimvhp4mb5.execute-api.eu-north-1.amazonaws.com/dev/savedfiles",
          {
            method: 'post',
            body: JSON.stringify(token_value)
          })
        if (res.ok) {
          console.log(res)
        } else {
          console.log("files file to load")
        }
      } catch (err) {
        console.log(err)
      }
    }
    loadfile();

  }, [])

  return (
    <>
      <div>welcome to your dashboard {username}</div>
      <div>
        <p>{filename}</p>
      </div>
      <Form filename={getFilename} />
      <Files />
      <p>
        <button onClick={signOut}>Logout</button>
      </p>
    </>

  );
}

export default withAuthenticator(App);
