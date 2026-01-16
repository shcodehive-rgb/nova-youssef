import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SettingsForm } from "./_components/settings-form";

const SettingsPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    // const settings = await db.siteSettings.findFirst();
    const settings = null;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Payment Settings
                    </h1>
                    <span className="text-sm text-slate-700">
                        Manage bank accounts and WhatsApp contact for manual payments.
                    </span>
                </div>
            </div>
            <SettingsForm initialData={settings} />
        </div>
    );
}

export default SettingsPage;
