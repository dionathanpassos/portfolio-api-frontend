import { Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";
import CardSection from "../../../components/CardSection/CardSection";
import {
  createTimeline,
  deleteTimeline,
  getTimeline,
  updateTimeline,
} from "../../../services/timelineService";
import toast from "react-hot-toast";
import Select from "../../../components/ui/Select/Select";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";

export default function TimelinePage() {
  const [timelines, setTimelines] = useState([]);
  const [form, setForm] = useState({
    type: "EDUCATION",
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({})

  console.log(form);
  useEffect(() => {
    async function loadTimeline() {
      const response = await getTimeline();
      setTimelines(response.content);
    }

    loadTimeline();
  }, []);

  const clearForm = () => {
    setForm({
      type: "EDUCATION",
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      featured: false,
    });
    setFieldErrors({})
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditing = (timeline) => {
    setForm({
      type: timeline.type,
      title: timeline.title,
      subtitle: timeline.subtitle,
      description: timeline.description,
      startDate: timeline.startDate,
      endDate: timeline.endDate,
      current: timeline.current,
      featured: timeline.featured,
    });
    setEditingId(timeline.id);
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const updated = await updateTimeline(form, editingId);

        setTimelines((prev) =>
          prev.map((item) =>
            item.id === editingId ? (updated ?? { ...item, ...form }) : item,
          ),
        );
        toast.success("Alterações salvas com sucesso!");
      } else {
        const created = await createTimeline(form);
        setTimelines((prev) => [...prev, created]);
        toast.success("Alterações salvas com sucesso!");
      }

      clearForm();
      setEditingId(null);
      setOpen(false);
    } catch (error) {
      const mensagemDoBackend = error.response?.data?.message || error.message;
      toast.error(mensagemDoBackend || "Erro ao conectar com o servidor.");
      setFieldErrors(error.response?.data.fieldErrors);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await deleteTimeline(id);

      setTimelines((prev) => prev.filter((item) => item.id !== id));
      toast.success("Registro excluído com sucesso!");

      setOpen(false);
      clearForm();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ?? "Erro ao excluir o tecnologia.",
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(fieldErrors)

  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Timeline"}
        subtitle={"Gerencie experiências, formação, cursos e certificações."}
        section={"/timeline"}
      />

      <div className="grid lg:grid-cols-[370px_1fr] gap-4">
        {/* Lista */}
        <CardSection>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Registros</span>
            <span className="text-xs text-muted-foreground">
              {timelines.length} registros
            </span>
          </div>

          <div
            className="flex flex-col gap-3 mt-6 min-h-125 max-h-125 overflow-auto pr-2
          scrollbar-thin
          scrollbar-thumb-primary/20
          scrollbar-track-none
          "
          >
            {timelines.map((timeline) => (
              <button
                key={timeline.id}
                onClick={() => handleEditing(timeline)}
                className="bg-background/40 rounded-md px-4 py-3 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-left text-foreground">
                      {timeline.title}
                    </p>
                    <p className="text-xs text-muted-foreground text-left">
                      {timeline.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground text-left">
                      {timeline.startDate} à {timeline.endDate ?? "Atualmente"}
                    </p>
                  </div>

                  <span className="ml-auto rounded-md bg-primary/10 px-2 py-1 text-[11px] font-mono text-primary">
                    {timeline.type}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground text-left line-clamp-2">
                  {timeline.description}
                </p>
              </button>
            ))}
          </div>
        </CardSection>

        {/* Formulário */}
        {open ? (
          <CardSection
            title={editingId ? "Editar registro" : "Adicionar registro"}
            subtitle={"Informações exibidas na timeline."}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label={"Tipo"}
                  name={"type"}
                  value={form.type}
                  onChange={handleChange}
                  options={[
                    {value: "EDUCATION", label: "Formação"},
                    {value: "WORK", label: "Experiência"},
                    {value: "PROJECT", label: "Projeto"},
                    {value: "CERTIFICATION", label: "Certificação"}
                  ]}
                  error={fieldErrors.type}
                />
                <Input
                  label={"Título"}
                  type={"text"}
                  name={"title"}
                  value={form.title}
                  onChange={handleChange}
                  error={fieldErrors.title}
                />
              </div>
              <Input
                label={"Instituição/Empresa/Plataforma"}
                type={"text"}
                name={"subtitle"}
                value={form.subtitle}
                onChange={handleChange}
                error={fieldErrors.subtitle}
              />

              <Textarea
                label={"Descrição"}
                type={"text"}
                name={"description"}
                value={form.description}
                onChange={handleChange}
                error={fieldErrors.description}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={"Data inicial"}
                  type={"date"}
                  name={"startDate"}
                  value={form.startDate}
                  onChange={handleChange}
                  error={fieldErrors.startDate}
                />
                <Input
                  label={"Data final"}
                  type={"date"}
                  name={"endDate"}
                  value={form.endDate}
                  onChange={handleChange}
                  error={fieldErrors.endDate}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Select
                  label={"Trabalho atual:"}
                  name={"current"}
                  value={String(form.current)}
                  onChange={handleChange}
                  options={[
                    {value: "true", label: "Sim"},
                    {value: "false", label: "Não"},
                  ]}
                  error={fieldErrors.current}
                />
                <Select
                  label={"Trabalho atual:"}
                  value={String(form.featured)}
                  name="featured"
                  onChange={handleChange}
                  options={[
                    {value: "true", label: "Sim"},
                    {value: "false", label: "Não"},
                  ]}
                  error={fieldErrors.current}
                />
              </div>

              <div className="flex justify-end gap-4">
                {editingId && (
                  <button
                    disabled={true}
                    onClick={() => handleDelete(editingId)}
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-red-400 bg-red-400/10 px-5 py-2.5 text-sm text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                )}

                <button
                  onClick={() => {
                    (setOpen(false), setEditingId(null), clearForm());
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm text-primary-foreground"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            </form>
          </CardSection>
        ) : (
          <div>
            <button
              onClick={() => setOpen(true)}
              className="w-fit self-end inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 mt-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Adicionar registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
