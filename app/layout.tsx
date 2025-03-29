import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import Header from "@/components/header";

export const metadata = {
  metadataBase: new URL("https://meat-club.vercel.app/"),
  title: "Magnificent Cuts - Meat Club",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
