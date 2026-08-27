import { useEffect, useState } from "react";
import CardSection from "../../components/CardSection/CardSection";
import Input from "../../components/ui/Input/Input";
import { ArrowRight, KeyRound } from "lucide-react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Auth() {
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState("LOGIN");

  const isLogin = trigger == "LOGIN";

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/admin", { replace: true }); // 'replace: true' impede o usuário de voltar ao login pelo botão do navegador
    }

    const message = sessionStorage.getItem("auth-message");

    if (message) {
      toast.error(message);
      sessionStorage.removeItem("auth-message");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      console.log(data);

      localStorage.setItem("accessToken", data.accessToken);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative h-screen bg-background text-foreground flex items-center justify-center">
      <div
        className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/4 to-transparent pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="w-full max-w-md">
        <CardSection>
          <div className="flex">
            <div className="ml-auto border border-border rounded-md bg-background/60 p-0.5 text-xs font-mono">
              <button
                onClick={() => setTrigger("LOGIN")}
                className={`px-3 py-1.5 transition-colors rounded hover:text-foreground ${trigger == "LOGIN" ? "bg-surface-elevated text-foreground" : "text-muted-foreground"}`}
              >
                login
              </button>
              <button
                onClick={() => setTrigger("REGISTER")}
                className={`px-3 py-1.5 transition-colors rounded hover:text-foreground ${trigger == "REGISTER" ? "bg-surface-elevated text-foreground" : "text-muted-foreground"}`}
              >
                register
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mt-6 mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Entrar no painel
              </h2>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl">
                Autentique-se com suas credenciais para editar o portfolio.
              </p>
            </div>
            <div className="grid md:grid-cols-1 gap-4">
              <Input
                onChange={handleChange}
                value={form.email}
                type={"email"}
                name={"email"}
                label={"Email"}
              />
              <Input
                onChange={handleChange}
                value={form.password}
                type={"password"}
                name={"password"}
                label={"Senha"}
              />

              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-border bg-background accent-primary"
                  ></input>
                  Manter conectado
                </label>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                >
                  esqueci.senha()
                </button>
              </div>

              <button
                type="submit"
                className="group flex justify-center items-center gap-2 rounded-md bg-primary px-5 
                py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all glow-cyan mt-4
                disabled:opacity-70
                disabled:cursor-not-allowed"
              >
                <KeyRound className="w-4" />
                Entrar
                <ArrowRight className="w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Não tem acesso?
            <button className="text-primary hover:underline ml-1">
              Criar conta
            </button>
          </p>
        </CardSection>
      </div>
    </div>
  );
}
