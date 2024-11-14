import { ChartBar } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BookPlus, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingCart />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BookPlus />,
  },
];

function MenuItems({ setIsOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="">
      {adminSideBarMenuItems.map((menuItems) => (
        <div
          onClick={() => {
            navigate(menuItems.path);
            setIsOpen ? setIsOpen(false) : null;
          }}
          key={menuItems.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItems.icons}
          {menuItems.label}
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64">
          <div className="felx flex-col h-full">
            <SheetHeader className="mb-7 border-b border-gray-300 pb-7 mt-5">
              <SheetTitle className="flex gap-2">
                <ChartBar size={30} />
                <span className="gap-2 ">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setIsOpen={setIsOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 mb-7 border-b border-gray-300 pb-3 "
        >
          <ChartBar size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
