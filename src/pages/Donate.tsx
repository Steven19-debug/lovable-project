import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const causes = [
  {
    id: 1,
    title: "Aide aux enfants défavorisés",
    description: "Soutenez l'éducation et la santé des enfants dans le besoin",
  },
  {
    id: 2,
    title: "Aide alimentaire",
    description: "Fournir des repas aux familles dans la précarité",
  },
  {
    id: 3,
    title: "Bourses scolaires",
    description: "Financer l'éducation des jeunes talents",
  },
  {
    id: 4,
    title: "Protection de l'environnement",
    description: "Projets de reforestation et préservation",
  }
];

const suggestedAmounts = [10, 25, 50, 100];

export default function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const cause = causes.find(c => c.id === Number(id));

  if (!cause) {
    return <div>Cause non trouvée</div>;
  }

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    if (!name || !email) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: parseFloat(amount),
          causeId: cause.id,
          causeName: cause.title,
          donorName: name,
          donorEmail: email,
        }
      });

      if (error) throw error;

      // Redirection vers la page de paiement Stripe
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement non reçue');
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors du paiement",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/causes")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux causes
        </Button>

        <Card className="border-0 shadow-xl animate-fade-in">
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-gradient-to-br from-primary to-secondary p-4 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-center">{cause.title}</CardTitle>
            <CardDescription className="text-center text-base">
              {cause.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleDonate} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Montant de votre don</Label>
                <div className="grid grid-cols-4 gap-3">
                  {suggestedAmounts.map((suggested) => (
                    <Button
                      key={suggested}
                      type="button"
                      variant={amount === suggested.toString() ? "default" : "outline"}
                      onClick={() => setAmount(suggested.toString())}
                      className="h-12"
                    >
                      {suggested}€
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Montant personnalisé"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 text-lg pl-4 pr-8"
                    min="1"
                    step="0.01"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg"
                variant="gradient"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Donner ${amount ? parseFloat(amount).toFixed(2) : '0.00'}€`
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Paiement sécurisé par Stripe. Vos informations sont protégées.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}