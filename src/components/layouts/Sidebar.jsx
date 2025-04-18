import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronRightIcon as SubChevronRightIcon,
  ArchiveBoxXMarkIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export const Sidebar = ({
  navigation,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  openSubmenu,
  setOpenSubmenu,
}) => {
  return (
    <aside
      className={`transition-all duration-300 ease-in-out bg-surface border-r border-border p-4 flex flex-col`}
      style={{ width: sidebarOpen ? "240px" : "70px" }}
    >
      <div className="flex items-center justify-between mb-6">
        {sidebarOpen && <h2 className="text-xl font-bold">CRM Admin</h2>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 focus:outline-none"
        >
          {sidebarOpen ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 ms-2" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isSubmenuActive =
              item.submenu?.some((sub) => sub.name === activeTab) ||
              activeTab === item.name;

            const itemClasses = isSubmenuActive
              ? "bg-indigo-100 text-indigo-700 font-semibold"
              : "hover:bg-indigo-50 text-gray-700";

            return (
              <li key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => {
                        setOpenSubmenu(
                          openSubmenu === item.name ? null : item.name
                        );
                        setActiveTab(item.name);
                      }}
                      className={`w-full flex items-center px-2 py-0 rounded text-sm gap-3 ${itemClasses}`}
                    >
                      <div
                        className={`h-10 w-10 flex items-center justify-center rounded ${
                          sidebarOpen ? "" : "mx-auto"
                        }`}
                      >
                        <item.icon className="h-5 w-5 text-indigo-600" />
                      </div>

                      {sidebarOpen && (
                        <div className="flex flex-1 justify-between items-center">
                          <span className="truncate">{item.name}</span>
                          {openSubmenu === item.name ? (
                            <ChevronDownIcon className="h-4 w-4 text-gray-500 ms-2" />
                          ) : (
                            <SubChevronRightIcon className="h-4 w-4 text-gray-500 ms-2" />
                          )}
                        </div>
                      )}
                    </button>

                    {openSubmenu === item.name && sidebarOpen && (
                      <ul className="space-y-1 bg-gray-100 rounded-sm mt-1 font-medium ">
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <a
                              href="#"
                              onClick={() => {
                                setActiveTab(sub.name);
                                setOpenSubmenu(item.name);
                              }}
                              className={`block px-4 py-2 text-sm rounded ${
                                activeTab === sub.name
                                  ? "bg-indigo-50 text-indigo-700 font-medium"
                                  : "text-gray-600 hover:bg-indigo-100"
                              }`}
                            >
                              <ArchiveBoxIcon className="w-5 h-5 inline mr-6" />
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      setActiveTab(item.name);
                      setOpenSubmenu(null);
                    }}
                    className={`flex items-center px-2 py-0 rounded text-sm gap-3 ${itemClasses}`}
                  >
                    <div
                      className={`h-10 w-10 flex items-center justify-center rounded ${
                        sidebarOpen ? "" : "mx-auto"
                      }`}
                    >
                      <item.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    {sidebarOpen && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
