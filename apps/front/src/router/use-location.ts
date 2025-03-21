import * as React from "react";

const getQuerySegment = () => {
  const pathSegments = window.location.pathname.split("/");
  const userId = pathSegments[1] ? parseInt(pathSegments[1], 10) : 12;
  return { userId };
};

const useLocation = () => {
  const [state, setState] = React.useState({
    currentPath: window.location.pathname,
    params: getQuerySegment(),
  });

  React.useEffect(() => {
    // Set current path on location changes
    const onLocationChange = () => {
      // console.log('onLocationChange::', window.location.pathname)
      setState({
        currentPath: window.location.pathname,
        params: getQuerySegment(),
      });
    };
    // Add listener to window
    window.addEventListener("navigate", onLocationChange);
    return () => {
      window.removeEventListener("navigate", onLocationChange);
    }; // Lancer la fonction au démontage du composant
  }, []); // Tableau de dépendances vide pour n’exécuter l’effet qu'une fois après le rendu du composant

  return state;
};

export default useLocation;
