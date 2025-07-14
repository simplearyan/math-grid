export const runtime = 'edge'; // Add this line

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-end-2">HELLO</div>
      <div className="bg-primary-foreground p-4 rounded-lg"></div>
      <div className="bg-primary-foreground p-4 rounded-lg">HELLO</div>
      <div className="bg-primary-foreground p-4 rounded-lg">HELLO</div>
      <div className="bg-primary-foreground p-4 rounded-lg">HELLO</div>
    </div>
  );
}
