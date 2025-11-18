import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, HandHeart, Users, Sparkles, Smartphone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 via-background to-background">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80"
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://cdn.pixabay.com/video/2022/12/07/142249-779813038_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-4 right-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/install")}
            className="gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Installer l'app
          </Button>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl shadow-xl animate-pulse">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Ensemble, changeons des vies
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Votre générosité peut faire la différence. Soutenez les causes qui vous tiennent à cœur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8"
                variant="gradient"
                onClick={() => navigate("/causes")}
              >
                <HandHeart className="mr-2 h-5 w-5" />
                Faire un don
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg h-14 px-8"
                onClick={() => navigate("/causes")}
              >
                Découvrir les causes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Donateurs actifs", value: "2,500+" },
              { icon: Heart, label: "Dons collectés", value: "43,150€" },
              { icon: Sparkles, label: "Causes soutenues", value: "12" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center space-y-3 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Prêt à faire la différence ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Chaque don compte. Rejoignez notre communauté de généreux donateurs.
            </p>
            <Button 
              size="lg" 
              className="text-lg h-14 px-12"
              variant="gradient"
              onClick={() => navigate("/causes")}
            >
              Voir toutes les causes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
