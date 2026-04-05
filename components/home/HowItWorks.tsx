import { Copy, Download, Play } from 'lucide-react';

const steps = [
  {
    icon: Copy,
    title: 'Copiez le lien',
    description: 'Ouvrez TikTok, appuyez sur "Partager" puis "Copier le lien" sur la vidéo souhaitée.',
  },
  {
    icon: Play,
    title: 'Collez & analysez',
    description: 'Collez l\'URL dans le champ ci-dessus et cliquez sur "Télécharger". Notre outil récupère la vidéo en quelques secondes.',
  },
  {
    icon: Download,
    title: 'Téléchargez',
    description: 'Choisissez le format : vidéo sans filigrane, avec filigrane, ou audio MP3. Votre fichier est prêt !',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Comment ça marche ?
        </h2>
        <p className="text-gray-400 text-center mb-10 text-sm">
          En 3 étapes simples, téléchargez n&apos;importe quelle vidéo TikTok publique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-brand-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <step.icon className="h-5 w-5 text-brand-400" />
                </div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                  Étape {i + 1}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
