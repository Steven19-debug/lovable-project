import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, GraduationCap, TreePine, ArrowLeft } from "lucide-react";

const causes = [
  {
    id: 1,
    title: "Aide aux enfants défavorisés",
    description: "Soutenez l'éducation et la santé des enfants dans le besoin",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    video: "https://cdn.pixabay.com/video/2023/03/19/154564-808896033_large.mp4",
    icon: Heart,
    raised: 12450,
    goal: 20000,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Aide alimentaire",
    description: "Fournir des repas aux familles dans la précarité",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    video: "https://cdn.pixabay.com/video/2020/06/16/42588-432770654_large.mp4",
    icon: Users,
    raised: 8900,
    goal: 15000,
    color: "from-orange-500 to-amber-500"
  },
  {
    id: 3,
    title: "Bourses scolaires",
    description: "Financer l'éducation des jeunes talents",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    video: "https://cdn.pixabay.com/video/2019/06/15/24008-342166236_large.mp4",
    icon: GraduationCap,
    raised: 15600,
    goal: 25000,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    title: "Protection de l'environnement",
    description: "Projets de reforestation et préservation",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    video: "https://cdn.pixabay.com/video/2022/06/09/119754-719686106_large.mp4",
    icon: TreePine,
    raised: 6200,
    goal: 10000,
    color: "from-green-500 to-emerald-500"
  }
];

export default function Causes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nos causes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez une cause qui vous tient à cœur et faites la différence aujourd'hui
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {causes.map((cause, index) => {
            const Icon = cause.icon;
            const progress = (cause.raised / cause.goal) * 100;

            return (
              <Card 
                key={cause.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden group">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="metadata"
                    poster={cause.image}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  >
                    <source src={cause.video} type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t ${cause.color} opacity-30`} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl">{cause.title}</CardTitle>
                  <CardDescription className="text-base">
                    {cause.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-primary">
                        {cause.raised.toLocaleString('fr-FR')} €
                      </span>
                      <span className="text-muted-foreground">
                        sur {cause.goal.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${cause.color} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {progress.toFixed(0)}% atteint
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full"
                    variant="gradient"
                    onClick={() => navigate(`/donate/${cause.id}`)}
                  >
                    Faire un don
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}