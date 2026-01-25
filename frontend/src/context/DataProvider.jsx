import { Children, createContext, useState } from "react"

export const DataContext = createContext(null);

const DataProvider =({children}) =>{ //children means: whatever is wrapped inside <DataProvider> in App.js


    const [ account , setAccount]  = useState({username: '', name: ''}) //global state. Instead of living inside Login only, it lives in the Provider.


    return(
        <DataContext.Provider value={{
            account,
            setAccount 
            /*Any component inside me (DataContext.Provider) can directly access account and setAccount. DataProvider is your custom React component you wrote. Inside DataProvider, you render <DataContext.Provider> and pass it the value={{ account, setAccount }}.
            DataProvider renders <DataContext.Provider> internally.
            <DataContext.Provider> has the value={{ account, setAccount }}.
            Every component inside <DataContext.Provider> — here Login — can grab account or setAccount using:
            const { account, setAccount } = useContext(DataContext);
            */
        }}> 
        {children}
        </DataContext.Provider>
    )

}

export default DataProvider;

//Prop drilling is passing props through components that don’t need them just to reach a deeply nested component.
//Context API allows us to create global data that can be accessed by any component without prop drilling, by wrapping components inside a Provider and consuming the data using useContext.

/* GPT explaination
First: how React normally sends data (props)

Imagine your app is a family house.
App
 └── Login
      └── Profile
           └── Avatar

You log in, and you get this data from backend:
{
  Username: "kuldeep",
  name: "Kuldeep"
}
Now Avatar needs the user name to show it.

Without Context (prop drilling): You must pass it step by step 
<App>
  <Login user={user} />
</App>

<Login user={user}>
  <Profile user={user} />
</Login>

<Profile user={user}>
  <Avatar user={user} />
</Profile>

Even though:
Login doesn’t need it
Profile doesn’t need it

They are just couriers 📦
This is prop drilling.

Definition (interview-ready): Prop drilling is passing props through components that don’t need them just to reach a deeply nested component.

Pain points: messy code ,hard to maintain, annoying when app grows



Enter Context API :

Context API says:
“Why pass parcels through everyone’s hands?
Let’s keep it in a common locker that anyone can open.”

That locker is Context.

Context code (explained line by line)
1️⃣ Creating the locker
export const DataContext = createContext(null);
This creates a global storage space.
Right now it’s empty.
Think of it as a notice board with nothing pinned.


2️⃣ DataProvider (the person who pins data)
const DataProvider = ({ children }) => {
children means: whatever is wrapped inside <DataProvider>

In your App(rn):
<DataProvider>
  <Login />
</DataProvider>

So children === <Login />


3️⃣ Global state inside Provider
const [account, setAccount] = useState({
  username: '',
  name: ''
});
This is global user state.
Instead of living inside Login only, it lives in the Provider.


4️⃣ Making data available to everyone
<DataContext.Provider value={{ account, setAccount }}>
  {children}
</DataContext.Provider>
This sentence means:“Any component inside me can directly access account and setAccount.”

No props required.

How Login uses Context
const { setAccount } = useContext(DataContext);
Translation: “Hey React, give me whatever DataProvider stored in DataContext.”

Now Login can update global user data.

What happens on LOGIN (very important)
Backend returns:
response.data = {
  Username: "kuldeep",
  name: "Kuldeep"
}

You do:

setAccount({
  Username: response.data.Username,
  name: response.data.name
});
Now: setAccount receives the response and updates the account state inside the Context, making it available to all components that consume it.

DataProvider updates, Context updates, Every component using account re-renders, Even components you haven’t written yet 

Visual flow (burn this into memory)
Without Context
Backend → Login → App → Navbar → Profile → Avatar

With Context
Backend → Context
                ↘ Navbar
                ↘ Profile
                ↘ Avatar

One source. Many consumers.

Why your App.js wrapping matters
<DataProvider>
  <Login />
</DataProvider>

This creates a Context boundary. Anything inside can use: useContext(DataContext). Anything outside cannot.


Why Context is perfect for LOGIN state
Because: 
user data is needed everywhere
it changes occasionally
it should persist while app runs

Perfect use cases:
auth user
theme
language
settings

Why Context is NOT magic
Every time account changes:
all components using it re-render

That’s why:
❌ don’t put everything in one context
✅ split contexts (Auth, Theme, Cart)

*/