import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = ({ lists, selectedList, onSelectList, onCreateList }) => {
  return (
    <aside className="w-full lg:w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <ApperIcon name="CheckCircle2" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">TaskFlow</h1>
            <p className="text-xs text-secondary">Stay Organized</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => onSelectList(null)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              selectedList === null
                ? "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ApperIcon name="Inbox" size={20} />
            <span className="flex-1 text-left">All Tasks</span>
          </motion.button>

          <div className="pt-4">
            <div className="flex items-center justify-between px-4 pb-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Lists
              </h3>
              <button
                onClick={onCreateList}
                className="text-primary hover:text-blue-700 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>
            <div className="space-y-1">
              {lists.map((list) => (
                <motion.button
                  key={list.Id}
                  whileHover={{ x: 4 }}
                  onClick={() => onSelectList(list.Id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedList === list.Id
                      ? "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: list.color }}
                  />
                  <span className="flex-1 text-left">{list.name}</span>
                  <span className="text-sm text-secondary font-medium">
                    {list.taskCount}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;