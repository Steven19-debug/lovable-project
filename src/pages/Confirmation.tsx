import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Home } from "lucide-react";

export default function Confirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const amount = searchParams.get('amount') ? parseFloat(searchParams.get('amount')!) : null;
  const causeName = searchParams.get('cause');
  const donorName = searchParams.get('donor');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!amount || !causeName || !donorName || !sessionId) {
      navigate("/");
    }
  }, [amount, causeName, donorName, sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-0 shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-6 pb-4">
          <div className="mx-auto bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-full animate-fade-in shadow-lg">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Merci {donorName} !
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-lg text-muted-foreground">
              Votre don de
            </p>
            <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {amount?.toFixed(2)}€
            </p>
            <p className="text-lg text-muted-foreground">
              pour <span className="font-semibold text-foreground">{causeName}</span>
            </p>
            <p className="text-lg text-muted-foreground">
              a été reçu avec succès !
            </p>
          </div>

          <div className="bg-accent/50 rounded-lg p-6 space-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Heart className="h-8 w-8 mx-auto text-primary animate-pulse" />
            <p className="text-sm text-muted-foreground">
              Votre générosité va changer des vies. Un reçu fiscal vous sera envoyé par email dans les prochaines heures.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              className="w-full h-12"
              variant="gradient"
              onClick={() => navigate("/causes")}
            >
              Voir d'autres causes
            </Button>
            <Button
              className="w-full h-12"
              variant="outline"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}