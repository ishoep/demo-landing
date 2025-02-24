import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Получаем токен Firebase

      localStorage.setItem("token", token); // Сохраняем токен
      navigate("/admin");
    } catch (error) {
      alert("Ошибка входа: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto pt-20 pb-10 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Вход в админку</h2>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 mb-3" />
      <Button onClick={handleLogin} className="mt-10">Войти</Button>
    </div>
  );
}

export default Login;
