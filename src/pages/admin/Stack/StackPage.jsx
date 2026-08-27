import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import CardSection from "../../../components/CardSection/CardSection";
import TitleSection from "../../../components/TitleSection/TitleSection";
import { useEffect, useState } from "react";
import TableSkeleton from "../../../components/TableSkeleton/TableSkeleton";
import {
  createStack,
  deleteStack,
  getStacks,
  updateStack,
} from "../../../services/stackService";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input/Input";

export default function StackPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "BACKEND",
    level: "75",
  });
  const [stacks, setStacks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setForm({
      stack: "",
      category: "BACKEND",
      level: "75",
    });
  };

  useEffect(() => {
    async function loadStacks() {
      const response = await getStacks();
      setStacks(response.content);
    }

    loadStacks();
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
      setLoading(true);

      if (editingId) {
        const updated = await updateStack(form, editingId);

        setStacks((prev) =>
          prev.map((item) =>
            item.id === editingId ? (updated ?? { ...item, ...form }) : item,
          ),
        );
        toast.success("Alterações salvas com sucesso!");
      } else {
        const created = await createStack(form);
        setStacks((prev) => [...prev, created]);
        toast.success("Alterações salvas com sucesso!");
      }

      clearForm();
      setEditingId(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEditing = (stack) => {
    setForm({
      name: stack.name,
      category: stack.categorySkills,
      level: stack.level,
    });
    setEditingId(stack.id);
    setOpen(true);
  };

  const handleDelete = async (stack) => {
    try {
      setLoading(true);

      await deleteStack(stack.id);

      setStacks((prev) => prev.filter((item) => item.id !== stack.id));
      toast.success("Registro excluído com sucesso!")
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message ?? "Erro ao excluir o tecnologia."
    );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Stack técnica"}
        subtitle={
          "Gerencie tecnologias exibidas, agrupadas por categoria, com nível de proficiência."
        }
        section={"/stack"}
      />
      {open ? (
        ""
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="w-fit self-end inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 mt-6 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar tecnolgia
          </button>
        </div>
      )}

      {open ? (
        <CardSection
          title={editingId ? "Editando tecnologia" : "Adicionando tecnologia"}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3 text-muted-foreground font-semibold text-sm px-4 py-2">
              <Input
                onChange={handleChange}
                name={"name"}
                value={form.name}
                type={"text"}
                label={"Tecnologia"}
              />

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1.5">
                  <label htmlFor="category">Categoria</label>
                </span>
                <select
                  onChange={handleChange}
                  value={form.category}
                  name="category"
                  id=""
                  className="bg-background/60 rounded-md border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="BACKEND">Backend</option>
                  <option value="FRONTEND">Frontend</option>
                  <option value="DEVOPS">Devops</option>
                  <option value="TOOLS">Tools</option>
                  <option value="DATABASE">Database</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-xs text-muted-foreground mb-1.5">
                  <label htmlFor="level">Nível</label>
                </span>
                
                <div className="flex gap-4">
                  <input
                    onChange={handleChange}
                    value={form.level}
                    name="level"
                    type="range"
                    min="0"
                    max="100"
                    className="w-1/1"
                  ></input>
                  <p className="font-mono text-md text-muted-foreground">
                    {form.level}%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setOpen(false);
                  clearForm();
                }}
                className="w-fit self-end inline-flex items-center border border-border gap-2 rounded-md 
                    bg-background px-5 py-2.5 mt-6 text-sm font-medium text-foreground hover:opacity-90 transition-all
                    hover:border-primary hover:text-primary"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>

              <button
                type="submit"
                className="w-fit self-end inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 mt-6 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all glow-cyan"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </form>
        </CardSection>
      ) : (
        ""
      )}

      {/* Lista */}
      <CardSection
        title={"Tecnologias"}
        subtitle={"Liste as tecnologias que você mais domina."}
      >
        <div className="border border-border rounded-md">
          <div className="grid grid-cols-3 text-muted-foreground font-semibold text-sm px-4 py-2 border-b border-border">
            <span>TECNOLOGIA</span>
            <span>CATEGORIA</span>
            <span>NÍVEL</span>
          </div>

          {stacks.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhuma tecnologia adicionada ainda.
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <TableSkeleton />
          ) : (
            stacks.map((stack) => (
              <div
                key={stack.id}
                className="grid grid-cols-3 gap-3 text-muted-foreground font-semibold text-sm px-4 py-2"
              >
                <input
                  disabled
                  type="text"
                  value={stack.name}
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm font-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>
                <input
                  disabled
                  type="text"
                  value={stack.categorySkills}
                  className="w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm font-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                ></input>

                <div className="flex items-center gap-6">
                  <div className=" h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                      style={{ width: `${stack.level}%` }}
                    ></div>
                  </div>
                  <p className="font-mono font-normal text-xs text-red-50">
                    {stack.level}%
                  </p>

                  <div className="flex gap-4">
                    <a
                      onClick={() => handleEditing(stack)}
                      className="p-2 text-primary border border-border rounded-md hover:opacity-70 transition-colors duration-400"
                    >
                      <Pencil className="w-4 h-4" />
                    </a>
                    <a
                      onClick={() => handleDelete(stack)}
                      className="p-2 text-red-300 border border-border rounded-md hover:opacity-70 transition-colors duration-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardSection>
    </div>
  );
}
