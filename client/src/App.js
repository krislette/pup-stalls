import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";

import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/dashboard/Home";

import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";

import Suppliers from "./components/suppliers/Suppliers";
import AddSupplier from "./components/suppliers/AddSupplier";
import EditSupplier from "./components/suppliers/EditSupplier";

import Menu from "./components/menu/Menu";
import AddMenuItem from "./components/menu/AddMenuItem";
import EditMenuItem from "./components/menu/EditMenuItem";

import SalesAndTransactions from "./components/transaction/SalesAndTransactions";
import AddSalesTransactions from "./components/transaction/AddSalesAndTransactions";
import EditSalesAndTransactions from "./components/transaction/EditSalesAndTransactions";

import Finances from "./components/finance/Finances";
import AddFinance from "./components/finance/AddFinance";
import EditFinance from "./components/finance/EditFinance";

import Employees from "./components/employee/Employees";
import AddEmployee from "./components/employee/AddEmployee";
import EditEmployee from "./components/employee/EditEmployee";

import RentHistory from "./components/rent/RentHistory";

import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Home />}></Route>
            <Route path="/items" element={<Items />}></Route>
            <Route path="/add-item" element={<AddItem />}></Route>
            <Route path="/items/edit/:strItemID" element={<EditItem />}></Route>

            <Route path="/suppliers" element={<Suppliers />}></Route>
            <Route path="/add-supplier" element={<AddSupplier />}></Route>
            <Route path="/suppliers/edit/:strSupplierID" element={<EditSupplier />}></Route>

            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/add-menu-item" element={<AddMenuItem />}></Route>
            <Route path="/menu/edit/:strMenuItemID" element={<EditMenuItem />}></Route>

            <Route path="/sales-and-transactions" element={<SalesAndTransactions />}></Route>
            <Route path="/add-transaction" element={<AddSalesTransactions />}></Route>
            <Route path="/sales-and-transactions/edit/:strTransactionID" element={<EditSalesAndTransactions />}></Route>

            <Route path="/finances" element={<Finances />}></Route>
            <Route path="/add-finance" element={<AddFinance />}></Route>
            <Route path="/finances/edit/:strFinanceID" element={<EditFinance />}></Route>

            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/add-employee" element={<AddEmployee />}></Route>
            <Route path="/employees/edit/:strEmployeeID" element={<EditEmployee />}></Route>

            <Route path="/rents" element={<RentHistory />}></Route>

            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;