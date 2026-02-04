import DataProvider from './context/DataProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
//components
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import ProtectedRoute from './routes/ProtectedRoute';
import CreatePost from './components/create/CreatePost';
import Detail from './components/details/Detail';
import Edit from './components/updateandDelete/Edit';
import Delete from './components/updateandDelete/Delete';


//If a component should appear only when the user is authenticated, it belongs inside the ProtectedRoute layout, not directly in App.js. <Header /> is in ProtectedRoute.jsx
function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{marginTop: 64 }}>
          <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path='/login'element={<Login />} />

                <Route element={<ProtectedRoute />} >
                  <Route path='/'element={<Home />} />
                </Route>

                <Route element={<ProtectedRoute />} >
                  <Route path='/create'element={<CreatePost />} />
                  <Route path='/details/:id'element={<Detail />} /> 
            {/* :id is dynamic not fixed means anything that comes after detail is a variable. Eg: /details/123 or /details/hello
              The Detail component can access this variable using useParams hook from react-router-dom.
              we need to Link Posts to Detail page when we click on a post. So in Posts.jsx we will wrap Post component inside a Link that points to /details/:id */}
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/delete/:id" element={<Delete />} />
                  </Route>
            </Routes>
          </DataProvider>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* 

✅ Render order is:
1️⃣ BrowserRouter renders
Sets up routing context
Listens to URL changes

2️⃣ AuthProvider renders
Initializes user = null
Initializes loading = true
Registers useEffect (but doesn’t run it yet)

3️⃣ DataProvider renders
Initializes global account state

4️⃣ Header renders
Always renders (not protected yet will do )

5️⃣ Routes renders
React Router checks current URL

Matches a route
6️⃣ Matched route component renders
/login → Login
/home → ProtectedRoute

Important timing detail (this is gold)
useEffect does NOT run during render
Render happens first.
Then React says: “Okay UI is painted. Now run side effects.”

So after the first render:
7️⃣ AuthProvider.useEffect() runs
→ /me request is sent

🔄 Then state changes cause re-render
When /me responds:
setUser(...)
setLoading(false)

8️⃣ AuthProvider re-renders
9️⃣ ProtectedRoute re-renders
10️⃣ Decision is made:

Redirect to /login
OR render <Outlet /> → <Home />


On app load, AuthProvider checks authentication by calling a protected /me endpoint using cookies. 
While this check is in progress, ProtectedRoute pauses rendering. Once authentication is resolved, 
ProtectedRoute either redirects unauthenticated users to /login or renders the protected component 
through <Outlet />
*/
