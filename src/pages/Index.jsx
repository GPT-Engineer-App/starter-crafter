import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your New App</h1>
      <p className="text-xl mb-8">This is a bare-bones application ready for your customization.</p>
      <Button size="lg">Get Started</Button>
    </div>
  );
};

export default Index;