import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ReachInbox - Create Account</title>
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
