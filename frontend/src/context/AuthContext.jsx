import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from '../../constants/config'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        //console.log(" Checking authentication...");
        
        const res = await axios.get("API_BASE_URL/me", {
          withCredentials: true,
        });
        
        console.log(" Auth response:", res.data);

        console.log(" Full response structure:", res);
        console.log(" res.data:", res.data);
        console.log(" res.data.data:", res.data.data);
        console.log(" res.data.data.user:", res.data.data?.user);
                
        // Your ApiResponse wraps data in "data" property
        // So it's res.data.data.user, not res.data.user
        const userData=res.data.data?.user || null; //if we write is as res.data.user.. when we refresh the page we go back to login page despite user being not logged out and access and refreshtoken stays in application.. so we use res.data.data?user so for now when we refresh the home page it stays on the same page cuz user is logged in..
                console.log("Auth userData:", userData);

        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
/* 

gpt explaination

You have:
A browser (frontend)
A server (backend)
They talk using HTTP requests

Important rule of the universe 🌌:
Whenever the browser makes a request, it automatically attaches cookies for that domain.
You do NOT manually send cookies.
The browser does it for you. Like magic mail pigeons 


STEP 1: Where cookies are born
When you log in:

res
  .cookie("accessToken", token)
  .cookie("refreshToken", token)
  .json({ user });

What happens?
Browser hears: “Hey browser, store this cookie for localhost”
Browser: “Got it. I’ll keep it safe.”
That’s it. Cookie is now inside the browser’s cookie jar 🍯


STEP 2: How cookies travel BACK to backend

Now later, frontend does:
axios.get("/me", { withCredentials: true });

Browser thinks: “Oh this request is going to the same server. I should attach cookies automatically.”

So the request becomes:
GET /me
Headers:
  Cookie: accessToken=xyz; refreshToken=abc

⚠️ You didn’t write this.
⚠️ Axios didn’t write this.
⚠️ Express didn’t write this.
🟢 The browser did.
This is the most important click moment 


STEP 3: How backend gets cookies

Inside Express:
app.use(cookieParser());
This is a translator 
It takes: Cookie: accessToken=xyz

And turns it into:
req.cookies = {
  accessToken: "xyz",
  refreshToken: "abc"
}

So now:
req.cookies exists
Tokens are readable


STEP 4: Auth middleware (the security guard)

Your JWT middleware runs BEFORE /me.
It does: const token = req.cookies.accessToken;

So now the guard says: “Let me check this passport”

If token is valid:
req.user = decodedUser;
next();


Important:
req.user did not exist before
Middleware creates it
If token is invalid:
throw error;
🚫 No user allowed.


STEP 5: getMe controller 

Your controller:
res.json({ user: req.user });

It does NOT:
read cookies
verify JWT
authenticate

It simply says: “Security already checked this person. Here, frontend, take the user.”

FRONTEND SIDE 
Frontend calls  /me
const res = await axios.get("/me");
setUser(res.data.data?.user);

So now React thinks: “Okay, user exists. Logged in.”

If backend rejected:
setUser(null);

ProtectedRoute (the door bouncer)
ProtectedRoute asks only ONE question:

is user null or not?
If null → ❌ go to login
If exists → ✅ allowed
That’s all it does. No cookies. No JWT. No backend.


WHAT IS <Outlet /> (baby explanation)

Imagine this:
ProtectedRoute is a door 🚪
Pages like /home are rooms 🏠

<Route element={<ProtectedRoute />}>
  <Route path="/home" element={<Home />} />
</Route>

Meaning: “To enter Home, you must pass through this door first.”

<Outlet /> means:“Okay door opened.Now show the room inside.”

Without <Outlet />: Door opens But nothing appears inside 


FULL STORY IN ONE FLOW (tiny steps)
Login
 ↓
Backend sets cookies
 ↓
Browser stores cookies
 ↓
Frontend reloads
 ↓
Frontend calls /me
 ↓
Browser attaches cookies
 ↓
cookieParser fills req.cookies
 ↓
JWT middleware verifies token
 ↓
req.user is created
 ↓
getMe sends req.user
 ↓
AuthContext sets user
 ↓
ProtectedRoute checks user
 ↓
Outlet renders page


KEY TRUTHS (lock these in)
Cookies are attached automatically
Middleware runs before controllers
req.user is created by middleware
/me does NOT authenticate, it reports
ProtectedRoute only checks React state
<Outlet /> means “render child route here”


On app load, AuthProvider checks authentication by calling a protected /me endpoint using cookies. 
While this check is in progress, ProtectedRoute pauses rendering. Once authentication is resolved, 
ProtectedRoute either redirects unauthenticated users to /login or renders the protected component 
through <Outlet />
*/