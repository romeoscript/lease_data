import type { NextPage } from 'next';
import Head from 'next/head';
import LeaseAbstractTab from '../components/lease/LeaseAbstractTab';
import { Toaster } from 'react-hot-toast';
import { colors } from "@/utils/styleConstants";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Deal Screening - Lease Abstract</title>
        <meta name="description" content="Starboard AI Lease Abstract Tab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">280 Richards, Brooklyn, NY</h1>
          <p className="text-gray-600">Deal Screening Overview - Lease Abstract</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-4 border-b border-gray-200">
          <button className="pb-2 px-1 text-gray-500">
            Overview
          </button>
          <button className="pb-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
            Lease
          </button>
          <button className="pb-2 px-1 text-gray-500">
            Pipeline
          </button>
          <button className="pb-2 px-1 text-gray-500">
            Settings
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow">
          <LeaseAbstractTab />
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Starboard AI - Technical Interview Exercise</p>
      </footer>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: colors.primaryText,
            color: '#ffffff',
          },
          success: {
            style: {
              background: colors.risk.low.text,
              color: '#ffffff',
            },
          },
          error: {
            style: {
              background: colors.risk.high.text,
              color: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};

export default Home;