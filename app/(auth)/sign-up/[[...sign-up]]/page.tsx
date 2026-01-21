import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                    Créez votre école en ligne
                </h1>
                <p className="mt-2 text-slate-600 mb-8">
                    Rejoignez la plateforme leader pour les professeurs au Maroc.
                </p>
            </div>

            <div className="mt-8">
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            formButtonPrimary: 'bg-orange-600 hover:bg-orange-700 text-sm normal-case',
                            card: 'shadow-xl border border-gray-200 rounded-xl bg-white',
                            headerTitle: 'hidden',
                            headerSubtitle: 'hidden',
                            footerActionLink: 'text-orange-600 hover:text-orange-700',
                            developmentBadge: 'hidden',
                            footerBranding: 'hidden'
                        }
                    }}
                />
            </div>
        </div>
    );
}
