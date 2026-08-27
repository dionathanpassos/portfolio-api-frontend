import { PencilIcon, SaveCheck, Trash2 } from "lucide-react";
import CardSection from "../../../components/CardSection/CardSection";
import TitleSection from "../../../components/TitleSection/TitleSection";
import { useEffect, useState } from "react";
import { createAbout, getAbout, updateAbout } from "../../../services/aboutService";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";

export default function AboutPage() {
  const [about, setAbout] = useState({});
  const [form, setForm] = useState({
    title: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      const response = await getAbout();
      setAbout(response);
      setForm({
        title: response?.title ?? "",
        paragraphOne: response?.paragraphOne ?? "",
        paragraphTwo: response?.paragraphTwo ?? "",
        paragraphThree: response?.paragraphThree ?? "",
      });
    }
    loadAbout();
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
      if (about?.id) {
        const updatedAbout = await updateAbout(form, about.id);
        setAbout(updatedAbout ?? { ...about, ...form });
        toast.success("Alterações salvas com sucesso!");
      } else {
        const createdAbout = await createAbout(form);
        setAbout(createdAbout);
        toast.success("Alterações salvas com sucesso!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setDisabled(true);
  };

  const handleCancel = () => {
    setForm({
      title: about.title,
      paragraphOne: about.paragraphOne ?? "",
      paragraphTwo: about.paragraphTwo ?? "",
      paragraphThree: about.paragraphThree ?? "",
    });

    setDisabled(true);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Sobre"}
        subtitle={"Edite a apresentação pessoal, papel atual e destaques."}
        section={"/sobre"}
      />

      <CardSection
        title={"Conteúdo principal"}
        subtitle={"Textos exibidos acima da dobra."}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            disabled={disabled}
            onChange={handleChange}
            name={"title"}
            value={form.title}
            type={"text"}
            label={"Título Highlight"}
          />

          <Textarea
            disabled={disabled}
            onChange={handleChange}
            name={"paragraphOne"}
            value={form.paragraphOne}
            label={"1º - Parágrafo"}
          />

          <Textarea
            disabled={disabled}
            onChange={handleChange}
            name={"paragraphTwo"}
            value={form.paragraphTwo}
            label={"2º - Parágrafo"}
          />

          <Textarea
            disabled={disabled}
            onChange={handleChange}
            name={"paragraphThree"}
            value={form.paragraphThree}
            label={"3º - Parágrafo"}
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
