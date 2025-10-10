import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { taskListService } from "@/services/api/taskListService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import TaskCard from "@/components/organisms/TaskCard";
import TaskForm from "@/components/organisms/TaskForm";
import ListForm from "@/components/organisms/ListForm";
import Modal from "@/components/molecules/Modal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedList, setSelectedList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [tasksData, listsData] = await Promise.all([
        taskService.getAll(),
        taskListService.getAll(),
      ]);
      setTasks(tasksData);
      setLists(listsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const updateListCounts = async () => {
      for (const list of lists) {
        const count = tasks.filter((t) => t.listId === list.Id).length;
        if (count !== list.taskCount) {
          await taskListService.updateTaskCount(list.Id, count);
        }
      }
    };
    if (tasks.length > 0 && lists.length > 0) {
      updateListCounts();
    }
  }, [tasks, lists]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (selectedList !== null) {
      result = result.filter((t) => t.listId === selectedList);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((t) =>
        filterStatus === "completed" ? t.completed : !t.completed
      );
    }

    if (filterPriority !== "all") {
      result = result.filter((t) => t.priority === filterPriority);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority": {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, selectedList, searchQuery, filterStatus, filterPriority, sortBy]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks((prev) => [...prev, newTask]);
      setTaskModalOpen(false);
      setEditingTask(null);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updated = await taskService.update(editingTask.Id, taskData);
      setTasks((prev) => prev.map((t) => (t.Id === updated.Id ? updated : t)));
      setTaskModalOpen(false);
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.Id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updated = await taskService.toggleComplete(id);
      setTasks((prev) => prev.map((t) => (t.Id === updated.Id ? updated : t)));
      if (updated.completed) {
        toast.success("Task completed! 🎉");
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleCreateList = async (listData) => {
    try {
      const newList = await taskListService.create(listData);
      setLists((prev) => [...prev, newList]);
      setListModalOpen(false);
      toast.success("List created successfully!");
    } catch (err) {
      toast.error("Failed to create list");
    }
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const openDeleteDialog = (id) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar
          lists={lists}
          selectedList={selectedList}
          onSelectList={setSelectedList}
          onCreateList={() => setListModalOpen(true)}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearch={setSearchQuery}
          onCreateTask={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
          filterStatus={filterStatus}
          onFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
          sortBy={sortBy}
          onSortBy={setSortBy}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {filteredTasks.length === 0 ? (
            <Empty
              title={searchQuery ? "No tasks found" : "No tasks yet"}
              description={
                searchQuery
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first task and stay organized!"
              }
              actionLabel="Create Task"
              onAction={() => {
                setEditingTask(null);
                setTaskModalOpen(true);
              }}
              icon="CheckCircle2"
            />
          ) : (
            <div className="grid gap-4 max-w-4xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.Id}
                    task={task}
                    lists={lists}
                    onEdit={openEditTask}
                    onDelete={openDeleteDialog}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask}
          lists={lists}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setTaskModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        title="Create New List"
        size="sm"
      >
        <ListForm
          onSubmit={handleCreateList}
          onCancel={() => setListModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={() => handleDeleteTask(taskToDelete)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Dashboard;