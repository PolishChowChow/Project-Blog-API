import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import BlogPage from './pages/BlogPage'
import PostsList from './components/Posts/PostsList'
import LoginForm from './components/Form/LoginForm'
import PostForm from './components/Posts/PostForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import PostDetails from './components/Posts/PostDetails'
import ErrorPage from './pages/ErrorPage'
import RegisterForm from './components/Form/RegisterForm'
import Panel from './components/Panel'
import CommentsForPanel from './components/Comments/CommentsForPanel'
import CommentForm from './components/Form/CommentForm'
import ApiContextProvider from './context/apiContext'
const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PostsList />,
      },
      {
        path: "/posts/:postId",
        element: <PostDetails />
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/create",
        element: <PostForm />
      },
      {
        path: "/register",
        element: <RegisterForm />
      },
      {
        path: "/panel",
        element: <Panel />,
      },
      {
        path: "/panel/:postId",
        element: <PostForm role='edit'/>
      },
      {
        path: "/panel/:postId/comments",
        element: <CommentsForPanel />
      },
      {
        path: "/panel/:postId/comments/:commentId",
        element: <CommentForm />
      }
    ]
  },
])



const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ApiContextProvider>
        <RouterProvider router={router} />
      </ApiContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
