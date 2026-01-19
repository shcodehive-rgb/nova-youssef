import Link from 'next/link';

export const MarketingFooter = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Nova <span className="text-orange-600">Academy</span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            La plateforme tout-en-un pour les professeurs marocains. Lancez votre école en ligne en quelques minutes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">Produit</h3>
                        <ul className="space-y-3">
                            <li><Link href="#features" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Fonctionnalités</Link></li>
                            <li><Link href="#pricing" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Tarifs</Link></li>
                            <li><Link href="/showcase" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Exemples</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">Ressources</h3>
                        <ul className="space-y-3">
                            <li><Link href="/blog" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Blog</Link></li>
                            <li><Link href="/guide" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Guide de démarrage</Link></li>
                            <li><Link href="/help" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Centre d'aide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">Légal</h3>
                        <ul className="space-y-3">
                            <li><Link href="/terms" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Conditions d'utilisation</Link></li>
                            <li><Link href="/privacy" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Confidentialité</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Nova Academy. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};
