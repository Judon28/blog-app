import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from "./components/nav"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Footer from "./components/footer"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Post from './pages/post'
import Dhome from './dashboardPages/dhome'
import CreatePost from './dashboardPages/createPost'
//import Tag from './dashboardPages/createTag'
import Profile from './dashboardPages/profile'
import AddUser from './dashboardPages/addUser'
import Signup from './dashboardPages/signup'
import Login from './dashboardPages/login'
import EditPost from './dashboardPages/editPost'
import ProtectedRoute from './components/protectedRoute'
import DashHome from './dashboardPages/dashHome'
import Category from './dashboardPages/createCategory'
import AdminLayout from "./components/adminLayout";
import DesktopOnly from "./components/desktopOnly";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/post/:slug' element={<Post/>} />
          <Route 
            path='editPost/:id' 
            element={ 
              <ProtectedRoute>
                <EditPost/>
              </ProtectedRoute>
              
              } 
          />

          {/* 
          <Route
            path='/dashHome' 
            element={
              <ProtectedRoute>
                <DashHome/>
              </ProtectedRoute>
              
            }
          />
          
          <Route 
            path='/dhome' 
            element={
              <ProtectedRoute>
                <Dhome/>
              </ProtectedRoute>
              
            } 
          />
          <Route 
            path='/createPost' 
            element={
              <ProtectedRoute>
                <CreatePost/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path='/createCategory' 
            element={
              <ProtectedRoute>
                <Category/>
              </ProtectedRoute>
              
            } 
          />
          <Route 
            path='/profile' 
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
              
            } 
          />
          
          <Route path='/addUser' element={<ProtectedRoute><AddUser/></ProtectedRoute>} />

          */}

          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          
          {/*<Route path='/' element={<Home/>} />*/}


          {/* DASHBOARD ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DesktopOnly>
                  <AdminLayout />
                </DesktopOnly>
              </ProtectedRoute>
            }
          >
            <Route path="dashHome" element={<DashHome />} />
            <Route path="dhome" element={<Dhome />} />
            <Route path="createPost" element={<CreatePost />} />
            <Route path="createCategory" element={<Category />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addUser" element={<AddUser />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
