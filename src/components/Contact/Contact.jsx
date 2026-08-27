import { Mail, Send } from "lucide-react";
import LinkedinIcon from "../ui/LinkedInIcon";
import GithubIcon from "../ui/GitHubIcon";
import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";
import { sendContact } from "../../services/contactService";
import toast from "react-hot-toast";

export default function Contact() {
  const [social, setSocial] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialForm = {
    name: "",
    email: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    getPortfilio().then((response) => {
      setSocial(response?.data.social);
    });
   
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(form);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await sendContact(form);
      toast.success("Mensagem enviado com sucesso!")
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Não foi possível enviar a sua mensagem, tente novamente mais tarde!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // Contato
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Vamos construir algo juntos.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Envie uma mensagem ou conecte-se pelas redes abaixo.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 card-surface p-6 rounded-xl"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="uppercase font-mono text-muted-foreground text-xs mb-2 tracking-widest"
                >
                  Nome
                </label>
                <input
                  required
                  name={"name"}
                  onChange={handleChange}
                  value={form.name}
                  type="text"
                  placeholder="Seu nome"
                  id="name"
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="uppercase font-mono text-muted-foreground text-xs mb-2 tracking-widest"
                >
                  Email
                </label>
                <input
                  required
                  name={"email"}
                  onChange={handleChange}
                  value={form.type}
                  type="email"
                  placeholder="seuemail@email.com"
                  id="name"
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="message"
                className="uppercase font-mono text-muted-foreground text-xs mb-2 tracking-widest"
              >
                Mensagem
              </label>
              <textarea
                required
                name={"message"}
                onChange={handleChange}
                value={form.message}
                id="message"
                rows="5"
                placeholder="Conte sobre o projeto..."
                className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all glow-cyan"
            >
              <Send className="h-4 w-4" />
              {loading ? "Enviando menssagem..." : "Enviar menssagem"}
            </button>
          </form>
          <div className="md:col-span-2 space-y-3 w-full">
            <a
              href={`mailto:${social.email}`}
              target="_blank"
              className="card-surface group flex items-center justify-between rounded-xl p-3.5 hover:border-primary transition-colors duration-300 tracking-widest"
            >
              <div className="flex items-center gap-3">
                <span className="flex justify-center items-center w-9 h-9 bg-secondary rounded-md text-primary p-2">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase text-muted-foreground">
                    Email
                  </p>
                  <p className="text-foreground text-sm">
                    {social.email}
                  </p>
                </div>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </a>

            <a
              href={`${social?.githubUrl}`}
              target="_blank"
              className="card-surface group flex items-center justify-between rounded-xl p-3.5 hover:border-primary transition-colors duration-300 tracking-widest"
            >
              <div className="flex items-center gap-3">
                <span className="flex justify-center items-center w-9 h-9 bg-secondary rounded-md text-primary p-2">
                  <GithubIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase text-muted-foreground">
                    Github
                  </p>
                  <p className="text-foreground text-sm">
                    &#64;devdionathanpassos
                  </p>
                </div>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </a>

            <a
              href={`${social?.linkedinUrl}`}
              target="_blank"
              className="card-surface group flex items-center justify-between rounded-xl p-3.5 hover:border-primary transition-colors duration-300 tracking-widest"
            >
              <div className="flex items-center gap-3">
                <span className="flex justify-center items-center w-9 h-9 bg-secondary rounded-md text-primary p-2">
                  <LinkedinIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase text-muted-foreground">
                    Linkedin
                  </p>
                  <p className="text-foreground text-sm">in/dionathanpassos</p>
                </div>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
