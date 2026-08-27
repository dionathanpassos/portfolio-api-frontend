import { useEffect, useState } from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import {
  Check,
  ExternalLinkIcon,
  FolderGit2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import CardSection from "../../../components/CardSection/CardSection";
import GithubIcon from "../../../components/ui/GitHubIcon";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../../services/projectService";
import toast from "react-hot-toast";
import { getStacks } from "../../../services/stackService";

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stacks, setStacks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    slug: "",
    featured: true,
    repositoryUrl: "",
    demoUrl: "",
    skillsIds: [],
  });

  const clearForm = () => {
    setForm({
      title: "",
      description: "",
      slug: "",
      featured: "",
      repositoryUrl: "",
      demoUrl: "",
      status: "IN_PROGRESS",
      skillsIds: [],
    });
  };

  useEffect(() => {
    async function loadProjects() {
      const projectResponse = await getProjects();
      const stackResponse = await getStacks();
      setProjects(projectResponse.content);
      setStacks(stackResponse.content);
    }

    loadProjects();
  }, []);

  const handleEditing = (project) => {
    setForm({
      id: project.id,
      title: project.title,
      description: project.description,
      slug: project.slug,
      status: project.status,
      featured: project.featured,
      repositoryUrl: project.repositoryUrl,
      demoUrl: project.demoUrl,
      skillsIds: project.skills.map((skill) => skill.id),
    });

    setEditingId(project.id);
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProject(id);
      setProjects((prev) => prev.filter((item) => item.id !== id));
      toast.success("Registro excluído com sucesso!");

      setOpen(false);
      clearForm();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ?? "Erro ao excluir o projeto.",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingId) {
        const updated = await updateProject(form, editingId);

        setProjects((prev) =>
          prev.map((project) => (project.id === editingId ? updated : project)),
        );
        toast.success("Alterações salvas com sucesso!");
      } else {
        const created = await createProject(form);
        setProjects((prev) => [...prev, created]);
        toast.success("Alterações salvas com sucesso!");
      }

      clearForm();
      setEditingId(null);
      setOpen(false);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Projetos"}
        subtitle={"Crie, edite e remova projetos exibidos no portfolio."}
        section={"/projetos"}
      ></TitleSection>

      <div className="grid lg:grid-cols-[370px_1fr] gap-4">
        <CardSection>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Lista</span>
            <span className="text-xs text-muted-foreground">
              {projects.length} projetos
            </span>
          </div>

          {/* Lista */}
          <div
            className="flex flex-col gap-3 mt-6 min-h-125 max-h-125 overflow-auto pr-2
          scrollbar-thin
          scrollbar-thumb-primary/20
          scrollbar-track-none
          "
          >
            {projects.map((project) => (
              <button
                onClick={() => handleEditing(project)}
                key={project.id}
                className="bg-background/40 rounded-md px-4 py-3 border border-border hover:border-primary/30"
              >
                <div className="flex">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-muted-foreground" />
                    <span className="flex gap-2 items-center font-mono text-[11px] font-light truncate">
                      {project.slug}
                    </span>

                    {project.featured ? (
                      <Check className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="ml-auto text-[11px] font-mono font-extralight text-accent rounded-md">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-left mt-1.5">
                  {project.description}
                </p>
              </button>
            ))}
          </div>
        </CardSection>

        {/* Form */}
        {open ? (
          <CardSection
            title={`${editingId ? "Editando projeto" : "Adicionando um novo projeto"}`}
            subtitle={"Detalhes do projeto."}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1.5">
                  Título
                </span>
                <input
                  onChange={handleChange}
                  name="title"
                  type="text"
                  value={form.title}
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-xs text-muted-foreground mb-1.5">
                  Slug
                </span>
                <input
                  onChange={handleChange}
                  name="slug"
                  type="text"
                  value={form.slug}
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1.5">
                    Status
                  </span>
                  <select
                    onChange={handleChange}
                    value={form.status}
                    name="status"
                    id=""
                    className="bg-background/60 rounded-md border border-border px-2 py-2 text-foreground text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1.5">
                    Featured (exibir no portfolio)
                  </span>
                  <select
                    onChange={handleChange}
                    value={String(form.featured)}
                    name="featured"
                    id=""
                    className="bg-background/60 rounded-md border border-border px-2 py-2 text-foreground text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="true" className="">
                      Sim
                    </option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1.5">
                  Descrição
                </span>
                <textarea
                  onChange={handleChange}
                  name="description"
                  value={form.description}
                  className="min-h-20 w-full border border-border bg-background/60 
              rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 
              focus:ring-primary/30 transition-colors"
                ></textarea>
              </div>

              <div>
                <span className="text-xs text-muted-foreground mb-1.5">
                  Stack
                </span>
                <MultiSelect
                  name="skillsIds"
                  options={stacks}
                  value={form.skillsIds}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1.5 flex gap-2 items-center">
                    <GithubIcon className="w-4" />
                    Repositório
                  </span>
                  <input
                    onChange={handleChange}
                    value={form.repositoryUrl}
                    name="repositoryUrl"
                    type="text"
                    className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  ></input>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1.5 flex gap-2 items-center">
                    <ExternalLinkIcon className="w-4 h-4" />
                    URL Pública
                  </span>
                  <input
                    onChange={handleChange}
                    value={form.demoUrl}
                    name="demoUrl"
                    type="text"
                    className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  ></input>
                </div>
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
          <div className="">
            <button
              onClick={() => {
                (setOpen(true), setEditingId(null));
              }}
              className="w-fit self-end inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 mt-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Adicionar projeto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
