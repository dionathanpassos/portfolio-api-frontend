import { PencilIcon, SaveCheck, Trash2 } from "lucide-react";
import CardSection from "../../../components/CardSection/CardSection";
import TitleSection from "../../../components/TitleSection/TitleSection";
import { useEffect, useState } from "react";
import { createHero, getHero, updateHero } from "../../../services/heroService";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";

export default function HeroPage() {
  const [hero, setHero] = useState({});
  const [form, setForm] = useState({
    name: "",
    position: "",
    eyebrow: "",
    introdution: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    async function loadHero() {
      const response = await getHero();
      console.log(response)
      setHero(response);
      setForm({
        name: response?.name ?? "",
        position: response?.position ?? "",
        eyebrow: response?.eyebrow ?? "",
        introdution: response?.introdution ?? "",
      });
    }
    loadHero();
  }, []);

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
      if (hero?.id) {
        const updatedHero = await updateHero(form, hero.id);
        setHero(updatedHero ?? { ...hero, ...form });
        toast.success("Alterações salvas com sucesso!");
      } else {
        const createdHero = await createHero(form);
        setHero(createdHero);
        toast.success("Alterações salvas com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar Hero:", error);
      toast.error( error.response?.data?.message);
    }
    setDisabled(true);
  };

  const handleCancel = () => {
  setForm({
    name: hero.name ?? "",
    position: hero.position ?? "",
    eyebrow: hero.eyebrow ?? "",
    introdution: hero.introdution ?? "",
  });

  setDisabled(true);
};

  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Seção Hero"}
        subtitle={
          "Edite a headline principal, CTAs e o snippet técnico exibido no topo do portfolio."
        }
        section={"/hero"}
      />

      <CardSection
        title={"Conteúdo principal"}
        subtitle={"Textos exibidos acima da dobra."}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            disabled={disabled}
            onChange={handleChange}
            name={"name"}
            value={form.name}
            type={"text"}
            label={"Nome do profissional"}
          />
          <Input
            disabled={disabled}
            onChange={handleChange}
            name={"position"}
            value={form.position}
            type={"text"}
            label={"Especialidade"}
          />
          <Input
            disabled={disabled}
            onChange={handleChange}
            name={"eyebrow"}
            value={form.eyebrow}
            type={"text"}
            label={"Eyebrow"}
          />
          <Textarea
            disabled={disabled}
            onChange={handleChange}
            name={"introdution"}
            value={form.introdution}
            label={"Breve introdução"}
          />

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
