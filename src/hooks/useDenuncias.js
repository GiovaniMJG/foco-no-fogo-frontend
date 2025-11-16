// frontend/src/hooks/useDenuncias.js
import { useEffect, useState } from "react";

export function useDenuncias() {
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    fetch("https://foco-no-fogo-backend.onrender.com/api/denuncias")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDenuncias(data);
        } else {
          console.error("Resposta inesperada da API /api/denuncias:", data);
          setDenuncias([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar denúncias:", err);
        setDenuncias([]);
      });
  }, []);

  return denuncias;
}
