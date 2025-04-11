import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Explore, Notification,Bookmarks, Message, MessageDeatail, TwitterBlue, Profile,
         SingleUserProfile, RepostDeatail, Lists, ListDeatail,ListsSuggested,ManageMember,
         BlockedAccount, ConnectPeople
       } from './pages/Index.js' 
import {TimelineBody, Logout, PostDeatail, ShowCommentReplies} from './components'
import CreateAccount from './pages/CreateAccount.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
  {
    path : '/',
    element : (
            <AuthLayout>
              <App />
            </AuthLayout>
          ),
    children : [
      {
        path : '/',
        element : <TimelineBody />
      },
      {
        path : '/explore',
        element : <Explore />
      },
      {
        path : '/notification',
        element : <Notification />
      },
      {
        path : '/message',
        element : <Message />
      },
      {
        path : '/message/:id',
        element : <MessageDeatail />
      },
      {
        path : '/bookmarks',
        element : <Bookmarks />
      },
      {
        path : '/:slug/lists',
        element : <Lists />
      },
      {
        path : '/list/:id',
        element : <ListDeatail />
      },
      {
        path : '/lists/suggested',
        element : <ListsSuggested />
      },
      {
        path : '/lists/members/:id',
        element : <ManageMember />
      },
      {
        path : '/twitter_blue',
        element : <TwitterBlue />
      },
      {
        path : '/profile',
        element : <Profile />
      },
      {
        path : '/profile/:id',
        element : <SingleUserProfile />
      },
      {
        path : '/postDeatail/:id',
        element : <PostDeatail />
      },
      {
        path : '/repostDeatail/:id',
        element : <RepostDeatail />
      },
      {
        path : '/post/comment/:id',
        element : <ShowCommentReplies /> 
      },
      {
        path : '/blocked/Accounts/all',
        element : <BlockedAccount />
      },
      {
        path : 'connect_people',
        element : <ConnectPeople />
      },
      {
        path : '/logout',
        element : <Logout />
      }
    ]
  },
  {
    path : '/createAccount',
    element : (
              <AuthLayout>
                <CreateAccount authentication={false} />
              </AuthLayout>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="968416091130-nujufkkgmtrhvrsasd2ole066v5bl0ec.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
