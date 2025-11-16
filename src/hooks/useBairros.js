// frontend/src/hooks/useBairros.js
import { useEffect, useState } from "react";
export function useBairros() {
 const [bairros, setBairros] = useState([]);
 useEffect(() => {
 fetch("https://foco-no-fogo-backend.onrender.com/api/bairros")
 .then((res) => res.json())
 .then((data) => setBairros(data))
 .catch((err) => console.error("Erro ao carregar bairros:", err));
 }, []);
 return bairros;
}
