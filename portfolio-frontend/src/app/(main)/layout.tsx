import { getServerSession } from 'next-auth';
import { Montserrat } from 'next/font/google';
import { authOptions } from '../api/auth/[...nextauth]/handler';
import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import '@/assets/styles/global.scss'
import './MainLayout.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Кафедра Технология промышленной и художественной обработки материалов',
  description: 'Кафедра Технология промышленной и художественной обработки материалов',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Header session={session} />
        <div className="main-layout">
          <main className="main-layout__page">{children}</main>
        </div>
      </body>
    </html>
  )
}
