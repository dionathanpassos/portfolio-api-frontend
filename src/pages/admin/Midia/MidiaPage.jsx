import { useEffect, useState } from "react";
import CardSection from "../../../components/CardSection/CardSection";
import TitleSection from "../../../components/TitleSection/TitleSection";
import Input from "../../../components/ui/Input/Input";
import { createSocial, getSocial, updateSocial } from "../../../services/socialService";
import { PencilIcon, SaveCheck, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MidiaPage() {
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({});
  const [social, setSocial] = useState({});

  useEffect(() => {
    async function loadSocial() {
      const response = await getSocial();
      setSocial(response);
      setForm({
        githubUrl: response?.githubUrl ?? "",
        linkedinUrl: response?.linkedinUrl ?? "",
        email: response?.email ?? "",
        website: response?.website ?? "",
      });
    }
    loadSocial();
  }, []);
console.log(social)
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(social?.id) {
        const updatedSocial = await updateSocial(form, social.id);
        setSocial(updatedSocial ?? {...social, ...form});
        toast.success("Alterações salvas com sucesso!");
      } else {
        const createdSocial = await createSocial(form);
        setSocial(createdSocial);
        toast.success("Alterações salvas com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error( "error.response?.data?.message");
    }
    setDisabled(true);
  };

  const handleCancel = () => {
    setForm({
      githubUrl: social?.githubUrl ?? "",
      linkedinUrl: social?.linkedinUrl ?? "",
      email: social?.email ?? "",
      website: social?.website ?? "",
    });

    setDisabled(true);
  };
  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Contato"}
        subtitle={"Edite canais de contato e a mensagem exibida no rodapé."}
        section={"/contato"}
      />
      <CardSection title={"Canais"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              disabled={disabled}
              onChange={handleChange}
              value={form.email}
              type={"email"}
              name={"email"}
              label={"Email"}
            />
            <Input
              disabled={disabled}
              onChange={handleChange}
              value={form.website}
              type={"url"}
              name={"website"}
              label={"WebSite"}
            />
            <Input
              disabled={disabled}
              onChange={handleChange}
              value={form.githubUrl}
              type={"url"}
              name={"githubUrl"}
              label={"GitHub"}
            />
            <Input
              disabled={disabled}
              onChange={handleChange}
              value={form.linkedinUrl}
              type={"url"}
              name={"linkedinUrl"}
              label={"LinkedIn"}
            />
          </div>

          <div className="flex justify-end gap-4">
            {disabled ? (
              <button
                type="button"
                onClick={() => setDisabled(false)}
                className="w-fit inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:border-primary hover:opacity-90 transition-all"
              >
                <PencilIcon className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="w-fit inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:border-primary hover:opacity-90 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Cancelar
              </button>
            )}
            <button
              disabled={disabled}
              type="submit"
              className="w-fit  inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground
               hover:opacity-90 transition-all glow-cyan
               disabled:opacity-70
               disabled:cursor-not-allowed"
            >
              <SaveCheck className="w-4 h-4" />
              Salvar
            </button>
          </div>
        </form>
      </CardSection>
    </div>
  );
}
