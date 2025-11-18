import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                              (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.info("Utilisez le menu de votre navigateur pour installer l'application");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success("Application installée avec succès !");
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (isStandalone) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-accent/30 to-background">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Application installée !</h1>
          <p className="text-muted-foreground">
            DonateNow est déjà installé sur votre appareil.
          </p>
          <Button 
            className="w-full" 
            variant="gradient"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-accent/30 to-background">
      <div className="max-w-2xl mx-auto py-12 space-y-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-lg">
            <Smartphone className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Installer DonateNow
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Installez notre application pour une expérience optimale et un accès rapide depuis votre écran d'accueil
          </p>
        </div>

        <Card className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Download className="h-6 w-6 text-primary" />
            Avantages de l'installation
          </h2>
          <ul className="space-y-4">
            {[
              "Accès instantané depuis votre écran d'accueil",
              "Fonctionne hors ligne",
              "Notifications pour vos dons",
              "Expérience d'application native",
              "Pas de place perdue dans votre mémoire"
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {isInstallable ? (
            <Button 
              onClick={handleInstallClick}
              className="w-full h-14 text-lg"
              variant="gradient"
            >
              <Download className="mr-2 h-5 w-5" />
              Installer maintenant
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Pour installer l'application, utilisez le menu de votre navigateur :
                </p>
              </div>
              <div className="grid gap-4 text-sm">
                <div className="p-4 border rounded-lg space-y-2">
                  <p className="font-semibold">Sur iPhone/iPad (Safari) :</p>
                  <p className="text-muted-foreground">
                    Appuyez sur <strong>Partager</strong> puis <strong>Sur l'écran d'accueil</strong>
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <p className="font-semibold">Sur Android (Chrome) :</p>
                  <p className="text-muted-foreground">
                    Menu ⋮ puis <strong>Installer l'application</strong> ou <strong>Ajouter à l'écran d'accueil</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Install;