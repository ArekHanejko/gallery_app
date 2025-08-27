import { Inter } from "next/font/google";
import "./globals.css";
import Menu from'./Menu'
import { UserProvider } from './userContext'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Galeria ZI",
  description: "Galeria ZI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white h-[100%]"> 
      <body className="h-[100%]">
        <UserProvider>
          <Menu />
          <main>{children}</main>    
        </UserProvider>  
      </body>
    </html>
  );
}

