
// Fichero src/components/App.jsx

import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList"
import Carousel from './Carousel';
import NavBar from './NavBar';
import CategoryIcons from './CategoryIcons';
import Footer from './Footer';
import Whatsapp from './Whatsapp';
import Sales from './Sales';
import '../scss/App.scss';
import Reviews from './Reviews';



const App = () => {
  

  return (
    <div>
   <NavBar/>
   <Carousel/>
   <CategoryIcons/>
   <Sales/>
      <Routes>
        <Route path ="/" element={<ProductList/>}/>
      </Routes>
      <Reviews/>
      <Whatsapp/>
<Footer/>
      
    </div>
  );
};

export default App;






















// // Fichero src/components/App.jsx
// import { useEffect, useState } from "react";
// import callToApi from "../services/api"; // Importamos el servicio que acabamos de crear

// const App = () => {
//   // Estados

//   const [starWarsData, setStarWarsData] = useState({});

//   // Llamar a la api con useEffect

//   useEffect(() => {
//     // Dentro de useEffect llamamos a la API
//     callToApi().then((response) => {
//       // Cuando la API responde guardamos los datos en el estado para que se vuelva a renderizar el componente
//       setStarWarsData(response);
//     });
//     // Aquí ponemos un array vacío porque solo queremos que se llame a la API la primera vez
//   }, []);

//   return (
//     <div>
//       <h1>Llamar a la API de Star Wars</h1>
//       <h2>Características de {starWarsData.name}</h2>

//       <ul>
//         <li>Año de nacimiento: {starWarsData.birthYear}</li>
//         <li>Estatura: {starWarsData.height} cm</li>
//         <li>Peso: {starWarsData.mass} Kg</li>
//         <li>Color de ojos: {starWarsData.eyeColor}</li>
//       </ul>
//     </div>
//   );
// };

// export default App;