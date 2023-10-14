import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router-dom";

import './styles/style.scss'

import Header from './layouts/header/Header';
import Footer from './layouts/footer/Footer';

import HomePage from './pages/home/HomePage';
import CountryDetailPage from './pages/country-detail/CountryDetailPage';

import {SkeletonTheme} from 'react-loading-skeleton';

export default function App() {
  return(
    <SkeletonTheme baseColor='var(--clr-skeleton-base)' highlightColor='var(--clr-skeleton-highlight)'>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage/>} />
        <Route path="/:cca3" element={<CountryDetailPage/>} /> 
      </Routes>
      <Footer />
    </SkeletonTheme>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
