import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onSearch, onCreateTask, filterStatus, onFilterStatus, filterPriority, onFilterPriority, sortBy, onSortBy }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className="flex-1">
          <SearchBar onSearch={onSearch} placeholder="Search tasks..." />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-900 font-medium transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => onFilterPriority(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-900 font-medium transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-900 font-medium transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="created">Created</option>
          </select>

          <Button onClick={onCreateTask} variant="primary">
            <ApperIcon name="Plus" size={20} />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;