import "./globals.css";

export const metadata = {
  title: "A little something for you, Saloni 💌",
  description: "A Special Surprise is Just for You, open it with a smile ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
