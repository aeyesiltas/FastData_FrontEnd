import logo from './logo.svg';
import './App.css';
import LoginComponent from './Components/authentication/login-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupComponent from './Components/authentication/signup-component';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from './Components/main/home-component';
import JobDisplayComponent from './Components/main/jobs/job-display-component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />}>
          </Route>
          <Route path="/*" element={<Navigate to="/login" />}/>
          <Route path="signup" element={<SignupComponent />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path="job-data" element={<JobDisplayComponent />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
