import { AlignCenter, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setIsOpen }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    // dispatch(logoutUser()).then((data) => {
    //   if (data?.payload?.success) {
    //     toast({
    //       title: "Logged out successfully", //Creating a Toast
    //     });
    //   }
    // });
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
    toast({
      title: "Logged out successfully", //Creating a Toast
    });
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setIsOpen(true)}>
        <AlignCenter />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
