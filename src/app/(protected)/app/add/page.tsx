import AppBreadcrumbs from "@/components/common/app-breadcrums";
import FormApp from "../_components/form-app";

function AddPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "App", url: "/app" },
            { title: "Tambah App", url: "#" },
          ]}
        />
      </div>
      <div className="bg-white p-4 rounded-lg space-y-4">
        <FormApp />
      </div>
    </div>
  );
}

export default AddPage;
