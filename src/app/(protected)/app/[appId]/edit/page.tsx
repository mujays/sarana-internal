import AppBreadcrumbs from "@/components/common/app-breadcrums";
import FormApp from "../../_components/form-app";

interface EditAppPageProps {
  params: {
    appId: string;
  };
}

function EditAppPage({ params }: EditAppPageProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <AppBreadcrumbs
          items={[
            { title: "Home", url: "/" },
            { title: "App", url: "/app" },
            { title: "Edit App", url: "#" },
          ]}
        />
      </div>
      <div className="bg-white p-4 rounded-lg space-y-4">
        <FormApp existingId={+params.appId} />
      </div>
    </div>
  );
}

export default EditAppPage;
