import Home from "./components/Home"
import {BrowserRouter as Router,Routes, Route } from "react-router-dom"
import Details from "./components/Details"
import Booking from "./components/Booking"
import Invoice from "./components/Invoice"
import AdminHome from "./components/AdminHome"
import AdminDetails from "./components/AdminDetails"
import AdminNewPackage from "./components/AdminNewPackage"
function App() {
return(
<Router>
<Routes>
  <Route path="/admin" element={<AdminHome></AdminHome>} ></Route>
  <Route path="/adminnewpackage" element={<AdminNewPackage></AdminNewPackage>} ></Route>
  <Route path="/adminDetail/:id" element={<AdminDetails></AdminDetails>}></Route>
  <Route path="/home" element={<Home></Home>} ></Route>
  <Route path='/details/:id' element={<Details></Details>} ></Route>
  <Route path='/package/:id/booking' element={<Booking></Booking>}></Route>
  <Route path="/invoice" element={<Invoice></Invoice>} ></Route>
  <Route path="*" element={<Home />} />
</Routes>
</Router>)
}

export default App
