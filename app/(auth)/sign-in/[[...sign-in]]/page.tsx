import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                    Bon retour parmi nous
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Connectez-vous à votre compte formateur.
                </p>
            </div>

            <div className="mt-8">
                <SignIn
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
