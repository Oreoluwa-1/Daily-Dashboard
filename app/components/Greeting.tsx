type Props = { name: string };

export default function Greeting({ name }: Props) {
  const hours = new Date().getHours();
  const getGreeting = () => (hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening");
  return (
    <h1 className="text-4xl font-bold">
      {getGreeting()}, {name} 👋
    </h1>
  );
}
